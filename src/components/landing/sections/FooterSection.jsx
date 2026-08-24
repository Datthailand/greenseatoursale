import React from 'react';
import { Heart, Home, Info, BookOpen, Shield, ShieldCheck, Phone, Mail, MapPin, Globe2, MessageSquare, Send } from 'lucide-react';

export default function FooterSection({ isVi, isTh, agentConfig = {}, onBack, onOpenWhiteLabel }) {
  return (
      <footer style={{
        background: '#ffffff',
        color: '#334155',
        padding: '5rem 2rem 2.5rem',
        borderTop: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Top Row: Brand Info + 3 Nav Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1.15fr) minmax(230px, 1.1fr) minmax(200px, 0.95fr) minmax(290px, 1.35fr)',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            
            {/* Left Brand Column (White-Label Dynamic) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                {agentConfig.isAgent && agentConfig.name ? (
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 900, fontSize: '1.2rem',
                    boxShadow: '0 2px 6px rgba(5,150,105,0.3)', flexShrink: 0
                  }}>
                    {agentConfig.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img src="/assets/logo-transparent.png" alt="Green Sea Tour" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                )}
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1.35rem', color: '#00533d', letterSpacing: '-0.5px', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif", lineHeight: 1.1 }}>
                    {agentConfig.isAgent && agentConfig.name ? agentConfig.name.toUpperCase() : 'GREEN SEA TOUR'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {agentConfig.isAgent && agentConfig.name 
                      ? (isVi ? 'Đại Lý Du Lịch Chuyên Nghiệp' : isTh ? 'ตัวแทนท่องเที่ยวอย่างเป็นทางการ' : 'Authorized Travel Partner')
                      : (isVi ? 'DMC Inbound Land Tour Việt Nam' : isTh ? 'DMC แลนด์เวียดนาม สำหรับตลาดไทย' : 'Vietnam Inbound DMC Wholesaler')}
                  </div>
                </div>
              </div>

              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 1.25rem', maxWidth: '340px' }}>
                {agentConfig.isAgent && agentConfig.name
                  ? (isVi 
                      ? `Đơn vị cung cấp tour du lịch chất lượng cao, phục vụ tận tâm chu đáo từng hành trình của quý khách.`
                      : `ผู้ให้บริการทัวร์ท่องเที่ยวคุณภาพสูง ดูแลเอาใจใส่ทุกขั้นตอนการเดินทางของท่าน`)
                  : (isVi 
                      ? '“Your Trusted DMC Vietnam for Thailand Market - Easy to Work, Ready to Support”. Đối tác lữ hành tin cậy chuyên cung cấp land tour trọn gói chất lượng cao cho các đại lý du lịch.' 
                      : isTh 
                        ? '“Your Trusted DMC Vietnam for Thailand Market - Easy to Work, Ready to Support” แลนด์เวียดนามมืออาชีพ บริการกรุ๊ปส่วนตัวและกรุ๊ปเหมาสำหรับบริษัททัวร์ไทย' 
                        : '“Your Trusted DMC Vietnam for Thailand Market - Easy to Work, Ready to Support”. Professional inbound land operator for Thailand travel agencies.')}
              </p>

              {/* Company Contact Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                {agentConfig.isAgent ? (
                  <>
                    {agentConfig.tel && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                        <Phone size={16} style={{ color: '#059669', flexShrink: 0 }} />
                        <a href={`tel:${agentConfig.tel}`} style={{ color: '#64748b', textDecoration: 'none', fontWeight: 700 }}>
                          Hotline: {agentConfig.tel}
                        </a>
                      </div>
                    )}
                    {agentConfig.line && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                        <MessageSquare size={16} style={{ color: '#059669', flexShrink: 0 }} />
                        <span style={{ color: '#64748b', fontWeight: 700 }}>
                          LINE ID: {agentConfig.line}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                      <MapPin size={16} style={{ color: '#059669', flexShrink: 0 }} />
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=516+Nguy%E1%BB%85n+H%E1%BB%AFu+Th%E1%BB%8D,+%C4%90%C3%A0+N%E1%BA%B5ng,+Vi%E1%BB%87t+Nam"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                      >
                        514 - 516 Nguyễn Hữu Thọ, Q. Cẩm Lệ, TP. Đà Nẵng, Việt Nam
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                      <Globe2 size={16} style={{ color: '#059669', flexShrink: 0 }} />
                      <a href="https://www.greensealandtourvietnam.com" target="_blank" rel="noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>
                        www.greensealandtourvietnam.com
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                      <Send size={16} style={{ color: '#059669', flexShrink: 0 }} />
                      <a href="mailto:sale1@greenseatour.vn" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>
                        sale1@greenseatour.vn
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                      <Phone size={16} style={{ color: '#059669', flexShrink: 0 }} />
                      <a href="https://wa.me/84987434343" target="_blank" rel="noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>
                        (+84) 987.43.43.43
                      </a>
                    </div>
                  </>
                )}
              </div>

              {/* TTAA Official Member Trust Badge */}
              {!agentConfig.isAgent && (
                <a
                  href="https://ttaa.or.th/des-member/Greensea-Tour-Land-Vietnam/5299/th"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.85rem',
                    background: '#f0fdf4',
                    border: '1.5px solid #86efac',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#059669';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#86efac';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <img
                    src="/assets/ttaa-icon.png"
                    alt="TTAA Official Member"
                    style={{
                      height: '32px',
                      width: 'auto',
                      objectFit: 'contain',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {isVi ? 'Chứng nhận TTAA Thái Lan' : isTh ? 'สมาคมไทยบริการท่องเที่ยว' : 'TTAA Thailand Certified'}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>{isVi ? 'Thành viên TTAA #5299' : isTh ? 'สมาชิก TTAA รหัส 5299' : 'TTAA Member #5299'}</span>
                      <span style={{ color: '#059669', fontSize: '0.75rem' }}>↗</span>
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* Column 1: Tuyến Tour B2B */}
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1.25rem', whiteSpace: 'nowrap' }}>
                {isVi ? 'Tuyến Điểm Tour' : isTh ? 'โปรแกรมเส้นทาง' : 'Tour Routes'}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem' }}>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#pricing-terminal" className="footer-nav-link">
                    {isVi ? 'Đà Nẵng – Bà Nà – Hội An' : isTh ? 'ดานัง – บานาฮิลล์ – ฮอยอัน' : 'Da Nang – Ba Na – Hoi An'}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <button onClick={() => { if (onBack) onBack(); else window.location.href = '/'; }} className="footer-nav-link">
                    {isVi ? 'Miền Bắc (Hà Nội – Sa Pa – Ninh Bình)' : isTh ? 'ภาคเหนือ (ฮานอย – ซาปา – นิงห์บิงห์)' : 'North Vietnam Tours'}
                  </button>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <button onClick={() => { if (onBack) onBack(); else window.location.href = '/'; }} className="footer-nav-link">
                    {isVi ? 'Miền Nam (Sài Gòn – Mũi Né – Đà Lạt)' : isTh ? 'ภาคใต้ (ไซ่ง่อน – มุยเน่ – ดาลัด)' : 'South Vietnam Tours'}
                  </button>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <button onClick={() => { if (onBack) onBack(); else window.location.href = '/'; }} className="footer-nav-link">
                    {isVi ? 'Đảo Ngọc Phú Quốc' : isTh ? 'เกาะฟู้โกว๊ก (Phu Quoc)' : 'Phu Quoc Island'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Chính Sách B2B */}
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1.25rem', whiteSpace: 'nowrap' }}>
                {isVi ? 'Chính Sách Đại Lý' : isTh ? 'นโยบายตัวแทน' : 'Agent Policies'}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem' }}>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#pricing-terminal" className="footer-nav-link">
                    {agentConfig.isAgent || agentConfig.hideNet
                      ? (isVi ? 'Bảng Giá 2 - 14 Khách' : isTh ? 'ตารางราคา 2-14 ท่าน' : 'Rate Grid 2-14 Pax')
                      : (isVi ? 'Bảng Giá NET 2 - 14 Pax' : isTh ? 'ตารางราคา NET 2-14 ท่าน' : 'B2B Net Rate Grid')}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#pricing-terminal" className="footer-nav-link">
                    {isVi ? 'Công Cụ Tính Lợi Nhuận' : isTh ? 'ระบบคำนวณกำไร Margin' : 'Margin Calculator'}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#terms-section" className="footer-nav-link">
                    {isVi ? 'Quy Định Đặt Cọc & Hủy Phạt' : isTh ? 'เงื่อนไขมัดจำและยกเลิก' : 'Payment & Cancellation'}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#terms-section" className="footer-nav-link">
                    {isVi ? 'Chính Sách Giá Trẻ Em' : isTh ? 'ราคาสาหรับเด็ก' : 'Child Policy'}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#pricing-terminal" className="footer-nav-link">
                    {isVi ? 'Tùy Chọn Limousine VIP' : isTh ? 'อัปเกรดรถ Limousine' : 'Limousine Upgrade'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Hỗ Trợ Đối Tác Thái Lan (or Agent Custom Info) */}
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'nowrap' }}>
                {agentConfig.isAgent && agentConfig.name 
                  ? (isVi ? 'Đại Lý Tư Vấn Tour' : isTh ? 'ตัวแทนจำหน่ายที่ปรึกษา' : 'Authorized Travel Agent')
                  : (isVi ? 'Hỗ Trợ Đại Lý Thái Lan' : isTh ? 'ฝ่ายขายตลาดไทย (24/7)' : 'Thai Market Support (24/7)')}
              </div>

              {agentConfig.isAgent && agentConfig.name ? (
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '0.75rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '1rem' }}>
                    🏢 {agentConfig.name}
                  </div>
                  {agentConfig.tel && (
                    <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                      📞 Hotline: <a href={`tel:${agentConfig.tel}`} style={{ color: '#059669', fontWeight: 700, textDecoration: 'none' }}>{agentConfig.tel}</a>
                    </div>
                  )}
                  {agentConfig.line && (
                    <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                      💬 LINE ID: <span style={{ color: '#00b900', fontWeight: 800 }}>{agentConfig.line}</span>
                    </div>
                  )}
                </div>
              ) : (
              /* 3 QR Codes Grid (Line OA, Ms. Kim & Mr. Khanh) */
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.45rem'
              }}>
                
                {/* Line OA QR */}
                <div className="qr-card-interactive" style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '0.75rem',
                  padding: '0.5rem 0.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <a href="https://lin.ee/Pwro79k" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                    <img
                      src="/assets/qr-line-oa.png"
                      alt="GreenSea LINE OA QR"
                      style={{ width: '64px', height: '64px', borderRadius: '0.4rem', background: '#fff', padding: '2px', border: '1px solid #86efac', display: 'block', margin: '0 auto', transition: 'transform 0.2s' }}
                    />
                    <div style={{ fontWeight: 800, fontSize: '0.72rem', color: '#14532d', marginTop: '4px', whiteSpace: 'nowrap' }}>
                      LINE OA
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#00b900', fontWeight: 800, whiteSpace: 'nowrap' }}>
                      Official →
                    </div>
                  </a>
                </div>

                {/* Ms. Kim QR */}
                <div className="qr-card-interactive" style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  padding: '0.5rem 0.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <a href="https://line.me/ti/p/BSLZR5dyBa" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                    <img
                      src="/assets/qr-kim.png"
                      alt="Ms. Kim LINE QR"
                      style={{ width: '64px', height: '64px', borderRadius: '0.4rem', background: '#fff', padding: '2px', border: '1px solid #cbd5e1', display: 'block', margin: '0 auto', transition: 'transform 0.2s' }}
                    />
                    <div style={{ fontWeight: 800, fontSize: '0.72rem', color: '#0f172a', marginTop: '4px', whiteSpace: 'nowrap' }}>
                      Ms. Kim
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#00b900', fontWeight: 800, whiteSpace: 'nowrap' }}>
                      Direct →
                    </div>
                  </a>
                </div>

                {/* Mr. Khanh QR */}
                <div className="qr-card-interactive" style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  padding: '0.5rem 0.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <a href="https://line.me/ti/p/U1vOdylKTL" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                    <img
                      src="/assets/qr-khanh.png"
                      alt="Mr. Khanh LINE QR"
                      style={{ width: '64px', height: '64px', borderRadius: '0.4rem', background: '#fff', padding: '2px', border: '1px solid #cbd5e1', display: 'block', margin: '0 auto', transition: 'transform 0.2s' }}
                    />
                    <div style={{ fontWeight: 800, fontSize: '0.72rem', color: '#0f172a', marginTop: '4px', whiteSpace: 'nowrap' }}>
                      Mr. Khanh
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#00b900', fontWeight: 800, whiteSpace: 'nowrap' }}>
                      Direct →
                    </div>
                  </a>
                </div>

              </div>
              )}

            </div>

          </div>

          {/* Middle Section: GHOST WATERMARK TYPOGRAPHY (PAYSTRA-INSPIRED) */}
          <div style={{
            userSelect: 'none',
            pointerEvents: 'none',
            textAlign: 'center',
            margin: '2rem 0 -1rem',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
              fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-2px',
              lineHeight: 0.9,
              color: '#f1f5f9',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              {agentConfig.isAgent && agentConfig.name ? agentConfig.name.toUpperCase() : 'GREENSEA TOUR'}
            </div>
          </div>

          {/* Bottom Bar: Copyright + Legal Links */}
          <div style={{
            borderTop: '1px solid #f1f5f9',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: '#94a3b8'
          }}>
            <div>
              © 2026 {agentConfig.isAgent && agentConfig.name ? agentConfig.name : 'Green Sea Tour Co., Ltd.'}. {isVi ? 'Bảo lưu mọi quyền.' : isTh ? 'สงวนลิขสิทธิ์ทั้งหมด' : 'All rights reserved.'}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#64748b' }}>
                {isVi ? 'Chính Sách Bảo Mật' : isTh ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </span>
              <span style={{ color: '#64748b' }}>
                {isVi ? 'Điều Khoản Dịch Vụ' : isTh ? 'ข้อกำหนดการให้บริการ' : 'Terms of Service'}
              </span>
              {!agentConfig.isAgent && (
                <a
                  href="https://ttaa.or.th/des-member/Greensea-Tour-Land-Vietnam/5299/th"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#059669', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <img src="/assets/ttaa-icon.png" alt="TTAA" style={{ height: '14px', width: 'auto', objectFit: 'contain', verticalAlign: 'middle' }} />
                  <span>{isVi ? 'Hồ sơ TTAA No. 5299 ↗' : isTh ? 'ทะเบียน TTAA เลขที่ 5299 ↗' : 'TTAA Reg. No. 5299 ↗'}</span>
                </a>
              )}
              <span style={{ color: '#059669', fontWeight: 800 }}>
                {agentConfig.isAgent ? (isVi ? 'Chương Trình Tour Độc Quyền' : isTh ? 'โปรแกรมทัวร์มาตรฐานพรีเมียม' : 'Premium Tour Program') : (isVi ? 'DMC Đối Tác Thái Lan' : 'DMC for Thailand Market')}
              </span>
            </div>
          </div>

        </div>
      </footer>
  );
}
