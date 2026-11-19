import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { Camera } from 'lucide-react';

export default function DestinationAccordion({ isVi, isTh, activeGalleryIdx: propActiveIdx, setActiveGalleryIdx: propSetActiveIdx, agentConfig = {} }) {
  const [internalIdx, setInternalIdx] = useState(0);
  const activeGalleryIdx = propActiveIdx !== undefined ? propActiveIdx : internalIdx;
  const setActiveGalleryIdx = propSetActiveIdx || setInternalIdx;

  return (
    <>
      {/* 3. INTERACTIVE EXPANDING DESTINATION HIGHLIGHTS ACCORDION */}
      <section style={{ maxWidth: '1240px', margin: agentConfig.isAgent || agentConfig.hideNet ? '-2.5rem auto 3.5rem' : '0 auto 3.5rem', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00533d', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <Camera size={16} />
                {isVi ? 'Bộ Sưu Tập Hình Ảnh Điểm Đến Thực Tế' : isTh ? 'แกลเลอรีภาพบรรยากาศจริง' : 'Real Tour Highlights Gallery'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0.25rem 0 0', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                {isVi ? 'Khám Phá 7 Trải Nghiệm Độc Quyền Trong Hành Trình' : isTh ? 'สำรวจ 7 ไฮไลท์สุดเอ็กซ์คลูซีฟในโปรแกรม' : 'Explore 7 Signature Highlights'}
              </h2>
            </div>
          </div>

          {/* Expanding Image Accordion Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '0.75rem',
            height: '460px',
            overflowX: 'auto',
            paddingBottom: '0.25rem'
          }}>
            {GALLERY_ITEMS.map((item, idx) => {
              const isActive = idx === activeGalleryIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveGalleryIdx(idx)}
                  onMouseEnter={() => setActiveGalleryIdx(idx)}
                  style={{
                    position: 'relative',
                    height: '100%',
                    flex: isActive ? '3.5 1 0%' : '1 1 0%',
                    minWidth: isActive ? '300px' : '58px',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    boxShadow: isActive ? '0 12px 30px -5px rgba(0, 83, 61, 0.25)' : '0 4px 10px rgba(0,0,0,0.04)',
                    border: isActive ? '2px solid #059669' : '1px solid #e2e8f0'
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={item.image || item.img}
                    alt={isVi ? item.titleVi : isTh ? item.titleTh : item.titleEn}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.6s ease'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive
                      ? 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 70%)',
                    transition: 'background 0.5s ease'
                  }} />

                  {/* Step Number Tag (Always visible on top) */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 3,
                    background: isActive ? '#059669' : 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <span>0{idx + 1}</span>
                  </div>

                  {/* Content Overlay (Only visible when active) */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      <h4 style={{
                        margin: '0 0 0.4rem',
                        color: '#ffffff',
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        lineHeight: 1.2,
                        fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
                        textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                      }}>
                        {isVi ? item.titleVi : isTh ? item.titleTh : item.titleEn}
                      </h4>
                      <p style={{
                        margin: 0,
                        color: '#f1f5f9',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                      }}>
                        {isVi ? item.descVi : isTh ? item.descTh : item.descEn}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
