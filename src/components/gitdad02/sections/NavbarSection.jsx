import React from 'react';
import { ArrowLeft, UserCheck, Sparkles } from 'lucide-react';
import { VietnamFlag, ThailandFlag, UKFlag } from '../../landing/ui/Flags';

export default function NavbarSection({
  language,
  setLanguage,
  currency,
  setCurrency,
  isVi,
  isTh,
  agentConfig = {},
  onBack,
  onOpenQuote,
  onOpenWhiteLabel
}) {
  return (
    <header style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 100,
      maxWidth: '1240px',
      margin: '0 auto 1.5rem',
      padding: '0 1rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(226, 232, 240, 0.85)',
        borderRadius: '9999px',
        padding: '0.5rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Left: Brand / Logo or Back to Catalog */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={onBack || (() => window.location.href = '/')}
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.38rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              color: '#334155',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#00533d'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#334155'; }}
          >
            <ArrowLeft size={14} />
            <span>{isVi ? 'Catalog' : isTh ? 'กลับแคตตาล็อก' : 'Catalog'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/assets/logo-transparent.png" alt="Green Sea Tour" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <div>
              <div style={{
                fontWeight: 900,
                fontSize: '0.95rem',
                color: '#00533d',
                letterSpacing: '-0.3px',
                lineHeight: 1.1,
                fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif"
              }}>
                {agentConfig.isAgent && agentConfig.name ? agentConfig.name.toUpperCase() : 'GREEN SEA TOUR'}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {agentConfig.isAgent && agentConfig.name ? (isVi ? 'Đại Lý Lữ Hành' : 'Authorized Agent') : 'VIETNAM INBOUND DMC'}
              </div>
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f1f5f9',
          padding: '3px',
          borderRadius: '9999px',
          border: '1px solid #e2e8f0',
          gap: '2px'
        }}>
          <a href="#itinerary" style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none' }}>
            {isVi ? 'Lịch Trình' : isTh ? 'โปรแกรมทัวร์' : 'Itinerary'}
          </a>
          <a href="#flight-schedule-matching" style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none' }}>
            {isVi ? 'Lịch Bay' : isTh ? 'ตารางเที่ยวบิน' : 'Flights'}
          </a>
          <a href="#pricing-terminal" style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none' }}>
            {isVi ? 'Bảng Giá Đoàn GIT' : isTh ? 'ตารางราคา GIT' : 'GIT Rates'}
          </a>
          <a href="#faq-section" style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none' }}>
            {isVi ? 'FAQ' : isTh ? 'คำถามที่พบบ่อย' : 'FAQ'}
          </a>
        </nav>

        {/* Right: Actions Island */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!agentConfig.isAgent && (
            <button
              onClick={onOpenWhiteLabel}
              type="button"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.38rem 0.85rem', borderRadius: '9999px',
                background: '#f8fafc', border: '1px solid #cbd5e1',
                color: '#334155', fontSize: '0.78rem', fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <UserCheck size={14} style={{ color: '#059669' }} />
              <span>{isVi ? 'Chế độ Đại lý' : isTh ? 'โหมดตัวแทน' : 'Agent Mode'}</span>
            </button>
          )}

          {/* 3-Flag Segmented Control */}
          <div style={{
            display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '2px',
            borderRadius: '9999px', border: '1px solid #e2e8f0', gap: '2px'
          }}>
            <button
              onClick={() => setLanguage('VI')}
              title="Tiếng Việt"
              style={{
                padding: '3px 6px', borderRadius: '9999px', border: 'none',
                background: language === 'VI' ? '#00533d' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: language === 'VI' ? 1 : 0.55
              }}
            >
              <VietnamFlag width={18} height={12} />
            </button>
            <button
              onClick={() => setLanguage('TH')}
              title="ภาษาไทย"
              style={{
                padding: '3px 6px', borderRadius: '9999px', border: 'none',
                background: language === 'TH' ? '#00533d' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: language === 'TH' ? 1 : 0.55
              }}
            >
              <ThailandFlag width={18} height={12} />
            </button>
            <button
              onClick={() => setLanguage('EN')}
              title="English"
              style={{
                padding: '3px 6px', borderRadius: '9999px', border: 'none',
                background: language === 'EN' ? '#00533d' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: language === 'EN' ? 1 : 0.55
              }}
            >
              <UKFlag width={18} height={12} />
            </button>
          </div>

          {/* Currency Toggle */}
          <div style={{
            display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '2px',
            borderRadius: '9999px', border: '1px solid #e2e8f0', gap: '2px'
          }}>
            <button
              onClick={() => setCurrency('USD')}
              style={{
                padding: '0.25rem 0.55rem', borderRadius: '9999px', border: 'none',
                background: currency === 'USD' ? '#00533d' : 'transparent',
                color: currency === 'USD' ? '#ffffff' : '#64748b',
                fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer'
              }}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('THB')}
              style={{
                padding: '0.25rem 0.55rem', borderRadius: '9999px', border: 'none',
                background: currency === 'THB' ? '#00533d' : 'transparent',
                color: currency === 'THB' ? '#ffffff' : '#64748b',
                fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer'
              }}
            >
              ฿ THB
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
