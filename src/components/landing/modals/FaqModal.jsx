import React, { useState, useMemo } from 'react';
import {
  X, Search, Sparkles, Plane, Clock, Car, Hotel, Utensils,
  FileCheck, ShieldCheck, ShieldAlert, CheckCircle2, Copy, Check,
  ChevronDown, MessageCircle, ArrowUpRight, Calculator, BookOpen
} from 'lucide-react';
import { FITDAD01_FAQS, FAQ_CATEGORIES } from '../../../data/faqs';

export default function FaqModal({
  isVi,
  isTh,
  onClose,
  onOpenQuoteDrawer
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState(null);
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

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return FITDAD01_FAQS.filter((faq) => {
      const matchCat = activeCategory === 'all' || faq.categoryKey === activeCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const qText = ((isVi ? faq.questionVi : isTh ? faq.questionTh : faq.questionEn) || '').toLowerCase();
      const aText = ((isVi ? faq.answerVi : isTh ? faq.answerTh : faq.answerEn) || '').toLowerCase();
      const catText = ((isVi ? faq.categoryVi : isTh ? faq.categoryTh : faq.categoryEn) || '').toLowerCase();
      return qText.includes(q) || aText.includes(q) || catText.includes(q);
    });
  }, [activeCategory, searchQuery, isVi, isTh]);

  // Copy Answer
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

  return (
    <div
      className="modal-backdrop-smooth"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem'
      }}
      onClick={onClose}
    >
      <div
        className="modal-card-smooth"
        style={{
          background: '#ffffff',
          borderRadius: '1.15rem',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div style={{
          padding: '0.9rem 1.25rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={16} />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: 0,
                fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
                lineHeight: 1.25
              }}>
                {isVi ? 'Sổ Tay Tra Cứu & Nghiệp Vụ B2B' : isTh ? 'คู่มือการดำเนินงานและคำถามที่พบบ่อย (B2B Handbook)' : 'B2B Operations Handbook & FAQ'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.1rem 0 0', lineHeight: 1.3 }}>
                {isVi
                  ? 'Tra cứu nhanh quy chuẩn điều hành, lịch bay và sao chép câu trả lời gửi đối tác'
                  : isTh
                  ? 'ค้นหาและคัดลอกคำตอบการดำเนินงานเพื่อส่งต่อให้ลูกค้าได้อย่างรวดเร็ว'
                  : 'Fast search and instant clipboard copying for sales operations'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.15s ease',
              flexShrink: 0
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Search & Category Filter */}
        <div style={{
          padding: '0.75rem 1.25rem',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          flexShrink: 0
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? 'Tìm câu hỏi, giờ bay, phòng lẻ, buffet, visa...' : isTh ? 'ค้นหาคำถาม, เวลาบิน, ห้องเดี่ยว, อาหาร, วีซ่า...' : 'Search Q&A...'}
              style={{
                width: '100%',
                padding: '0.5rem 2.25rem 0.5rem 2.35rem',
                borderRadius: '0.6rem',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.85rem',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
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
                    gap: '0.25rem',
                    padding: '0.25rem 0.55rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 700 : 600,
                    border: isActive ? '1px solid #059669' : '1px solid #cbd5e1',
                    background: isActive ? '#059669' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  <span>{getCategoryIcon(cat.iconName, 11)}</span>
                  <span>{isVi ? cat.labelVi : isTh ? cat.labelTh : cat.labelEn}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '0.02rem 0.3rem',
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

        {/* Scrollable Questions List - Ultra Compact Spacing */}
        <div style={{
          padding: '0.75rem 1.25rem',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem'
        }}>
          {filteredFaqs.map((faq, fIdx) => {
            const isExpanded = expandedFaqId === faq.id;
            const isCopied = copiedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                style={{
                  background: isExpanded ? '#ffffff' : '#f8fafc',
                  border: isExpanded ? '1.5px solid #059669' : '1px solid #e2e8f0',
                  borderRadius: '0.65rem',
                  boxShadow: isExpanded ? '0 6px 16px -3px rgba(5, 150, 105, 0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Header Block: Ultra Compact Padding & Tight Row Gap */}
                <div
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  style={{
                    padding: '0.6rem 0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.65rem',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Row 1: Number + Category Badge + Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
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

                {/* Expanded Answer */}
                {isExpanded && (
                  <div style={{
                    padding: '0 0.9rem 0.75rem 0.9rem',
                    borderTop: '1px dashed #e2e8f0',
                    animation: 'fadeIn 0.15s ease forwards'
                  }}>
                    <div style={{
                      color: '#334155',
                      fontSize: '0.875rem',
                      lineHeight: 1.55,
                      whiteSpace: 'pre-line',
                      paddingTop: '0.55rem',
                      marginBottom: '0.55rem'
                    }}>
                      {isVi ? faq.answerVi : isTh ? faq.answerTh : faq.answerEn}
                    </div>

                    {/* Flight Badges */}
                    {faq.flightBadges && (
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '0.5rem 0.65rem', marginBottom: '0.55rem' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', marginBottom: '0.25rem' }}>
                          ✈️ {isVi ? 'Các chuyến bay tối ưu lên Bà Nà ngày 1' : isTh ? 'เที่ยวบินแนะนำสำหรับการขึ้นบานาฮิลล์วันแรก' : 'Optimal Flight Timetable'}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {faq.flightBadges.map((f, i) => (
                            <span key={i} style={{ background: '#ffffff', border: '1px solid #86efac', borderRadius: '9999px', padding: '0.1rem 0.45rem', fontSize: '0.78rem', fontWeight: 600, color: '#15803d' }}>
                              <strong>{f.code}</strong> (đến {f.arr}) - {f.airline}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Late Flight Switch Flow */}
                    {faq.switchFlowVi && (
                      <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.65rem',
                        marginBottom: '0.55rem',
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

                    {/* Transfer Features */}
                    {faq.transferFeaturesVi && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                        gap: '0.35rem',
                        marginBottom: '0.55rem'
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

                    {/* Room Matrix */}
                    {faq.roomMatrix && (
                      <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: '0.5rem', padding: '0.5rem 0.65rem', marginBottom: '0.55rem' }}>
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

                    {/* Dining Cards */}
                    {faq.diningPills && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '0.35rem',
                        marginBottom: '0.55rem'
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

                    {/* Option Pills */}
                    {faq.optionPills && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.3rem',
                        marginBottom: '0.55rem'
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

                    {/* Visa Checklist */}
                    {faq.visaChecklistVi && (
                      <div style={{
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.65rem',
                        marginBottom: '0.55rem'
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

                    {/* Child Docs Checklist */}
                    {faq.childDocChecklistVi && (
                      <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.65rem',
                        marginBottom: '0.55rem'
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

                    {/* Action Bar */}
                    <div style={{ paddingTop: '0.45rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <button
                        type="button"
                        onClick={(e) => handleCopyAnswer(e, faq)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '0.4rem',
                          border: isCopied ? '1px solid #059669' : '1px solid #cbd5e1',
                          background: isCopied ? '#ecfdf5' : '#ffffff',
                          color: isCopied ? '#059669' : '#475569',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isCopied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{isCopied ? (isVi ? 'Đã sao chép câu trả lời!' : isTh ? 'คัดลอกคำตอบแล้ว!' : 'Copied!') : (isVi ? 'Sao chép câu trả lời cho khách' : isTh ? 'คัดลอกคำตอบส่งลูกค้า' : 'Copy Answer')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '0.65rem 1.25rem',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
            {isVi ? 'Hiển thị ' + filteredFaqs.length + ' câu hỏi nghiệp vụ' : isTh ? 'แสดง ' + filteredFaqs.length + ' คำถาม' : 'Showing ' + filteredFaqs.length + ' questions'}
          </span>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.3rem 0.85rem',
              borderRadius: '0.4rem',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {isVi ? 'Đóng' : isTh ? 'ปิด' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
