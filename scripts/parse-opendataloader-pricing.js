import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..').replace(/%20/g, ' ');
const DEFAULT_INPUT = path.join(PROJECT_ROOT, 'tmp', 'opendataloader');
const DEFAULT_OUTPUT_JSON = path.join(DEFAULT_INPUT, 'pricing-normalized.json');
const DEFAULT_OUTPUT_CSV = path.join(DEFAULT_INPUT, 'pricing-normalized.csv');
const DEFAULT_OUTPUT_AUDIT = path.join(DEFAULT_INPUT, 'pricing-audit.md');

const COLUMN_PROFILES = {
  git: ['8-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-42', 'single'],
  fitSmall: ['2-3', '4-5', '6-7', '8-9', '10-11', '12-14', 'single'],
  fitMedium: ['4-5', '6-7', '8-9', '10-11', '12-14', 'single'],
};
const args = parseArgs(process.argv.slice(2));
const inputDir = path.resolve(args.input || DEFAULT_INPUT);
const outputJson = path.resolve(args.outputJson || DEFAULT_OUTPUT_JSON);
const outputCsv = path.resolve(args.outputCsv || DEFAULT_OUTPUT_CSV);
const outputAudit = path.resolve(args.outputAudit || DEFAULT_OUTPUT_AUDIT);

main();

function main() {
  const jsonFiles = listJsonFiles(inputDir).filter((file) => !file.endsWith('summary.json') && !file.endsWith('pricing-normalized.json'));
  const tables = [];
  const warnings = [];

  for (const file of jsonFiles) {
    const doc = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const elements = flattenElements(doc).filter((el) => el.content && el.bbox && el.page);
    const pageMap = groupBy(elements, (el) => el.page);

    for (const [page, pageElements] of pageMap.entries()) {
      const pageTables = extractPricingTables(file, Number(page), pageElements, warnings);
      tables.push(...pageTables);
    }
  }

  fs.writeFileSync(outputJson, JSON.stringify({ generatedAt: new Date().toISOString(), tables, warnings }, null, 2), 'utf-8');
  fs.writeFileSync(outputCsv, toCsv(tables), 'utf-8');
  fs.writeFileSync(outputAudit, toAudit(tables, warnings), 'utf-8');

  console.log(`Pricing tables: ${tables.length}`);
  console.log(`JSON:  ${toDisplayPath(outputJson)}`);
  console.log(`CSV:   ${toDisplayPath(outputCsv)}`);
  console.log(`Audit: ${toDisplayPath(outputAudit)}`);

  const failed = tables.filter((table) => table.validation.status !== 'PASS').length;
  if (failed) {
    console.warn(`Validation warnings/fails: ${failed}`);
  }
}

