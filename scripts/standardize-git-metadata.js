import fs from 'fs';

const backupPath = './scripts/backup-tours.json';
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

const gitTourIds = [
  'dad01', 'dad02', 'dad03', 'dad04', 'dad05',
  'han01', 'han02', 'han03',
  'pqc01', 'pqc02',
  'cxr01', 'cxr02',
  'sgn01', 'sgn02'
];

let updatedCount = 0;

for (const tour of backup) {
  if (gitTourIds.includes(tour.id)) {
    // 1. Standardize remarks spans
    tour.remarksLeftSpan = 2;
    tour.remarksMiddleSpan = 0;
    tour.remarksRightSpan = 6;

    // 2. Standardize vehicleRows to the high-fidelity cells schema
    const legacyVehicleRow = tour.vehicleRows?.[0];
    if (legacyVehicleRow && !legacyVehicleRow.cells) {
      const label = legacyVehicleRow.label || "Vehicle type";
      const leftText = legacyVehicleRow.left || "29 seats (mini bus)";
      
      // Determine what the 35-seat text is
      let midText = "35 seats";
      if (tour.id.startsWith('cxr') || tour.id === 'dad05') {
        midText = "35 seats (coach)";
      }

      tour.vehicleRows = [
        {
          label: label,
          cells: [
            { text: leftText, colSpan: 2 },
            { text: midText, colSpan: 1 },
            { text: "45 seats (bus)", colSpan: 5 }
          ]
        }
      ];
      console.log(`Standardized vehicleRows for ${tour.code}`);
    } else {
      console.log(`Skipped vehicleRows standardization for ${tour.code} (already high-fidelity or missing)`);
    }

    updatedCount++;
  }
}

fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2), 'utf8');
console.log(`Successfully standardized ${updatedCount} GIT tours in backup-tours.json`);
