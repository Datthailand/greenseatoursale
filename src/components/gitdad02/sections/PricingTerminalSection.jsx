import React from 'react';
import { Layers, Bus, Info, Sparkles, Minus, Plus, Check, Copy, Share2, ImageIcon, Calculator, Award } from 'lucide-react';
import { GIT_PRICE_GRID, SURCHARGES } from '../constants';

export default function PricingTerminalSection({
  isVi,
  isTh,
  language,
  currency,
  setCurrency,
  effectiveRate,
  exchangeRate,
  setExchangeRate,
  selectedBandIdx,
  handleBandChange,
  paxCount,
  handlePaxChange,
  singleRooms,
  setSingleRooms,
  extraTourLeaders,
  setExtraTourLeaders,
  isHoliday,
  setIsHoliday,
  agentMarginPercent,
  setAgentMarginPercent,
  selectedBand,
  calculation,
  formatPrice,
  getBandLabel,
  getVehicleLabel,
  agentConfig = {},
  handleCopyQuote,
  copiedQuote,
  handleExportPoster,
  isExportingPoster,
  selectedAddons = [],
  setSelectedAddons,
  setShowAddonsModal,
  setShowAgentModal
}) {
  return (
    <section id="pricing-terminal" style={{ maxWidth: '1280px', margin: '0 auto 4rem', padding: '0 2rem' }}>
      <style>{`
        /* 1. NET Price Tier Rows Hover Highlight */
        .gitdad-tier-item {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease, background-color 0.2s ease;
        }
        .gitdad-tier-item.is-unselected:hover {
          background-color: #f0fdf4 !important;
          border-color: #10b981 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px -2px rgba(5, 150, 105, 0.18) !important;
        }
        .gitdad-tier-item.is-unselected:hover .gitdad-tier-num {
          background-color: #059669 !important;
          color: #ffffff !important;
        }
        .gitdad-tier-item.is-unselected:hover .gitdad-tier-name {
          color: #00533d !important;
        }
        .gitdad-tier-item.is-unselected:hover .gitdad-tier-price {
          color: #00533d !important;
        }
        .gitdad-tier-item.is-selected {
          border: 2px solid #059669;
          background-color: #ecfdf5;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.12);
        }
        .gitdad-tier-item.is-selected:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(5, 150, 105, 0.22) !important;
          border-color: #047857 !important;
        }

        /* 2. Margin Preset Pills Hover Highlight */
        .gitdad-margin-pill {
          transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }
        .gitdad-margin-pill.is-unselected:hover {
          background-color: #ecfdf5 !important;
          border-color: #059669 !important;
          color: #00533d !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(5, 150, 105, 0.18) !important;
        }
        .gitdad-margin-pill.is-selected:hover {
          background-color: #004432 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 83, 61, 0.35) !important;
        }

        /* 3. Action Buttons Hover Highlight */
        .gitdad-btn-copy {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, filter 0.2s ease;
        }
        .gitdad-btn-copy:hover {
          background-color: #00402f !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 83, 61, 0.35) !important;
          filter: brightness(1.05);
        }
        .gitdad-btn-copy:active {
          transform: translateY(0);
        }

        .gitdad-btn-poster {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s ease;
        }
        .gitdad-btn-poster:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(217, 119, 6, 0.42) !important;
          filter: brightness(1.08);
        }
        .gitdad-btn-poster:not(:disabled):active {
          transform: translateY(0);
        }

        .gitdad-btn-whitelabel {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .gitdad-btn-whitelabel:hover {
          background-color: #00533d !important;
          color: #ffffff !important;
          border: 1.5px solid #00533d !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 83, 61, 0.25) !important;
        }
        .gitdad-btn-whitelabel:hover .gitdad-whitelabel-icon {
          color: #6ee7b7 !important;
        }
        .gitdad-btn-whitelabel:active {
          transform: translateY(0);
        }

        /* 4. Quick Presets & Interactive Elements */
        .gitdad-rate-preset-btn {
          transition: transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
        }
        .gitdad-rate-preset-btn:hover {
          border-color: #059669 !important;
          background-color: #ecfdf5 !important;
          color: #00533d !important;
          transform: translateY(-1px);
        }

        .gitdad-stepper-btn {
          transition: transform 0.15s ease, background-color 0.15s ease, color 0.15s ease;
        }
        .gitdad-stepper-btn:not(:disabled):hover {
          background-color: #e2e8f0 !important;
          color: #00533d !important;
          transform: scale(1.06);
        }

        .gitdad-holiday-toggle {
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .gitdad-holiday-toggle:hover {
          border-color: #d97706 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.12) !important;
        }
      `}</style>
      
      {/* Main Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          color: '#00533d', fontSize: '0.85rem', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.5rem',
          background: '#ecfdf5', padding: '0.35rem 0.95rem', borderRadius: '0.5rem',
          border: '1px solid #a7f3d0'
        }}>
          <Calculator size={16} />
          <span>
            {agentConfig.isAgent || agentConfig.hideNet
              ? (isVi ? 'BẢNG TÍNH GIÁ TOUR ĐOÀN TRỌN GÓI' : isTh ? 'โปรแกรมคำนวณราคาทัวร์กรุ๊ปเหมา' : 'GROUP TOUR PRICE CALCULATOR')
              : (isVi ? 'BẢNG GIÁ NET B2B & BỘ CÔNG CỤ BÁO GIÁ ĐOÀN GIT' : isTh ? 'ตารางราคา NET B2B & เครื่องมือทำใบเสนอราคากรุ๊ปเหมา' : 'B2B GROUP NET MATRIX & SIMULATOR')}
          </span>
        </div>

        <h2 style={{
          fontSize: '2.2rem', fontWeight: 900, color: '#0f172a',
          margin: '0 0 0.65rem',
          fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
          lineHeight: 1.2
        }}>
          {agentConfig.isAgent || agentConfig.hideNet
            ? (isVi ? 'Công Cụ Tính Giá Tour Theo Số Lượng Khách Đoàn' : isTh ? 'ระบบคำนวณราคาทัวร์สำหรับกรุ๊ปเดินทาง' : 'Group Quotation Calculator')
            : (isVi ? 'Biểu Phí NET Đoàn Đại Lý & Hệ Thống Tính Toán Lợi Nhuận' : isTh ? 'ตารางราคาตัวแทนกรุ๊ปเหมาและระบบจำลองใบเสนอราคา' : 'B2B Group Net Matrix & Profit Engine')}
        </h2>

        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {isVi 
            ? 'Áp dụng từ 01/04 - 30/12/2026 • Đã gồm Mercure Bà Nà, khách sạn 4 sao Đà Nẵng, xe Universe 29-45 chỗ, 2 buffet + tôm hùm & FOC Trưởng đoàn (15+ pax)' 
            : isTh 
              ? 'ช่วงเวลาเดินทาง: 01/04 - 30/12/2026 (ราคา NET รวมพัก Mercure บานาฮิลล์, โรงแรม 4 ดาว, รถบัส 29-45 ที่นั่ง, 2 บุฟเฟต์แถมกุ้งมังกร & ฟรีหัวหน้าทัวร์)' 
              : 'Travel Period: 01/04 - 30/12/2026 (Includes Mercure Ba Na, 4-star Da Nang Hotel, Universe Coach, 2 Buffets with Lobster & FOC TL)'}
        </p>
      </div>

      {/* 2-Column Split Screen Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '1.75rem',
        alignItems: 'stretch'
      }}>
        
        {/* ===================== CỘT 1 (BÊN TRÁI): BẢNG TRA CỨU GIÁ NET TOÀN DIỆN ===================== */}
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '1.6rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1.25rem',
          height: '100%'
        }}>
          
          {/* Header Cột 1 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={20} style={{ color: '#00533d' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                {agentConfig.isAgent || agentConfig.hideNet
                  ? (isVi ? 'Bảng Giá Tour Trọn Gói Theo Quy Mô Đoàn' : isTh ? 'ตารางราคาทัวร์ตามขนาดกรุ๊ปเหมา' : 'All-Inclusive Rates by Group Size')
                  : (isVi ? 'Biểu Phí NET Gốc Khách Đoàn (8 – 42 Khách)' : isTh ? 'ตารางราคา NET ตามขนาดกรุ๊ป (8 – 42 ท่าน)' : 'Official B2B Net Rates (8 – 42 Pax)')}
              </h3>
            </div>
          </div>

          {/* List 7 Mốc Giá */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {GIT_PRICE_GRID.map((p, idx) => {
              const isSelected = selectedBandIdx === idx;
              const retailUsd = Math.round(p.netUsd * (1 + (agentConfig.isAgent || agentConfig.hideNet ? agentMarginPercent : 0) / 100));
              const hasFOC = p.minPax >= 15;

              return (
                <div
                  key={idx}
                  onClick={() => handleBandChange(idx)}
                  className={`gitdad-tier-item ${isSelected ? 'is-selected' : 'is-unselected'}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1.1rem',
                    borderRadius: '0.85rem',
                    border: isSelected ? '2px solid #059669' : '1px solid #e2e8f0',
                    background: isSelected ? '#ecfdf5' : '#f8fafc',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      className="gitdad-tier-num"
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: isSelected ? '#00533d' : '#cbd5e1',
                        color: '#fff', fontSize: '0.75rem', fontWeight: 900,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="gitdad-tier-name" style={{ fontWeight: 800, fontSize: '0.925rem', color: isSelected ? '#00533d' : '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', transition: 'color 0.2s ease' }}>
                        <span>{isVi ? p.bandLabel : isTh ? p.bandLabelTh : p.bandLabelEn}</span>
                        {idx === 3 && (
                          <span style={{ fontSize: '0.68rem', background: '#fef3c7', color: '#92400e', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                            ⭐ {isVi ? 'Phổ biến' : 'ยอดนิยม'}
                          </span>
                        )}
                        {hasFOC && (
                          <span style={{ fontSize: '0.68rem', background: '#fce7f3', color: '#be185d', padding: '1px 6px', borderRadius: '4px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                            <Award size={11} />
                            {isVi ? 'FOC 1 TL' : 'ฟรี 1 TL'}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                        <Bus size={13} style={{ color: '#059669' }} />
                        <span>{isVi ? p.vehicle : isTh ? p.vehicleTh : p.vehicleEn}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div className="gitdad-tier-price" style={{ fontSize: '1.2rem', fontWeight: 900, color: isSelected ? '#00533d' : '#0f172a', transition: 'color 0.2s ease' }}>
                      {currency === 'THB' ? `฿${Math.round(retailUsd * effectiveRate).toLocaleString('en-US')}` : `$${retailUsd}`} <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>/ {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>
                      {currency === 'THB' ? `≈ $${retailUsd} USD` : `≈ ฿${Math.round(retailUsd * effectiveRate).toLocaleString('en-US')}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Khung Phụ Thu Bổ Sung (Surcharges Summary) */}
          <div style={{ background: '#f8fafc', padding: '1.15rem 1.25rem', borderRadius: '0.85rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
            <div style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', marginBottom: '0.15rem' }}>
              <Info size={16} style={{ color: '#059669' }} />
              <span>{isVi ? 'Chính sách FOC & Phụ thu đoàn:' : isTh ? 'นโยบาย FOC & ข้อกำหนดการชาร์จเพิ่ม:' : 'FOC & Surcharges Policy:'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>• {isVi ? 'Chính sách FOC Trưởng đoàn (15+ pax):' : isTh ? 'ฟรีค่าทัวร์หัวหน้าทัวร์ (15 ท่านขึ้นไป):' : 'FOC Tour Leader Policy (15+ pax):'}</span>
              <strong style={{ color: '#00533d' }}>{isVi ? 'Miễn phí 1 TL (Phòng Single)' : isTh ? 'ฟรี 1 ท่าน (พักเดี่ยว)' : '1 FOC (Single)'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>• {isVi ? 'Phụ thu phòng đơn (Single Supplement):' : isTh ? 'ห้องพักเดี่ยว (Single Supplement):' : 'Single Supplement:'}</span>
              <strong style={{ color: '#be123c' }}>+$65 USD (+฿{Math.round(65 * effectiveRate).toLocaleString('en-US')}) / {isVi ? 'phòng' : isTh ? 'ห้อง' : 'room'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>• {isVi ? 'Tặng kèm ẩm thực đặc biệt:' : isTh ? 'เมนูพิเศษรวมในโปรแกรม:' : 'Special Included Dining:'}</span>
              <strong style={{ color: '#b45309' }}>{isVi ? '2 Buffet + Tặng ½ Tôm Hùm' : '2 บุฟเฟต์ + กุ้งมังกร'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>• {isVi ? 'Phụ thu Lễ 30/4 & Giáng Sinh (24-25/12):' : isTh ? 'ชาร์จช่วงวันหยุด 30/4 & คริสต์มาส:' : 'Holiday Surcharge (30/4 & Christmas):'}</span>
              <strong style={{ color: '#b45309' }}>+$18 USD / {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'}</strong>
            </div>
          </div>
        </div>

        {/* ===================== CỘT 2 (BÊN PHẢI): PHIẾU TÍNH BÁO GIÁ & BIÊN LỢI NHUẬN THỜI GIAN THỰC ===================== */}
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '2px solid #a7f3d0',
          boxShadow: '0 15px 35px -5px rgba(0, 83, 61, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          
          {/* Header Cột 2 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} style={{ color: '#059669' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                {agentConfig.isAgent || agentConfig.hideNet
                  ? (isVi ? 'Tùy Chỉnh Lựa Chọn Cho Đoàn Của Bạn' : isTh ? 'ปรับแต่งรายละเอียดสำหรับกรุ๊ปของคุณ' : 'Customize Group Options')
                  : (isVi ? 'Mô Phỏng Báo Giá & Biên Lợi Nhuận Khách Đoàn' : isTh ? 'เครื่องมือจำลองใบเสนอราคาและกำไร' : 'Real-time Group Profit Simulator')}
              </h3>
            </div>
          </div>

          {/* Input Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            
            {/* Input 1: Nhóm khách & Số khách thực tế */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                {isVi ? '1. Chọn nhóm & số khách đoàn thực tế:' : isTh ? '1. กลุ่มและจำนวนคนจริง (Pax):' : '1. Group Size Band & Pax:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '0.65rem' }}>
                <select
                  value={selectedBandIdx}
                  onChange={(e) => handleBandChange(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: '0.6rem', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.875rem', background: '#f8fafc', color: '#0f172a' }}
                >
                  {GIT_PRICE_GRID.map((p, idx) => {
                    const retailVal = Math.round(p.netUsd * (1 + (agentConfig.isAgent || agentConfig.hideNet ? agentMarginPercent : 0) / 100));
                    return (
                      <option key={idx} value={idx}>
                        {isVi ? p.bandLabel : isTh ? p.bandLabelTh : p.bandLabelEn} ({currency === 'THB' ? `฿${Math.round(retailVal * effectiveRate).toLocaleString('en-US')}` : `$${retailVal}`})
                      </option>
                    );
                  })}
                </select>

                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '0.6rem', padding: '2px' }}>
                  <button
                    onClick={() => handlePaxChange(paxCount - 1)}
                    disabled={paxCount <= 8}
                    className="gitdad-stepper-btn"
                    title={paxCount <= 8 ? (isVi ? 'Tối thiểu 8 khách đoàn' : 'ขั้นต่ำ 8 ท่าน') : ''}
                    style={{
                      width: '32px', height: '32px', border: 'none',
                      background: paxCount <= 8 ? '#f1f5f9' : '#fff',
                      borderRadius: '0.4rem',
                      cursor: paxCount <= 8 ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: paxCount <= 8 ? '#94a3b8' : '#0f172a',
                      opacity: paxCount <= 8 ? 0.4 : 1,
                      transition: 'all 0.15s'
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '0.875rem', color: '#00533d' }}>
                    {paxCount} {isVi ? 'khách' : 'ท่าน'}
                  </span>
                  <button
                    onClick={() => handlePaxChange(paxCount + 1)}
                    disabled={paxCount >= 42}
                    className="gitdad-stepper-btn"
                    title={paxCount >= 42 ? (isVi ? 'Tối đa 42 khách cho tour này' : 'สูงสุด 42 ท่าน') : ''}
                    style={{
                      width: '32px', height: '32px', border: 'none',
                      background: paxCount >= 42 ? '#f1f5f9' : '#fff',
                      borderRadius: '0.4rem',
                      cursor: paxCount >= 42 ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: paxCount >= 42 ? '#94a3b8' : '#0f172a',
                      opacity: paxCount >= 42 ? 0.4 : 1,
                      transition: 'all 0.15s'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Input 2: Phòng đơn & FOC Tour Leader */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '0.65rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                  {isVi ? `2. Phòng đơn (+${calculation.singleSupp || 65}$):` : isTh ? `2. ห้องเดี่ยว (+${calculation.singleSupp || 65}$):` : `2. Single (+${calculation.singleSupp || 65}$):`}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '0.6rem', padding: '2px' }}>
                  <button
                    onClick={() => setSingleRooms(Math.max(0, singleRooms - 1))}
                    className="gitdad-stepper-btn"
                    style={{ width: '32px', height: '32px', border: 'none', background: '#fff', borderRadius: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '0.875rem', color: singleRooms > 0 ? '#be123c' : '#475569' }}>
                    {singleRooms}
                  </span>
                  <button
                    onClick={() => setSingleRooms(Math.min(20, singleRooms + 1))}
                    className="gitdad-stepper-btn"
                    style={{ width: '32px', height: '32px', border: 'none', background: '#fff', borderRadius: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                  {isVi ? '3. Trưởng đoàn (Tour Leader):' : isTh ? '3. หัวหน้าทัวร์ (Tour Leader):' : '3. Tour Leader Status:'}
                </label>
                <div style={{
                  padding: '0.65rem 0.6rem', borderRadius: '0.6rem',
                  border: '1px solid #cbd5e1', background: paxCount >= 15 ? '#ecfdf5' : '#f8fafc',
                  fontSize: '0.825rem', fontWeight: 800,
                  color: paxCount >= 15 ? '#065f46' : '#64748b',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Award size={14} style={{ color: paxCount >= 15 ? '#059669' : '#94a3b8' }} />
                  <span>{paxCount >= 15 ? (isVi ? '✨ Đã gồm 1 FOC (Single)' : isTh ? '✨ ฟรีหัวหน้าทัวร์ 1 ท่าน' : '✨ 1 FOC TL Included') : (isVi ? 'Không FOC (< 15 pax)' : isTh ? 'ไม่มี FOC (< 15 ท่าน)' : 'No FOC (< 15 pax)')}</span>
                </div>
              </div>
            </div>

            {/* Tùy chọn Giai đoạn Lễ (29/04-02/05 & 24-25/12) */}
            <div 
              onClick={() => setIsHoliday(!isHoliday)}
              className="gitdad-holiday-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.65rem',
                border: isHoliday ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
                background: isHoliday ? '#fffbeb' : '#f8fafc',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={isHoliday}
                  onChange={(e) => setIsHoliday(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#d97706', cursor: 'pointer' }}
                />
                <div>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: isHoliday ? '#92400e' : '#334155' }}>
                    {isVi ? 'Đi vào giai đoạn Lễ (29/04–02/05 & 24–25/12)' : isTh ? 'เดินทางช่วงวันหยุด (29/04–02/05 & 24–25/12)' : 'Peak Holidays (29/04–02/05 & 24–25/12)'}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309' }}>
                +{paxCount >= 15 ? SURCHARGES.holidayBigGroupUsd : SURCHARGES.holidaySmallGroupUsd}$/pax
              </span>
            </div>

            {/* Input 4: Tỷ giá quy đổi & Đơn vị tiền tệ (USD ➔ THB) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 800, color: '#334155' }}>
                  {isVi ? '4. Tỷ giá quy đổi (USD ➔ THB):' : isTh ? '4. อัตราแลกเปลี่ยน (USD ➔ THB):' : '4. Exchange Rate (USD ➔ THB):'}
                </label>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800 }}>
                  1 USD = {effectiveRate} THB
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={e => setExchangeRate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 3rem 0.65rem 0.75rem',
                      borderRadius: '0.6rem',
                      border: '1px solid #cbd5e1',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      background: '#fff',
                      color: '#0f172a'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                    THB
                  </span>
                </div>
                {/* Quick preset buttons: 34.5, 35, 35.5, 36 */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[34.5, 35, 35.5, 36].map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setExchangeRate(rate)}
                      className="gitdad-rate-preset-btn"
                      style={{
                        padding: '0.55rem 0.5rem',
                        borderRadius: '0.5rem',
                        border: Number(exchangeRate) === rate ? '1.5px solid #059669' : '1px solid #e2e8f0',
                        background: Number(exchangeRate) === rate ? '#ecfdf5' : '#f8fafc',
                        color: Number(exchangeRate) === rate ? '#00533d' : '#64748b',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {rate}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input 5: Mức Lợi Nhuận Đại Lý (Segmented Pills - Hidden in Client Mode) */}
            {!agentConfig.hideNet && !agentConfig.isAgent && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 800, color: '#00533d' }}>
                  {isVi ? '5. Mức lợi nhuận mong muốn (% Margin):' : isTh ? '5. กำไรตัวแทน (% Margin):' : '5. Target Margin %:'}
                </label>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800 }}>
                  {isVi ? `Đang chọn: +${agentMarginPercent}%` : `เลือกแล้ว: +${agentMarginPercent}%`}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.35rem' }}>
                {[
                  { val: 0, label: '0% NET' },
                  { val: 10, label: '+10%' },
                  { val: 15, label: '+15% ⭐' },
                  { val: 20, label: '+20%' },
                  { val: 25, label: '+25%' }
                ].map(m => {
                  const isAct = agentMarginPercent === m.val;
                  return (
                    <button
                      key={m.val}
                      onClick={() => setAgentMarginPercent(m.val)}
                      className={`gitdad-margin-pill ${isAct ? 'is-selected' : 'is-unselected'}`}
                      style={{
                        padding: '0.5rem 0.2rem',
                        borderRadius: '0.5rem',
                        border: isAct ? '2px solid #059669' : '1.5px solid #cbd5e1',
                        background: isAct ? '#00533d' : '#f8fafc',
                        color: isAct ? '#fff' : '#334155',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
            )}

          </div>

          {/* Financial Results Breakdown Card */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            
            {!agentConfig.hideNet ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>
                      {isVi ? 'Tổng tiền NET trả Green Sea:' : isTh ? 'ยอด NET จ่าย Green Sea:' : 'Total Net Payable:'}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00533d', marginTop: '2px' }}>
                      ${calculation.totalNetGroup.toLocaleString('en-US')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      (≈ ฿{Math.round(calculation.totalNetGroup * effectiveRate).toLocaleString('en-US')})
                    </div>
                    {singleRooms > 0 && (
                      <div style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 700, marginTop: '4px' }}>
                        • {isVi ? `Đã gồm +$${singleRooms * calculation.singleSupp} (${singleRooms} phòng đơn)` : isTh ? `รวมชาร์จพักเดี่ยว $${singleRooms * calculation.singleSupp} (${singleRooms} ห้อง)` : `Includes +$${singleRooms * calculation.singleSupp} (${singleRooms} Single SGL)`}
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 800 }}>
                      {isVi ? 'Giá BÁN đề xuất khách lẻ:' : isTh ? 'ราคาเสนอขายลูกค้า:' : 'Suggested Retail / Pax:'}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>
                      ${calculation.suggestedSellPerPax.toLocaleString('en-US')}{' '}
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>/ {isVi ? 'khách' : 'ท่าน'}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      (≈ ฿{Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')})
                    </div>
                    {singleRooms > 0 && (
                      <div style={{ fontSize: '0.78rem', color: '#b91c1c', fontWeight: 800, marginTop: '4px' }}>
                        + ${singleRooms * calculation.singleSupp} USD ({singleRooms} {isVi ? 'phòng đơn' : isTh ? 'ห้องพักเดี่ยว' : 'Single Room'})
                      </div>
                    )}
                  </div>
                </div>

                {/* Lợi Nhuận Đại Lý Card */}
                <div style={{
                  background: '#ecfdf5',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: '1.5px solid #6ee7b7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 900 }}>
                      {isVi ? '💰 LỢI NHUẬN ĐẠI LÝ THU VỀ:' : isTh ? '💰 กำไรสุทธิของตัวแทน:' : '💰 ESTIMATED AGENT PROFIT:'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '2px' }}>
                      {isVi ? `(Từ mức Margin +${agentMarginPercent}% cho đoàn ${paxCount} khách)` : `(จาก Margin +${agentMarginPercent}% กรุ๊ป ${paxCount} ท่าน)`}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669' }}>
                      +${calculation.agentProfit.toLocaleString('en-US')}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857' }}>
                      +฿{Math.round(calculation.agentProfit * effectiveRate).toLocaleString('en-US')}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Customer View: Only Final Selling Price */
              <div style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                padding: '1.5rem',
                borderRadius: '0.85rem',
                border: '2px solid #059669',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#065f46', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {isVi ? '🌟 TỔNG GIÁ TOUR TRỌN GÓI ĐỀ XUẤT' : isTh ? '🌟 ราคาเสนอพิเศษสุทธิต่อท่าน' : '🌟 TOTAL PROPOSED TOUR RATE'}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#00533d', margin: '0.35rem 0' }}>
                  {currency === 'THB' ? `฿${Math.round((calculation.suggestedSellPerPax || calculation.retailPerPaxUsd) * effectiveRate).toLocaleString('en-US')}` : `$${calculation.suggestedSellPerPax || calculation.retailPerPaxUsd}`}{' '}
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#047857' }}>/ {isVi ? 'khách' : 'ท่าน'}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700 }}>
                  {currency === 'THB' ? `(≈ $${calculation.suggestedSellPerPax || calculation.retailPerPaxUsd} USD / khách)` : `(≈ ฿${Math.round((calculation.suggestedSellPerPax || calculation.retailPerPaxUsd) * effectiveRate).toLocaleString('en-US')} / khách)`}
                </div>
                {singleRooms > 0 && (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 0.85rem',
                    background: '#ffffff',
                    borderRadius: '0.6rem',
                    border: '1.5px solid #fca5a5',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: '#b91c1c'
                  }}>
                    <span>🏨 {isVi ? `+ $${singleRooms * (calculation.singleSupp || 65)} USD phụ thu ${singleRooms} phòng đơn` : isTh ? `+ ฿${Math.round(singleRooms * (calculation.singleSupp || 65) * effectiveRate).toLocaleString('en-US')} (ชาร์จห้องพักเดี่ยว ${singleRooms} ห้อง)` : `+ $${singleRooms * (calculation.singleSupp || 65)} USD (${singleRooms} Single Room Supp)`}</span>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Action Buttons: Copy Quote + Export Poster (Side by Side) + White-Label Link */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            {/* Row 1: 2 Main Action Buttons Side by Side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {/* 1. Copy Quote Text Button */}
              <button
                onClick={handleCopyQuote}
                type="button"
                className="gitdad-btn-copy"
                style={{
                  width: '100%',
                  padding: '0.7rem 0.6rem',
                  borderRadius: '0.7rem',
                  border: 'none',
                  background: copiedQuote ? '#16a34a' : '#00533d',
                  color: '#ffffff',
                  fontSize: '0.825rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 3px 10px rgba(0, 83, 61, 0.18)'
                }}
              >
                {copiedQuote ? <Check size={16} /> : <Copy size={16} />}
                <span>
                  {copiedQuote 
                    ? (isVi ? 'ĐÃ SAO CHÉP!' : 'คัดลอกสำเร็จ!') 
                    : (isVi ? 'SAO CHÉP BÁO GIÁ' : 'คัดลอกข้อความ')}
                </span>
              </button>

              {/* 2. 1-Click Export Poster Image Button */}
              <button
                onClick={handleExportPoster}
                disabled={isExportingPoster}
                type="button"
                className="gitdad-btn-poster"
                style={{
                  width: '100%',
                  padding: '0.7rem 0.6rem',
                  borderRadius: '0.7rem',
                  border: '1px solid #d97706',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  fontSize: '0.825rem',
                  fontWeight: 900,
                  cursor: isExportingPoster ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 3px 10px rgba(217, 119, 6, 0.22)',
                  opacity: isExportingPoster ? 0.75 : 1
                }}
              >
                <ImageIcon size={16} />
                <span>
                  {isExportingPoster 
                    ? (isVi ? 'ĐANG TẠO...' : 'กำลังสร้าง...') 
                    : (isVi ? 'XUẤT POSTER ẢNH' : 'ดาวน์โหลดโปสเตอร์')}
                </span>
              </button>
            </div>

            {/* Row 2: White-Label Share Link Button (Only for Agents) */}
            {!agentConfig.isAgent && (
              <button
                onClick={() => setShowAgentModal && setShowAgentModal(true)}
                type="button"
                className="gitdad-btn-whitelabel"
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '0.6rem',
                  border: '1.5px dashed #059669',
                  background: '#f0fdf4',
                  color: '#065f46',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <Share2 size={14} className="gitdad-whitelabel-icon" style={{ color: '#059669', transition: 'color 0.2s ease' }} />
                <span>{isVi ? '🏷️ Tạo Link Gửi Khách (Gắn Thương Hiệu & Ẩn Giá NET)' : isTh ? '🏷️ สร้างลิงก์ส่งลูกค้า (ใส่แบรนด์ & ซ่อนราคา NET)' : '🏷️ Generate Client Share Link'}</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}
