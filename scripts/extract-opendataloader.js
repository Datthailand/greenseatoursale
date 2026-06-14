import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_ROOT = path.join(PROJECT_ROOT, 'data_goc');
const DEFAULT_OUTPUT_DIR = path.join(PROJECT_ROOT, 'tmp', 'opendataloader');
const DEFAULT_JAVA_ROOT = '/home/dmin/.openclaw/tools/java';
const DEFAULT_OPENDL_ROOT = '/mnt/e/Repos/opendataloader-pdf';

const args = parseArgs(process.argv.slice(2));
const outputDir = path.resolve(args.output || DEFAULT_OUTPUT_DIR);
const inputRoot = path.resolve(args.input || DATA_ROOT);
const javaRoot = args.javaRoot || process.env.JAVA_ROOT || DEFAULT_JAVA_ROOT;
const opendlRoot = args.opendlRoot || process.env.OPENDATALOADER_ROOT || DEFAULT_OPENDL_ROOT;
const format = args.format || 'markdown,json';
const clean = Boolean(args.clean);
const dryRun = Boolean(args.dryRun);
const limit = args.limit ? Number(args.limit) : 0;

main();

function main() {
  assertDir(inputRoot, 'Input directory not found');

  const javaBin = resolveJavaBin(javaRoot);
  const cliBin = resolveOpenDataLoaderCli(opendlRoot);
  const pdfFiles = listPdfFiles(inputRoot).slice(0, limit || undefined);

  if (pdfFiles.length === 0) {
    console.error(`No PDF files found under: ${inputRoot}`);
    process.exit(1);
  }

  if (clean && fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('OpenDataLoader batch extract');
  console.log(`Input:  ${toDisplayPath(inputRoot)}`);
  console.log(`Output: ${toDisplayPath(outputDir)}`);
  console.log(`PDFs:   ${pdfFiles.length}`);
  console.log(`Java:   ${javaBin}`);
  console.log(`CLI:    ${cliBin}`);
  console.log(`Format: ${format}`);

  if (dryRun) {
    for (const file of pdfFiles) console.log(`DRY ${toDisplayPath(file)}`);
    return;
  }

  const env = {
    ...process.env,
    PATH: `${path.dirname(javaBin)}:${process.env.PATH || ''}`,
  };

  const results = [];
  for (const pdfPath of pdfFiles) {
    const rel = path.relative(inputRoot, pdfPath);
    const group = path.dirname(rel).replace(/[\\/]+/g, '__');
    const fileOutputDir = path.join(outputDir, group === '.' ? '_root' : group);
    fs.mkdirSync(fileOutputDir, { recursive: true });

    console.log(`\n==> ${toDisplayPath(rel)}`);
    const startedAt = Date.now();
    const result = spawnSync(
      cliBin,
      [pdfPath, '--output-dir', fileOutputDir, '--format', format],
      { cwd: PROJECT_ROOT, env, encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 }
    );
    const ms = Date.now() - startedAt;

    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);

    const baseName = path.basename(pdfPath, path.extname(pdfPath));
    const mdPath = path.join(fileOutputDir, `${baseName}.md`);
    const jsonPath = path.join(fileOutputDir, `${baseName}.json`);
    const imageDir = path.join(fileOutputDir, `${baseName}_images`);

    const item = {
      pdf: toDisplayPath(pdfPath),
      outputDir: toDisplayPath(fileOutputDir),
      markdown: fs.existsSync(mdPath) ? toDisplayPath(mdPath) : null,
      json: fs.existsSync(jsonPath) ? toDisplayPath(jsonPath) : null,
      images: fs.existsSync(imageDir) ? countFiles(imageDir) : 0,
      ok: result.status === 0 && (fs.existsSync(mdPath) || fs.existsSync(jsonPath)),
      exitCode: result.status,
      durationMs: ms,
    };

    results.push(item);
    console.log(item.ok ? `OK ${ms}ms` : `FAIL exit=${result.status}`);
  }

  writeSummary(outputDir, results);

  const okCount = results.filter((item) => item.ok).length;
  console.log(`\nDone: ${okCount}/${results.length} OK`);
  console.log(`Summary: ${toDisplayPath(path.join(outputDir, 'summary.json'))}`);
  console.log(`Report:  ${toDisplayPath(path.join(outputDir, 'REPORT.md'))}`);

  if (okCount !== results.length) process.exit(1);
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--clean') parsed.clean = true;
    else if (arg === '--dry-run') parsed.dryRun = true;
    else if (arg.startsWith('--')) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        parsed[key] = true;
      } else {
        parsed[key] = value;
        i++;
      }
    }
  }
  return parsed;
}

