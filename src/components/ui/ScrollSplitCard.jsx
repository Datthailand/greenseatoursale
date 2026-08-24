import React, { useRef, useEffect } from 'react';
import { ShieldCheck, Sparkles, Zap, MapPin, DollarSign, FileText, Send, Tag, Clock, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

const ThailandFlag = ({ width = 20, height = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={width} height={height} style={{ borderRadius: '3px', display: 'inline-block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)', verticalAlign: 'middle' }}>
    <rect width="900" height="600" fill="#a51931"/>
    <rect y="100" width="900" height="400" fill="#f4f5f8"/>
    <rect y="200" width="900" height="200" fill="#2d2a4a"/>
  </svg>
);

export function ScrollSplitCard({
  imageSrc = 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2400&auto=format&fit=crop',
  cards = [],
  isVi = true,
  isTh = false,
  onOpenWhiteLabel,
  onOpenQuote
}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const frontRadiusRefs = useRef([]);

  // Thai Flag Tri-Color Palette System: 🔴 Red Ruby | ⚪ Platinum White | 🔵 Royal Navy Blue
  const cardData = cards.length === 3 ? cards : [
    {
      badge: isVi ? '01 • VẬN HÀNH DMC' : isTh ? '01 • ดำเนินงานโดย DMC' : '01 • INBOUND DMC',
      icon: <ShieldCheck size={18} style={{ color: '#fca5a5' }} />,
      title: isVi ? 'Điều hành trực tiếp tại Việt Nam' : isTh ? 'แลนด์โอเปอเรเตอร์ตรงในเวียดนาม' : 'Direct Vietnam Land Operator',
      description: isVi 
        ? 'Green Sea Tour trực tiếp điều hành tại Đà Nẵng: đón tiễn xe VIP, khách sạn 4 sao, nhà hàng chuẩn vị và hướng dẫn viên tiếng Thái.'
        : 'Green Sea Tour ประจำดานัง ดูแลรถ VIP, โรงแรม 4 ดาว, มื้ออาหารคัดสรร และไกด์ภาษาไทยมืออาชีพ',
      // Card 1: 🔴 Thai Crimson Red (Màu Đỏ Quốc Kỳ Thái Lan)
      isDark: true,
      bgColor: '#881337',
      textColor: '#ffffff',
      titleColor: '#ffffff',
      descColor: '#fecdd3',
      badgeBg: 'rgba(255, 255, 255, 0.16)',
      badgeBorder: 'rgba(255, 255, 255, 0.25)',
      featureBg: 'rgba(255, 255, 255, 0.1)',
      featureBorder: 'rgba(255, 255, 255, 0.15)',
      featureText: '#ffffff',
      ctaColor: '#fef08a',
      borderColor: 'rgba(244, 63, 94, 0.45)',
      boxShadow: '0 20px 50px -10px rgba(136, 19, 55, 0.4)',
      actionText: isVi ? 'Xem bảng giá NET ↓' : isTh ? 'ดูตารางราคา NET ↓' : 'View NET Rates ↓',
      actionLink: '#pricing-terminal',
      features: [
        { icon: <MapPin size={14} style={{ color: '#fca5a5' }} />, text: isVi ? 'Văn phòng điều hành Đà Nẵng' : 'ทีมงานประจำเวียดนาม' },
        { icon: <ThailandFlag width={15} height={10} />, text: isVi ? 'HDV tiếng Thái & Ăn chuẩn vị' : 'ไกด์ไทย & อาหารรสถูกปาก' },
        { icon: <MessageSquare size={14} style={{ color: '#fca5a5' }} />, text: isVi ? 'Phản hồi nhanh qua LINE' : 'ตอบกลับด่วนผ่าน LINE' },
        { icon: <Zap size={14} style={{ color: '#fef08a' }} />, text: isVi ? 'Linh hoạt nâng hạng xe & phòng' : 'ปรับเปลี่ยนตามกรุ๊ป' }
      ]
    },
    {
      badge: isVi ? '02 • B2B SALES KIT' : isTh ? '02 • เซลส์คิท B2B' : '02 • B2B SALES KIT',
      icon: <Sparkles size={18} style={{ color: '#2563eb' }} />,
      title: isVi ? 'Công cụ hỗ trợ bán tour cho đại lý' : isTh ? 'เครื่องมือช่วยขายสำหรับเอเจนซี่' : 'B2B Sales Kit & Tools',
      description: isVi 
        ? 'Đại lý có sẵn bảng giá NET theo nhóm 2–14 khách, PDF lịch trình song ngữ và poster báo giá để gửi khách nhanh.'
        : 'พร้อมตารางราคา NET ตามขนาดกรุ๊ป 2-14 ท่าน, ไฟล์ PDF สองภาษา และเครื่องมือสร้างโปสเตอร์ส่ง LINE',
      // Card 2: ⚪ Thai Pure White / Platinum Glass (Màu Trắng Bạch Kim Quốc Kỳ Thái Lan)
      isDark: false,
      bgColor: '#ffffff',
      textColor: '#0f172a',
      titleColor: '#0f172a',
      descColor: '#475569',
      badgeBg: '#eff6ff',
      badgeBorder: '#bfdbfe',
      featureBg: '#f8fafc',
      featureBorder: '#e2e8f0',
      featureText: '#1e293b',
      ctaColor: '#1d4ed8',
      borderColor: '#cbd5e1',
      boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
      actionText: isVi ? 'Tạo link gửi khách →' : isTh ? 'สร้างลิงก์ส่งลูกค้า →' : 'Create Client Link →',
      onAction: onOpenWhiteLabel,
      features: [
        { icon: <DollarSign size={14} style={{ color: '#2563eb' }} />, text: isVi ? 'Bảng giá NET 2 - 14 pax' : 'ราคาชัดเจน 2-14 ท่าน' },
        { icon: <FileText size={14} style={{ color: '#2563eb' }} />, text: isVi ? 'PDF lịch trình song ngữ' : 'โปรแกรมพร้อมส่งต่อ' },
        { icon: <Send size={14} style={{ color: '#2563eb' }} />, text: isVi ? 'Sao chép báo giá 1 chạm' : 'สร้างโปสเตอร์ส่ง LINE' },
        { icon: <Tag size={14} style={{ color: '#2563eb' }} />, text: isVi ? 'Link White-Label giấu giá NET' : 'สร้างลิงก์ใส่แบรนด์' }
      ]
    },
    {
      badge: isVi ? '03 • PHẢN HỒI 15 PHÚT' : isTh ? '03 • ตอบกลับด่วน 15 นาที' : '03 • 15-MIN QUOTE',
      icon: <Zap size={18} style={{ color: '#38bdf8' }} />,
      title: isVi ? 'Báo giá nhanh, có đội ngũ hỗ trợ riêng' : isTh ? 'ขอใบเสนอราคาด่วน & ทีมดูแลตรง' : 'Fast Quotation & Dedicated Support',
      description: isVi 
        ? 'Chuyên viên Ms. Kim & Mr. Khanh hỗ trợ kiểm tra phòng, báo giá đoàn FIT / Incentive và gửi Confirmation Slip trong 15 phút.'
        : 'ทีมงานฝ่ายขาย Ms. Kim & Mr. Khanh พร้อมเช็คห้องพัก คำนวณราคากรุ๊ปพิเศษ และส่ง Confirmation Slip ทันที',
      // Card 3: 🔵 Thai Royal Navy Blue (Màu Xanh Hoàng Gia Quốc Kỳ Thái Lan)
      isDark: true,
      bgColor: '#172554',
      textColor: '#ffffff',
      titleColor: '#ffffff',
      descColor: '#bfdbfe',
      badgeBg: 'rgba(255, 255, 255, 0.16)',
      badgeBorder: 'rgba(255, 255, 255, 0.25)',
      featureBg: 'rgba(255, 255, 255, 0.08)',
      featureBorder: 'rgba(255, 255, 255, 0.15)',
      featureText: '#ffffff',
      ctaColor: '#fde047',
      borderColor: 'rgba(59, 130, 246, 0.45)',
      boxShadow: '0 20px 50px -10px rgba(23, 37, 84, 0.45)',
      actionText: isVi ? 'Gửi yêu cầu báo giá →' : isTh ? 'ส่งคำขอใบเสนอราคา →' : 'Request B2B Quotation →',
      onAction: onOpenQuote,
      features: [
        { icon: <Clock size={14} style={{ color: '#38bdf8' }} />, text: isVi ? 'Báo giá chuẩn trong 15 phút' : 'ส่งราคาด่วนใน 15 นาที' },
        { icon: <ThailandFlag width={15} height={10} />, text: isVi ? 'Ms. Kim & Mr. Khanh (LINE)' : 'Ms. Kim & Mr. Khanh' },
        { icon: <CheckCircle2 size={14} style={{ color: '#4ade80' }} />, text: isVi ? 'Confirmation Slip chính thức' : 'เอกสารยืนยันมาตรฐาน' },
        { icon: <Phone size={14} style={{ color: '#38bdf8' }} />, text: 'Hotline (+84) 987.43.43.43' }
      ]
    }
  ];

  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId = null;
    let isRunning = false;

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    // Apply direct style updates without causing React re-renders (120fps hardware accelerated)
    const updateTransforms = (p) => {
      // 1. Horizontal Split Gap: 0px to 22px between 0.0 -> 0.18 progress
      const splitProgress = clamp(p / 0.18, 0, 1);
      const gapPx = splitProgress * 22;
      if (stageRef.current) {
        stageRef.current.style.gap = `${gapPx}px`;
      }

      // Update slice border radius smoothly
      const isSplit = splitProgress > 0.25;
      if (frontRadiusRefs.current[0]) {
        frontRadiusRefs.current[0].style.borderRadius = isSplit ? '1.25rem' : '1.25rem 0 0 1.25rem';
      }
      if (frontRadiusRefs.current[1]) {
        frontRadiusRefs.current[1].style.borderRadius = isSplit ? '1.25rem' : '0';
      }
      if (frontRadiusRefs.current[2]) {
        frontRadiusRefs.current[2].style.borderRadius = isSplit ? '1.25rem' : '0 1.25rem 1.25rem 0';
      }

      // 2. Cascading 3D Staggered Flip: Cards flip with smooth wave offset
      // Card 0: 0.08 -> 0.66
      // Card 1: 0.15 -> 0.73
      // Card 2: 0.22 -> 0.80
      const cardStarts = [0.08, 0.15, 0.22];
      const cardDuration = 0.58;

      for (let i = 0; i < 3; i++) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        const start = cardStarts[i];
        const cardFlipProg = clamp((p - start) / cardDuration, 0, 1);
        
        // Cubic ease for ultra-smooth physical turnaround
        const easeProg = cardFlipProg < 0.5
          ? 2 * cardFlipProg * cardFlipProg
          : 1 - Math.pow(-2 * cardFlipProg + 2, 2) / 2;

        const deg = easeProg * 180;
        cardEl.style.transform = `rotateY(${deg}deg) translateZ(0)`;
      }
    };

    // Physics Lerp Loop for buttery-smooth inertia gliding
    const tick = () => {
      const delta = targetProgress - currentProgress;
      currentProgress += delta * 0.16;

      if (Math.abs(delta) < 0.0003) {
        currentProgress = targetProgress;
      }

      updateTransforms(currentProgress);

      if (Math.abs(targetProgress - currentProgress) >= 0.0003) {
        animationFrameId = window.requestAnimationFrame(tick);
        isRunning = true;
      } else {
        isRunning = false;
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const offsetTop = containerRef.current.offsetTop || (rect.top + window.scrollY);

      // Start flip when user scrolls down towards this section (~100px past top)
      // Complete 180° flip when this section reaches the reading focal zone
      const startScroll = Math.max(0, offsetTop - windowHeight * 0.45);
      const endScroll = Math.max(startScroll + 200, offsetTop - 60);
      const totalDistance = endScroll - startScroll;

      if (totalDistance > 0) {
        targetProgress = clamp((window.scrollY - startScroll) / totalDistance, 0, 1);
      } else {
        targetProgress = 0;
      }

      if (!isRunning) {
        isRunning = true;
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial sync
    handleScroll();
    updateTransforms(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        margin: '0 auto',
        padding: '2.5rem 1.5rem 3.5rem',
        boxSizing: 'border-box',
        perspective: '1400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem', userSelect: 'none' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: '#ecfdf5',
          color: '#00533d',
          padding: '0.35rem 0.95rem',
          borderRadius: '2rem',
          fontSize: '0.72rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          border: '1px solid #a7f3d0'
        }}>
          <ThailandFlag width={14} height={10} />
          {isVi ? 'DMC Việt Nam dành cho đối tác Thái Lan' : isTh ? 'แลนด์โอเปอเรเตอร์เวียดนามสำหรับพันธมิตรไทย' : 'Vietnam Inbound DMC for Thai Partners'}
        </div>
        <h2 style={{
          fontSize: '1.9rem',
          fontWeight: 900,
          color: '#0f172a',
          margin: '0.35rem 0 0',
          letterSpacing: '-0.02em',
          fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif"
        }}>
          {isVi ? '3 điểm mạnh khi hợp tác với Green Sea Tour' : isTh ? '3 จุดเด่นสำคัญเมื่อร่วมงานกับ Green Sea Tour' : '3 Core Strengths of Green Sea Tour'}
        </h2>
      </div>

      {/* 3-Panel Card Stage */}
      <div
        ref={stageRef}
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1240px',
          height: '460px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          gap: '0px',
          willChange: 'gap'
        }}
      >
        {[0, 1, 2].map((idx) => {
          const data = cardData[idx];
          const sliceLeft = `${-idx * 100}%`;
          const initialRadius = idx === 0 
            ? '1.25rem 0 0 1.25rem' 
            : idx === 2 
              ? '0 1.25rem 1.25rem 0' 
              : '0';

          return (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              style={{
                flex: 1,
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: 'rotateY(0deg) translateZ(0)',
                willChange: 'transform',
                borderRadius: '1.25rem',
                boxShadow: data.boxShadow
              }}
            >
              {/* FRONT FACE: Panoramic Image Slice */}
              <div
                ref={(el) => (frontRadiusRefs.current[idx] = el)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  borderRadius: initialRadius,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  zIndex: 2,
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                  transform: 'translateZ(0)',
                  willChange: 'border-radius, transform'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: sliceLeft,
                    width: '300%',
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'translate3d(0,0,0)',
                    imageRendering: '-webkit-optimize-contrast'
                  }}
                />
                {/* Subtle glass reflection overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* BACK FACE: Rich B2B Capability Pillar Card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  borderRadius: '1.25rem',
                  backgroundColor: data.bgColor,
                  color: data.textColor,
                  padding: '1.6rem',
                  boxSizing: 'border-box',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(0)',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: `1.5px solid ${data.borderColor}`,
                  boxShadow: data.boxShadow,
                  willChange: 'transform'
                }}
              >
                {/* Card Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: data.badgeBg,
                      padding: '0.25rem 0.65rem', borderRadius: '2rem', fontSize: '0.68rem',
                      fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px',
                      border: `1px solid ${data.badgeBorder}`,
                      color: data.isDark ? '#ffffff' : '#1d4ed8'
                    }}>
                      {data.icon}
                      <span>{data.badge}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, opacity: data.isDark ? 0.35 : 0.25, color: data.titleColor }}>0{idx + 1}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: '0 0 0.4rem', lineHeight: 1.25, color: data.titleColor, fontFamily: isTh ? "'Prompt', sans-serif" : "'Be Vietnam Pro', sans-serif" }}>
                    {data.title}
                  </h3>
                  <p style={{ fontSize: '0.76rem', lineHeight: 1.45, margin: '0 0 0.85rem', color: data.descColor }}>
                    {data.description}
                  </p>

                  {/* Features List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {data.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          background: data.featureBg,
                          padding: '0.4rem 0.6rem',
                          borderRadius: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          border: `1px solid ${data.featureBorder}`,
                          color: data.featureText
                        }}
                      >
                        {feat.icon}
                        <span>{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div style={{ paddingTop: '0.65rem', borderTop: data.isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e2e8f0' }}>
                  {data.actionLink ? (
                    <a
                      href={data.actionLink}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        color: data.ctaColor, fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none'
                      }}
                    >
                      <span>{data.actionText}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={data.onAction}
                      style={{
                        background: 'none', border: 'none', padding: 0,
                        color: data.ctaColor, fontSize: '0.8rem', fontWeight: 800,
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                      }}
                    >
                      <span>{data.actionText}</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


