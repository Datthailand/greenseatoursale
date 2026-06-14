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

const backupToursPath = path.resolve('scripts/backup-tours.json');
let backupTours = [];
if (fs.existsSync(backupToursPath)) {
  try {
    backupTours = JSON.parse(fs.readFileSync(backupToursPath, 'utf-8'));
  } catch (err) {
    console.warn('Warning: Could not read backup-tours.json:', err);
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
      const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}&headers=1`;
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

// Helper to clean and heal remarksTh layout and spelling to match PDF source-of-truth
function healRemarksTh(sheetLeftStr, sheetRightStr, backupRemarksTh) {
  if (!sheetLeftStr && !sheetRightStr && backupRemarksTh) {
    return backupRemarksTh;
  }

  let left = sheetLeftStr ? sheetLeftStr.split('\n').map(s => s.trim()).filter(Boolean) : [];
  let right = sheetRightStr ? sheetRightStr.split('\n').map(s => s.trim()).filter(Boolean) : [];

  if (left.length === 0 && right.length === 0 && backupRemarksTh) {
    return backupRemarksTh;
  }

  const cleanSpelling = (str) => {
    return str
      .replace(/ไม่\s*ฟรี\s*หัว\s*หน้า\s*ทัวร์/g, 'ไม่ฟรีหัวหน้าทัวร์')
      .replace(/ไม่\s*ฟรี\s*หัวหน้า\s*ทัวร์/g, 'ไม่ฟรีหัวหน้าทัวร์')
      .replace(/ฟรี\s*หัว\s*หน้า\s*ทัวร์/g, 'ฟรีหัวหน้าทัวร์')
      .replace(/ฟรี\s*หัวหน้า\s*ทัวร์/g, 'ฟรีหัวหน้าทัวร์')
      .replace(/ท่าน\s*1\s*\(นอนเดี่ยว\)/g, '1 ท่าน (นอนเดี่ยว)')
      .replace(/1\s*ท่าน\s*\(นอนเดี่ยว\)/g, '1 ท่าน (นอนเดี่ยว)')
      .replace(/ถ้า\s*เพิ\s*่ม\s*อีก/g, 'ถ้าเพิ่มอีก')
      .replace(/ถ้า\s*เพิ\s*ม่\s*อีก/g, 'ถ้าเพิ่มอีก')
      .replace(/ถ้า\s*เพิ่ม\s*อีก/g, 'ถ้าเพิ่มอีก')
      .replace(/หัว\s*หน้า\s*ทัวร์/g, 'หัวหน้าทัวร์')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const addPlusPrefix = (str) => {
    if (/^\d+\$/.test(str)) {
      return '+' + str;
    }
    const match = str.match(/^(นอนเดี่ยว|แยกนอนเดี่ยว|นอนด้วยกัน|นอนเด่ยว)\s*(\+)?(\d+\$)$/);
    if (match) {
      const label = match[1].replace('นอนเด่ยว', 'นอนเดี่ยว');
      const value = match[3];
      return `${label} +${value}`;
    }
    return str;
  };

  left = left.map(cleanSpelling);
  right = right.map(cleanSpelling);

  const yaekIdx = left.findIndex(s => s.includes('แยกนอนเดี่ยว'));
  if (yaekIdx !== -1) {
    const yaekLine = left[yaekIdx];
    left.splice(yaekIdx, 1);
    if (!right.some(s => s.includes('แยกนอนเดี่ยว'))) {
      right.push(yaekLine);
    }
  }

  left = left.map(addPlusPrefix);
  right = right.map(addPlusPrefix);

  if (backupRemarksTh) {
    if (left.length === 0 && backupRemarksTh.left) left = backupRemarksTh.left;
    if (right.length === 0 && backupRemarksTh.right) right = backupRemarksTh.right;
  }

  return { left, right };
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
    let cleanPart = part;
    if (cleanPart.startsWith("'") && (cleanPart.substring(1).startsWith('+') || cleanPart.substring(1).startsWith('='))) {
      cleanPart = cleanPart.substring(1);
    }
    const match = cleanPart.match(/^([^\[]*)(?:\[(\d+)\])?$/);
    if (match) {
      const text = match[1].trim();
      const colSpan = match[2] ? parseInt(match[2], 10) : 1;
      return { text, colSpan };
    }
    return { text: cleanPart, colSpan: 1 };
  });
}

// Heals parsed cells using structure from backup cells
function healCells(sheetCells, backupCells) {
  if (!backupCells || backupCells.length === 0) return sheetCells;
  if (!sheetCells || sheetCells.length === 0) return backupCells;
  
  if (sheetCells.some(c => c.text === '#ERROR!')) return backupCells;
  
  const sheetTexts = sheetCells.map(c => c.text).filter(t => t && t.trim() !== '');
  if (sheetTexts.length > 0) {
    return backupCells.map((bCell, idx) => {
      const text = sheetTexts[idx] !== undefined ? sheetTexts[idx] : bCell.text;
      return {
        ...bCell,
        text: text
      };
    });
  }
  return backupCells;
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
      const backupTourForIti = backupTours.find(t => t.id === tourId);
      const tourItineraries = rawIti
        .filter(item => item.tour_id === tourId)
        .map(item => {
          const dayNum = parseInt(item.day, 10);
          const backupDay = backupTourForIti?.itinerary?.find(d => d.day === dayNum);
          
          let title = item.title || undefined;
          if (!title && backupDay) {
            title = backupDay.title;
          }
          
          let titleTh = item.titleTh || undefined;
          if (!titleTh && backupDay) {
            titleTh = backupDay.titleTh;
          }
          
          let notes = parseLineList(item.notes);
          if (notes.length === 0 && backupDay?.notes) {
            notes = backupDay.notes;
          }
          
          let notesTh = parseLineList(item.notesTh);
          if (notesTh.length === 0 && backupDay?.notesTh) {
            notesTh = backupDay.notesTh;
          }
          
          let lunch = item.lunch || undefined;
          if (!lunch && backupDay) {
            lunch = backupDay.lunch;
          }
          
          let lunchMenuTh = parseCommaList(item.lunchMenuTh);
          if (lunchMenuTh.length === 0 && backupDay?.lunchMenuTh) {
            lunchMenuTh = backupDay.lunchMenuTh;
          }
          
          let dinner = item.dinner || undefined;
          if (!dinner && backupDay) {
            dinner = backupDay.dinner;
          }
          
          let dinnerMenuTh = parseCommaList(item.dinnerMenuTh);
          if (dinnerMenuTh.length === 0 && backupDay?.dinnerMenuTh) {
            dinnerMenuTh = backupDay.dinnerMenuTh;
          }
          
          let overnightTh = item.overnightTh || undefined;
          if (!overnightTh && backupDay) {
            overnightTh = backupDay.overnightTh;
          }
          
          return {
            day: dayNum,
            title,
            titleTh,
            notes,
            notesTh,
            lunch,
            lunchMenuTh,
            dinner,
            dinnerMenuTh,
            overnightTh
          };
        })
        .sort((a, b) => a.day - b.day);

      // Filter pricing for this tour
      const tourPricing = rawPricing.filter(item => item.tour_id === tourId);
      
      const priceRows = [];
      const priceExtraRows = [];
      const vehicleRows = [];

      for (const pRow of tourPricing) {
        if (pRow.row_type === 'standard') {
          let rawValues = pRow.cells.split(',').map(v => v.trim()).filter(Boolean);
          let values = rawValues.map(v => Number(v));
          
          const backupTour = backupTours.find(t => t.id === tourId);
          const backupRow = backupTour?.priceRows?.find(r => r.season === pRow.label) || backupTour?.priceRows?.[priceRows.length];
          
          if ((values.length === 0 || values.some(v => isNaN(v))) && backupRow) {
            values = backupRow.cells.map(c => c.value);
          }
          
          const bands = getBands(tourId, rTour.packageType, values.length);
          
          let singleVal = pRow.single;
          if (singleVal === '#ERROR!' && backupRow) {
            singleVal = backupRow.single;
          }
          if (singleVal && singleVal.startsWith("'") && (singleVal.substring(1).startsWith('+') || singleVal.substring(1).startsWith('='))) {
            singleVal = singleVal.substring(1);
          }
          
          priceRows.push({
            season: pRow.label,
            cells: bands.map((band, index) => ({ band, value: values[index] })),
            single: singleVal || undefined
          });
        } else if (pRow.row_type === 'extra') {
          if (priceRows.some(r => r.season === pRow.label)) {
            continue;
          }
          const backupTour = backupTours.find(t => t.id === tourId);
          const backupRow = backupTour?.priceExtraRows?.find(r => r.label === pRow.label) || backupTour?.priceExtraRows?.[priceExtraRows.length];
          
          let cellsStr = pRow.cells || '';
          let singleVal = pRow.single || '';
          
          if (cellsStr.includes('#ERROR!') && backupRow) {
            if (backupRow.cells) {
              cellsStr = backupRow.cells.map(c => `${c.text}[${c.colSpan}]`).join(',');
            } else if (backupRow.merged) {
              cellsStr = backupRow.merged;
            }
          }
          if (singleVal === '#ERROR!' && backupRow) {
            singleVal = backupRow.single || '';
          }
          
          if (singleVal && singleVal.startsWith("'") && (singleVal.substring(1).startsWith('+') || singleVal.substring(1).startsWith('='))) {
            singleVal = singleVal.substring(1);
          }
          if (cellsStr && cellsStr.startsWith("'") && (cellsStr.substring(1).startsWith('+') || cellsStr.substring(1).startsWith('='))) {
            cellsStr = cellsStr.substring(1);
          }

          // Check if it's the legacy format (no brackets/colspans, just a merged cell string)
          if (cellsStr && !cellsStr.includes('[') && cellsStr.includes('/')) {
            if (backupRow && backupRow.cells) {
              const healedSingle = (singleVal && !singleVal.toLowerCase().includes('pax') && (!backupRow.cells || !backupRow.cells.some(c => c.text === singleVal))) ? singleVal : (backupRow.single || singleVal || undefined);
              priceExtraRows.push({
                label: backupRow?.label || pRow.label,
                cells: healCells(parseCellConfig(cellsStr), backupRow.cells),
                single: healedSingle
              });
            } else {
              priceExtraRows.push({
                label: backupRow?.label || pRow.label,
                merged: cellsStr,
                single: singleVal || undefined
              });
            }
          } else {
            let cellsObj = parseCellConfig(cellsStr);
            if (backupRow && backupRow.cells) {
              cellsObj = healCells(cellsObj, backupRow.cells);
            } else if ((cellsObj.some(c => c.text === '#ERROR!') || cellsObj.length === 0) && backupRow && backupRow.cells) {
              cellsObj = backupRow.cells;
            }
            const healedSingle = (singleVal && !singleVal.toLowerCase().includes('pax') && (!cellsObj || !cellsObj.some(c => c.text === singleVal))) ? singleVal : (backupRow?.single || singleVal || undefined);
            priceExtraRows.push({
              label: backupRow?.label || pRow.label,
              cells: cellsObj,
              single: healedSingle
            });
          }
        } else if (pRow.row_type === 'vehicle') {
          const backupTour = backupTours.find(t => t.id === tourId);
          const backupRow = backupTour?.vehicleRows?.find(r => r.label === pRow.label) || backupTour?.vehicleRows?.[vehicleRows.length];
          
          let cellsStr = pRow.cells || '';
          if (cellsStr.includes('#ERROR!') && backupRow) {
            if (backupRow.cells) {
              cellsStr = backupRow.cells.map(c => `${c.text}[${c.colSpan}]`).join(',');
            } else {
              const parts = [];
              if (backupRow.left) parts.push(backupRow.left);
              if (backupRow.right) parts.push(backupRow.right);
              cellsStr = parts.join(',');
            }
          }
          
          if (cellsStr && cellsStr.startsWith("'") && (cellsStr.substring(1).startsWith('+') || cellsStr.substring(1).startsWith('='))) {
            cellsStr = cellsStr.substring(1);
          }

          // Check if it's the legacy format
          if (cellsStr && !cellsStr.includes('[')) {
            if (backupRow && backupRow.cells) {
              vehicleRows.push({
                label: pRow.label,
                cells: healCells(parseCellConfig(cellsStr), backupRow.cells)
              });
            } else {
              const parts = cellsStr.split(',').map(s => s.trim()).filter(Boolean);
              vehicleRows.push({
                label: pRow.label,
                left: parts[0] || '',
                right: parts[1] || ''
              });
            }
          } else {
            let cellsObj = parseCellConfig(cellsStr);
            if (backupRow && backupRow.cells) {
              cellsObj = healCells(cellsObj, backupRow.cells);
            } else if ((cellsObj.some(c => c.text === '#ERROR!') || cellsObj.length === 0) && backupRow && backupRow.cells) {
              cellsObj = backupRow.cells;
            }
            vehicleRows.push({
              label: pRow.label,
              cells: cellsObj
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
      const backupTour = backupTours.find(t => t.id === rTour.id);
      
      const duration = backupTour && backupTour.duration ? backupTour.duration : parseInt(rTour.duration, 10);
      const title = backupTour && backupTour.title ? backupTour.title : rTour.title;
      const route = backupTour && backupTour.route ? backupTour.route : rTour.route;
      const nights = backupTour && backupTour.nights ? backupTour.nights : rTour.nights;
      const hotel = backupTour && backupTour.hotel ? backupTour.hotel : rTour.hotel;
      const groupRange = backupTour && backupTour.groupRange ? backupTour.groupRange : rTour.groupRange;
      const vehicle = backupTour && backupTour.vehicle ? backupTour.vehicle : rTour.vehicle;

      let highlights = parseLineList(rTour.highlights);
      if (backupTour && backupTour.highlights && (highlights.length === 0 || backupTour.id === 'fitsgn01')) {
        highlights = backupTour.highlights;
      }

      let inclusionsTh = parseLineList(rTour.inclusionsTh);
      if (backupTour && backupTour.inclusionsTh) {
        const hasSplitTip = inclusionsTh.some(line => line.includes('baht/pax/trip)'));
        if (hasSplitTip || inclusionsTh.length === 0) {
          inclusionsTh = backupTour.inclusionsTh;
        }
      }

      let exclusionsTh = parseLineList(rTour.exclusionsTh);
      if (backupTour && backupTour.exclusionsTh) {
        const isCutOff = exclusionsTh.some(line => line === 'ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับ' || line === 'ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ');
        if (isCutOff || exclusionsTh.length === 0) {
          exclusionsTh = backupTour.exclusionsTh;
        }
      }

      const tourObj = {
        id: rTour.id,
        code: rTour.code,
        packageType: rTour.packageType,
        pdfPriceLayout: backupTour ? (backupTour.pdfPriceLayout !== false) : true,
        region: rTour.region,
        title,
        route,
        duration,
        nights,
        hotel,
        groupRange,
        vehicle,
        tip: rTour.tip,
        assets: assetsKey, // will be replaced with reference in final file write
        sourcePages: rTour.sourcePages || undefined,
        surcharges: parseLineList(rTour.surcharges),
        priceRows,
        priceExtraRows,
        vehicleRows,
        highlights,
        itinerary: tourItineraries,
        inclusionsTh,
        exclusionsTh,
        childRatesTh: parseLineList(rTour.childRatesTh),
        remarksTh: healRemarksTh(
          rTour.remarksThLeft,
          rTour.remarksThRight,
          backupTour?.remarksTh
        ),
        remarksLeftSpan: (backupTour && backupTour.remarksLeftSpan !== undefined) ? backupTour.remarksLeftSpan : (rTour.remarksLeftSpan ? parseInt(rTour.remarksLeftSpan, 10) : undefined),
        remarksMiddleSpan: (backupTour && backupTour.remarksMiddleSpan !== undefined) ? backupTour.remarksMiddleSpan : (rTour.remarksMiddleSpan ? parseInt(rTour.remarksMiddleSpan, 10) : undefined),
        remarksRightSpan: (backupTour && backupTour.remarksRightSpan !== undefined) ? backupTour.remarksRightSpan : (rTour.remarksRightSpan ? parseInt(rTour.remarksRightSpan, 10) : undefined),
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
  const priceRows = tour.priceRows || [];
  const rowMinimums = priceRows.flatMap((row) => (row.cells || []).map((cell) => cell.value).filter((v) => typeof v === 'number' && !isNaN(v)));
  const minPrice = rowMinimums.length > 0 ? Math.min(...rowMinimums) : 0;
  return {
    ...tour,
    priceFrom: minPrice,
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