function resolveJavaBin(javaRoot) {
  const candidates = [];

  if (process.env.JAVA_HOME) candidates.push(path.join(process.env.JAVA_HOME, 'bin', 'java'));
  if (javaRoot) {
    candidates.push(path.join(javaRoot, 'bin', 'java'));
    if (fs.existsSync(javaRoot)) {
      for (const child of fs.readdirSync(javaRoot)) {
        candidates.push(path.join(javaRoot, child, 'bin', 'java'));
      }
    }
  }
  candidates.push('java');

  for (const candidate of candidates) {
    const check = candidate === 'java'
      ? spawnSync('bash', ['-lc', 'command -v java'], { encoding: 'utf-8' })
      : null;

    if (candidate === 'java' && check?.status === 0) return check.stdout.trim();
    if (candidate !== 'java' && fs.existsSync(candidate)) return candidate;
  }

  throw new Error(`Java not found. Set JAVA_HOME or --java-root. Checked: ${candidates.join(', ')}`);
}

function resolveOpenDataLoaderCli(opendlRoot) {
  const candidates = [
    path.join(opendlRoot, '.venv', 'bin', 'opendataloader-pdf'),
    path.join(PROJECT_ROOT, '.venv', 'bin', 'opendataloader-pdf'),
    'opendataloader-pdf',
  ];

  for (const candidate of candidates) {
    const check = candidate === 'opendataloader-pdf'
      ? spawnSync('bash', ['-lc', 'command -v opendataloader-pdf'], { encoding: 'utf-8' })
      : null;

    if (candidate === 'opendataloader-pdf' && check?.status === 0) return check.stdout.trim();
    if (candidate !== 'opendataloader-pdf' && fs.existsSync(candidate)) return candidate;
  }

  throw new Error(`opendataloader-pdf CLI not found. Set OPENDATALOADER_ROOT or --opendl-root.`);
}

function listPdfFiles(root) {
  const result = [];
  walk(root, (filePath) => {
    if (filePath.toLowerCase().endsWith('.pdf')) result.push(filePath);
  });
  return result.sort((a, b) => a.localeCompare(b));
}

function walk(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, onFile);
    else if (entry.isFile()) onFile(fullPath);
  }
}

function countFiles(dir) {
  let count = 0;
  walk(dir, () => count++);
  return count;
}

function writeSummary(outDir, results) {
  fs.writeFileSync(
    path.join(outDir, 'summary.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2),
    'utf-8'
  );

  const lines = [
    '# OpenDataLoader Extraction Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Status | PDF | Markdown | JSON | Images | Time |',
    '|---|---|---|---|---:|---:|',
  ];

  for (const item of results) {
    lines.push([
      item.ok ? 'OK' : 'FAIL',
      escapeTable(item.pdf),
      item.markdown ? escapeTable(item.markdown) : '',
      item.json ? escapeTable(item.json) : '',
      String(item.images),
      `${Math.round(item.durationMs / 1000)}s`,
    ].join(' | ').replace(/^/, '| ').replace(/$/, ' |'));
  }

  fs.writeFileSync(path.join(outDir, 'REPORT.md'), `${lines.join('\n')}\n`, 'utf-8');
}

function assertDir(dir, message) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${message}: ${dir}`);
  }
}

function toDisplayPath(filePath) {
  return filePath.replace(/^\/mnt\/([a-z])\//, (_, drive) => `${drive.toUpperCase()}:\\`).replace(/\//g, '\\');
}

function escapeTable(value) {
  return String(value).replace(/\|/g, '\\|');
}
