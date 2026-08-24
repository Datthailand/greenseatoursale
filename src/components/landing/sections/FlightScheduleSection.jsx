import React from 'react';
import { FLIGHT_SCHEDULES } from '../constants';
import { Plane, ShieldCheck } from 'lucide-react';

export default function FlightScheduleSection({ isVi, isTh, activeFlightOrigin, setActiveFlightOrigin, currentSchedule }) {
  return (
    <>
      {/* 4.5 REAL FLIGHT SCHEDULE MATCHING & AIRPORT TRANSFERS */}
      <section id="flight-schedule-matching" style={{ maxWidth: '1240px', margin: '0 auto 4.5rem', padding: '0 2rem' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
              fontSize: '1.95rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.6rem'
            }}>
              {isVi ? 'Lịch Bay Thái Lan ↔ Đà Nẵng & Khớp Giờ Đón Tiễn' : isTh ? 'ตารางเที่ยวบินไทย ↔ ดานัง & การรับส่งสนามบิน' : 'Thailand ↔ Da Nang Flight Schedule & VIP Transfers'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
              {isVi ? 'Green Sea Tour phục vụ xe riêng VIP đón tiễn 24/7 theo giờ hạ cánh thực tế của từng đoàn. Tự động điều chỉnh thứ tự tham quan Bà Nà linh hoạt cho chuyến bay chiều/tối.' : isTh ? 'กรีนซีทัวร์ให้บริการรถตู้ VIP ส่วนตัวรับส่ง 24 ชม. ตามเวลาบินจริง ปรับสลับโปรแกรมบานาฮิลล์อย่างยืดหยุ่นสำหรับเที่ยวบินช่วงเย็น/ค่ำ' : 'Private VIP transfers 24/7 matching real flight landing times. Flexible Ba Na Hills schedule adjustments for afternoon/evening flights.'}
            </p>

            {/* Airport Origin Selector Tabs */}
            <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '0.35rem', borderRadius: '1rem', marginTop: '1.5rem', gap: '0.35rem' }}>
              {[
                { key: 'BKK', label: isVi ? 'Bangkok (BKK - Suvarnabhumi)' : isTh ? 'กรุงเทพฯ (BKK สุวรรณภูมิ)' : 'Bangkok (BKK)' },
                { key: 'DMK', label: isVi ? 'Bangkok (DMK - Don Mueang)' : isTh ? 'กรุงเทพฯ (DMK ดอนเมือง)' : 'Bangkok (DMK)' },
                { key: 'CNX', label: isVi ? 'Chiang Mai (CNX)' : isTh ? 'เชียงใหม่ (CNX)' : 'Chiang Mai (CNX)' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFlightOrigin(tab.key)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: activeFlightOrigin === tab.key ? '#0f172a' : 'transparent',
                    color: activeFlightOrigin === tab.key ? '#ffffff' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeFlightOrigin === tab.key ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'none'
                  }}
                >
                  <Plane size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Flight Schedule Showcase */}
          {(() => {
            const currentSchedule = FLIGHT_SCHEDULES[activeFlightOrigin];
            if (!currentSchedule) return null;

            return (
              <div>
                {/* Flight Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  {currentSchedule.flights.map((flight, fIdx) => (
                    <div
                      key={fIdx}
                      className="flight-card-interactive"
                      style={{
                        borderRadius: '1.25rem',
                        padding: '1.5rem',
                        background: flight.isLate ? '#fffbeb' : '#ffffff',
                        border: flight.isLate ? '1.5px solid #fde68a' : '1px solid #e2e8f0',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div>
                        {/* Header: Airline & Tag */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <div>
                            <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>{flight.airline}</span>
                            <span style={{ marginLeft: '0.5rem', background: '#0284c7', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.75rem', fontWeight: 800 }}>{flight.flightNo}</span>
                          </div>
                          <span style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: '2rem',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: flight.isLate ? '#fef3c7' : '#ecfdf5',
                            color: flight.isLate ? '#b45309' : '#047857',
                            border: flight.isLate ? '1px solid #fde68a' : '1px solid #a7f3d0'
                          }}>
                            {isVi ? flight.tagVi : isTh ? flight.tagTh : flight.tagEn}
                          </span>
                        </div>

                        {/* Timing Block */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: flight.isLate ? 'rgba(255,255,255,0.8)' : '#f8fafc',
                          padding: '0.85rem 1.25rem',
                          borderRadius: '0.85rem',
                          marginBottom: '1rem',
                          border: '1px solid #e2e8f0'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{flight.depTime}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>{activeFlightOrigin}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '0 1rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 700, marginBottom: '0.2rem' }}>1h 40m</div>
                            <div style={{ width: '100%', height: '2px', background: '#cbd5e1', position: 'relative' }}>
                              <Plane size={12} style={{ position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%) rotate(90deg)', color: '#0284c7' }} />
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.2rem' }}>Bay thẳng / Direct</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{flight.arrTime}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>DAD (Đà Nẵng)</div>
                          </div>
                        </div>

                        {/* Note Description */}
                        <p style={{ color: '#475569', fontSize: '0.83rem', lineHeight: 1.5, margin: 0 }}>
                          {isVi ? flight.noteVi : isTh ? flight.noteTh : flight.noteEn}
                        </p>
                      </div>

                      {/* Inbound summary */}
                      <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px dashed #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{isVi ? 'Chặng về đề xuất:' : isTh ? 'ไฟลท์ขากลับแนะนำ:' : 'Return Flight:'} </span>
                        {currentSchedule.inboundFlight.flightNo} ({currentSchedule.inboundFlight.depTime} - {currentSchedule.inboundFlight.arrTime})
                      </div>
                    </div>
                  ))}
                </div>

                {/* DMC Guarantee Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                  borderRadius: '1rem',
                  padding: '1.25rem 1.75rem',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={24} color="#ffffff" />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {isVi ? 'Cam Kết Đón Tiễn Riêng & Linh Hoạt 100% Theo Radar Thực Tế' : isTh ? 'การันตีรถรับส่ง VIP ส่วนตัว 100% ติดตามสถานะเที่ยวบินเรียลไทม์' : '100% Private VIP Transfers with Real-Time Flight Tracking'}
                    </div>
                    <div style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: 1.4 }}>
                      {isVi ? 'Xe VIP và HDV tiếng Thái luôn túc trực đợi sẵn tại sân bay quốc tế Đà Nẵng, miễn phí chờ đợi tuyệt đối khi chuyến bay bị delay.' : isTh ? 'รถตู้ VIP และไกด์ภาษาไทยรอต้อนรับที่สนามบินดานังเสมอ ไม่มีค่าใช้จ่ายเพิ่มเติมกรณีเที่ยวบินดีเลย์' : 'Private VIP vehicle and Thai-speaking tour guide waiting at DAD airport with zero extra waiting fee during delays.'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

    </>
  );
}
