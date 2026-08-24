import React from 'react';

// High-Definition Crisp Vector SVG Flags
export const VietnamFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={width} height={height} style={{ borderRadius: '3px', display: 'block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
    <rect width="900" height="600" fill="#da251d"/>
    <polygon
      points="450,150 491,277 625,277 516,356 558,483 450,404 342,483 384,356 275,277 409,277"
      fill="#ffff00"
    />
  </svg>
);

export const ThailandFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={width} height={height} style={{ borderRadius: '3px', display: 'block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
    <rect width="900" height="600" fill="#a51931"/>
    <rect y="100" width="900" height="400" fill="#f4f5f8"/>
    <rect y="200" width="900" height="200" fill="#2d2a4a"/>
  </svg>
);

export const UKFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width={width} height={height} style={{ borderRadius: '3px', display: 'block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
    <clipPath id="uk-flag-clip">
      <rect width="60" height="36" rx="3"/>
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <path d="M0 0v36h60V0z" fill="#012169"/>
      <path d="M0 0l60 36M60 0L0 36" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0l60 36M60 0L0 36" stroke="#c8102e" strokeWidth="4"/>
      <path d="M0 18h60M30 0v36" stroke="#fff" strokeWidth="10"/>
      <path d="M0 18h60M30 0v36" stroke="#c8102e" strokeWidth="6"/>
    </g>
  </svg>
);
