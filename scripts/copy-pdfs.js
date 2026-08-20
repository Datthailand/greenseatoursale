import fs from 'fs';
import path from 'path';

const publicToursDir = path.resolve('public/tours');
if (!fs.existsSync(publicToursDir)) {
  fs.mkdirSync(publicToursDir, { recursive: true });
}

const sources = [
  {
    dir: path.resolve('data_goc/Sales kit_FIT/tach_tour_rieng'),
    type: 'FIT'
  },
  {
    dir: path.resolve('data_goc/Sales kit_GIT/tach_tour_rieng'),
    type: 'GIT'
  }
];

let count = 0;

sources.forEach(src => {
  if (fs.existsSync(src.dir)) {
    const files = fs.readdirSync(src.dir);
    files.forEach(file => {
      if (file.endsWith('.pdf')) {
        // e.g. "HAN01： HA NOI (1) - TAM DAO (1) - NINH BINH 3 DAYS.pdf"
        const match = file.match(/^([A-Z0-9]+)/);
        if (match) {
          const code = match[1];
          const newName = `${src.type}${code}.pdf`;
          const sourcePath = path.join(src.dir, file);
          const destPath = path.join(publicToursDir, newName);
          
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied ${file} -> ${newName}`);
          count++;
        }
      }
    });
  }
});

console.log(`Done. Copied ${count} PDFs to public/tours/`);
