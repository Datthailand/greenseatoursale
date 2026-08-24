import React, { useState, useMemo } from 'react';
import {
  ChevronDown, ChevronUp, Search, X, Copy, Check, Sparkles, Plane,
  Hotel, Utensils, FileCheck, ShieldCheck, ShieldAlert, Clock, Car,
  HelpCircle, MessageCircle, ArrowUpRight, Maximize2, CheckCircle2,
  ExternalLink, Calculator, BookOpen
} from 'lucide-react';
import { FITDAD01_FAQS, FAQ_CATEGORIES } from '../../../data/faqs';

export default function FaqSection({
  isVi,
  isTh,
  expandedFaqId,
  setExpandedFaqId,
  onOpenFaqModal,
  onOpenQuoteDrawer,
  onOpenWhiteLabel
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFaqId, setCopiedFaqId] = useState(null);

  // Category Icon Resolver
  const getCategoryIcon = (iconName, size = 12) => {
    switch (iconName) {
      case 'Plane': return <Plane size={size} />;
      case 'Clock': return <Clock size={size} />;
      case 'Car': return <Car size={size} />;
      case 'Hotel': return <Hotel size={size} />;
      case 'Utensils': return <Utensils size={size} />;
      case 'FileCheck': return <FileCheck size={size} />;
      case 'ShieldAlert': return <ShieldAlert size={size} />;
      case 'ShieldCheck': return <ShieldCheck size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return FITDAD01_FAQS.filter((faq) => {
      // Category match
      const matchCat = activeCategory === 'all' || faq.categoryKey === activeCategory;
      if (!matchCat) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const qText = ((isVi ? faq.questionVi : isTh ? faq.questionTh : faq.questionEn) || '').toLowerCase();
      const aText = ((isVi ? faq.answerVi : isTh ? faq.answerTh : faq.answerEn) || '').toLowerCase();
      const catText = ((isVi ? faq.categoryVi : isTh ? faq.categoryTh : faq.categoryEn) || '').toLowerCase();
      return qText.includes(q) || aText.includes(q) || catText.includes(q);
    });
  }, [activeCategory, searchQuery, isVi, isTh]);

  // Copy Answer Text to Clipboard
  const handleCopyAnswer = (e, faq) => {
    e.stopPropagation();
    const q = isVi ? faq.questionVi : isTh ? faq.questionTh : faq.questionEn;
    const a = isVi ? faq.answerVi : isTh ? faq.answerTh : faq.answerEn;
    const shareText = `[${isVi ? faq.categoryVi : isTh ? faq.categoryTh : faq.categoryEn}]
Q: ${q}
A: ${a}
(Green Sea Tour - B2B Vietnam DMC)`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedFaqId(faq.id);
      setTimeout(() => setCopiedFaqId(null), 2200);
    });
  };

  // Expand / Collapse all handlers
  const handleToggleExpandAll = () => {
    if (expandedFaqId === 'all') {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId('all');
    }
  };

  return (
    <section id="faq-section" style={{ maxWidth: '1240px', margin: '0 auto 4rem', padding: '0 2rem', position: 'relative' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '1.25rem',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)'
      }}>

        {/* 1. Header with Clean Typography */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{
            fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '0.4rem'
          }}>
            {isVi ? 'Giải Đáp Thắc Mắc Thường Gặp B2B' : isTh ? 'คำถามที่พบบ่อยสำหรับตัวแทนท่องเที่ยว (FAQ)' : 'Frequently Asked Questions (B2B FAQ)'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '780px', margin: '0 auto', lineHeight: 1.5 }}>
            {isVi
              ? 'Các quy định điều hành, xử lý giờ bay, cơ cấu phòng lẻ và quyền lợi dành riêng cho đối tác.'
              : isTh
              ? 'สรุปข้อมูลการบริหารจัดการเที่ยวบิน การจัดห้องพัก และสิทธิประโยชน์พิเศษสำหรับพันธมิตรเอเจนซี่'
              : 'Operations guidelines, flight logistics, odd rooming policy, and DMC benefits for travel partners.'}
          </p>
        </div>

        {/* 2. Search & Quick Filters Bar - 2 Clean Distinct Rows */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          marginBottom: '1rem',
          padding: '0.85rem 1rem',
          background: '#f8fafc',
          borderRadius: '0.85rem',
          border: '1px solid #e2e8f0'
        }}>
          {/* DÒNG 1: Ô Tìm kiếm bên trái + 2 Nút Thao tác bên phải */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%'
          }}>
            {/* Ô Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
              <Search size={15} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isVi
                    ? 'Tìm kiếm nhanh (ví dụ: giờ bay, phòng lẻ, buffet tôm hùm, visa, trẻ em...)'
                    : isTh
                    ? 'ค้นหาคำถาม (เช่น เวลาบิน, ห้องเดี่ยว, บุฟเฟ่ต์กุ้งมังกร, วีซ่า, เด็ก...)'
                    : 'Search FAQ (e.g. flight arrival, single room, lobster buffet, visa, child docs...)'
                }
                style={{
                  width: '100%',
                  padding: '0.55rem 2.25rem 0.55rem 2.35rem',
                  borderRadius: '0.55rem',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.15s ease'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.7rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* 2 Nút Actions bên phải Dòng 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <button
                onClick={handleToggleExpandAll}
                style={{
                  padding: '0.48rem 0.75rem',
                  borderRadius: '0.55rem',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  height: '35px',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                {expandedFaqId === 'all'
                  ? (isVi ? 'Thu gọn tất cả' : isTh ? 'ย่อทั้งหมด' : 'Collapse All')
                  : (isVi ? 'Mở tất cả' : isTh ? 'ขยายทั้งหมด' : 'Expand All')}
              </button>

              {onOpenFaqModal && (
                <button
                  onClick={onOpenFaqModal}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.48rem 0.75rem',
                    borderRadius: '0.55rem',
                    border: '1px solid #059669',
                    background: '#f0fdf4',
                    color: '#047857',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    height: '35px'
                  }}
                >
                  <BookOpen size={13} />
                  <span>{isVi ? 'Sổ tay tra cứu B2B' : isTh ? 'คู่มือค้นหา B2B' : 'B2B Quick Handbook'}</span>
                </button>
              )}
            </div>
          </div>

          {/* DÒNG 2: Toàn bộ Category Pills trên 1 hàng phẳng riêng */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.35rem',
            width: '100%'
          }}>
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = cat.key === 'all'
                ? FITDAD01_FAQS.length
                : FITDAD01_FAQS.filter(f => f.categoryKey === cat.key).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 700 : 600,
                    border: isActive ? '1px solid #059669' : '1px solid #cbd5e1',
                    background: isActive ? '#059669' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>{getCategoryIcon(cat.iconName, 11)}</span>
                  <span>{isVi ? cat.labelVi : isTh ? cat.labelTh : cat.labelEn}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '0.02rem 0.35rem',
                    borderRadius: '9999px',
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#64748b',
                    fontWeight: 800
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Results Count Notice */}
        {searchQuery && (
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.65rem', fontWeight: 600 }}>
            {isVi
              ? `Tìm thấy ${filteredFaqs.length} câu hỏi phù hợp cho từ khóa "${searchQuery}"`
              : isTh
              ? `พบ ${filteredFaqs.length} คำถามที่ตรงกับ "${searchQuery}"`
              : `Found ${filteredFaqs.length} results matching "${searchQuery}"`}
          </div>
        )}

        {/* 4. FAQ Cards List - Ultra Compact Spacing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1.25rem', background: '#f8fafc', borderRadius: '0.85rem', border: '1px dashed #cbd5e1' }}>
              <HelpCircle size={28} style={{ color: '#94a3b8', marginBottom: '0.35rem' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.2rem' }}>
                {isVi ? 'Không tìm thấy câu hỏi phù hợp' : isTh ? 'ไม่พบคำถามที่ตรงกับการค้นหา' : 'No matching questions found'}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                {isVi ? 'Thử tìm với từ khóa khác hoặc liên hệ hotline để được giải đáp ngay.' : isTh ? 'ลองค้นหาด้วยคำสำคัญอื่น หรือติดต่อเราเพื่อสอบถามโดยตรง' : 'Try different keywords or contact our team directly.'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, fIdx) => {
              const isExpanded = expandedFaqId === 'all' || expandedFaqId === faq.id;
              const isCopied = copiedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  style={{
                    border: isExpanded ? '1.5px solid #059669' : '1px solid #e2e8f0',
                    borderRadius: '0.65rem',
                    background: isExpanded ? '#ffffff' : '#f8fafc',
                    boxShadow: isExpanded ? '0 6px 16px -3px rgba(5, 150, 105, 0.1)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  className="faq-card-interactive"
                >
                  {/* Header Block: Ultra Compact Padding & Tight Row Gap */}
                  <div
                    onClick={() => {
                      if (expandedFaqId === 'all') {
                        setExpandedFaqId(faq.id);
                      } else {
                        setExpandedFaqId(isExpanded ? null : faq.id);
                      }
                    }}
                    style={{
                      padding: '0.6rem 0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Row 1: Number + Category Badge + Tag */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
                        <span style={{
                          width: '19px',
                          height: '19px',
                          borderRadius: '50%',
                          background: isExpanded ? '#059669' : '#e2e8f0',
                          color: isExpanded ? '#ffffff' : '#475569',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          flexShrink: 0
                        }}>
                          {fIdx + 1}
                        </span>

                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          background: isExpanded ? '#ecfdf5' : '#f1f5f9',
                          color: isExpanded ? '#047857' : '#475569',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {getCategoryIcon(faq.iconName, 10)}
                          <span>{isVi ? faq.categoryVi : isTh ? faq.categoryTh : faq.categoryEn}</span>
                        </span>

                        {faq.tagVi && (
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: '#059669',
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            padding: '0.08rem 0.35rem',
                            borderRadius: '9999px'
                          }}>
                            {isVi ? faq.tagVi : isTh ? faq.tagTh : faq.tagEn}
                          </span>
                        )}
                      </div>

                      {/* Row 2: Full Width Question Heading */}
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.4,
                        margin: 0,
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        fontFamily: isTh ? "'Prompt', sans-serif" : "inherit"
                      }}>
                        {isVi ? faq.questionVi : isTh ? faq.questionTh : faq.questionEn}
                      </div>
                    </div>

                    {/* Circular Chevron Arrow */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isExpanded ? '#ecfdf5' : '#ffffff',
                      border: isExpanded ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                      color: isExpanded ? '#059669' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      <ChevronDown size={13} />
                    </div>
                  </div>

                  {/* Expanded Answer with Structured Widgets */}
                  {isExpanded && (
                    <div style={{
                      padding: '0 0.95rem 0.8rem 0.95rem',
                      borderTop: '1px dashed #e2e8f0',
                      animation: 'fadeIn 0.15s ease forwards'
                    }}>
                      {/* Main Paragraph Text */}
                      <div style={{
                        color: '#334155',
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        whiteSpace: 'pre-line',
                        paddingTop: '0.6rem',
                        marginBottom: '0.6rem'
                      }}>
                        {isVi ? faq.answerVi : isTh ? faq.answerTh : faq.answerEn}
                      </div>

                      {/* A. Flight Badges for Q1 */}
                      {faq.flightBadges && (
                        <div style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          marginBottom: '0.6rem'
                        }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', marginBottom: '0.25rem' }}>
                            ✈️ {isVi ? 'Các chuyến bay tối ưu lên Bà Nà ngày 1' : isTh ? 'เที่ยวบินแนะนำสำหรับการขึ้นบานาฮิลล์วันแรก' : 'Recommended Optimal Flight Timetable'}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                            {faq.flightBadges.map((f, i) => (
                              <span key={i} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                background: '#ffffff',
                                border: '1px solid #86efac',
                                borderRadius: '9999px',
                                padding: '0.1rem 0.45rem',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                color: '#15803d'
                              }}>
                                <strong>{f.code}</strong> (đến {f.arr}) - {f.airline}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* B. Late Flight Switch Flow for Q2 */}
                      {faq.switchFlowVi && (
                        <div style={{
                          background: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          marginBottom: '0.6rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.2rem',
                          fontSize: '0.82rem',
                          color: '#1e40af',
                          fontWeight: 600
                        }}>
                          <div>🌙 {isVi ? faq.switchFlowVi.night1 : isTh ? faq.switchFlowTh.night1 : faq.switchFlowEn.night1}</div>
                          <div>☀️ {isVi ? faq.switchFlowVi.day2 : isTh ? faq.switchFlowTh.day2 : faq.switchFlowEn.day2}</div>
                        </div>
                      )}

                      {/* C. Transfer Features for Q3 */}
                      {faq.transferFeaturesVi && (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                          gap: '0.35rem',
                          marginBottom: '0.6rem'
                        }}>
                          {(isVi ? faq.transferFeaturesVi : isTh ? faq.transferFeaturesTh : faq.transferFeaturesEn).map((feat, i) => (
                            <div key={i} style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '0.4rem',
                              padding: '0.3rem 0.5rem',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#334155',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}>
                              <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* D. Room Formula & Matrix for Q4 */}
                      {faq.roomMatrix && (
                        <div style={{
                          background: '#fefce8',
                          border: '1px solid #fef08a',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          marginBottom: '0.6rem'
                        }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#854d0e', marginBottom: '0.3rem' }}>
                            📐 {isVi ? faq.roomFormulaVi : isTh ? faq.roomFormulaTh : faq.roomFormulaEn}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.25rem' }}>
                            {faq.roomMatrix.map((rm, i) => (
                              <div key={i} style={{ background: '#ffffff', borderRadius: '0.3rem', padding: '0.2rem 0.35rem', border: '1px solid #fde047', fontSize: '0.78rem', textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, color: '#0f172a' }}>{rm.pax}</div>
                                <div style={{ color: '#059669', fontWeight: 600 }}>{rm.twin}</div>
                                <div style={{ color: '#dc2626', fontWeight: 600 }}>{rm.sgl}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* E. Dining Cards for Q5 */}
                      {faq.diningPills && (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                          gap: '0.35rem',
                          marginBottom: '0.6rem'
                        }}>
                          {faq.diningPills.map((d, i) => (
                            <div key={i} style={{
                              background: '#fff7ed',
                              border: '1px solid #fed7aa',
                              borderRadius: '0.45rem',
                              padding: '0.35rem 0.5rem',
                              fontSize: '0.8rem'
                            }}>
                              <div style={{ fontWeight: 800, color: '#c2410c' }}>{d.day} • {d.price}</div>
                              <div style={{ fontWeight: 700, color: '#0f172a', margin: '0.08rem 0' }}>{d.place}</div>
                              <div style={{ color: '#64748b' }}>{isTh ? d.highlightTh : d.highlightVi}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* F. Options Excursion Pills for Q7 */}
                      {faq.optionPills && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.3rem',
                          marginBottom: '0.6rem'
                        }}>
                          {faq.optionPills.map((op, i) => (
                            <span key={i} style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              background: '#f8fafc',
                              border: '1px solid #cbd5e1',
                              borderRadius: '9999px',
                              padding: '0.2rem 0.55rem',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              color: '#1e293b'
                            }}>
                              <span>{isTh ? op.nameTh : op.nameVi}</span>
                              <strong style={{ color: '#059669' }}>({op.price})</strong>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* G. Visa Checklist for Q8 */}
                      {faq.visaChecklistVi && (
                        <div style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          marginBottom: '0.6rem'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            {(isVi ? faq.visaChecklistVi : isTh ? faq.visaChecklistTh : faq.visaChecklistEn).map((item, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: '#166534', fontWeight: 600 }}>
                                <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* H. Child Docs Checklist for Q9 */}
                      {faq.childDocChecklistVi && (
                        <div style={{
                          background: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          marginBottom: '0.6rem'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            {(isVi ? faq.childDocChecklistVi : isTh ? faq.childDocChecklistTh : faq.childDocChecklistEn).map((item, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.3rem', fontSize: '0.82rem', color: '#991b1b', fontWeight: 600 }}>
                                <ShieldAlert size={13} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Bar inside expanded FAQ */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        paddingTop: '0.45rem',
                        borderTop: '1px solid #f1f5f9'
                      }}>
                        {/* Copy Answer Button */}
                        <button
                          type="button"
                          onClick={(e) => handleCopyAnswer(e, faq)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.3rem 0.65rem',
                            borderRadius: '0.4rem',
                            border: isCopied ? '1px solid #059669' : '1px solid #cbd5e1',
                            background: isCopied ? '#ecfdf5' : '#ffffff',
                            color: isCopied ? '#059669' : '#475569',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>
                            {isCopied
                              ? (isVi ? 'Đã sao chép câu trả lời!' : isTh ? 'คัดลอกคำตอบแล้ว!' : 'Copied Answer!')
                              : (isVi ? 'Sao chép câu trả lời cho khách' : isTh ? 'คัดลอกคำตอบส่งลูกค้า' : 'Copy Answer')}
                          </span>
                        </button>

                        {/* Contextual Jump Links */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          {faq.categoryKey === 'flights' && (
                            <a
                              href="#flight-schedule-matching"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                color: '#059669',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                textDecoration: 'none'
                              }}
                            >
                              <span>{isVi ? 'Xem bảng khớp giờ bay' : isTh ? 'ดูตารางเที่ยวบิน' : 'View flight matching'}</span>
                              <ArrowUpRight size={12} />
                            </a>
                          )}
                          {faq.categoryKey === 'rooming' && (
                            <a
                              href="#pricing-terminal"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                color: '#059669',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                textDecoration: 'none'
                              }}
                            >
                              <span>{isVi ? 'Mở Bảng tính giá B2B' : isTh ? 'เปิดตารางคำนวณราคา' : 'Open Price Calculator'}</span>
                              <Calculator size={12} />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 5. Bottom ReactBits Conversion Card - Ultra Compact */}
        <div style={{
          marginTop: '1.1rem',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '0.85rem',
          padding: '0.85rem 1.25rem',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem'
        }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, marginBottom: '0.15rem' }}>
              {isVi
                ? 'Quý đối tác vẫn còn thắc mắc về điều hành tour?'
                : isTh
                ? 'ยังคงมีข้อสงสัยเกี่ยวกับการจัดทัวร์เพิ่มเติม?'
                : 'Still have questions regarding tour operations?'}
            </div>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0, maxWidth: '550px', lineHeight: 1.45 }}>
              {isVi
                ? 'Đội ngũ điều hành Green Sea Tour luôn sẵn sàng tư vấn, xác nhận phòng và lập báo giá B2B chi tiết theo đoàn thực tế.'
                : isTh
                ? 'ทีมงานฝ่ายปฏิบัติการกรีนซีทัวร์พร้อมให้คำปรึกษา เช็คสถานะห้องพัก และออกใบเสนอราคา B2B อย่างรวดเร็ว'
                : 'Our operations team is ready to consult, verify room availability, and prepare custom B2B quotes.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://line.me/ti/p/BSLZR5dyBa"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '0.5rem',
                background: '#06c755',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(6, 199, 85, 0.3)'
              }}
            >
              <MessageCircle size={14} />
              <span>{isVi ? 'Chat LINE Điều Hành' : isTh ? 'แชท LINE ฝ่ายปฏิบัติการ' : 'Chat via LINE'}</span>
            </a>

            {onOpenQuoteDrawer && (
              <button
                type="button"
                onClick={onOpenQuoteDrawer}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.5rem',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>{isVi ? 'Yêu cầu báo giá B2B' : isTh ? 'ขอใบเสนอราคา B2B' : 'Request B2B Quote'}</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
