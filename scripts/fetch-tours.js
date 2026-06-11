import fs from 'fs';
import path from 'path';
import https from 'https';

let SPREADSHEET_ID = process.env.SPREADSHEET_ID || '';
let GOOGLE_APPS_SCRIPT_URL = '';
const LOCAL_CSV_DIR = path.resolve('tmp/csv_export');

const configPath = path.resolve('scripts/config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    if (!SPREADSHEET_ID) SPREADSHEET_ID = config.spreadsheetId || '';
    GOOGLE_APPS_SCRIPT_URL = config.googleAppsScriptUrl || '';
  } catch (err) {
    // Ignore read error
  }
}

// -------------------------------------------------------------
// RFC-4180 Compliant CSV Parser
// -------------------------------------------------------------
function parseCSV(csvText) {
  const lines = [];
  let currentLine = [];
  let currentCell = '';
  let inQuotes = false;
  
  const text = csvText.replace(/\r/g, '');
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentCell += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentLine.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n') {
        currentLine.push(currentCell.trim());
        lines.push(currentLine);
        currentLine = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
  }
  
  if (currentCell || currentLine.length > 0) {
    currentLine.push(currentCell.trim());
    lines.push(currentLine);
  }
  
  const headers = lines[0];
  const objects = [];
  for (let k = 1; k < lines.length; k++) {
    const row = lines[k];
    if (row.length === 0 || (row.length === 1 && row[0] === '')) continue;
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] !== undefined ? row[idx] : '';
    });
    objects.push(obj);
  }
  return objects;
}

// -------------------------------------------------------------
// Helper to fetch remote CSV or read local file
// -------------------------------------------------------------
function getCSV(sheetName) {
  return new Promise((resolve, reject) => {
    if (SPREADSHEET_ID) {
      const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
      console.log(`Fetching remote sheet "${sheetName}" from Google Sheets...`);
      https.get(url, (res) => {
        const chunks = [];
        res.on('data', (chunk) => { chunks.push(chunk); });
        res.on('end', () => {
          if (res.statusCode === 200) {
            const data = Buffer.concat(chunks).toString('utf-8');
            resolve(data);
          } else {
            reject(new Error(`Failed to fetch sheet ${sheetName}: Status ${res.statusCode}`));
          }
        });
      }).on('error', reject);
    } else {
      const filePath = path.join(LOCAL_CSV_DIR, `${sheetName}.csv`);
      console.log(`Reading local fallback file: ${filePath}`);
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        resolve(data);
      } catch (err) {
        reject(new Error(`Local CSV file not found for "${sheetName}". Please run CSV export first.`));
      }
    }
  });
}

// Helper to parse line-separated list
function parseLineList(str) {
  if (!str) return [];
  return str.split('\n').map(s => s.trim()).filter(Boolean);
}

