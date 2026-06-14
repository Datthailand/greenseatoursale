import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INPUT = path.join(PROJECT_ROOT, 'tmp', 'opendataloader', 'pricing-normalized.json');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'data', 'saleskit-standard-json');
const OUTPUT_ALL = path.join(OUTPUT_DIR, 'saleskit-pricing-standard.json');
const OUTPUT_AUDIT = path.join(OUTPUT_DIR, 'saleskit-pricing-standard-audit.md');

main();

function main() {
  const normalized = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));
  const records = normalized.tables.map(toStandardRecord);
  const audit = auditRecords(records);

  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  fs.writeFileSync(OUTPUT_ALL, JSON.stringify({
    generatedAt: new Date().toISOString(),
    source: 'OpenDataLoader PDF JSON bounding boxes -> normalized saleskit pricing schema',
    imageParsing: false,
    count: records.length,
    records,
    audit,
  }, null, 2), 'utf-8');

  for (const record of records) {
    const dir = path.join(OUTPUT_DIR, record.productType);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${safeName(record.tourCode)}.json`), JSON.stringify(record, null, 2), 'utf-8');
  }

  fs.writeFileSync(OUTPUT_AUDIT, auditMarkdown(records, audit), 'utf-8');

  console.log(`Records: ${records.length}`);
  console.log(`Output:  ${toDisplayPath(OUTPUT_ALL)}`);
  console.log(`Audit:   ${toDisplayPath(OUTPUT_AUDIT)}`);
  console.log(`Issues:  ${audit.issues.length}`);
  if (audit.issues.length) process.exit(1);
}

function toStandardRecord(table) {
  const productType = table.tourCode.startsWith('FIT') ? 'FIT' : 'GIT';
  const region = inferRegion(table.tourCode, table.sourceFile);
  const customerGroups = table.columns.filter((col) => col !== 'single');

  return {
    tourCode: table.tourCode,
    productType,
    region,
    sourceFile: table.sourceFile,
    sourcePage: table.page,
    season: table.season,
    customerGroups,
    singleColumn: table.columns.includes('single'),
    basePrices: pickColumns(table.basePrices, table.columns),
    priceSeasons: (table.priceSeasons || []).map((item) => ({
      season: item.season,
      values: pickColumns(item.values, table.columns),
      raw: item.raw,
    })),
    holidaySurcharges: table.holidaySurcharges.map((item) => ({
      dates: item.dates,
      values: pickColumns(item.values, table.columns),
      raw: item.raw,
    })),
    vehicleType: pickColumns(table.vehicleType, table.columns),
    tourLeaderPolicy: table.notes?.raw ? {
      raw: table.notes.raw,
      byCustomerGroup: pickColumns(table.notes.byColumn || {}, table.columns),
    } : null,
    validation: table.validation,
  };
}

function pickColumns(obj, columns) {
  return Object.fromEntries(columns.map((column) => [column, obj?.[column] || '']));
}

function auditRecords(records) {
  const issues = [];
  const seen = new Set();

  for (const record of records) {
    if (seen.has(record.tourCode)) issues.push({ tourCode: record.tourCode, issue: 'duplicate_tour_code' });
    seen.add(record.tourCode);

    const priceColumns = [...record.customerGroups, 'single'];
    for (const column of priceColumns) {
      if (!record.basePrices[column]) issues.push({ tourCode: record.tourCode, issue: `missing_base_price:${column}` });
    }

    if (record.productType === 'GIT' && !record.tourLeaderPolicy) {
      issues.push({ tourCode: record.tourCode, issue: 'missing_git_tour_leader_policy' });
    }

    if (record.tourLeaderPolicy) {
      for (const column of record.customerGroups) {
        if (!record.tourLeaderPolicy.byCustomerGroup[column]) {
          issues.push({ tourCode: record.tourCode, issue: `missing_tour_leader_policy:${column}` });
        }
      }
    }

    if (record.validation.status !== 'PASS') {
      issues.push({ tourCode: record.tourCode, issue: `validation_${record.validation.status}`, details: record.validation.issues });
    }
  }

  return {
    totalRecords: records.length,
    productCounts: countBy(records, (record) => record.productType),
    regionCounts: countBy(records, (record) => record.region),
    issues,
  };
}

function auditMarkdown(records, audit) {
  const lines = [
    '# Saleskit Pricing Standard JSON Audit',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Records: ${audit.totalRecords}`,
    `Issues: ${audit.issues.length}`,
    '',
    '## Counts',
    '',
    `Product counts: ${JSON.stringify(audit.productCounts)}`,
    `Region counts: ${JSON.stringify(audit.regionCounts)}`,
    '',
    '## Records',
    '',
    '| Tour | Type | Region | Groups | Surcharges | Policy | Validation |',
    '|---|---|---|---|---:|---|---|',
  ];

  for (const record of records) {
    lines.push(`| ${record.tourCode} | ${record.productType} | ${record.region} | ${record.customerGroups.join(', ')} | ${record.holidaySurcharges.length} | ${record.tourLeaderPolicy ? 'yes' : 'no'} | ${record.validation.status} |`);
  }

  if (audit.issues.length) {
    lines.push('', '## Issues', '');
    for (const issue of audit.issues) lines.push(`- ${issue.tourCode}: ${issue.issue}`);
  }

  return `${lines.join('\n')}\n`;
}

function inferRegion(tourCode, sourceFile) {
  const text = `${tourCode} ${sourceFile}`.toLowerCase();
  if (/han|north/.test(text)) return 'North Vietnam';
  if (/dad|central/.test(text)) return 'Central Vietnam';
  if (/pqc|phu/.test(text)) return 'Phu Quoc';
  if (/cxr|sgn|southern/.test(text)) return 'Southern Vietnam';
  return 'Unknown';
}

function countBy(items, keyFn) {
  return Object.fromEntries([...items.reduce((map, item) => {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map()).entries()].sort());
}

function safeName(value) {
  return String(value).replace(/[^A-Za-z0-9._-]+/g, '_');
}

function toDisplayPath(filePath) {
  return filePath.replace(/^\/mnt\/([a-z])\//, (_, drive) => `${drive.toUpperCase()}:\\`).replace(/\//g, '\\');
}
