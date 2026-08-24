import React from 'react';
import { VietnamFlag, ThailandFlag, UKFlag } from '../ui/Flags';
import { ArrowLeft, MessageSquare, Phone, UserCheck } from 'lucide-react';

export default function NavbarSection({ language, setLanguage, currency, setCurrency, isVi, isTh, agentConfig, onBack, onOpenQuote, onOpenWhiteLabel, setShowAgentModal, setShowQuoteModal }) {
  return (
    <>
      {/* 1. REACTBITS FLOATING GLASS NAVBAR */}
      <div style={{ position: 'sticky', top: '0.75rem', zIndex: 1000, maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <header style={{
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.85)',
          borderRadius: '9999px',
          padding: '0.45rem 1rem 0.45rem 0.65rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          boxShadow: '0 10px 35px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8) inset'
        }}>
          {/* Left: Catalog Pill + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {!agentConfig.isAgent && (
              <button
                onClick={() => {
                  if (onBack) onBack();
                  else window.location.href = '/';
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.38rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.color = '#00533d'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
              >
                <ArrowLeft size={13} />
                <span>{isVi ? 'Catalog' : isTh ? 'แคตตาล็อก' : 'Catalog'}</span>
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {agentConfig.isAgent ? (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff', fontWeight: 900, fontSize: '1rem',
                  boxShadow: '0 2px 6px rgba(5,150,105,0.3)', flexShrink: 0
                }}>
                  {agentConfig.name ? agentConfig.name.charAt(0).toUpperCase() : '✈️'}
                </div>
              ) : (
                <img src="/assets/logo-transparent.png" alt="Logo" style={{ height: '30px', width: '30px', objectFit: 'contain' }} />
              )}
              <div className="hidden sm:block">
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#00533d', letterSpacing: '-0.3px', lineHeight: 1.1, fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                  {agentConfig.isAgent ? (agentConfig.name ? agentConfig.name.toUpperCase() : 'TRAVEL AGENCY') : 'GREEN SEA TOUR'}
                </div>
                <div style={{ fontSize: '0.62rem', color: '#059669', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  {agentConfig.isAgent ? (isVi ? 'Đại Lý Phân Phối' : 'ตัวแทนท่องเที่ยว') : (isVi ? 'Vietnam Inbound DMC' : 'Vietnam Land Tour')}
                </div>
              </div>
            </div>
          </div>

          {/* Center: Main Navigation Capsule */}
          <nav className="hidden lg:flex" style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f1f5f9',
            padding: '3px',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            gap: '2px'
          }}>
            <a
              href="#scroll-split-section"
              style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00533d'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {isVi ? '3 Thế Mạnh' : isTh ? '3 จุดเด่น' : '3 Advantages'}
            </a>
            <a
              href="#itinerary"
              style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00533d'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {isVi ? 'Lịch Trình' : isTh ? 'โปรแกรมทัวร์' : 'Itinerary'}
            </a>
            <a
              href="#flight-schedule-matching"
              style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00533d'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {isVi ? 'Lịch Bay' : isTh ? 'ตารางเที่ยวบิน' : 'Flights'}
            </a>
            <a
              href="#pricing-terminal"
              style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00533d'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {isVi ? 'Bảng Giá B2B' : isTh ? 'ตารางราคา B2B' : 'B2B Rates'}
            </a>
            <a
              href="#faq-section"
              style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00533d'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {isVi ? 'FAQ' : isTh ? 'คำถามที่พบบ่อย' : 'FAQ'}
            </a>
          </nav>

          {/* Right: Actions Island */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!agentConfig.isAgent && (
              <button
                onClick={onOpenWhiteLabel || (() => setShowAgentModal && setShowAgentModal(true))}
                type="button"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.38rem 0.85rem', borderRadius: '9999px',
                  background: '#f8fafc',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
                  transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ecfdf5'; e.currentTarget.style.borderColor = '#a7f3d0'; e.currentTarget.style.color = '#00533d'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
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
                  transition: 'all 0.15s',
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
                  transition: 'all 0.15s',
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
                  transition: 'all 0.15s',
                  opacity: language === 'EN' ? 1 : 0.55
                }}
              >
                <UKFlag width={18} height={12} />
              </button>
            </div>

            {/* WhatsApp / LINE Micro Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <a
                href={agentConfig.isAgent && agentConfig.tel ? `tel:${agentConfig.tel}` : "https://wa.me/84987434343"}
                target={agentConfig.isAgent && agentConfig.tel ? "_self" : "_blank"}
                rel="noreferrer"
                title={agentConfig.isAgent && agentConfig.tel ? `Hotline: ${agentConfig.tel}` : 'WhatsApp (+84) 987.43.43.43'}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '28px', height: '28px', borderRadius: '9999px',
                  background: '#25D366', color: '#fff', textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(37, 211, 102, 0.25)', transition: 'transform 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Phone size={13} />
              </a>

              <a
                href={agentConfig.isAgent && agentConfig.line ? (agentConfig.line.startsWith('http') ? agentConfig.line : `https://line.me/ti/p/~${agentConfig.line.replace('@', '')}`) : "https://lin.ee/Pwro79k"}
                target="_blank"
                rel="noreferrer"
                title={agentConfig.isAgent && agentConfig.line ? `LINE ID: ${agentConfig.line}` : 'LINE Official (Green Sea Tour)'}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '28px', height: '28px', borderRadius: '9999px',
                  background: '#00b900', color: '#fff', textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(0, 185, 0, 0.25)', transition: 'transform 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <MessageSquare size={13} />
              </a>
            </div>
          </div>
        </header>
      </div>

    </>
  );
}
