import React from 'react';
import { THAI_PARTNERS } from '../constants';
import { ThailandFlag } from '../../landing/ui/Flags';

export default function PartnersMarquee({ isVi, isTh }) {
  return (
      <section style={{ maxWidth: '1240px', margin: '0 auto 4.5rem', padding: '0 2rem' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '2.5rem 2rem',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#059669', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              <ThailandFlag width={18} height={12} />
              <span>THAI OUTBOUND TRAVEL PARTNERS</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: 0, fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
              {isVi ? 'Được Tin Chọn Bởi Các Doanh Nghiệp Lữ Hành Hàng Đầu Thái Lan' : isTh ? 'ได้รับความไว้วางใจจากบริษัทนำเที่ยวชั้นนำในประเทศไทย' : 'Trusted by Leading Outbound Travel Companies in Thailand'}
            </h3>
          </div>

          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '10px 0' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '60px', background: 'linear-gradient(to right, #ffffff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '60px', background: 'linear-gradient(to left, #ffffff, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            <div className="partners-track" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', width: 'max-content', padding: '6px 0' }}>
              {[...THAI_PARTNERS, ...THAI_PARTNERS].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1.35rem',
                    background: '#f8fafc',
                    borderRadius: '1rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    flexShrink: 0,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(16, 185, 129, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{
                      height: '48px',
                      maxWidth: '130px',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
