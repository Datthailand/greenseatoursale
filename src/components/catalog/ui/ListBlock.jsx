import React from 'react';

export default function ListBlock({ icon: Icon, title, items, tone }) {
  if (!items || items.length === 0) return null;
  return (
    <div className={`list-block ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Icon size={14} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