function extractPricingTables(sourceFile, page, elements, warnings) {
  const rows = groupRows(elements);
  const tables = [];

  for (let i = 0; i < rows.length; i++) {
    const rowText = rowTextOf(rows[i]);
    const headerMatch = rowText.match(/\b([A-Z]{0,4}DAD\d{2}|DAD\d{2}|[A-Z]{3,}\d{2})\b.*?ราค/i);
    if (!headerMatch) continue;

    const tourCode = normalizeTourCode(headerMatch[1]);
    const seasonMatch = rowText.match(/(\d{2}\/\d{2}-\d{2}\/\d{2}\/\d{4})/);
    const season = seasonMatch ? seasonMatch[1] : null;

    const blockRows = [];
    for (let j = i; j < Math.min(rows.length, i + 12); j++) {
      const text = rowTextOf(rows[j]);
      if (j > i && /อัตรานี้รวม|ราคาส\s*า?หรับเด็ก|เงือนไข|นโยบาย/i.test(text)) break;
      blockRows.push(rows[j]);
    }

    const paxRow = blockRows.find((row) => /จ\s*ำ?นวน|ลูกค|8\s*[–-]\s*9/.test(rowTextOf(row)));
    const paxIndex = blockRows.findIndex((row) => row === paxRow);
    const hotelRow = blockRows.find((row) => /Hotel\s*4\*?\s*standard/i.test(rowTextOf(row)))
      || (paxIndex >= 0 ? blockRows[paxIndex + 1] : null);
    const surchargeRows = findSurchargeRows(blockRows);
    const vehicleRow = blockRows.find((row) => /Vehicle type/i.test(rowTextOf(row)));
    const noteRow = blockRows.find((row) => /หัวหน|ฟรี|ไม่ฟรี|หมำยเหตุ|หมายเหตุ/i.test(rowTextOf(row)));

    if (!paxRow || !hotelRow) {
      warnings.push({ sourceFile, page, tourCode, warning: 'Missing pax row or hotel row' });
      continue;
    }

    const columns = detectColumns(paxRow);
    const columnCenters = deriveColumnCenters(paxRow, columns);
    const priceSeasonRows = findPriceSeasonRows(blockRows, paxRow, vehicleRow, noteRow);
    const priceSeasons = priceSeasonRows.map((row) => parsePriceSeasonRow(row, columnCenters, columns));
    const basePrices = priceSeasons[0]?.values || mapDenseRow(hotelRow, columnCenters, columns, { ignoreLabel: /Hotel|\d{2}\/\d{2}-\d{2}\/\d{2}/i });
    const holidaySurcharges = surchargeRows.map((rows) => parseSparseSurchargeRows(rows, columnCenters, columns));
    const vehicleType = vehicleRow ? parseVehicleRow(vehicleRow, columnCenters, columns) : emptyColumns(columns);
    const notes = parseNotes(blockRows, noteRow, columnCenters, columns);

    const validation = validateTable({ tourCode, columns, basePrices, vehicleType, columnCenters });

    tables.push({
      sourceFile: toDisplayPath(sourceFile),
      page,
      tourCode,
      season,
      columns,
      basePrices,
      priceSeasons,
      holidaySurcharges,
      vehicleType,
      notes,
      debug: {
        header: rowText,
        paxRow: rowTextOf(paxRow),
        hotelRow: rowTextOf(hotelRow),
        priceSeasonRows: priceSeasonRows.map(rowTextOf),
        surchargeRows: surchargeRows.map((rows) => rows.map(rowTextOf)),
        vehicleRow: vehicleRow ? rowTextOf(vehicleRow) : null,
        columnCenters,
      },
      validation,
    });
  }

  return tables;
}

function flattenElements(node, out = []) {
  if (Array.isArray(node)) {
    for (const item of node) flattenElements(item, out);
    return out;
  }
  if (!node || typeof node !== 'object') return out;

  const bbox = node['bounding box'];
  const content = typeof node.content === 'string' ? cleanText(node.content) : '';
  const page = node['page number'];
  if (bbox && content && page) {
    out.push({
      content,
      bbox,
      page,
      x: (bbox[0] + bbox[2]) / 2,
      y: (bbox[1] + bbox[3]) / 2,
      left: bbox[0],
      right: bbox[2],
      bottom: bbox[1],
      top: bbox[3],
      type: node.type || '',
    });
  }

  for (const value of Object.values(node)) flattenElements(value, out);
  return out;
}

function groupRows(elements) {
  const sorted = [...elements].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows = [];
  const tolerance = 5;

  for (const el of sorted) {
    let row = rows.find((candidate) => Math.abs(candidate.y - el.y) <= tolerance);
    if (!row) {
      row = { y: el.y, items: [] };
      rows.push(row);
    }
    row.items.push(el);
    row.y = (row.y * (row.items.length - 1) + el.y) / row.items.length;
  }

  for (const row of rows) row.items.sort((a, b) => a.x - b.x);
  return rows.sort((a, b) => b.y - a.y);
}

function detectColumns(row) {
  const columns = [];
  for (const item of row.items) {
    const text = normalizeColumnLabel(item.content);
    if (/^\d+-\d+$/.test(text)) columns.push(text);
    else if (/นอน/.test(item.content)) columns.push('single');
  }
  if (columns.length >= 3 && columns.includes('single')) return columns;

  const text = rowTextOf(row);
  if (/2\s*[–-]\s*3/.test(text)) return COLUMN_PROFILES.fitSmall;
  if (/4\s*[–-]\s*5/.test(text) && !/2\s*[–-]\s*3/.test(text)) return COLUMN_PROFILES.fitMedium;
  return COLUMN_PROFILES.git;
}

function normalizeColumnLabel(value) {
  return String(value).replace(/\s*[–-]\s*/g, '-').trim();
}

