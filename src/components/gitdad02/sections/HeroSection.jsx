import React from 'react';
import { Magnet } from '../../landing/ui/Magnet';
import { Calculator, Bus, Check, Compass, Copy, Download, Hotel, Award, Utensils } from 'lucide-react';

export default function HeroSection({
  isVi,
  isTh,
  language,
  currency,
  effectiveRate,
  calculation,
  selectedBand,
  agentConfig = {},
  formatPrice,
  handleCopyQuote,
  copiedQuote,
  agentMarginPercent = 15
}) {
  const baseNetUsd = 160;
  const startingPriceUsd = agentConfig.isAgent || agentConfig.hideNet
    ? Math.round(baseNetUsd * (1 + agentMarginPercent / 100))
    : baseNetUsd;
  const startingPriceThb = Math.round(startingPriceUsd * effectiveRate);

  return (
    <section style={{
      position: 'relative',
      minHeight: '520px',
      display: 'flex', alignItems: 'center',
      background: `linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 50%, transparent 85%), linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 45%), url('/assets/golden-bridge.jpg')`,
      backgroundSize: 'cover', backgroundPosition: 'center 35%', color: '#fff',
      padding: '3.5rem 2rem 4.5rem'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        
        {/* Top Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          padding: '0.35rem 0.85rem', borderRadius: '9999px',
          background: 'rgba(5, 150, 105, 0.35)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(52, 211, 153, 0.5)',
          fontSize: '0.78rem', fontWeight: 800, color: '#a7f3d0',
          marginBottom: '1rem'
        }}>
          <Bus size={14} style={{ color: '#34d399' }} />
          <span>{isVi ? 'TOUR ĐOÀN LỚN GIT (8 – 42 KHÁCH) • MÃ: GITDAD02' : isTh ? 'โปรแกรมทัวร์กรุ๊ปเหมา GIT (8 – 42 ท่าน) • รหัส: GITDAD02' : 'GROUP INCENTIVE TOUR (8 – 42 PAX) • CODE: GITDAD02'}</span>
        </div>

        {/* Majestic Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 3.8vw, 3rem)',
          fontWeight: 900,
          lineHeight: 1.2,
          margin: '0 0 0.5rem',
          maxWidth: '1050px',
          fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
          textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 4px 28px rgba(0,0,0,0.6)'
        }}>
          {isVi
            ? 'Đà Nẵng – Bà Nà Hills – Hội An'
            : isTh 
              ? 'ดานัง – บานาฮิลล์ – ฮอยอัน'
              : 'Da Nang – Ba Na Hills – Hoi An'}
        </h1>

        {/* Subtitle */}
        <div style={{ fontSize: '1.05rem', color: '#bae6fd', fontWeight: 700, marginBottom: '1.25rem', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
          {isVi 
            ? '(Nghỉ 1 Đêm Đỉnh Bà Nà Hills + 1 Đêm Khách Sạn 4 Sao Đà Nẵng)' 
            : isTh 
              ? '(พักบนยอดเขาบานาฮิลล์ 1 คืน + โรงแรม 4 ดาว ดานัง 1 คืน)' 
              : '(1 Night Ba Na Hills Peak + 1 Night 4-Star Hotel Da Nang City)'}
        </div>

        {/* Compact Route Breadcrumb */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem',
          background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)', padding: '0.45rem 0.95rem',
          borderRadius: '0.65rem', fontSize: '0.825rem', color: '#d1fae5', marginBottom: '1.75rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
        }}>
          <Compass size={15} style={{ color: '#34d399', flexShrink: 0 }} />
          <span style={{ color: '#a7f3d0', fontWeight: 800 }}>{isVi ? 'Tuyến điểm:' : isTh ? 'เส้นทาง:' : 'Route:'}</span>
          <span>{isVi ? 'Sân bay Đà Nẵng ➔ Cáp treo Bà Nà & Cầu Vàng ➔ Rừng dừa Bảy Mẫu ➔ Phố cổ Hội An ➔ Chùa Linh Ứng Sơn Trà' : isTh ? 'สนามบินดานัง ➔ ยอดเขาบานาฮิลล์ & สะพานมือ ➔ ล่องเรือกระด้ง ➔ เมืองโบราณฮอยอัน ➔ วัดลิงอึ๋ง' : 'Da Nang Airport ➔ Ba Na Hills & Golden Bridge ➔ Coconut Village ➔ Hoi An Town ➔ Linh Ung'}</span>
        </div>

        {/* 4 Feature Cards (Streamlined Compact Glass Design) */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0.75rem', marginBottom: '2rem', maxWidth: '1240px'
        }}>
          
          {/* Card 1: Mercure Ba Na */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.85rem', padding: '0.85rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(52, 211, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Hotel size={18} style={{ color: '#34d399' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff' }}>
                {isVi ? '1Đ Mercure Bà Nà 4*' : isTh ? 'พักบานาฮิลล์ 4* 1 คืน' : '1N Mercure Bana 4*'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#fde047', fontWeight: 700 }}>
                {isVi ? '✨ Đặc quyền Golden Hours' : isTh ? '✨ สิทธิพิเศษ Golden Hours' : '✨ Golden Hours Access'}
              </div>
            </div>
          </div>

          {/* Card 2: 2 Buffets + Lobster */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.85rem', padding: '0.85rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Utensils size={18} style={{ color: '#fbbf24' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff' }}>
                {isVi ? '2 Buffet + Tặng ½ Tôm Hùm' : isTh ? '2 บุฟเฟ่ต์ + กุ้งมังกร' : '2 Buffets + Lobster'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                {isVi ? 'Beer Plaza + Hải sản Long Qiao' : 'Beer Plaza + ซีฟู้ดสด'}
              </div>
            </div>
          </div>

          {/* Card 3: Coaches 29-45 Seats */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.85rem', padding: '0.85rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(96, 165, 250, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bus size={18} style={{ color: '#60a5fa' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff' }}>
                {isVi ? 'Xe Universe 29 - 45 Chỗ' : isTh ? 'รถบัส 29 - 45 ที่นั่ง' : '29 - 45 Seats Coach'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                {isVi ? 'Theo quy mô đoàn 8-42 pax' : 'จัดตามขนาดกรุ๊ป 8-42 ท่าน'}
              </div>
            </div>
          </div>

          {/* Card 4: FOC Tour Leader */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.85rem', padding: '0.85rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(244, 114, 182, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={18} style={{ color: '#f472b6' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff' }}>
                {isVi ? 'FOC 1 Trưởng Đoàn (Single)' : isTh ? 'ฟรีหัวหน้าทัวร์ 1 ท่าน' : '1 FOC Tour Leader'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                {isVi ? 'Áp dụng đoàn từ 15 pax' : 'สำหรับกรุ๊ป 15 ท่านขึ้นไป'}
              </div>
            </div>
          </div>

        </div>

        {/* Action CTAs & Unified Price Row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', background: 'rgba(15, 23, 42, 0.5)', padding: '0.85rem 1.25rem',
          borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <Magnet magnetStrength={0.32}>
              <a
                href="#pricing-terminal"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                  borderRadius: '0.65rem', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#fff', fontSize: '0.925rem', fontWeight: 800, textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)'
                }}
              >
                <Calculator size={17} />
                {agentConfig.isAgent 
                  ? (isVi ? 'Xem Báo Giá Tour Trọn Gói' : isTh ? 'ดูราคาทัวร์สุทธิต่อท่าน' : 'View Tour Pricing')
                  : (isVi ? 'Xem Bảng Giá & Tính Báo Giá Đoàn' : isTh ? 'คำนวณราคา NET & ทำใบเสนอราคา' : 'Calculate B2B Net Rates')}
              </a>
            </Magnet>

            {!agentConfig.isAgent && (
              <Magnet magnetStrength={0.25}>
                <a
                  href="/tours/GITDAD02.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.75rem 1.25rem',
                    borderRadius: '0.65rem', background: 'rgba(255, 255, 255, 0.12)',
                    color: '#fff', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Download size={16} />
                  {isVi ? 'Tải PDF B2B' : isTh ? 'ดาวน์โหลด PDF (B2B)' : 'Download PDF'}
                </a>
              </Magnet>
            )}

            <Magnet magnetStrength={0.32}>
              <button
                onClick={handleCopyQuote}
                type="button"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.75rem 1.25rem',
                  borderRadius: '0.65rem', background: copiedQuote ? '#16a34a' : 'rgba(0, 185, 0, 0.2)',
                  color: '#fff', fontSize: '0.875rem', fontWeight: 800,
                  border: '1px solid rgba(0, 185, 0, 0.5)', cursor: 'pointer'
                }}
              >
                {copiedQuote ? <Check size={16} /> : <Copy size={16} />}
                {copiedQuote 
                  ? (isVi ? 'Đã sao chép!' : 'คัดลอกแล้ว!') 
                  : (isVi ? 'Sao chép báo giá' : isTh ? 'คัดลอกข้อความ LINE' : 'Copy Quote')}
              </button>
            </Magnet>
          </div>

          {/* Starting Price Box */}
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
                {agentConfig.isAgent || agentConfig.hideNet 
                  ? (isVi ? 'Giá trọn gói từ' : isTh ? 'ราคาเริ่มต้นต่อท่าน' : 'Starting From')
                  : (isVi ? 'Giá NET B2B từ' : isTh ? 'ราคา NET B2B เริ่มต้น' : 'Starting Net')}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fde047', lineHeight: 1.1 }}>
                ${startingPriceUsd} <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>USD (฿{startingPriceThb.toLocaleString('en-US')}) / {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