// Helper to parse comma-separated list
function parseCommaList(str) {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

// Helper to parse key-value pipes for terms/policies
function parsePipePairs(str) {
  if (!str) return undefined;
  return str.split('\n').map(line => {
    const parts = line.split('|');
    return [parts[0] ? parts[0].trim() : '', parts[1] ? parts[1].trim() : ''];
  }).filter(pair => pair[0] || pair[1]);
}

// Helper to determine band list dynamically
function getBands(tourId, packageType, numValues) {
  if (tourId === 'pqc02') {
    return ['8-9', '12-14', '15-19', '20-24', '25-29', '30-34', '35-42'];
  }
  if (packageType === 'GIT') {
    return ['8-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-42'];
  }
  if (packageType === 'FIT') {
    if (numValues === 6) {
      return ['2-3', '4-5', '6-7', '8-9', '10-11', '12-14'];
    }
    return ['4-5', '6-7', '8-9', '10-11', '12-14'];
  }
  return [];
}

// Helper to parse cell grid configs (text and optional spans in brackets)
function parseCellConfig(str) {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(Boolean).map(part => {
    const match = part.match(/^([^\[]*)(?:\[(\d+)\])?$/);
    if (match) {
      const text = match[1].trim();
      const colSpan = match[2] ? parseInt(match[2], 10) : 1;
      return { text, colSpan };
    }
    return { text: part, colSpan: 1 };
  });
}

// -------------------------------------------------------------
// MAIN COMPILATION LOGIC
// -------------------------------------------------------------
async function main() {
  try {
    const toursCsv = await getCSV('Tours');
    const itiCsv = await getCSV('Itineraries');
    const pricingCsv = await getCSV('Pricing');

    const rawTours = parseCSV(toursCsv);
    const rawIti = parseCSV(itiCsv);
    const rawPricing = parseCSV(pricingCsv);

    console.log(`Parsed ${rawTours.length} tours, ${rawIti.length} itinerary days, and ${rawPricing.length} pricing rows.`);

    const tours = [];

    for (const rTour of rawTours) {
      const tourId = rTour.id;
      
      // Filter itineraries for this tour
      const tourItineraries = rawIti
        .filter(item => item.tour_id === tourId)
        .map(item => ({
          day: parseInt(item.day, 10),
          title: item.title || undefined,
          titleTh: item.titleTh || undefined,
          notes: parseLineList(item.notes),
          notesTh: parseLineList(item.notesTh),
          lunch: item.lunch || undefined,
          lunchMenuTh: parseCommaList(item.lunchMenuTh),
          dinner: item.dinner || undefined,
          dinnerMenuTh: parseCommaList(item.dinnerMenuTh),
          overnightTh: item.overnightTh || undefined
        }))
        .sort((a, b) => a.day - b.day);

      // Filter pricing for this tour
      const tourPricing = rawPricing.filter(item => item.tour_id === tourId);
      
      const priceRows = [];
      const priceExtraRows = [];
      const vehicleRows = [];

      for (const pRow of tourPricing) {
        if (pRow.row_type === 'standard') {
          const rawValues = pRow.cells.split(',').map(v => v.trim()).filter(Boolean);
          const values = rawValues.map(v => Number(v));
          const bands = getBands(tourId, rTour.packageType, values.length);
          
          priceRows.push({
            season: pRow.label,
            cells: bands.map((band, index) => ({ band, value: values[index] })),
            single: pRow.single || undefined
          });
        } else if (pRow.row_type === 'extra') {
          // Check if it's the legacy format (no brackets/colspans, just a merged cell string)
          if (pRow.cells && !pRow.cells.includes('[') && pRow.cells.includes('/')) {
            priceExtraRows.push({
              label: pRow.label,
              merged: pRow.cells,
              single: pRow.single || undefined
            });
          } else {
            priceExtraRows.push({
              label: pRow.label,
              cells: parseCellConfig(pRow.cells),
              single: pRow.single || undefined
            });
          }
        } else if (pRow.row_type === 'vehicle') {
          // Check if it's the legacy format
          if (pRow.cells && !pRow.cells.includes('[')) {
            const parts = pRow.cells.split(',').map(s => s.trim()).filter(Boolean);
            vehicleRows.push({
              label: pRow.label,
              left: parts[0] || '',
              right: parts[1] || ''
            });
          } else {
            vehicleRows.push({
              label: pRow.label,
              cells: parseCellConfig(pRow.cells)
            });
          }
        }
      }

      // Determine assets key string
      const pType = rTour.packageType.toLowerCase();
      let reg = 'Central';
      if (rTour.region.includes('North')) reg = 'North';
      else if (rTour.region.includes('South')) reg = 'South';
      else if (rTour.region.includes('Phu Quoc') || rTour.region.includes('Quoc')) reg = 'PhuQuoc';
      const assetsKey = `kitAssets.${pType}${reg}`;

      // Assemble final tour configuration
      const tourObj = {
        id: rTour.id,
        code: rTour.code,
        packageType: rTour.packageType,
        region: rTour.region,
        title: rTour.title,
        route: rTour.route,
        duration: parseInt(rTour.duration, 10),
        nights: rTour.nights,
        hotel: rTour.hotel,
        groupRange: rTour.groupRange,
        vehicle: rTour.vehicle,
        tip: rTour.tip,
        assets: assetsKey, // will be replaced with reference in final file write
        sourcePages: rTour.sourcePages || undefined,
        surcharges: parseLineList(rTour.surcharges),
        priceRows,
        priceExtraRows,
        vehicleRows,
        highlights: parseLineList(rTour.highlights),
        itinerary: tourItineraries,
        inclusionsTh: parseLineList(rTour.inclusionsTh),
        exclusionsTh: parseLineList(rTour.exclusionsTh),
        childRatesTh: parseLineList(rTour.childRatesTh),
        remarksTh: (rTour.remarksThLeft || rTour.remarksThRight) ? {
          left: parseLineList(rTour.remarksThLeft),
          right: parseLineList(rTour.remarksThRight)
        } : undefined,
        remarksLeftSpan: rTour.remarksLeftSpan ? parseInt(rTour.remarksLeftSpan, 10) : undefined,
        remarksRightSpan: rTour.remarksRightSpan ? parseInt(rTour.remarksRightSpan, 10) : undefined,
        paymentTermsTh: parsePipePairs(rTour.paymentTermsTh),
        cancellationPolicyTh: parsePipePairs(rTour.cancellationPolicyTh),
      };

      tours.push(tourObj);
    }

    // Write file src/data/tours.js
    const headerCode = `// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY.
// Run "npm run fetch" or configure Google Sheets Spreadsheet ID to update.

const kitAssets = {
  fitCentral: {
    pdf: '/sales-kits/fit-central-vietnam-2026.pdf',
    cover: '/assets/covers/fit-central-vietnam-2026.png',
    thumb: '/assets/thumbs/fit-central-vietnam-2026.jpg',
    label: 'Sales kit FIT - Central Vietnam 2026',
  },
  fitNorth: {
    pdf: '/sales-kits/fit-north-vietnam-2026.pdf',
    cover: '/assets/covers/fit-north-vietnam-2026.png',
    thumb: '/assets/thumbs/fit-north-vietnam-2026.jpg',
    label: 'Sales kit FIT - North Vietnam 2026',
  },
  fitPhuQuoc: {
    pdf: '/sales-kits/fit-phu-quoc-2026.pdf',
    cover: '/assets/covers/fit-phu-quoc-2026.png',
    thumb: '/assets/thumbs/fit-phu-quoc-2026.jpg',
    label: 'Sales kit FIT - Phu Quoc 2026',
  },
  fitSouth: {
    pdf: '/sales-kits/fit-southern-vietnam-2026.pdf',
    cover: '/assets/covers/fit-southern-vietnam-2026.png',
    thumb: '/assets/thumbs/fit-southern-vietnam-2026.jpg',
    label: 'Sales kit FIT - Southern Vietnam 2026',
  },
  gitCentral: {
    pdf: '/sales-kits/git-central-vietnam-2026.pdf',
    cover: '/assets/covers/git-central-vietnam-2026.png',
    thumb: '/assets/thumbs/git-central-vietnam-2026.jpg',
    label: 'Sales kit GIT - Central Vietnam 2026',
  },
  gitNorth: {
    pdf: '/sales-kits/git-north-vietnam-2026.pdf',
    cover: '/assets/covers/git-north-vietnam-2026.png',
    thumb: '/assets/thumbs/git-north-vietnam-2026.jpg',
    label: 'Sales kit GIT - North Vietnam 2026',
  },
  gitPhuQuoc: {
    pdf: '/sales-kits/git-phu-quoc-vietnam-2026.pdf',
    cover: '/assets/covers/git-phu-quoc-vietnam-2026.png',
    thumb: '/assets/thumbs/git-phu-quoc-vietnam-2026.jpg',
    label: 'Sales kit GIT - Phu Quoc Vietnam 2026',
  },
  gitSouth: {
    pdf: '/sales-kits/git-southern-vietnam-2026.pdf',
    cover: '/assets/covers/git-southern-vietnam-2026.png',
    thumb: '/assets/thumbs/git-southern-vietnam-2026.jpg',
    label: 'Sales kit GIT - Southern Vietnam 2026',
  },
};

const sharedTerms = {
  inclusions: [
    'Hotels in twin/triple rooms for all listed nights',
    'Breakfast at hotel and listed main meals or buffets',
    'Quality air-conditioned vehicle by group size',
    'Local guide in Thai or English on request',
    'Entrance tickets for attractions listed in the program',
  ],
  exclusions: [
    'Guide and driver tip per program',
    'Personal expenses and optional shows/meals',
    'Any service not clearly listed in the program',
  ],
  policies: [
    '30% deposit after group confirmation',
    'Balance payment 7-14 days before departure depending on sales kit',
    'No charge before 21 days from check-in',
    '20 to 7 days before departure: 50% tour charge',
    'From 6 days before departure: 90% tour charge',
  ],
};

const makeTour = (tour) => {
  const rowMinimums = tour.priceRows.flatMap((row) => row.cells.map((cell) => cell.value));
  return {
    ...tour,
    priceFrom: Math.min(...rowMinimums),
    inclusions: tour.inclusions || sharedTerms.inclusions,
    exclusions: tour.exclusions || sharedTerms.exclusions,
    policies: tour.policies || sharedTerms.policies,
  };
};

export const regions = ['North Vietnam', 'Central Vietnam', 'Southern Vietnam', 'Phu Quoc'];
`;

    // Format tours array
    let toursBody = JSON.stringify(tours, null, 2);
    // Replace assets strings with variables reference
    toursBody = toursBody.replace(/"assets":\s*"kitAssets\.([a-zA-Z]+)"/g, '"assets": kitAssets.$1');

    // Wrap tours array in makeTour and export
    const finalCode = `${headerCode}\nexport const config = {
  spreadsheetId: ${JSON.stringify(SPREADSHEET_ID)},
  googleAppsScriptUrl: ${JSON.stringify(GOOGLE_APPS_SCRIPT_URL)}
};\n\nexport const tours = [\n${tours.map((t, idx) => {
      // Extract exact tour string block from JSON array
      const tourJson = JSON.stringify(t, null, 2);
      const replacedTour = tourJson.replace(/"assets":\s*"kitAssets\.([a-zA-Z]+)"/g, '"assets": kitAssets.$1');
      return `  makeTour(${replacedTour})`;
    }).join(',\n')}\n];\n`;

    fs.writeFileSync(path.resolve('src/data/tours.js'), finalCode, 'utf-8');
    console.log('Successfully compiled src/data/tours.js from CSV data!');
  } catch (err) {
    console.error('Error compiling tours.js:', err);
    process.exit(1);
  }
}

main();