function deriveColumnCenters(row, columns) {
  const centers = {};
  const patterns = columns.map((column) => [
    column,
    column === 'single' ? /นอน/ : new RegExp(column.replace('-', '\\s*[–-]\\s*')),
  ]);

  for (const [column, pattern] of patterns) {
    const item = row.items.find((el) => pattern.test(el.content));
    if (item) centers[column] = round(item.x);
  }

  return centers;
}

function findPriceSeasonRows(blockRows, paxRow, vehicleRow, noteRow) {
  const startY = paxRow.y;
  const stopY = Math.max(vehicleRow?.y ?? -Infinity, noteRow?.y ?? -Infinity);
  return blockRows.filter((row) => {
    if (row.y >= startY - 2) return false;
    if (stopY !== -Infinity && row.y <= stopY + 2) return false;
    const text = rowTextOf(row);
    if (!/\d{2}\/\d{2}|\d{2}-\d{2}\/\d{2}/.test(text)) return false;
    return row.items.filter((item) => /^\d{2,4}$/.test(normalizeValue(item.content))).length >= 2;
  });
}

function parsePriceSeasonRow(row, centers, columns) {
  const values = mapDenseRow(row, centers, columns, { ignoreLabel: /\d{2}\/\d{2}|\d{2}-\d{2}\/\d{2}/i });
  const seasonText = row.items
    .filter((item) => /\d{2}\/\d{2}|\d{2}-\d{2}\/\d{2}/.test(item.content))
    .map((item) => item.content)
    .join(' ');
  return { season: normalizeValue(seasonText), values, raw: rowTextOf(row) };
}

function mapDenseRow(row, centers, columns, options = {}) {
  const result = emptyColumns(columns);
  const items = row.items.filter((item) => !options.ignoreLabel?.test(item.content));
  for (const item of items) {
    const column = nearestColumn(item.x, centers, columns)
    if (!column) continue;
    const value = normalizeValue(item.content);
    if (value) result[column] = value;
  }
  return result;
}

function findSurchargeRows(blockRows) {
  const groups = [];
  for (let i = 0; i < blockRows.length; i++) {
    const text = rowTextOf(blockRows[i]);
    if (!/\d{2}\/\d{2}|\d{2}-\d{2}\/\d{2}/.test(text)) continue;
    if (/ราค|Hotel|จ\s*ำ?นวน|Vehicle/i.test(text)) continue;
    if (/01\/04-30\/12\/2026/.test(text)) continue;
    if (blockRows[i].items.filter((item) => /^\d{2,4}$/.test(normalizeValue(item.content))).length >= 2) continue;

    const group = [blockRows[i]];
    for (const j of [i - 2, i - 1, i + 1, i + 2]) {
      if (j < 0 || j >= blockRows.length) continue;
      if (Math.abs(blockRows[j].y - blockRows[i].y) > 16) continue;
      const nearText = rowTextOf(blockRows[j]);
      if (/\+\d+\$/.test(nearText)) group.push(blockRows[j]);
    }
    group.sort((a, b) => b.y - a.y);
    if (group.some((row) => /\+\d+\$/.test(rowTextOf(row)))) groups.push(group);
  }
  return groups;
}

function parseSparseSurchargeRows(rows, centers, columns) {
  const allItems = rows.flatMap((row) => row.items);
  const values = allItems.filter((item) => /\+\d+\$/.test(item.content));
  const dateText = allItems
    .filter((item) => /\d{2}\/\d{2}|\d{2}-\d{2}\/\d{2}/.test(item.content))
    .map((item) => item.content)
    .join(' ');
  const dates = dateText.match(/\d{2}\/\d{2}-\d{2}\/\d{2}\/\d{4}|\d{2}-\d{2}\/\d{2}\/\d{4}/g) || [];
  const result = emptyColumns(columns);

  const singleValue = values.find((item) => nearestColumn(item.x, centers, columns) === 'single');
  if (singleValue) result.single = normalizeValue(singleValue.content);

  const paxValues = values.filter((item) => nearestColumn(item.x, centers, columns) !== 'single').sort((a, b) => a.x - b.x);
  const paxCols = columns.filter((col) => col !== 'single' && centers[col]);

  if (paxValues.length === 1) {
    for (const col of paxCols) result[col] = normalizeValue(paxValues[0].content);
  } else if (paxValues.length >= 2) {
    const firstCol = nearestColumn(paxValues[0].x, centers);
    let firstIndex = Math.max(0, columns.indexOf(firstCol));
    if (centers['8-9'] && centers['10-14'] && paxValues[0].x > centers['8-9'] && paxValues[0].x < centers['10-14']) {
      firstIndex = columns.indexOf('10-14');
    }
    const firstSpanCol = columns[firstIndex];
    const nextCol = columns[firstIndex + 1] || columns[firstIndex];
    const boundary = (centers[firstSpanCol] + centers[nextCol]) / 2;
    for (const col of paxCols) {
      result[col] = centers[col] < boundary ? normalizeValue(paxValues[0].content) : normalizeValue(paxValues[1].content);
    }
  }

  return { dates, values: result, raw: rows.map(rowTextOf).join(' | ') };
}

