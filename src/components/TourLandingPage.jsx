import React, { useState, useMemo } from 'react';
import {
  Calendar, MapPin, Users, Hotel, Car, Utensils, ShieldCheck, Download,
  Phone, MessageSquare, CheckCircle, XCircle, ArrowLeft, Globe2, DollarSign,
  ChevronDown, ChevronUp, Star, Award, Sparkles, Send, Clock, HelpCircle,
  ExternalLink, ArrowRight
} from 'lucide-react';

const EXCHANGE_RATE = 35; // 1 USD = 35 THB

function formatMoney(amount, currency) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
  if (currency === 'THB') {
    return `฿${Math.round(amount * EXCHANGE_RATE).toLocaleString('en-US')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

export default function TourLandingPage({ tour, onBack, initialLanguage = 'TH', initialCurrency = 'USD' }) {
  const [language, setLanguage] = useState(initialLanguage); // 'TH' or 'EN'
  const [currency, setCurrency] = useState(initialCurrency); // 'USD' or 'THB'
  
  // Pricing calculator state
  const bands = useMemo(() => {
    if (!tour.priceRows || tour.priceRows.length === 0) return [];
    return tour.priceRows[0]?.cells?.map(c => c.band) || [];
  }, [tour]);

  const [selectedBand, setSelectedBand] = useState(() => bands[0] || '2-4 pax');
  const [paxCount, setPaxCount] = useState(2);
  const [needSingleRoom, setNeedSingleRoom] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    departureDate: '',
    pax: 2,
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Calculated Price
  const currentPricePerPax = useMemo(() => {
    const mainRow = tour.priceRows?.[0];
    if (!mainRow) return tour.priceFrom || 0;
    const match = mainRow.cells?.find(c => c.band === selectedBand);
    return match ? match.value : tour.priceFrom || 0;
  }, [tour, selectedBand]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isTh = language === 'TH';

  return (
    <div className="landing-page-root" style={{ background: '#f8fafc', color: '#1e293b', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* 1. TOPBAR */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0', padding: '0.75rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.85rem',
              borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#fff',
              fontSize: '0.875rem', fontWeight: 600, color: '#475569', cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            {isTh ? 'กลับสู่แคตตาล็อก' : 'All Tours'}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#006f52', letterSpacing: '-0.5px' }}>
              GREEN SEA TOUR
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Currency switch */}
          <button
            onClick={() => setCurrency(c => c === 'USD' ? 'THB' : 'USD')}
            style={{
              padding: '0.4rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1',
              background: '#fff', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer'
            }}
          >
            {currency}
          </button>

          {/* Language switch */}
          <button
            onClick={() => setLanguage(l => l === 'TH' ? 'EN' : 'TH')}
            style={{
              padding: '0.4rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1',
              background: '#fff', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer'
            }}
          >
            {language}
          </button>

          {/* Direct WhatsApp / Call */}
          <a
            href="tel:+84905123456"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem',
              borderRadius: '0.5rem', background: '#006f52', color: '#fff', fontSize: '0.875rem',
              fontWeight: 600, textDecoration: 'none'
            }}
          >
            <Phone size={15} />
            <span className="hidden-mobile">Hotline</span>
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        position: 'relative', minHeight: '480px', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('${tour.heroPhoto || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=85'}')`,
        backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', padding: '3.5rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{
              background: tour.packageType === 'FIT' ? '#0284c7' : '#e11d48',
              color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700
            }}>
              {tour.packageType} PACKAGE
            </span>
            <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
              {tour.region}
            </span>
            <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
              CODE: {tour.code}
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem', maxWidth: '850px' }}>
            {tour.title}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#e2e8f0', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={18} style={{ color: '#38bdf8' }} />
            {tour.route}
          </p>

          {/* Quick Info Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
            borderRadius: '1rem', padding: '1.25rem', maxWidth: '900px', marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={22} style={{ color: '#38bdf8' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isTh ? 'ระยะเวลา' : 'Duration'}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tour.duration} {isTh ? 'วัน' : 'Days'} ({tour.nights})</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Hotel size={22} style={{ color: '#38bdf8' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isTh ? 'โรงแรม' : 'Hotel'}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>4-Star Standard</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Users size={22} style={{ color: '#38bdf8' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isTh ? 'ขนาดกรุ๊ป' : 'Group Size'}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tour.groupRange}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Car size={22} style={{ color: '#38bdf8' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isTh ? 'ออกเดินทาง' : 'Departure'}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{isTh ? 'ออกเดินทางทุกวัน' : 'Daily Departure'}</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#lead-form"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem',
                borderRadius: '0.65rem', background: '#e11d48', color: '#fff', fontSize: '1rem',
                fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)'
              }}
            >
              <Sparkles size={18} />
              {isTh ? 'ขอใบเสนอราคา / จองทัวร์' : 'Get Instant Quote'}
            </a>

            {tour.individualPdfLink && (
              <a
                href={tour.individualPdfLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.5rem',
                  borderRadius: '0.65rem', background: 'rgba(255, 255, 255, 0.15)', color: '#fff',
                  fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <Download size={18} />
                {isTh ? 'ดาวน์โหลดโปรแกรม PDF' : 'Download PDF'}
              </a>
            )}

            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{isTh ? 'ราคาเริ่มต้นเพียง' : 'Starting from'}</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#facc15' }}>
                {formatMoney(tour.priceFrom, currency)} <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500 }}>/ {isTh ? 'ท่าน' : 'pax'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 KEY USPs / HIGHLIGHTS BENTO */}
      <section style={{ maxWidth: '1200px', margin: '-2.5rem auto 3rem', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {(tour.usps || []).map((usp, idx) => (
            <div key={idx} style={{
              background: '#fff', borderRadius: '1rem', padding: '1.5rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '0.75rem', background: '#ecfdf5',
                color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                {idx === 0 && <Hotel size={22} />}
                {idx === 1 && <Utensils size={22} />}
                {idx === 2 && <Car size={22} />}
                {idx === 3 && <Users size={22} />}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0f172a' }}>
                {isTh ? usp.titleTh : usp.titleEn}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                {isTh ? usp.descTh : usp.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAIN 2-COLUMN LAYOUT: CONTENT + STICKY LEAD FORM */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 5rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem' }}>
        
        {/* LEFT COLUMN: ITINERARY & DETAILS */}
        <div>
          {/* Section: Visual Itinerary */}
          <section style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Calendar size={24} style={{ color: '#006f52' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                {isTh ? 'โปรแกรมการเดินทางโดยละเอียด' : 'Detailed Itinerary'}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {(tour.itinerary || []).map((day, idx) => (
                <div key={idx} style={{
                  border: '1px solid #e2e8f0', borderRadius: '0.85rem', overflow: 'hidden',
                  background: '#f8fafc'
                }}>
                  {/* Day Header with Scenic Photo */}
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img 
                      src={day.photo || tour.heroPhoto} 
                      alt={`Day ${day.day}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85), transparent 70%)',
                      display: 'flex', alignItems: 'flex-end', padding: '1rem 1.25rem'
                    }}>
                      <div>
                        <span style={{ background: '#006f52', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '0.375rem', marginRight: '0.5rem' }}>
                          {isTh ? `วันที่ ${day.day}` : `DAY ${day.day}`}
                        </span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                          {isTh ? (day.titleTh || day.title) : (day.title || day.titleTh)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Day Content */}
                  <div style={{ padding: '1.25rem' }}>
                    <ul style={{ margin: '0 0 1rem', paddingLeft: '1.25rem', color: '#334155', lineHeight: 1.6, fontSize: '0.925rem' }}>
                      {(isTh ? (day.notesTh?.length ? day.notesTh : day.notes) : day.notes)?.map((note, nIdx) => (
                        <li key={nIdx} style={{ marginBottom: '0.35rem' }}>{note}</li>
                      ))}
                    </ul>

                    {/* Meal & Hotel Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px dashed #cbd5e1' }}>
                      {day.lunch && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#065f46', fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '0.375rem', fontWeight: 600 }}>
                          <Utensils size={13} />
                          <span>{isTh ? 'มื้อกลางวัน:' : 'Lunch:'} {day.lunch}</span>
                        </div>
                      )}
                      {day.dinner && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#eff6ff', color: '#1e40af', fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '0.375rem', fontWeight: 600 }}>
                          <Utensils size={13} />
                          <span>{isTh ? 'มื้อค่ำ:' : 'Dinner:'} {day.dinner}</span>
                        </div>
                      )}
                      {day.overnightTh && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fdf4ff', color: '#86198f', fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '0.375rem', fontWeight: 600 }}>
                          <Hotel size={13} />
                          <span>{day.overnightTh}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Interactive Price Calculator */}
          <section style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <DollarSign size={24} style={{ color: '#006f52' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                {isTh ? 'ตารางราคาและคำนวณราคาตามจำนวนผู้เดินทาง' : 'Pricing & Group Calculator'}
              </h2>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {isTh 
                ? 'เลือกขนาดกลุ่มเดินทางของท่านเพื่อตรวจสอบราคาต่อท่านและค่าใช้จ่ายรวมโดยประมาณ:' 
                : 'Select your group size band to check exact per-pax rates and estimated group cost:'}
            </p>

            {/* Band Selector */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {bands.map((band) => (
                <button
                  key={band}
                  type="button"
                  onClick={() => setSelectedBand(band)}
                  style={{
                    padding: '0.6rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 700,
                    cursor: 'pointer', border: '1px solid',
                    borderColor: selectedBand === band ? '#006f52' : '#cbd5e1',
                    background: selectedBand === band ? '#ecfdf5' : '#fff',
                    color: selectedBand === band ? '#006f52' : '#475569'
                  }}
                >
                  {band} {isTh ? 'ท่าน' : 'pax'}
                </button>
              ))}
            </div>

            {/* Price Preview Card */}
            <div style={{
              background: '#f8fafc', borderRadius: '0.75rem', padding: '1.5rem',
              border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {isTh ? `ราคาต่อท่าน (กลุ่ม ${selectedBand} คน):` : `Per Pax Rate (${selectedBand}):`}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#006f52' }}>
                  {formatMoney(currentPricePerPax, currency)}
                </div>
              </div>

              {tour.priceRows?.[0]?.single && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{isTh ? 'พักเดี่ยว (Single Supp.):' : 'Single Supplement:'}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e11d48' }}>
                    {tour.priceRows[0].single}
                  </div>
                </div>
              )}
            </div>

            {/* Surcharges note */}
            {tour.surcharges && tour.surcharges.length > 0 && (
              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#fffbeb', borderRadius: '0.5rem', border: '1px solid #fef3c7', fontSize: '0.85rem', color: '#92400e' }}>
                <strong>{isTh ? '⚠️ ช่วงวันหยุด / ฤดูกาลพิเศษ:' : '⚠️ Seasonal Surcharges:'}</strong>
                <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.25rem' }}>
                  {tour.surcharges.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Section: Inclusions & Exclusions */}
          <section style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>
              {isTh ? 'เงื่อนไขและบริการที่รวมในแพ็กเกจ' : 'Package Inclusions & Policies'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Inclusions */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', margin: '0 0 0.75rem', fontSize: '1rem' }}>
                  <CheckCircle size={18} />
                  {isTh ? 'ราคานี้รวม (Inclusions)' : 'Inclusions'}
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
                  {(isTh ? tour.inclusionsTh : tour.inclusions)?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e11d48', margin: '0 0 0.75rem', fontSize: '1rem' }}>
                  <XCircle size={18} />
                  {isTh ? 'ราคานี้ไม่รวม (Exclusions)' : 'Exclusions'}
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
                  {(isTh ? tour.exclusionsTh : tour.exclusions)?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: FAQs */}
          <section style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <HelpCircle size={24} style={{ color: '#006f52' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                {isTh ? 'คำถามที่พบบ่อย (FAQs)' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(tour.faqs || []).map((faq, idx) => (
                <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%', padding: '1rem 1.25rem', background: '#f8fafc', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', textAlign: 'left', cursor: 'pointer'
                    }}
                  >
                    <span>{isTh ? faq.qTh : faq.qEn}</span>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '1rem 1.25rem', background: '#fff', fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #e2e8f0' }}>
                      {isTh ? faq.aTh : faq.aEn}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STICKY BOOKING / LEAD CAPTURE FORM */}
        <div>
          <div id="lead-form" style={{
            position: 'sticky', top: '5rem', background: '#fff', borderRadius: '1rem',
            padding: '2rem', border: '1px solid #e2e8f0',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={20} style={{ color: '#e11d48' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                {isTh ? 'ขอใบเสนอราคาด่วน' : 'Inquire / Request Quote'}
              </h3>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#64748b', margin: '0 0 1.25rem' }}>
              {isTh ? 'กรอกข้อมูลเพื่อรับใบเสนอราคาพิเศษพร้อมเงื่อนไขที่ดีที่สุด:' : 'Fill out the form to receive customized pricing & full proposal:'}
            </p>

            {submitted ? (
              <div style={{ background: '#ecfdf5', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', color: '#065f46' }}>
                <CheckCircle size={44} style={{ color: '#059669', margin: '0 auto 0.75rem' }} />
                <h4 style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
                  {isTh ? 'ส่งข้อมูลสำเร็จ!' : 'Inquiry Sent Successfully!'}
                </h4>
                <p style={{ fontSize: '0.85rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  {isTh ? 'เจ้าหน้าที่ Green Sea Tour จะติดต่อกลับหาท่านภายใน 15 นาที' : 'Our representative will contact you within 15 minutes.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#059669', color: '#fff',
                    border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer'
                  }}
                >
                  {isTh ? 'Gửi yêu cầu khác' : 'Send Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    {isTh ? 'ชื่อผู้ติดต่อ (Full Name)' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isTh ? 'เช่น คุณสมชาย' : 'e.g. John Doe'}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    {isTh ? 'เบอร์โทร / WhatsApp / LINE' : 'Phone / WhatsApp / Line'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+84 / +66..."
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      {isTh ? 'จำนวนคน' : 'Pax'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.pax}
                      onChange={e => setFormData({ ...formData, pax: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      {isTh ? 'วันที่เดินทาง' : 'Date'}
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    {isTh ? 'ข้อความเพิ่มเติม / ความต้องการพิเศษ' : 'Special Notes'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={isTh ? 'เช่น ต้องการไกด์ภาษาไทย, อัปเกรดโรงแรม...' : 'e.g. Thai speaking guide...'}
                    value={formData.note}
                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '0.85rem', borderRadius: '0.5rem', background: '#e11d48',
                    color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
                  }}
                >
                  <Send size={16} />
                  {isTh ? 'ส่งคำขอรับใบเสนอราคา' : 'Submit Inquiry'}
                </button>
              </form>
            )}

            {/* Direct Instant Chat Buttons */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {isTh ? 'ติดต่อด่วนผ่านช่องทางตรง:' : 'Direct Support Channels:'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <a
                  href="https://zalo.me/0905123456"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    padding: '0.5rem', borderRadius: '0.375rem', background: '#0068ff', color: '#fff',
                    textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600
                  }}
                >
                  <MessageSquare size={14} />
                  Zalo Chat
                </a>

                <a
                  href="https://wa.me/84905123456"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    padding: '0.5rem', borderRadius: '0.375rem', background: '#25D366', color: '#fff',
                    textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600
                  }}
                >
                  <Phone size={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '3rem 1.5rem', borderTop: '1px solid #334155' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.35rem' }}>
              GREEN SEA TOUR CO., LTD
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              Vietnam Land Tour Operator & B2B Travel Solutions
            </div>
          </div>

          <div style={{ fontSize: '0.85rem' }}>
            © 2026 Green Sea Tour. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
