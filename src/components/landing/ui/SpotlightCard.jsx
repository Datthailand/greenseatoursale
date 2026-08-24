import React, { useRef, useState } from 'react';

// ReactBits: SpotlightCard with dynamic radial mouse tracker & configurable glow aura
export function SpotlightCard({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(16, 185, 129, 0.12)',
  spotlightRadius = 450,
  onClick,
  id,
  ...props
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        ...style
      }}
      className={className}
      {...props}
    >
      {/* Dynamic Radial Cursor Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}

export default SpotlightCard;