function parseVehicleRow(row, centers, columns) {
  const result = emptyColumns(columns);
  const items = row.items.filter((item) => /seats|bus|coach|mini/i.test(item.content));

  for (const item of items) {
    const text = normalizeValue(item.content);
    if (/16\s*seats/i.test(text)) {
      assign(result, columns.filter((col) => ['2-3', '4-5', '6-7'].includes(col)), text);
    } else if (/29\s*seats/i.test(text)) {
      if (columns.includes('10-11')) assign(result, columns.filter((col) => ['8-9', '10-11', '12-14'].includes(col)), text);
      else assign(result, columns.slice(0, 2), text);
    } else if (/35\s*seats/i.test(text)) {
      assign(result, ['15-19'], text);
    } else if (/45\s*seats/i.test(text)) {
      assign(result, ['20-24', '25-29', '30-34', '35-42'], text);
    } else {
      const col = nearestColumn(item.x, centers, columns);
      if (col) result[col] = text;
    }
  }

  return result;
}

function parseNotes(blockRows, noteRow, centers, columns) {
  if (!noteRow) return { raw: '', byColumn: emptyColumns(columns) };

  const noteRows = blockRows.filter((row) => row.y <= noteRow.y + 2 && row.y >= noteRow.y - 35);
  const noteItems = [];

  for (const row of noteRows) {
    for (const item of row.items) {
      const text = normalizeValue(item.content);
      if (!text || /หมำยเหตุ|หมายเหตุ/.test(text)) continue;
      if (/^[\u0E48-\u0E4C\s]+$/.test(text)) continue;
      noteItems.push({ ...item, text });
    }
  }

  const byColumn = emptyColumns(columns);
  const parts = noteItems.map((item) => item.text);

  if (noteItems.length === 1) {
    for (const col of columns.filter((col) => col !== 'single')) byColumn[col] = noteItems[0].text;
    return { raw: parts.join(' '), byColumn };
  }

  if (isGitColumns(columns) && noteItems.length >= 2) {
    const paxColumns = columns.filter((col) => col !== 'single');
    assign(byColumn, paxColumns.slice(0, 2), noteItems[0].text);
    assign(byColumn, paxColumns.slice(2), noteItems[noteItems.length - 1].text);
    return { raw: parts.join(' '), byColumn };
  }

  if (isFitColumns(columns) && noteItems.length >= 2) {
    const smallGroup = columns.filter((col) => ['2-3', '4-5', '6-7'].includes(col));
    const largeGroup = columns.filter((col) => ['8-9', '10-11', '12-14'].includes(col));
    assign(byColumn, smallGroup.length ? smallGroup : columns.slice(0, 2), noteItems[0].text);
    assign(byColumn, largeGroup.length ? largeGroup : columns.slice(2).filter((col) => col !== 'single'), noteItems[noteItems.length - 1].text);
    return { raw: parts.join(' '), byColumn };
  }

  for (const item of noteItems) {
    const col = nearestColumn(item.x, centers, columns);
    if (col) byColumn[col] = [byColumn[col], item.text].filter(Boolean).join(' ');
  }

  return { raw: parts.join(' '), byColumn };
}

function isGitColumns(columns) {
  return columns.includes('15-19') && columns.includes('35-42');
}

function isFitColumns(columns) {
  return columns.includes('10-11') && columns.includes('12-14');
}

function validateTable(table) {
  const issues = [];
  if (!table.tourCode) issues.push('missing_tour_code');
  const priceCount = table.columns.filter((col) => table.basePrices[col]).length;
  if (priceCount < 6) issues.push(`too_few_price_columns:${priceCount}`);
  if (!table.basePrices.single) issues.push('missing_single_supplement');
  if (!table.columnCenters.single) issues.push('missing_single_column_center');
  return { status: issues.length ? 'WARN' : 'PASS', issues };
}

