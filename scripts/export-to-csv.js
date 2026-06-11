import fs from 'fs';
import path from 'path';
import { tours } from '../src/data/tours.js';

const CSV_DIR = path.resolve('tmp/csv_export');
if (!fs.existsSync(CSV_DIR)) {
  fs.mkdirSync(CSV_DIR, { recursive: true });
}

// Helper to escape CSV cell values
function escapeCsv(val) {
  if (val === undefined || val === null) return '';
  let str = String(val);
  // Replace carriage returns
  str = str.replace(/\r/g, '');
  // If value contains comma, double quote, or newline, escape double quotes and wrap in quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// -------------------------------------------------------------
// 1. Export TOURS sheet
// -------------------------------------------------------------
const toursHeaders = [
  'id', 'code', 'packageType', 'region', 'title', 'route', 'duration', 'nights',
  'hotel', 'groupRange', 'vehicle', 'tip', 'surcharges', 'highlights',
  'inclusionsTh', 'exclusionsTh', 'childRatesTh', 'remarksThLeft', 'remarksThRight',
  'remarksLeftSpan', 'remarksRightSpan', 'paymentTermsTh', 'cancellationPolicyTh'
];

let toursRows = [toursHeaders.join(',')];

for (const tour of tours) {
  const surcharges = (tour.surcharges || []).join('\n');
  const highlights = (tour.highlights || []).join('\n');
  const inclusionsTh = (tour.inclusionsTh || []).join('\n');
  const exclusionsTh = (tour.exclusionsTh || []).join('\n');
  const childRatesTh = (tour.childRatesTh || []).join('\n');
  
  const remarksThLeft = (tour.remarksTh?.left || []).join('\n');
  const remarksThRight = (tour.remarksTh?.right || []).join('\n');

  const paymentTermsTh = (tour.paymentTermsTh || []).map(p => p.join(' | ')).join('\n');
  const cancellationPolicyTh = (tour.cancellationPolicyTh || []).map(p => p.join(' | ')).join('\n');

  const row = [
    tour.id,
    tour.code,
    tour.packageType,
    tour.region,
    tour.title,
    tour.route,
    tour.duration,
    tour.nights,
    tour.hotel,
    tour.groupRange,
    tour.vehicle,
    tour.tip,
    surcharges,
    highlights,
    inclusionsTh,
    exclusionsTh,
    childRatesTh,
    remarksThLeft,
    remarksThRight,
    tour.remarksLeftSpan || '',
    tour.remarksRightSpan || '',
    paymentTermsTh,
    cancellationPolicyTh
  ];

  toursRows.push(row.map(escapeCsv).join(','));
}

fs.writeFileSync(path.join(CSV_DIR, 'Tours.csv'), toursRows.join('\n'), 'utf-8');
console.log('Exported Tours.csv successfully.');

// -------------------------------------------------------------
// 2. Export ITINERARIES sheet
// -------------------------------------------------------------
const itiHeaders = [
  'tour_id', 'day', 'title', 'titleTh', 'notes', 'notesTh',
  'lunch', 'lunchMenuTh', 'dinner', 'dinnerMenuTh', 'overnightTh'
];

let itiRows = [itiHeaders.join(',')];

for (const tour of tours) {
  if (!tour.itinerary) continue;
  for (const day of tour.itinerary) {
    const notes = (day.notes || []).join('\n');
    const notesTh = (day.notesTh || []).join('\n');
    const lunchMenuTh = (day.lunchMenuTh || []).join(', ');
    const dinnerMenuTh = (day.dinnerMenuTh || []).join(', ');

    const row = [
      tour.id,
      day.day,
      day.title || '',
      day.titleTh || '',
      notes,
      notesTh,
      day.lunch || '',
      lunchMenuTh,
      day.dinner || '',
      dinnerMenuTh,
      day.overnightTh || ''
    ];

    itiRows.push(row.map(escapeCsv).join(','));
  }
}

fs.writeFileSync(path.join(CSV_DIR, 'Itineraries.csv'), itiRows.join('\n'), 'utf-8');
console.log('Exported Itineraries.csv successfully.');

// -------------------------------------------------------------
// 3. Export PRICING sheet
// -------------------------------------------------------------
const pricingHeaders = ['tour_id', 'row_type', 'label', 'cells', 'single'];
let pricingRows = [pricingHeaders.join(',')];

for (const tour of tours) {
  // A. Standard price rows
  if (tour.priceRows) {
    for (const pRow of tour.priceRows) {
      const values = pRow.cells.map(c => c.value).join(', ');
      const row = [
        tour.id,
        'standard',
        pRow.season,
        values,
        pRow.single || ''
      ];
      pricingRows.push(row.map(escapeCsv).join(','));
    }
  }

  // B. Extra surcharge rows (e.g. high season)
  if (tour.priceExtraRows) {
    for (const eRow of tour.priceExtraRows) {
      let cellsFormatted = '';
      if (eRow.cells) {
        cellsFormatted = eRow.cells.map(c => {
          const text = c.text || '';
          const span = c.colSpan || 1;
          if (span > 1) {
            return `${text}[${span}]`;
          }
          if (text === '' && span === 1) {
            return '[1]'; // explicitly mark empty single span to distinguish from split
          }
          return text;
        }).join(', ');
      } else if (eRow.merged) {
        cellsFormatted = eRow.merged;
      }

      const row = [
        tour.id,
        'extra',
        eRow.label || '',
        cellsFormatted,
        eRow.single || ''
      ];
      pricingRows.push(row.map(escapeCsv).join(','));
    }
  }

  // C. Vehicle rows
  if (tour.vehicleRows) {
    for (const vRow of tour.vehicleRows) {
      let cellsFormatted = '';
      if (vRow.cells) {
        cellsFormatted = vRow.cells.map(c => {
          const text = c.text || '';
          const span = c.colSpan || 1;
          if (span > 1) {
            return `${text}[${span}]`;
          }
          return text;
        }).join(', ');
      } else {
        const parts = [];
        if (vRow.left) parts.push(vRow.left);
        if (vRow.right) parts.push(vRow.right);
        cellsFormatted = parts.join(', ');
      }

      const row = [
        tour.id,
        'vehicle',
        vRow.label || '',
        cellsFormatted,
        ''
      ];
      pricingRows.push(row.map(escapeCsv).join(','));
    }
  }
}

fs.writeFileSync(path.join(CSV_DIR, 'Pricing.csv'), pricingRows.join('\n'), 'utf-8');
console.log('Exported Pricing.csv successfully.');
