import React, { useState } from 'react';
import { Send, Zap, X, CheckCircle2 } from 'lucide-react';
import { Magnet } from '../ui/Magnet';
import { ThailandFlag } from '../ui/Flags';

export default function QuoteDrawer({ isVi, isTh, language, currency, effectiveRate, showQuoteModal, setShowQuoteModal, calculation, selectedBand, paxCount, singleRooms, formatPrice, getBandLabel, getVehicleLabel, agentConfig, agentForm, setAgentForm, submitted, setSubmitted }) {
  return (
    <>
      {/* FLOATING ACTION BUBBLE BUTTON */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999
        }}
      >
        <Magnet magnetStrength={0.35}>
          <button
            type="button"
            onClick={() => setShowQuoteModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 1.45rem',
              borderRadius: '3rem',
              background: 'linear-gradient(135deg, #059669 0%, #00533d 100%)',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 800,
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              boxShadow: '0 14px 35px -6px rgba(5, 150, 105, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.3px',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Live radar dot */}
            <span style={{ position: 'relative', display: 'flex', width: '9px', height: '9px' }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#4ade80', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
              }} />
              <span style={{
                position: 'relative', display: 'inline-flex', borderRadius: '50%',
                width: '9px', height: '9px', background: '#22c55e'
              }} />
            </span>

            <Send size={16} style={{ color: '#fde047' }} />
            <span style={{ fontFamily: isTh ? "'Prompt', sans-serif" : "'Be Vietnam Pro', sans-serif" }}>
              {agentConfig.isAgent 
                ? (isVi ? 'Tư Vấn Tour' : isTh ? 'สอบถามข้อมูล' : 'Inquire Now')
                : (isVi ? 'Báo Giá B2B' : isTh ? 'ขอใบเสนอราคา B2B' : 'Request B2B Quote')}
            </span>
          </button>
        </Magnet>
      </div>

      {/* SLIDE-OVER LUXURY DRAWER (RIGHT PANEL POPUP) */}
      {showQuoteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', justifyContent: 'flex-end' }}>
          
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setShowQuoteModal(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              animation: 'fadeIn 0.25s ease-out'
            }}
          />

          {/* Slide-Over Drawer Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 10001,
              width: '540px',
              maxWidth: '100vw',
              height: '100vh',
              background: '#ffffff',
              boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Drawer Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#00533d', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem', border: '1px solid #a7f3d0' }}>
                  <Zap size={12} style={{ color: '#059669' }} />
                  {isVi ? 'Phản Hồi Trong 15 Phút' : isTh ? 'ตอบกลับด่วนภายใน 15 นาที' : '15-Min Response'}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.25, fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                  {agentConfig.isAgent && agentConfig.name 
                    ? (isVi ? `Tư Vấn Tour Cùng ${agentConfig.name}` : isTh ? `สอบถามข้อมูลกับ ${agentConfig.name}` : `Tour Inquiry with ${agentConfig.name}`)
                    : (isVi ? 'Yêu Cầu Báo Giá & Đặt Đoàn B2B' : isTh ? 'ขอใบเสนอราคา B2B & ล็อคโควต้ากรุ๊ป' : 'Request B2B Quotation')}
                </h3>
              </div>

              <button
                onClick={() => setShowQuoteModal(false)}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: '#ffffff', border: '1px solid #cbd5e1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#64748b', transition: 'all 0.15s'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {/* Tour & Pricing Live Configuration Summary Card */}
              <div style={{
                background: 'linear-gradient(135deg, #003829 0%, #00533d 100%)',
                color: '#ffffff', borderRadius: '1rem', padding: '1.15rem',
                boxShadow: '0 8px 20px -4px rgba(0, 56, 41, 0.25)'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#a7f3d0', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
                  FITDAD01 • 3 {isVi ? 'Ngày' : isTh ? 'วัน' : 'Days'} 2 {isVi ? 'Đêm' : isTh ? 'คืน' : 'Nights'}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 900, marginBottom: '0.65rem', color: '#ffffff' }}>
                  {isVi ? 'Đà Nẵng - Bà Nà Hills - Phố Cổ Hội An' : isTh ? 'ดานัง - บานาฮิลล์ - ฮอยอัน' : 'Da Nang - Ba Na Hills - Hoi An'}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.25)', padding: '0.65rem', borderRadius: '0.6rem', fontSize: '0.78rem' }}>
                  <div>
                    <div style={{ color: '#cbd5e1' }}>{isVi ? 'Quy mô đoàn:' : isTh ? 'จำนวนผู้เดินทาง:' : 'Group Size:'}</div>
                    <div style={{ fontWeight: 800, color: '#fde047' }}>
                      {paxCount} {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'} ({selectedBand ? (isVi ? selectedBand.paxLabelVi : isTh ? selectedBand.paxLabelTh : selectedBand.paxLabelEn) : `${paxCount} pax`})
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#cbd5e1' }}>
                      {agentConfig.isAgent || agentConfig.hideNet ? (isVi ? 'Giá trọn gói:' : isTh ? 'ราคาต่อท่าน:' : 'Tour Rate:') : (isVi ? 'Giá NET B2B:' : isTh ? 'ราคา NET B2B:' : 'NET Rate:')}
                    </div>
                    <div style={{ fontWeight: 800, color: '#fde047' }}>
                      ${agentConfig.isAgent || agentConfig.hideNet ? calculation.suggestedSellPerPax : calculation.netPerPax} (฿{Math.round((agentConfig.isAgent || agentConfig.hideNet ? calculation.suggestedSellPerPax : calculation.netPerPax) * effectiveRate).toLocaleString('en-US')})
                    </div>
                  </div>
                </div>
              </div>

              {submitted ? (
                <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '1.25rem', padding: '2.5rem 1.25rem', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle2 size={32} style={{ color: '#059669' }} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#065f46', margin: '0 0 0.5rem' }}>
                    {isVi ? 'Đã gửi yêu cầu thành công!' : isTh ? 'ส่งคำขอสำเร็จแล้ว!' : 'Request Sent Successfully!'}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#047857', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                    {isVi ? 'Bộ phận kinh doanh Green Sea Tour sẽ liên hệ lại quý đối tác ngay qua LINE / WhatsApp.' : isTh ? 'เจ้าหน้าที่ฝ่ายขายจะติดต่อกลับผ่าน LINE / WhatsApp โดยเร็วที่สุด' : 'Green Sea Tour sales team will contact you shortly via LINE / WhatsApp.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setShowQuoteModal(false); }}
                    style={{
                      padding: '0.65rem 1.75rem', borderRadius: '0.65rem', background: '#059669',
                      color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer'
                    }}
                  >
                    {isVi ? 'Hoàn tất' : isTh ? 'เรียบร้อย' : 'Done'}
                  </button>
                </div>
              ) : (
                <form id="slideover-quote-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  
                  {/* Agency / Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.3rem', color: '#334155' }}>
                      {agentConfig.isAgent 
                        ? (isVi ? 'Họ và tên quý khách' : isTh ? 'ชื่อ-นามสกุลของคุณ' : 'Full Name')
                        : (isVi ? 'Tên công ty / Đại lý' : isTh ? 'ชื่อบริษัททัวร์ / ตัวแทน' : 'Agency Name')} <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={agentConfig.isAgent ? (isVi ? 'Ví dụ: Somchai Prasert' : isTh ? 'เช่น Somchai Prasert' : 'e.g. Somchai Prasert') : (isVi ? 'Ví dụ: Siam Travel Co.' : isTh ? 'เช่น Siam Travel Co.' : 'e.g. Siam Travel')}
                      value={agentForm.agencyName}
                      onChange={e => setAgentForm({ ...agentForm, agencyName: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* 2-Col: Contact Person & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.3rem', color: '#334155' }}>
                        {isVi ? 'Người liên hệ' : isTh ? 'ชื่อผู้ติดต่อ' : 'Contact Person'} <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isVi ? 'Tên người liên hệ' : isTh ? 'ชื่อผู้ติดต่อ' : 'Contact Person'}
                        value={agentForm.contactName}
                        onChange={e => setAgentForm({ ...agentForm, contactName: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.3rem', color: '#334155' }}>
                        {isVi ? 'Số điện thoại / LINE' : isTh ? 'เบอร์โทร / LINE ID' : 'Phone / LINE ID'} <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+66... / @line_id"
                        value={agentForm.phoneLine}
                        onChange={e => setAgentForm({ ...agentForm, phoneLine: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.3rem', color: '#334155' }}>
                      {isVi ? 'Ngày dự kiến khởi hành' : isTh ? 'วันเดินทางโดยประมาณ' : 'Estimated Date'} <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={agentForm.departureDate}
                      onChange={e => setAgentForm({ ...agentForm, departureDate: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.3rem', color: '#334155' }}>
                      {isVi ? 'Yêu cầu đặc biệt (Nâng hạng xe, ăn kiêng...)' : isTh ? 'ความต้องการเพิ่มเติม (เช่น อัปเกรดรถ, อาหารพิเศษ)' : 'Special Requests'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isVi ? 'Nhập ghi chú yêu cầu thêm nếu có...' : isTh ? 'ระบุความต้องการเพิ่มเติม (ถ้ามี)...' : 'Additional notes...'}
                      value={agentForm.specialRequests}
                      onChange={e => setAgentForm({ ...agentForm, specialRequests: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#f8fafc', color: '#0f172a', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* Thai Market Dedicated Specialists with QR Codes */}
                  {!agentConfig.isAgent && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.25rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <ThailandFlag width={18} height={12} />
                        <span>{isVi ? 'Phụ trách thị trường Thái Lan:' : isTh ? 'ทีมงานดูแลตลาดไทยโดยตรง:' : 'Dedicated Thai Market Specialists:'}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                        {/* Specialist 1: Ms. Kim */}
                        <a 
                          href="https://line.me/ti/p/BSLZR5dyBa" 
                          target="_blank" 
                          rel="noreferrer"
                          className="qr-card-interactive"
                          style={{
                            background: '#f8fafc',
                            borderRadius: '0.75rem',
                            padding: '0.55rem 0.7rem',
                            border: '1.5px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            textDecoration: 'none',
                            color: '#0f172a'
                          }}
                        >
                          <img src="/assets/qr-kim.png" alt="Ms Kim QR" style={{ width: '38px', height: '38px', borderRadius: '0.35rem', border: '1px solid #cbd5e1', padding: '2px', background: '#fff' }} />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#00533d' }}>Ms. Kim</div>
                            <div style={{ fontSize: '0.68rem', color: '#06c755', fontWeight: 800 }}>LINE Direct →</div>
                          </div>
                        </a>

                        {/* Specialist 2: Mr. Khanh */}
                        <a 
                          href="https://line.me/ti/p/U1vOdylKTL" 
                          target="_blank" 
                          rel="noreferrer"
                          className="qr-card-interactive"
                          style={{
                            background: '#f8fafc',
                            borderRadius: '0.75rem',
                            padding: '0.55rem 0.7rem',
                            border: '1.5px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            textDecoration: 'none',
                            color: '#0f172a'
                          }}
                        >
                          <img src="/assets/qr-khanh.png" alt="Mr Khanh QR" style={{ width: '38px', height: '38px', borderRadius: '0.35rem', border: '1px solid #cbd5e1', padding: '2px', background: '#fff' }} />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#00533d' }}>Mr. Khanh</div>
                            <div style={{ fontSize: '0.68rem', color: '#06c755', fontWeight: 800 }}>LINE Direct →</div>
                          </div>
                        </a>
                      </div>

                      {/* Hotline & Email Strip */}
                      <div style={{ background: '#f8fafc', borderRadius: '0.6rem', padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', fontSize: '0.725rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.35rem' }}>
                        <div>💬 Hotline: <strong style={{ color: '#0f172a' }}>(+84) 987.43.43.43</strong></div>
                        <div>✉️ <strong style={{ color: '#0f172a' }}>sale1@greenseatour.vn</strong></div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button - Integrated directly into the form */}
                  <div style={{ marginTop: '0.35rem' }}>
                    <Magnet magnetStrength={0.15} style={{ width: '100%', display: 'flex' }}>
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.5rem',
                          borderRadius: '0.75rem',
                          background: 'linear-gradient(135deg, #059669 0%, #00533d 100%)',
                          color: '#ffffff',
                          border: 'none',
                          fontSize: '0.95rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.55rem',
                          boxShadow: '0 8px 24px -4px rgba(5, 150, 105, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s',
                          fontFamily: isTh ? "'Prompt', sans-serif" : "'Be Vietnam Pro', sans-serif"
                        }}
                      >
                        <Send size={16} style={{ color: '#fde047' }} />
                        <span>
                          {agentConfig.isAgent 
                            ? (isVi ? 'Gửi yêu cầu tư vấn' : isTh ? 'ส่งคำขอข้อมูล' : 'Submit Inquiry')
                            : (isVi ? 'Gửi yêu cầu báo giá B2B' : isTh ? 'ขอใบเสนอราคา B2B' : 'Request B2B Quotation')}
                        </span>
                      </button>
                    </Magnet>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      )}

    </>
  );
}