function nearestColumn(x, centers, columns = Object.keys(centers)) {
  let best = null;
  let bestDist = Infinity;
  for (const col of columns) {
    if (!centers[col]) continue;
    const dist = Math.abs(x - centers[col]);
    if (dist < bestDist) {
      best = col;
      bestDist = dist;
    }
  }
  return bestDist <= 45 ? best : null;
}

function rowTextOf(row) {
  return row.items.map((item) => item.content).join(' ').replace(/\s+/g, ' ').trim();
}

function emptyColumns(columns) {
  return Object.fromEntries(columns.map((col) => [col, '']));
}

function assign(obj, cols, value) {
  for (const col of cols) obj[col] = value;
}

function normalizeTourCode(code) {
  return code.trim();
}

function normalizeValue(value) {
  return cleanText(value).replace(/\s+/g, ' ').trim();
}

function cleanText(value) {
  return String(value).replace(/<br\s*\/?>(\s*)/gi, ' ').replace(/\uFFFD/g, '').trim();
}

function listJsonFiles(dir) {
  const out = [];
  walk(dir, (file) => {
    if (file.toLowerCase().endsWith('.json')) out.push(file);
  });
  return out.sort((a, b) => a.localeCompare(b));
}

function walk(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, onFile);
    else if (entry.isFile()) onFile(full);
  }
}

function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

function toCsv(tables) {
  const allColumns = Array.from(new Set(tables.flatMap((table) => table.columns)));
  const headers = ['sourceFile', 'page', 'tourCode', 'season', 'rowType', ...allColumns, 'raw'];
  const rows = [headers];
  for (const table of tables) {
    rows.push([table.sourceFile, table.page, table.tourCode, table.season || '', 'basePrices', ...allColumns.map((c) => table.basePrices[c] || ''), '']);
    for (const surcharge of table.holidaySurcharges) {
      rows.push([table.sourceFile, table.page, table.tourCode, surcharge.dates.join('; '), 'holidaySurcharge', ...allColumns.map((c) => surcharge.values[c] || ''), surcharge.raw || '']);
    }
    rows.push([table.sourceFile, table.page, table.tourCode, table.season || '', 'vehicleType', ...allColumns.map((c) => table.vehicleType[c] || ''), '']);
  }
  return rows.map((row) => row.map(csvCell).join(',')).join('\n') + '\n';
}

function toAudit(tables, warnings) {
  const lines = ['# Pricing Normalize Audit', '', `Generated: ${new Date().toISOString()}`, '', `Tables: ${tables.length}`, `Warnings: ${warnings.length}`, ''];
  for (const table of tables) {
    lines.push(`## ${table.tourCode} — page ${table.page}`);
    lines.push('');
    lines.push(`Source: ${table.sourceFile}`);
    lines.push(`Validation: ${table.validation.status}${table.validation.issues.length ? ` (${table.validation.issues.join(', ')})` : ''}`);
    lines.push('');
    lines.push(`| Row | ${table.columns.join(' | ')} |`);
    lines.push(`|---|${table.columns.map(() => '---:').join('|')}|`);
    lines.push(`| Base | ${table.columns.map((c) => table.basePrices[c] || '').join(' | ')} |`);
    for (const surcharge of table.holidaySurcharges) {
      lines.push(`| Surcharge ${surcharge.dates.join(' ')} | ${table.columns.map((c) => surcharge.values[c] || '').join(' | ')} |`);
    }
    lines.push(`| Vehicle | ${table.columns.map((c) => table.vehicleType[c] || '').join(' | ')} |`);
    if (table.notes?.raw) lines.push(`| Note | ${table.columns.map((c) => table.notes.byColumn?.[c] || '').join(' | ')} |`);
    lines.push('');
  }
  return lines.join('\n') + '\n';
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = argv[i + 1];
    i++;
  }
  return out;
}

function round(n) {
  return Math.round(n * 100) / 100;
}

function toDisplayPath(filePath) {
  return filePath.replace(/^\/mnt\/([a-z])\//, (_, drive) => `${drive.toUpperCase()}:\\`).replace(/\//g, '\\');
}
