import React from 'react';

export default function SmallInfoCard({ title, rows }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="small-info-card">
      <h3>{title}</h3>
      {rows.map(([label, value]) => (
        <div className="info-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
