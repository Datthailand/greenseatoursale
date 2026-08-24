import React, { useRef, useState } from 'react';

// ReactBits: Magnet Button with elastic cursor pull
export function Magnet({ children, padding = 35, magnetStrength = 0.3, active = true, style = {} }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!active || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = Math.hypot(clientX - centerX, clientY - centerY);
    
    // When cursor is within magnetic attraction radius
    if (dist < Math.max(width, height) / 2 + padding) {
      const offsetX = (clientX - centerX) * magnetStrength;
      const offsetY = (clientY - centerY) * magnetStrength;
      setPosition({ x: offsetX, y: offsetY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 
          ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' 
          : 'transform 0.1s ease-out',
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}
