import React, { useState } from 'react';
import { FLIGHT_SCHEDULES } from '../constants';
import { Plane, ShieldCheck } from 'lucide-react';

export default function FlightScheduleSection({ isVi, isTh }) {
  const [activeOrigin, setActiveOrigin] = useState('BKK');
  const schedules = FLIGHT_SCHEDULES[activeOrigin] || FLIGHT_SCHEDULES.BKK;

  return (
    <section id="flight-schedule-matching" style={{ maxWidth: '1240px', margin: '0 auto 4.5rem', padding: '0 2rem' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '1.75rem',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
            fontSize: '1.95rem',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 0.5rem'
          }}>
            {isVi ? 'Lịch Bay Thái Lan ↔ Đà Nẵng & Điều Phối Xe Đoàn Lớn' : isTh ? 'ตารางเที่ยวบินไทย ↔ ดานัง & การจัดรถบัสกรุ๊ปเหมา' : 'Thailand ↔ Da Nang Flights & Group Coach Logistics'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            {isVi 
              ? 'Xe 29–45 chỗ đón tiễn đoàn riêng biệt 24/7 theo giờ bay thực tế. Đảm bảo hỗ trợ thủ tục hải quan và hành lý đoàn đông chu đáo.'
              : isTh
                ? 'รถบัสส่วนตัวรับส่งคณะ 24 ชม. ตามเวลาบินจริง พร้อมไกด์และทีมงานช่วยดูแลสัมภาระกรุ๊ปใหญ่อย่างมืออาชีพ'
                : 'Dedicated group coaches 24/7 matching flight times with seamless group luggage coordination.'}
          </p>
        </div>

        {/* Airport Origin Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { key: 'BKK', label: isVi ? 'Bangkok (BKK - Suvarnabhumi)' : isTh ? 'กรุงเทพฯ (BKK สุวรรณภูมิ)' : 'Bangkok (BKK)' },
            { key: 'DMK', label: isVi ? 'Bangkok (DMK - Don Mueang)' : isTh ? 'กรุงเทพฯ (DMK ดอนเมือง)' : 'Bangkok (DMK)' },
            { key: 'CNX', label: isVi ? 'Chiang Mai (CNX)' : isTh ? 'เชียงใหม่ (CNX)' : 'Chiang Mai (CNX)' }
          ].map(tab => {
            const isActive = activeOrigin === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveOrigin(tab.key)}
                type="button"
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  border: isActive ? '2px solid #00533d' : '1px solid #e2e8f0',
                  background: isActive ? '#00533d' : '#f8fafc',
                  color: isActive ? '#ffffff' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Flights Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {schedules.map((flight, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                borderRadius: '1.25rem',
                padding: '1.5rem',
                border: flight.status === 'recommended' ? '1.5px solid #a7f3d0' : '1px solid #e2e8f0',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a' }}>{flight.airline}</div>
                  <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800 }}>{flight.code}</div>
                </div>
                {flight.status === 'recommended' && (
                  <span style={{
                    padding: '0.25rem 0.65rem', borderRadius: '9999px',
                    background: '#ecfdf5', color: '#047857',
                    fontSize: '0.7rem', fontWeight: 800, border: '1px solid #a7f3d0'
                  }}>
                    {isVi ? 'Khuyên Dùng' : isTh ? 'แนะนำ' : 'Recommended'}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', background: '#ffffff', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #edf2f7' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>{isVi ? 'Chiều Đi (BKK → DAD):' : isTh ? 'ขาไป (ไทย → ดานัง):' : 'Outbound:'}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>{flight.outbound}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>{isVi ? 'Chiều Về (DAD → BKK):' : isTh ? 'ขากลับ (ดานัง → ไทย):' : 'Inbound:'}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>{flight.inbound}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} style={{ color: '#059669', flexShrink: 0 }} />
                <span>{isVi ? flight.banaMatch : isTh ? flight.banaMatchTh : flight.banaMatchEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
