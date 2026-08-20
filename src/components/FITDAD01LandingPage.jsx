import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Calendar, MapPin, Users, Hotel, Car, Utensils, ShieldCheck, Download,
  Phone, MessageSquare, CheckCircle2, XCircle, ArrowLeft, Globe2, DollarSign,
  ChevronDown, ChevronUp, Star, Award, Sparkles, Send, Clock, HelpCircle,
  ExternalLink, Copy, Check, Info, Calculator, Coffee, Compass, CheckCircle,
  Camera, ChevronRight, Layers, Eye, Tag, Plus, Minus, Zap, Sliders,
  Share2, Image as ImageIcon, UserCheck, Link2, X, FileText, CheckCheck
} from 'lucide-react';

const EXCHANGE_RATE = 35; // 1 USD = 35 THB

// High-Definition Crisp Vector SVG Flags
const VietnamFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={width} height={height} style={{ borderRadius: '3px', display: 'block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
    <rect width="900" height="600" fill="#da251d"/>
    <polygon
      points="450,150 491,277 625,277 516,356 558,483 450,404 342,483 384,356 275,277 409,277"
      fill="#ffff00"
    />
  </svg>
);

const ThailandFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={width} height={height} style={{ borderRadius: '3px', display: 'block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
    <rect width="900" height="600" fill="#a51931"/>
    <rect y="100" width="900" height="400" fill="#f4f5f8"/>
    <rect y="200" width="900" height="200" fill="#2d2a4a"/>
  </svg>
);

const UKFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width={width} height={height} style={{ borderRadius: '3px', display: 'block', boxShadow: '0 1px 2px rgba(0,0,0,0.18)' }}>
    <clipPath id="uk-flag-clip">
      <rect width="60" height="36" rx="3"/>
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <path d="M0 0v36h60V0z" fill="#012169"/>
      <path d="M0 0l60 36M60 0L0 36" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0l60 36M60 0L0 36" stroke="#c8102e" strokeWidth="4"/>
      <path d="M0 18h60M30 0v36" stroke="#fff" strokeWidth="10"/>
      <path d="M0 18h60M30 0v36" stroke="#c8102e" strokeWidth="6"/>
    </g>
  </svg>
);

// ReactBits: Smooth Animated Rolling Number Counter
function AnimatedCountUp({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp = null;
    const startVal = displayValue;
    const endVal = value;
    const duration = 300; // ms

    if (startVal === endVal) return;

    let frameId;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo for crisp financial counter
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startVal + (endVal - startVal) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(endVal);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
}

// ReactBits: SpotlightCard with dynamic radial mouse tracker
function SpotlightCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        ...style
      }}
      className={className}
    >
      {/* Dynamic Radial Cursor Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.1), transparent 80%)`,
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}

// ReactBits: Magnet Button with elastic cursor pull
function Magnet({ children, padding = 35, magnetStrength = 0.3, active = true, style = {} }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!active || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = Math.hypot(clientX - centerX, clientY - centerY);
    
    // When cursor is within magnetic attraction radius
    if (dist < Math.max(width, height) / 2 + padding) {
      const offsetX = (clientX - centerX) * magnetStrength;
      const offsetY = (clientY - centerY) * magnetStrength;
      setPosition({ x: offsetX, y: offsetY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 
          ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' 
          : 'transform 0.1s ease-out',
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Exact pricing matrix from PDF
const PRICE_GRID = [
  { band: '2-3', paxLabelTh: '2-3 ท่าน', paxLabelVi: '2-3 Khách', paxLabelEn: '2-3 Pax', usd: 350, thb: 350 * 35, vehicleTh: 'รถตู้ 16 ที่นั่ง', vehicleVi: 'Xe 16 chỗ VIP', vehicleEn: '16 Seats Van' },
  { band: '4-5', paxLabelTh: '4-5 ท่าน', paxLabelVi: '4-5 Khách', paxLabelEn: '4-5 Pax', usd: 260, thb: 260 * 35, vehicleTh: 'รถตู้ 16 ที่นั่ง', vehicleVi: 'Xe 16 chỗ VIP', vehicleEn: '16 Seats Van' },
  { band: '6-7', paxLabelTh: '6-7 ท่าน', paxLabelVi: '6-7 Khách', paxLabelEn: '6-7 Pax', usd: 230, thb: 230 * 35, vehicleTh: 'รถตู้ 16 ที่นั่ง', vehicleVi: 'Xe 16 chỗ VIP', vehicleEn: '16 Seats Van' },
  { band: '8-9', paxLabelTh: '8-9 ท่าน', paxLabelVi: '8-9 Khách', paxLabelEn: '8-9 Pax', usd: 206, thb: 206 * 35, vehicleTh: 'มินิบัส 29 ที่นั่ง', vehicleVi: 'Xe 29 chỗ (Mini Bus)', vehicleEn: '29 Seats Mini Bus' },
  { band: '10-11', paxLabelTh: '10-11 ท่าน', paxLabelVi: '10-11 Khách', paxLabelEn: '10-11 Pax', usd: 198, thb: 198 * 35, vehicleTh: 'มินิบัส 29 ที่นั่ง', vehicleVi: 'Xe 29 chỗ (Mini Bus)', vehicleEn: '29 Seats Mini Bus' },
  { band: '12-14', paxLabelTh: '12-14 ท่าน', paxLabelVi: '12-14 Khách', paxLabelEn: '12-14 Pax', usd: 194, thb: 194 * 35, vehicleTh: 'มินิบัส 29 ที่นั่ง', vehicleVi: 'Xe 29 chỗ (Mini Bus)', vehicleEn: '29 Seats Mini Bus' }
];

const SURCHARGES = [
  { period: '29/04 - 02/05/2026', noteTh: 'ช่วงวันหยุดเวียดนาม (Reunification Day)', noteVi: 'Dịp lễ 30/4 - 1/5', noteEn: 'Vietnam National Holiday', surchargeUsd: 18, singleSupplUsd: 88 },
  { period: '24 - 25/12/2026', noteTh: 'ช่วงเทศกาลคริสต์มาส (Christmas)', noteVi: 'Dịp lễ Giáng Sinh (Christmas)', noteEn: 'Christmas Season', surchargeUsd: 18, singleSupplUsd: 88 }
];

// Curated Real Destination Gallery for FITDAD01
const GALLERY_ITEMS = [
  {
    titleVi: 'Đặc Quyền "Golden Hours" Bình Minh Cầu Vàng',
    titleTh: 'สิทธิพิเศษ "Golden Hours" สะพานมือสีทองยามเช้า',
    titleEn: 'Exclusive "Golden Hours" Sunrise at Golden Bridge',
    descVi: 'Đón chuyến cáp treo sớm chạm đỉnh Cầu Vàng trong sương mây bình minh. Với những ai yêu thích nhiếp ảnh, đây là một trong những thời điểm lý tưởng để ghi lại vẻ đẹp của Cầu Vàng.',
    descTh: 'นั่งกระเช้ารอบเช้าตรู่ สัมผัสสะพานมือสีทองยามพระอาทิตย์ขึ้น สำหรับผู้ที่รักการถ่ายภาพ นี่คือช่วงเวลาที่ยอดเยี่ยมที่สุดในการบันทึกภาพความงามอันน่าหลงใหล',
    descEn: 'Exclusive early morning cable car access to the Golden Bridge at sunrise. For photography enthusiasts, this is one of the ideal moments to capture the bridge at its most captivating.',
    img: '/assets/golden-bridge-sunrise.jpg'
  },
  {
    titleVi: 'Cầu Vàng & Đỉnh Núi Chúa Bà Nà Hills',
    titleTh: 'สะพานมือสีทอง & ยอดเขาบานาฮิลล์',
    titleEn: 'Golden Bridge & Ba Na Hills Peaks',
    descVi: 'Khám phá biểu tượng đôi bàn tay đá khổng lồ vươn giữa mây ngàn và quần thể giải trí Sun World đỉnh cao',
    descTh: 'ชมความยิ่งใหญ่ของสะพานมือสีทองท่ามกลางทิวทัศน์ธรรมชาติและสวนสนุกระดับโลก',
    img: '/assets/golden-bridge.jpg'
  },
  {
    titleVi: 'Mercure Làng Pháp Trên Đỉnh Bana Hills',
    titleTh: 'หมู่บ้านฝรั่งเศส & โรงแรม Mercure 4*',
    titleEn: 'French Village & Mercure 4*',
    descVi: 'Nghỉ đêm bồng bềnh giữa không khí se lạnh tựa châu Âu',
    descTh: 'พักผ่อนบนยอดเขา อากาศเย็นสบายตลอดทั้งปี',
    img: '/assets/mercure-french-village.jpg'
  },
  {
    titleVi: 'Thuyền Thúng Rừng Dừa Bảy Mẫu',
    titleTh: 'ล่องเรือกระด้ง หมู่บ้านกั๊มทาน',
    titleEn: 'Cam Thanh Basket Boat Ride',
    descVi: 'Xem múa thúng giăng lưới đầy sôi động trên sông nước',
    descTh: 'ชมโชว์หมุนเรือกระด้งสุดมันส์กลางป่ามะพร้าว',
    img: '/assets/coconut-basket-boat.jpg'
  },
  {
    titleVi: 'Phố Cổ Hội An Về Đêm',
    titleTh: 'เมืองโบราณฮอยอัน มรดกโลก',
    titleEn: 'Hoi An Lantern Ancient Town',
    descVi: 'Lung linh thả hoa đăng trên sông Hoài và phố đèn lồng',
    descTh: 'ชมโคมไฟหลากสี ลอยกระทงดอกไม้ริมแม่น้ำฮว่าย',
    img: '/assets/hoi-an-night.jpg'
  },
  {
    titleVi: 'Chùa Linh Ứng Bán Đảo Sơn Trà',
    titleTh: 'ไหว้พระวัดลิงอึ๋ง เจ้าแม่กวนอิม 67 ม.',
    titleEn: 'Linh Ung Pagoda & Lady Buddha',
    descVi: 'Tượng Phật Bà Quan Âm cao nhất Việt Nam ngắm biển',
    descTh: 'สักการะเจ้าแม่กวนอิมสีขาวองค์ใหญ่ริมอ่าวดานัง',
    img: '/assets/linh-ung-pagoda.jpg'
  },
  {
    titleVi: 'Đại Tiệc Buffet Hải Sản & Tôm Hùm',
    titleTh: 'บุฟเฟ่ต์ซีฟู้ดสด + กุ้งมังกร ½ ตัว',
    titleEn: 'Long Qiao Seafood Buffet + Lobster',
    descVi: 'Thưởng thức hải sản tươi sống và lẩu đặc sắc',
    descTh: 'รวมกุ้งมังกรอบเนยครึ่งตัวต่อท่านและของสดนึ่ง',
    img: '/assets/seafood-buffet-longqiao.jpg'
  }
];


// HTML5 Canvas Quote Poster Generator (Crisp 1080x1920 2x Retina PNG)
async function generateAndDownloadPoster({
  calculation,
  paxCount,
  selectedBand,
  vehicleLabel,
  singleRooms,
  isHoliday,
  currency,
  effectiveRate,
  language,
  agentConfig
}) {
  const isVi = language === 'VI';
  const isTh = language === 'TH';
  
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  function roundRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // 1. Dark Modern Background
  ctx.fillStyle = '#09131f';
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Load Hero Photo
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
    img.src = '/assets/golden-bridge-sunrise.jpg';
  });

  if (img.width) {
    ctx.save();
    ctx.drawImage(img, 0, 0, 1080, 650);
    const grad = ctx.createLinearGradient(0, 0, 0, 650);
    grad.addColorStop(0, 'rgba(9, 19, 31, 0.45)');
    grad.addColorStop(0.5, 'rgba(9, 19, 31, 0.25)');
    grad.addColorStop(1, '#09131f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 650);
    ctx.restore();
  }

  // 3. Brand Header
  ctx.save();
  const brandName = (agentConfig?.isAgent && agentConfig?.name) 
    ? agentConfig.name.toUpperCase() 
    : 'GREEN SEA TOUR • DMC VIETNAM';
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⭐ ' + brandName + ' ⭐', 540, 65);

  // Tour Pill
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  roundRect(340, 95, 400, 42, 21);
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 19px system-ui, -apple-system, sans-serif';
  ctx.fillText('MÃ: FITDAD01 • PRIVATE VIP TOUR', 540, 122);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 42px "Playfair Display", Georgia, serif';
  ctx.fillText(isVi ? 'ĐÀ NẴNG – BÀ NÀ HILLS – HỘI AN' : isTh ? 'ดานัง – บานาฮิลล์ – ฮอยอัน' : 'DA NANG – BA NA HILLS – HOI AN', 540, 205);

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 25px system-ui, -apple-system, sans-serif';
  ctx.fillText(isVi ? '3 NGÀY 2 ĐÊM • 1 ĐÊM MERCURE BÀ NÀ 4*' : isTh ? '3 วัน 2 คืน • พักบนยอดเขาบานาฮิลล์ 1 คืน' : '3 DAYS 2 NIGHTS • 1 NIGHT MERCURE BANA 4*', 540, 250);
  ctx.restore();

  // 4. Highlights Card
  ctx.save();
  ctx.fillStyle = '#132338';
  roundRect(50, 310, 980, 420, 24);
  ctx.fill();
  ctx.strokeStyle = '#1e3a5f';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 23px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('✨ ' + (isVi ? 'ĐIỂM NHẤN ĐẶC QUYỀN TRONG HÀNH TRÌNH:' : isTh ? 'ไฮไลท์พิเศษสุดเอ็กซ์คลูซีฟในโปรแกรม:' : 'SIGNATURE TOUR HIGHLIGHTS:'), 85, 355);

  const highlights = [
    isVi ? '🌅 Đặc quyền "Golden Hours" đón bình minh Cầu Vàng (06:00 sáng)' : isTh ? '🌅 สิทธิพิเศษ Golden Hours สะพานมือยามเช้าตรู่ ไร้ผู้คน' : '🌅 VIP Golden Hours sunrise at Golden Bridge (06:00 AM)',
    isVi ? '🏰 1Đ Mercure Làng Pháp Bà Nà 4* + 1Đ Khách sạn 4* Đà Nẵng' : isTh ? '🏰 พักบนยอดเขา Mercure Bana Hills 1 คืน + ดานัง 4* 1 คืน' : '🏰 1N Mercure Bana Hills 4* + 1N 4-Star Da Nang Hotel',
    isVi ? '🦞 2 Buffet thượng hạng (Beer Plaza + Buffet Hải sản Long Qiao TẶNG ½ TÔM HÙM)' : isTh ? '🦞 2 บุฟเฟ่ต์ดัง (Beer Plaza + บุฟเฟ่ต์ซีฟู้ดรวมกุ้งมังกร ½ ตัว)' : '🦞 2 Premium Buffets (Beer Plaza + Lobster Seafood Buffet)',
    isVi ? '🚣 Thuyền thúng Rừng dừa Bảy Mẫu Cẩm Thanh + Phố cổ Hội An' : isTh ? '🚣 นั่งเรือกระด้งป่ามะพร้าวกั๊มทาน + เดินชมเมืองโบราณฮอยอัน' : '🚣 Cam Thanh Basket Boat Ride + Hoi An Ancient Town',
    isVi ? '🚐 Xe riêng đời mới máy lạnh suốt tuyến + HDV tiếng Thái nhiệt tình' : isTh ? '🚐 รถตู้ปรับอากาศ VIP ส่วนตัวตลอดทริป + ไกด์ภาษาไทยดูแล' : '🚐 Private VIP vehicle throughout + Thai speaking guide',
    isVi ? '🛡️ Bao gồm Bảo hiểm du lịch quốc tế theo Luật Du lịch Việt Nam' : isTh ? '🛡️ รวมประกันอุบัติเหตุการเดินทางสำหรับนักท่องเที่ยวต่างชาติ' : '🛡️ Comprehensive International Tourist Travel Insurance'
  ];

  ctx.fillStyle = '#f1f5f9';
  ctx.font = '20px system-ui, -apple-system, sans-serif';
  highlights.forEach((text, i) => {
    ctx.fillText('• ' + text, 85, 405 + i * 52);
  });
  ctx.restore();

  // 5. Customized Quote Box
  ctx.save();
  ctx.fillStyle = '#064e3b';
  roundRect(50, 760, 980, 740, 28);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('📋 ' + (isVi ? 'THÔNG TIN BÁO GIÁ ĐOÀN TÙY CHỈNH' : isTh ? 'รายละเอียดใบเสนอราคาพิเศษ' : 'CUSTOMIZED TOUR QUOTE'), 90, 815);

  const specs = [
    { label: isVi ? 'Số lượng khách:' : isTh ? 'จำนวนผู้เดินทาง:' : 'Group Size:', val: `${paxCount} pax (${isVi ? selectedBand.paxLabelVi : selectedBand.paxLabelTh})` },
    { label: isVi ? 'Phương tiện xe:' : isTh ? 'ประเภทยานพาหนะ:' : 'Vehicle Type:', val: vehicleLabel },
    { label: isVi ? 'Khách sạn:' : isTh ? 'มาตรฐานโรงแรม:' : 'Hotel Standard:', val: '4 Sao (Mercure Bà Nà + Đông Dương)' },
    { label: isVi ? 'Giai đoạn đi:' : isTh ? 'ช่วงเวลาเดินทาง:' : 'Season Period:', val: isHoliday ? (isVi ? 'Dịp Lễ cao điểm (+18 USD/khách)' : 'ช่วงวันหยุดเทศกาล (+18 USD/ท่าน)') : (isVi ? 'Mùa thường tiêu chuẩn' : 'ช่วงปกติ') },
    { 
      label: isVi ? 'Phụ thu phòng đơn:' : isTh ? 'พักห้องเดี่ยว (Single):' : 'Single Supplement:', 
      val: singleRooms > 0 
        ? (isVi 
            ? `${singleRooms} phòng (+${calculation.singleSupp} USD)` 
            : isTh 
              ? `${singleRooms} ห้อง (+฿${Math.round(calculation.singleSupp * effectiveRate).toLocaleString()})` 
              : `${singleRooms} room (+${calculation.singleSupp} USD)`) 
        : (isVi ? 'Không có' : isTh ? 'ไม่มี' : 'None') 
    }
  ];

  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  specs.forEach((item, i) => {
    ctx.fillStyle = '#6ee7b7';
    ctx.fillText(item.label, 90, 875 + i * 55);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(item.val, 420, 875 + i * 55);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(90, 885 + i * 55);
    ctx.lineTo(990, 885 + i * 55);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Big Price Banner
  ctx.fillStyle = '#022c22';
  roundRect(80, 1160, 920, 310, 20);
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isVi ? '💰 TỔNG GIÁ TRỌN GÓI ĐỀ XUẤT / KHÁCH' : isTh ? '💰 ราคาเสนอพิเศษสุทธิต่อท่าน' : '💰 TOTAL PROPOSED RATE PER PERSON', 540, 1210);

  const priceDisplay = currency === 'THB'
    ? `฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')}`
    : `$${calculation.suggestedSellPerPax} USD`;
  const subPriceDisplay = currency === 'THB'
    ? `(≈ $${calculation.suggestedSellPerPax} USD / khách)`
    : `(≈ ฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')} / khách)`;

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 76px system-ui, -apple-system, sans-serif';
  ctx.fillText(priceDisplay, 540, 1300);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText(subPriceDisplay, 540, 1355);

  ctx.fillStyle = '#fde68a';
  ctx.font = 'italic 18px system-ui, -apple-system, sans-serif';
  ctx.fillText(isVi ? '✓ Đã bao gồm vé cáp treo, 2 buffet tôm hùm, xe riêng, HDV tiếng Thái và Bảo hiểm quốc tế' : isTh ? '✓ รวมกระเช้าบานาฮิลล์, 2 บุฟเฟ่ต์, รถตู้ VIP, ไกด์ภาษาไทย และประกันการเดินทางแล้ว' : '✓ Includes cable car, 2 buffets, private van, guide and insurance', 540, 1410);
  ctx.restore();

  // 6. Footer / Agent Contact Box
  ctx.save();
  ctx.fillStyle = '#132338';
  roundRect(50, 1530, 980, 340, 24);
  ctx.fill();
  ctx.strokeStyle = '#1e3a5f';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (agentConfig?.isAgent && agentConfig?.name) {
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ĐẠI LÝ PHỤ TRÁCH: ' + agentConfig.name.toUpperCase(), 540, 1600);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    if (agentConfig.tel) ctx.fillText('📞 Hotline / Tel: ' + agentConfig.tel, 540, 1655);
    if (agentConfig.line) ctx.fillText('💬 LINE ID: ' + agentConfig.line, 540, 1705);
  } else {
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GREEN SEA TOUR • DMC INBOUND VIETNAM', 540, 1590);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px system-ui, -apple-system, sans-serif';
    ctx.fillText('📞 Hotline / WhatsApp: (+84) 987.43.43.43  •  💬 LINE OA: @greenseatour', 540, 1640);
    ctx.fillText('🌐 Website: www.greensealandtourvietnam.com', 540, 1685);
    ctx.fillText('📍 516 Nguyễn Hữu Thọ, Đà Nẵng, Việt Nam', 540, 1730);
  }

  const today = new Date().toLocaleDateString('vi-VN');
  ctx.fillStyle = '#64748b';
  ctx.font = '18px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Ngày tạo báo giá: ${today} • Chương trình Private VIP FITDAD01`, 540, 1820);
  ctx.restore();

  // Download trigger
  const link = document.createElement('a');
  link.download = `FITDAD01_Bao_Gia_${paxCount}pax_${currency}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export default function FITDAD01LandingPage({ onBack, defaultLang = 'VI' }) {
  const [language, setLanguage] = useState(defaultLang); // 'VI', 'TH', or 'EN'
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'THB'
  const [exchangeRate, setExchangeRate] = useState(35); // Custom user-entered USD/THB exchange rate
  const effectiveRate = useMemo(() => {
    const r = parseFloat(exchangeRate);
    return !isNaN(r) && r > 0 ? r : 35;
  }, [exchangeRate]);
  const [activeDayTab, setActiveDayTab] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0); // Interactive Accordion Gallery
  
  // Auto scroll to target section if URL hash present
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, []);
  
  // Interactive Agent Calculator (Fully Synchronized)
  const [selectedBandIdx, setSelectedBandIdx] = useState(2); // default 6-7 pax
  const [paxCount, setPaxCount] = useState(6);
  const [singleRooms, setSingleRooms] = useState(0);
  const [upgradeLimousine, setUpgradeLimousine] = useState('none'); // 'none', 'limo9', 'limo15'
  const [isHoliday, setIsHoliday] = useState(false);
  const [agentMarginPercent, setAgentMarginPercent] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('margin');
    if (m !== null && !isNaN(Number(m))) {
      return Number(m);
    }
    return 15; // default 15%
  });

  // White-Label Agent configuration (from URL params or modal)
  const [agentConfig, setAgentConfig] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const isAgent = params.get('agent') === '1' || params.get('agent') === 'true';
    return {
      isAgent,
      name: params.get('name') || params.get('agent_name') || '',
      tel: params.get('tel') || params.get('agent_tel') || params.get('phone') || '',
      line: params.get('line') || params.get('agent_line') || '',
      hideNet: params.get('hidenet') === '1' || params.get('hide_net') === 'true' || false
    };
  });
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [isExportingPoster, setIsExportingPoster] = useState(false);
  const [copiedAgentLink, setCopiedAgentLink] = useState(false);

  // Export Poster Trigger
  const handleExportPoster = async () => {
    setIsExportingPoster(true);
    try {
      await generateAndDownloadPoster({
        calculation,
        paxCount,
        selectedBand,
        vehicleLabel: getVehicleLabel(selectedBand),
        singleRooms,
        isHoliday,
        currency,
        effectiveRate,
        language,
        agentConfig
      });
    } catch (err) {
      console.error('Failed to export poster:', err);
    } finally {
      setIsExportingPoster(false);
    }
  };

  // Generate White-Label Client Link
  const clientShareUrl = useMemo(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('tour', 'fitdad01');
    params.set('mode', 'landing');
    if (agentConfig.name) {
      params.set('agent', '1');
      params.set('name', agentConfig.name);
      if (agentConfig.tel) params.set('tel', agentConfig.tel);
      if (agentConfig.line) params.set('line', agentConfig.line);
      if (agentConfig.hideNet) params.set('hidenet', '1');
      params.set('margin', agentMarginPercent.toString());
    }
    return baseUrl + '?' + params.toString() + '#pricing-terminal';
  }, [agentConfig, agentMarginPercent]);

  const handleCopyAgentLink = () => {
    navigator.clipboard.writeText(clientShareUrl);
    setCopiedAgentLink(true);
    setTimeout(() => setCopiedAgentLink(false), 2500);
  };
  
  // Dynamic two-way band <-> pax synchronization
  const getBandIdxForPax = (pax) => {
    if (pax <= 3) return 0; // 2-3 pax ($350)
    if (pax <= 5) return 1; // 4-5 pax ($260)
    if (pax <= 7) return 2; // 6-7 pax ($230)
    if (pax <= 9) return 3; // 8-9 pax ($206)
    if (pax <= 11) return 4; // 10-11 pax ($198)
    return 5; // 12-14+ pax ($194)
  };

  const handlePaxChange = (newPax) => {
    const validPax = Math.max(2, Math.min(14, newPax));
    setPaxCount(validPax);
    setSelectedBandIdx(getBandIdxForPax(validPax));
  };

  const handleBandChange = (newBandIdx) => {
    const idx = Number(newBandIdx);
    setSelectedBandIdx(idx);
    const defaultPaxPerBand = [2, 4, 6, 8, 10, 12];
    setPaxCount(defaultPaxPerBand[idx] || 2);
  };
  
  // UI states
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [agentForm, setAgentForm] = useState({
    agencyName: '',
    contactName: '',
    phoneLine: '',
    departureDate: '',
    pax: 6,
    specialRequests: ''
  });

  const selectedBand = PRICE_GRID[selectedBandIdx];
  const isTh = language === 'TH';
  const isVi = language === 'VI';

  // Calculate Prices (Consistent & Transparent Surcharge Math)
  const calculation = useMemo(() => {
    const baseNetPerPax = selectedBand ? selectedBand.usd : 230;
    const holidaySurchargePerPax = isHoliday ? 18 : 0;
    const singleSupp = isHoliday ? 88 : 70;
    const singleRoomsTotal = singleRooms * singleSupp;
    
    let limoExtra = 0;
    if (upgradeLimousine === 'limo9') limoExtra = 89;
    if (upgradeLimousine === 'limo15') limoExtra = 168;

    // Total Net for the whole group (Green Sea receives)
    const netPerPax = baseNetPerPax + holidaySurchargePerPax;
    const totalNetGroup = (netPerPax * paxCount) + singleRoomsTotal + limoExtra;
    const netPerPaxAvg = totalNetGroup / paxCount;
    
    // Base Tour Selling Price per pax (Twin/Double sharing standard):
    const marginMultiplier = 1 + (agentMarginPercent / 100);
    const baseSellPerPax = baseNetPerPax * marginMultiplier;
    const limoSellPerPax = limoExtra / paxCount;
    
    // Per-pax tour rate stays constant (e.g. $218 / pax for 10 pax at 10% margin)
    // Single room supplement is treated as an individual add-on option, NOT divided into the base per-pax price!
    const suggestedSellPerPax = Math.round(baseSellPerPax + holidaySurchargePerPax + limoSellPerPax);
    
    // Total retail group price = (Base per pax * paxCount) + single room add-ons
    const totalSellGroup = (suggestedSellPerPax * paxCount) + singleRoomsTotal;
    const agentProfit = totalSellGroup - totalNetGroup;

    return {
      netPerPax,
      singleSupp,
      singleRoomsTotal,
      limoExtra,
      totalNetGroup,
      netPerPaxAvg: Math.round(netPerPaxAvg),
      suggestedSellPerPax,
      totalSellGroup,
      agentProfit: Math.max(0, Math.round(agentProfit))
    };
  }, [selectedBand, paxCount, singleRooms, upgradeLimousine, isHoliday, agentMarginPercent]);

  const formatPrice = (usdAmount) => {
    if (currency === 'THB') {
      return `฿${Math.round(usdAmount * effectiveRate).toLocaleString('en-US')}`;
    }
    return `${Math.round(usdAmount).toLocaleString('en-US')}`;
  };

  const getBandLabel = (p) => {
    if (isVi) return p.paxLabelVi;
    if (isTh) return p.paxLabelTh;
    return p.paxLabelEn;
  };

  const getVehicleLabel = (p) => {
    if (isVi) return p.vehicleVi;
    if (isTh) return p.vehicleTh;
    return p.vehicleEn;
  };

  // Copy B2B quote for LINE/Zalo
  const handleCopyQuote = () => {
    let text = '';
    if (isVi) {
      text = `🌟 CHƯƠNG TRÌNH TOUR ĐÀ NẴNG - BÀ NÀ - HỘI AN 3N2Đ (MÃ: FITDAD01)
✨ Điểm nhấn hành trình VIP:
• Nghỉ 1 đêm trên đỉnh Bà Nà Hills (Mercure Danang French Village) + 1 đêm khách sạn 4 sao Đà Nẵng.
• ĐẶC QUYỀN VIP GOLDEN HOURS: Mở tuyến cáp treo sớm 06:00 sáng chạm đỉnh Cầu Vàng đón bình minh trong sương mây — thời điểm lý tưởng nhất để ghi lại vẻ đẹp của Cầu Vàng.
• Vé cáp treo Bà Nà khứ hồi + Check-in Cầu Vàng (Golden Bridge) + Fantasy Park + Vườn hoa Làng Pháp.
• Thuyền thúng Rừng dừa Bảy Mẫu Cẩm Thanh + Khám phá Phố cổ Hội An + Faifo Coffee.
• 2 Buffet lớn (Beer Plaza Bà Nà + Buffet Hải sản Long Qiao TẶNG ½ TÔM HÙM NƯỚNG BƠ) + 3 bữa set menu nhà hàng nổi tiếng (Ngon Thị Hoa, Chic Chillax, Madam Lân) + Bánh Mì.
• Xe du lịch VIP đưa đón riêng + Hướng dẫn viên nói tiếng Thái Lan / tiếng Anh nhiệt tình suốt tuyến.
• Đã bao gồm Bảo hiểm du lịch quốc tế theo quy định của Luật Du lịch Việt Nam.

👥 Số lượng khách: ${paxCount} khách (${getBandLabel(selectedBand)})
💰 Giá báo đề xuất: ${currency === 'THB' ? `฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')}` : `${calculation.suggestedSellPerPax} USD`} / khách (Tỷ giá: 1 USD = ${effectiveRate} THB)
🏨 Phụ thu phòng đơn: ${singleRooms > 0 ? `${singleRooms} phòng (+${formatPrice(calculation.singleSupp)}/phòng)` : 'Không có'}
📄 Xem chi tiết hình ảnh & lịch trình: ${agentConfig?.isAgent ? clientShareUrl : 'https://greenseatour.vn/?tour=fitdad01&mode=landing'}
🏢 ${agentConfig?.isAgent && agentConfig?.name ? `Đại lý: ${agentConfig.name}` : 'GreenSeaTour - Land Tour Operator Chuyên Tuyến Thái Lan'}
${agentConfig?.isAgent ? (agentConfig.tel ? `📞 Hotline: ${agentConfig.tel}` : '') : '📞 Phone / WhatsApp: (+84) 987.43.43.43'}
${agentConfig?.isAgent ? (agentConfig.line ? `📲 LINE: ${agentConfig.line}` : '') : '📲 LINE Official: https://lin.ee/Pwro79k'}
${agentConfig?.isAgent ? '' : '🌐 Website: www.greensealandtourvietnam.com'}`;
    } else {
      text = `🌟 โปรแกรมทัวร์เวียดนามกลางสุดพรีเมียม (Private VIP FIT)
📍 ดานัง – บานาฮิลล์ – ฮอยอัน 3 วัน 2 คืน (FITDAD01)
✨ ไฮไลท์พิเศษ:
• พักบนยอดเขาบานาฮิลล์ 1 คืน (Mercure Danang French Village) + ดานัง 1 คืน (4 ดาว)
• สิทธิพิเศษ VIP GOLDEN HOURS: นั่งกระเช้ารอบเช้าพิเศษ 06:00 น. เช็คอินสะพานมือสีทองช่วงพระอาทิตย์ขึ้น ท่ามกลางทะเลหมอก ช่วงเวลาที่ดีที่สุดสำหรับการถ่ายภาพความประทับใจ (เฉพาะผู้พัก Mercure)
• ขึ้นกระเช้าบานาฮิลล์ + เช็คอินสะพานมือสีทอง (Golden Bridge) + Fantasy Park + สวนดอกไม้
• นั่งเรือกระด้งหมู่บ้านกั๊มทาน + เดินชมเมืองโบราณฮอยอัน + คาเฟ่ Faifo
• อาหารจัดเต็ม 2 บุฟเฟ่ต์ดัง (Beer Plaza + บุฟเฟ่ต์ซีฟู้ดรวมกุ้งมังกร ½ ตัว) + 3 มื้ออาหารเซ็ตพิเศษ (Ngon Thi Hoa, Chic Chillax, Madam Lan)
• รถตู้ปรับอากาศนำเที่ยวตลอดทริป + ไกด์ภาษาไทยดูแลส่วนตัว
• รวมประกันอุบัติเหตุการเดินทางสำหรับนักท่องเที่ยวต่างชาติตามกฎหมายเวียดนาม

👥 จำนวนผู้เดินทาง: ${paxCount} ท่าน (${selectedBand.paxLabelTh})
💰 ราคาเสนอพิเศษ: ${currency === 'THB' ? `฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')}` : `${calculation.suggestedSellPerPax} USD`} / ท่าน (อัตราแลกเปลี่ยน: 1 USD = ${effectiveRate} THB)
🏨 ห้องพักเดี่ยว: ${singleRooms > 0 ? `${singleRooms} ห้อง (+${formatPrice(calculation.singleSupp)}/ห้อง)` : 'ไม่มี'}
📄 ดูโปรแกรมและรูปภาพเต็ม: ${agentConfig?.isAgent ? clientShareUrl : 'https://greenseatour.vn/?tour=fitdad01&mode=landing'}
🏢 ${agentConfig?.isAgent && agentConfig?.name ? `ตัวแทนจำหน่าย: ${agentConfig.name}` : 'GreenSeaTour - บริษัทแลนด์เวียดนาม สำหรับกรุ๊ปไทย'}
${agentConfig?.isAgent ? (agentConfig.tel ? `📞 เบอร์โทร / Hotline: ${agentConfig.tel}` : '') : '📞 Phone / WhatsApp: (+84) 987.43.43.43'}
${agentConfig?.isAgent ? (agentConfig.line ? `📲 LINE ID: ${agentConfig.line}` : '') : '📲 LINE Official: https://lin.ee/Pwro79k'}
${agentConfig?.isAgent ? '' : '🌐 Website: www.greensealandtourvietnam.com'}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <div style={{
      background: '#fcfdfd',
      color: '#0f172a',
      minHeight: '100vh',
      fontFamily: isTh 
        ? "'Prompt', 'Sarabun', system-ui, sans-serif" 
        : "'Be Vietnam Pro', 'Plus Jakarta Sans', system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased'
    }}>
      
      {/* 1. LUXURY GLASS TOPBAR */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '0.75rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {!agentConfig.isAgent && (
            <button 
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.location.href = '/';
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.95rem',
                borderRadius: '0.6rem', border: '1px solid #e2e8f0', background: '#f8fafc',
                fontSize: '0.85rem', fontWeight: 700, color: '#334155', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={16} />
              {isVi ? 'Về Danh Mục Tour' : isTh ? 'กลับสู่ Catalog B2B' : 'Back to Catalog'}
            </button>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {agentConfig.isAgent ? (
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', fontWeight: 900, fontSize: '1.2rem',
                boxShadow: '0 2px 8px rgba(5,150,105,0.3)', flexShrink: 0
              }}>
                {agentConfig.name ? agentConfig.name.charAt(0).toUpperCase() : '✈️'}
              </div>
            ) : (
              <img src="/assets/logo-transparent.png" alt="Logo" style={{ height: '36px', width: '36px', objectFit: 'contain' }} />
            )}
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#00533d', letterSpacing: '-0.4px', lineHeight: 1.1, fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                {agentConfig.isAgent ? (agentConfig.name ? agentConfig.name.toUpperCase() : (isVi ? 'ĐẠI LÝ DU LỊCH' : isTh ? 'ตัวแทนท่องเที่ยว' : 'TRAVEL AGENCY')) : 'GREEN SEA TOUR'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                {agentConfig.isAgent 
                  ? (isVi ? 'Đại Lý Du Lịch Chuyên Nghiệp' : isTh ? 'ตัวแทนท่องเที่ยวอย่างเป็นทางการ' : 'Authorized Travel Partner')
                  : (isVi ? 'DMC Inbound Việt Nam Cho Thị Trường Thái Lan' : isTh ? 'DMC เวียดนาม สำหรับตลาดไทย • B2B Wholesaler' : 'Vietnam Inbound DMC • Thailand Market')}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* Agent Mode Trigger Button (Hidden in Client Share Mode) */}
          {!agentConfig.isAgent && (
            <button
              onClick={() => setShowAgentModal(true)}
              type="button"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 0.85rem', borderRadius: '0.55rem',
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <UserCheck size={15} style={{ color: '#059669' }} />
              <span>{isVi ? 'Chế độ Đại lý (B2B)' : isTh ? 'โหมดตัวแทน B2B' : 'Agent White-Label'}</span>
            </button>
          )}
          
          {/* Flag-only Language Selector with Crisp SVG Flags */}
          <div style={{
            display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '3px 4px',
            borderRadius: '0.65rem', border: '1.5px solid #cbd5e1', gap: '4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}>
            <button
              onClick={() => setLanguage('VI')}
              title="Tiếng Việt (Vietnamese)"
              style={{
                padding: '4px 6px', borderRadius: '0.45rem', border: 'none',
                background: language === 'VI' ? '#00533d' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
                boxShadow: language === 'VI' ? '0 1px 3px rgba(0, 83, 61, 0.3)' : 'none',
                opacity: language === 'VI' ? 1 : 0.65,
                transform: language === 'VI' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <VietnamFlag width={22} height={15} />
            </button>
            <button
              onClick={() => setLanguage('TH')}
              title="ภาษาไทย (Thai)"
              style={{
                padding: '4px 6px', borderRadius: '0.45rem', border: 'none',
                background: language === 'TH' ? '#00533d' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
                boxShadow: language === 'TH' ? '0 1px 3px rgba(0, 83, 61, 0.3)' : 'none',
                opacity: language === 'TH' ? 1 : 0.65,
                transform: language === 'TH' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <ThailandFlag width={22} height={15} />
            </button>
            <button
              onClick={() => setLanguage('EN')}
              title="English"
              style={{
                padding: '4px 6px', borderRadius: '0.45rem', border: 'none',
                background: language === 'EN' ? '#00533d' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
                boxShadow: language === 'EN' ? '0 1px 3px rgba(0, 83, 61, 0.3)' : 'none',
                opacity: language === 'EN' ? 1 : 0.65,
                transform: language === 'EN' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <UKFlag width={22} height={15} />
            </button>
          </div>

          {/* Dynamic WhatsApp / Hotline */}
          <a
            href={agentConfig.isAgent && agentConfig.tel ? `tel:${agentConfig.tel}` : "https://wa.me/84987434343"}
            target={agentConfig.isAgent && agentConfig.tel ? "_self" : "_blank"}
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.95rem',
              borderRadius: '0.55rem', background: '#25D366', color: '#fff', fontSize: '0.825rem',
              fontWeight: 800, textDecoration: 'none', boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
            }}
          >
            <Phone size={14} />
            {agentConfig.isAgent && agentConfig.tel ? agentConfig.tel : '(+84) 987.43.43.43'}
          </a>

          {/* Dynamic LINE */}
          <a
            href={agentConfig.isAgent && agentConfig.line ? (agentConfig.line.startsWith('http') ? agentConfig.line : `https://line.me/ti/p/~${agentConfig.line.replace('@', '')}`) : "https://lin.ee/Pwro79k"}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.95rem',
              borderRadius: '0.55rem', background: '#00b900', color: '#fff', fontSize: '0.825rem',
              fontWeight: 800, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0, 185, 0, 0.25)'
            }}
          >
            <MessageSquare size={14} />
            {agentConfig.isAgent && agentConfig.line ? `LINE: ${agentConfig.line}` : 'LINE Official'}
          </a>
        </div>
      </header>

      {/* 2. MAJESTIC CINEMATIC HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '520px',
        display: 'flex', alignItems: 'center',
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 85%), linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 45%), url('/assets/golden-bridge.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center 35%', color: '#fff',
        padding: '3.5rem 2rem 4.5rem'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
          
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
            
            {/* Card 1 */}
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

            {/* Card 2 */}
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

            {/* Card 3 */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.85rem', padding: '0.85rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(96, 165, 250, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Car size={18} style={{ color: '#60a5fa' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff' }}>
                  {isVi ? 'Xe Riêng VIP Đời Mới' : isTh ? 'รถตู้ VIP ปรับอากาศ' : 'Private VIP Vehicle'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                  {isVi ? '16-29 chỗ / Limousine' : '16-29 ที่นั่ง / Limousine'}
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.85rem', padding: '0.85rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(244, 114, 182, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users size={18} style={{ color: '#f472b6' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff' }}>
                  {isVi ? 'HDV nói tiếng Thái Lan' : isTh ? 'ไกด์ภาษาไทยดูแลส่วนตัว' : 'Private Thai Guide'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                  {isVi ? 'Chăm sóc chu đáo suốt tuyến' : 'ดูแลตลอดเส้นทาง'}
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
                    : (isVi ? 'Xem Bảng Giá & Tính Báo Giá' : isTh ? 'คำนวณราคา NET & ทำใบเสนอราคา' : 'Calculate B2B Net Rates')}
                </a>
              </Magnet>

              {!agentConfig.isAgent && (
                <Magnet magnetStrength={0.25}>
                  <a
                    href="/tours/FITDAD01.pdf"
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
                  ${agentConfig.isAgent || agentConfig.hideNet ? Math.round(194 * (1 + agentMarginPercent / 100)) : 194} <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>USD (฿{Math.round((agentConfig.isAgent || agentConfig.hideNet ? Math.round(194 * (1 + agentMarginPercent / 100)) : 194) * effectiveRate).toLocaleString('en-US')}) / {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2.5 B2B DMC POSITIONING & AGENT SALES KIT (Option 2 - Hidden in White-Label Client Mode) */}
      {!agentConfig.isAgent && !agentConfig.hideNet && (
        <section style={{ maxWidth: '1240px', margin: '-2.5rem auto 2.5rem', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.25rem' }}>
            
            {/* Block 1: Operated by Green Sea Tour — Vietnam Inbound DMC */}
            <div style={{
              background: '#ffffff',
              borderRadius: '1.25rem',
              padding: '1.5rem 1.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.85rem'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#00533d', padding: '0.3rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={14} style={{ color: '#059669' }} />
                  {isVi ? 'Vận hành bởi Green Sea Tour' : isTh ? 'ดำเนินงานโดย Green Sea Tour' : 'Operated by Green Sea Tour'}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.4rem', lineHeight: 1.3 }}>
                  {isVi ? 'Vietnam Inbound DMC cho đối tác lữ hành Thái Lan' : isTh ? 'Vietnam Inbound DMC สำหรับบริษัททัวร์ไทย' : 'Vietnam Inbound DMC for Thai Travel Agencies'}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.825rem', lineHeight: 1.5, margin: 0 }}>
                  {isVi 
                    ? 'Chương trình FITDAD01 được vận hành trực tiếp bởi Green Sea Tour — đơn vị land operator tại Việt Nam, hỗ trợ công ty tour Thái từ đón tiễn, khách sạn 4 sao, xe VIP, HDV tiếng Thái, nhà hàng, vé cáp treo đến chăm sóc đoàn trọn tuyến.'
                    : isTh 
                      ? 'โปรแกรมนี้ดำเนินงานโดย Green Sea Tour ทีมแลนด์โอเปอเรเตอร์ในเวียดนาม ดูแลครบตั้งแต่รับสนามบิน โรงแรม รถ ไกด์ ร้านอาหาร ตั๋วเข้าชม และการดูแลกรุ๊ประหว่างเดินทาง'
                      : 'This FITDAD01 program is operated by Green Sea Tour, a Vietnam-based inbound land operator supporting Thai travel partners with airport transfers, 4-star hotels, transport, Thai guides, meals, tickets and on-trip care.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.25rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#00533d', marginBottom: '2px' }}>
                    📍 Local Vietnam Operation
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Vận hành trực tiếp tại Đà Nẵng & Miền Trung' : 'ทีมงานประจำเวียดนาม ประสานงานตรง'}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#00533d', marginBottom: '2px' }}>
                    🇹🇭 Thai Market Support
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'HDV tiếng Thái & thực đơn chuẩn vị' : 'ไกด์ภาษาไทย & อาหารรสชาติถูกปาก'}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#00533d', marginBottom: '2px' }}>
                    💬 LINE-first Response
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Phản hồi báo giá & điều chỉnh nhanh qua LINE' : 'ตอบกลับและปรับโปรแกรมรวดเร็วผ่าน LINE'}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#00533d', marginBottom: '2px' }}>
                    ⚡ Flexible Handling
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Linh hoạt xe, khách sạn, bữa ăn theo đoàn' : 'ปรับรถ โรงแรม อาหารตามต้องการ'}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: B2B Agent Sales Kit */}
            <div style={{
              background: '#ffffff',
              borderRadius: '1.25rem',
              padding: '1.5rem 1.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.85rem'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#eff6ff', color: '#1d4ed8', padding: '0.3rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Sparkles size={14} style={{ color: '#2563eb' }} />
                  {isVi ? 'Tài liệu Sales Kit B2B' : isTh ? 'B2B Agent Sales Kit' : 'B2B Agent Sales Kit'}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.4rem', lineHeight: 1.3 }}>
                  {isVi ? 'Sales kit B2B cho đại lý và công ty tour' : isTh ? 'Sales Kit สำหรับบริษัททัวร์และเอเจนซี่' : 'B2B Sales Kit for Travel Partners'}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.825rem', lineHeight: 1.5, margin: 0 }}>
                  {isVi 
                    ? 'Thiết kế riêng cho đội ngũ sales và đối tác lữ hành tư vấn khách FIT / đoàn gia đình / incentive. Toàn bộ giá NET, tài liệu PDF và công cụ xuất poster báo giá đã sẵn sàng sử dụng.'
                    : isTh 
                      ? 'หน้านี้ออกแบบสำหรับทีมขายและพาร์ทเนอร์ทัวร์ ใช้เสนอโปรแกรมให้ลูกค้า FIT / กรุ๊ปเล็ก / ครอบครัว / Incentive พร้อมข้อมูลราคา NET และรายละเอียดบริการสำหรับการทำใบเสนอราคา B2B'
                      : 'Designed for travel agents and sales teams to present the FITDAD01 itinerary with transparent B2B NET rates, instant profit calculators and ready-to-share posters.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.25rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#1e40af', marginBottom: '2px' }}>
                    💰 NET Rate for Agents
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Bảng giá NET minh bạch theo từng mốc đoàn' : 'ราคา NET ชัดเจนตามจำนวนผู้เดินทาง'}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#1e40af', marginBottom: '2px' }}>
                    📄 Ready-to-Send PDF
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Lịch trình song ngữ định dạng chuẩn gửi khách' : 'โปรแกรมพร้อมส่งต่อให้ทีมขายและลูกค้า'}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#1e40af', marginBottom: '2px' }}>
                    📱 1-Click LINE Quote
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Sao chép văn bản báo giá hoặc xuất ảnh Poster' : 'คัดลอกข้อความหรือสร้างโปสเตอร์ส่ง LINE'}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.55rem 0.7rem', borderRadius: '0.55rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#1e40af', marginBottom: '2px' }}>
                    🏷️ White-Label Share
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.3 }}>
                    {isVi ? 'Tạo link gắn thương hiệu đại lý & ẩn giá NET' : 'สร้างลิงก์ใส่แบรนด์ตัวแทน & ซ่อนราคา NET'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. INTERACTIVE EXPANDING DESTINATION HIGHLIGHTS ACCORDION */}
      <section style={{ maxWidth: '1240px', margin: agentConfig.isAgent || agentConfig.hideNet ? '-2.5rem auto 3.5rem' : '0 auto 3.5rem', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00533d', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <Camera size={16} />
                {isVi ? 'Bộ Sưu Tập Hình Ảnh Điểm Đến Thực Tế' : isTh ? 'แกลเลอรีภาพบรรยากาศจริง' : 'Real Tour Highlights Gallery'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0.25rem 0 0', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                {isVi ? 'Khám Phá 7 Trải Nghiệm Độc Quyền Trong Hành Trình' : isTh ? 'สำรวจ 7 ไฮไลท์สุดเอ็กซ์คลูซีฟในโปรแกรม' : 'Explore 7 Signature Highlights'}
              </h2>
            </div>
          </div>

          {/* Expanding Image Accordion Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '0.75rem',
            height: '460px',
            overflowX: 'auto',
            paddingBottom: '0.25rem'
          }}>
            {GALLERY_ITEMS.map((item, idx) => {
              const isActive = idx === activeGalleryIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveGalleryIdx(idx)}
                  onMouseEnter={() => setActiveGalleryIdx(idx)}
                  style={{
                    position: 'relative',
                    height: '100%',
                    flex: isActive ? '3.5 1 0%' : '1 1 0%',
                    minWidth: isActive ? '300px' : '58px',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    boxShadow: isActive ? '0 12px 30px -5px rgba(0, 83, 61, 0.25)' : '0 4px 10px rgba(0,0,0,0.04)',
                    border: isActive ? '2px solid #059669' : '1px solid #e2e8f0'
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={item.img}
                    alt={item.titleVi}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.6s ease'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive
                      ? 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 70%)',
                    transition: 'background 0.5s ease'
                  }} />

                  {/* Step Number Tag (Always visible on top) */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 3,
                    background: isActive ? '#059669' : 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <span>0{idx + 1}</span>
                  </div>

                  {/* Content Overlay (Only visible when active) */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      <h4 style={{
                        margin: '0 0 0.4rem',
                        color: '#ffffff',
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        lineHeight: 1.2,
                        fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
                        textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                      }}>
                        {isVi ? item.titleVi : isTh ? item.titleTh : item.titleEn}
                      </h4>
                      <p style={{
                        margin: 0,
                        color: '#f1f5f9',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                      }}>
                        {isVi ? item.descVi : isTh ? item.descTh : item.descEn}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE DAY-BY-DAY TIMELINE & CULINARY SHOWCASE */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 5rem', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#ecfdf5', color: '#00533d', padding: '0.4rem 1rem',
            borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800,
            marginBottom: '0.75rem', border: '1px solid #a7f3d0'
          }}>
            <Sparkles size={15} />
            <span>{isVi ? 'HÀNH TRÌNH 3 NGÀY 2 ĐÊM CHI TIẾT' : isTh ? 'โปรแกรมการเดินทาง 3 วัน 2 คืน' : '3 DAYS 2 NIGHTS ITINERARY'}</span>
          </div>
          
          <h2 style={{
            fontSize: '2.25rem', fontWeight: 900, color: '#0f172a',
            margin: '0 0 0.75rem', letterSpacing: '-0.5px',
            fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif"
          }}>
            {isVi ? 'Lịch Trình Độc Quyền & Trải Nghiệm Ẩm Thực' : isTh ? 'ตารางทัวร์และประสบการณ์อาหารระดับพรีเมียม' : 'Exclusive Itinerary & Culinary'}
          </h2>
          
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            {isVi 
              ? 'Mỗi ngày đều được thiết kế tối ưu thời gian di chuyển, dịch vụ ăn uống và trải nghiệm trọn vẹn nhất:' 
              : 'ออกแบบโปรแกรมอย่างพิถีพิถัน พร้อมอาหารระดับพรีเมียมและที่พัก 4 ดาวครบครัน:'}
          </p>
        </div>

        {/* 3 Day Interactive Tabs */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem', marginBottom: '2rem'
        }}>
          {[
              { day: 1, titleVi: 'Ngày 1: Chạm Đỉnh Bà Nà Hills', titleTh: 'วันที่ 1: ยอดเขาบานาฮิลล์', titleEn: 'Day 1: Ba Na Hills Peak', subVi: 'Lên cáp treo • Đêm Làng Pháp • Nghỉ đêm Mercure', subTh: 'ขึ้นกระเช้า • ค่ำคืนหมู่บ้านฝรั่งเศส • พัก Mercure' },
              { day: 2, titleVi: 'Ngày 2: Rừng Dừa & Phố Cổ Hội An', titleTh: 'วันที่ 2: ล่องเรือกระด้ง & ฮอยอัน', titleEn: 'Day 2: Coconut Jungle & Hoi An', subVi: 'Golden Hours Cầu Vàng • Rừng Dừa • Phố Cổ', subTh: 'Golden Hours สะพานมือ • ล่องเรือกระด้ง • ฮอยอัน' },
              { day: 3, titleVi: 'Ngày 3: Sơn Trà & Tiễn Sân Bay', titleTh: 'วันที่ 3: วัดลิงอึ๋ง & ชอปปิ้ง', titleEn: 'Day 3: Son Tra & Airport Transfer', subVi: 'Chùa Linh Ứng • Chợ Hàn • Madam Lân', subTh: 'เจ้าแม่กวนอิม • ตลาดฮาน • ส่งสนามบิน' }
            ].map(tab => (
              <button
                key={tab.day}
                onClick={() => setActiveDayTab(tab.day)}
                style={{
                  padding: '1.25rem 1rem', borderRadius: '1rem', border: '2px solid',
                  borderColor: activeDayTab === tab.day ? '#00533d' : '#e2e8f0',
                  background: activeDayTab === tab.day ? '#ecfdf5' : '#f8fafc',
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: activeDayTab === tab.day ? '0 8px 20px rgba(0, 83, 61, 0.12)' : 'none'
                }}
              >
                <div style={{
                  display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '0.35rem',
                  background: activeDayTab === tab.day ? '#00533d' : '#cbd5e1',
                  color: '#fff', fontSize: '0.725rem', fontWeight: 800, marginBottom: '0.35rem'
                }}>
                  DAY 0{tab.day}
                </div>
                <div style={{ fontWeight: 900, fontSize: '1rem', color: activeDayTab === tab.day ? '#00533d' : '#0f172a', marginBottom: '2px' }}>
                  {isVi ? tab.titleVi : isTh ? tab.titleTh : tab.titleEn}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  {isVi ? tab.subVi : tab.subTh}
                </div>
              </button>
            ))}
          </div>

          {/* Active Day Card Showcase */}
          {activeDayTab === 1 && (
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '1.25rem', overflow: 'hidden', background: '#fff' }}>
              <div style={{ position: 'relative', height: '300px' }}>
                <img 
                  src="/assets/golden-bridge.jpg" 
                  alt="Ba Na Hills Golden Bridge" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                  display: 'flex', alignItems: 'flex-end', padding: '2rem'
                }}>
                  <div>
                    <span style={{ background: '#00533d', color: '#fff', fontSize: '0.85rem', fontWeight: 800, padding: '0.3rem 0.85rem', borderRadius: '0.4rem', marginRight: '0.75rem' }}>
                      {isVi ? 'NGÀY 01' : isTh ? 'วันที่ 01' : 'DAY 01'}
                    </span>
                    <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                      {isVi ? 'ĐÀ NẴNG – BÀ NÀ HILLS (Nghỉ đêm đỉnh Bà Nà)' : 'DA NANG – BA NA HILLS (พักบนบานาฮิลล์)'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 900, color: '#00533d' }}>
                  {isVi ? 'Hoạt động & Lịch trình chi tiết trong ngày:' : isTh ? 'ไฮไลท์และกิจกรรมในวันแรก:' : 'Day 1 Activities:'}
                </h4>
                <ul style={{ margin: '0 0 2rem', paddingLeft: '1.35rem', color: '#334155', lineHeight: 1.8, fontSize: '0.975rem' }}>
                  {isVi ? (
                    <>
                      <li><strong>Đón khách tại Sân bay Đà Nẵng:</strong> Hướng dẫn viên nói tiếng Thái Lan và xe du lịch đón đoàn tại sân bay Đà Nẵng.</li>
                      <li><strong>Lên Cáp treo Bà Nà Hills:</strong> Trải nghiệm tuyến cáp treo đạt nhiều kỷ lục thế giới, ngắm toàn cảnh núi rừng hùng vĩ.</li>
                      <li><strong>Check-in Cầu Vàng (Golden Bridge):</strong> Biểu tượng bàn tay khổng lồ vươn giữa mây trời nổi tiếng thế giới.</li>
                      <li><strong>Khu vui chơi Fantasy Park:</strong> Thỏa sức trải nghiệm hơn 105 trò chơi hấp dẫn miễn phí.</li>
                      <li><strong>Vườn hoa Le Jardin D'Amour & Làng Pháp:</strong> Chụp ảnh cùng các khu vườn hoa phong cách châu Âu cổ kính.</li>
                      <li><strong>Nghỉ đêm Mercure Danang French Village 4*:</strong> Nhận phòng khách sạn, tận hưởng không khí Làng Pháp se lạnh, lãng mạn về đêm và sẵn sàng cho đặc quyền Golden Hours sáng sớm hôm sau.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>รับคณะที่สนามบินดานัง:</strong> ไกด์ภาษาไทยและรถตู้ปรับอากาศรอต้อนรับคณะที่สนามบินดานัง</li>
                      <li><strong>ขึ้นกระเช้าลอยฟ้าบานาฮิลล์:</strong> สัมผัสกระเช้าลอยฟ้าที่ยาวและสูงที่สุดระดับโลก ชมวิวทิวทัศน์ธรรมชาติอันงดงาม</li>
                      <li><strong>เช็คอินสะพานมือสีทอง (Golden Bridge):</strong> จุดถ่ายรูปแลนด์มาร์กระดับโลก สะพานลอยฟ้าที่โอบอุ้มด้วยสองมือยักษ์</li>
                      <li><strong>สวนสนุกแฟนตาซีพาร์ค (Fantasy Park):</strong> สนุกสนานกับเครื่องเล่นหลากหลาย ทั้งสวนสนุกในร่ม และกลางแจ้ง</li>
                      <li><strong>สวนดอกไม้ฝรั่งเศส (Le Jardin D'Amour) & อุโมงค์เก็บไวน์ Debay:</strong> ถ่ายรูปกับสวนดอกไม้นานาพันธุ์สไตล์ยุโรป</li>
                      <li><strong>เช็คอินโรงแรม Mercure French Village 4*:</strong> พักผ่อนและสัมผัสอากาศเย็นสบายตลอดทั้งคืนบนบานาฮิลล์ พร้อมเตรียมรับสิทธิพิเศษ Golden Hours ยามเช้าตรู่</li>
                    </>
                  )}
                </ul>

                {/* Culinary & Hotel Showcase (Luxury Card) */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.25rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 900, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Utensils size={17} />
                      {isVi ? 'Bữa trưa (Lunch 11$): Nhà hàng Ngon Thị Hoa' : 'มื้อกลางวัน (Lunch 11$): Nhà hàng Ngon Thi Hoa'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {isVi 
                        ? '1. Phở gà • 2. Chả giò tôm thịt tươi • 3. Nem nướng Nha Trang • 4. Bánh hỏi heo quay giòn da • 5. Cơm chiên trứng • 6. Trái cây tươi tráng miệng' 
                        : '1. เฝอไก่ (Phở gà) • 2. เปาะเปี๊ยะกุ้งหมูสด • 3. แหนมเนือง • 4. ขนมฮอยหมูย่าง (Bánh hỏi heo quay) • 5. ข้าวผัดไข่ • 6. ผลไม้สดตามฤดูกาล'}
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Utensils size={17} />
                      {isVi ? 'Bữa tối (Dinner): Beer Plaza Buffet Bà Nà Hills' : 'มื้อค่ำ (Dinner): Beer Plaza Buffet Bana Hills'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {isVi 
                        ? 'Đại tiệc buffet quốc tế hơn 100 món thượng hạng kèm bia tươi Đức trên đỉnh Bà Nà Hills.' 
                        : 'บุฟเฟ่ต์นานาชาติระดับพรีเมียมบนบานาฮิลล์ พร้อมเบียร์สดเยอรมันรสเลิศและอาหารมากกว่า 100 เมนู'}
                    </div>
                  </div>

                  <div style={{ gridColumn: '1 / -1', background: '#fdf4ff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0abfc' }}>
                    <div style={{ fontWeight: 900, color: '#86198f', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Hotel size={17} />
                      {isVi ? 'Khách sạn nghỉ đêm: Mercure Danang French Village Bana Hills 4*' : 'โรงแรมที่พัก (Overnight): Mercure Danang French Village Bana Hills 4*'}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: '#701a75', marginTop: '3px' }}>
                      {isVi ? '*Trường hợp chọn phòng Family Bunk (3 khách/phòng): phụ thu +25$/phòng/đêm' : '*กรณีเลือกพักห้อง Family Bunk (พัก 3 ท่าน): ชาร์จเพิ่ม +$25 USD/ห้อง/คืน'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeDayTab === 2 && (
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '1.25rem', overflow: 'hidden', background: '#fff' }}>
              <div style={{ position: 'relative', height: '300px' }}>
                <img 
                  src="/assets/hoi-an-night.jpg" 
                  alt="Hoi An Night" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                  display: 'flex', alignItems: 'flex-end', padding: '2rem'
                }}>
                  <div>
                    <span style={{ background: '#00533d', color: '#fff', fontSize: '0.85rem', fontWeight: 800, padding: '0.3rem 0.85rem', borderRadius: '0.4rem', marginRight: '0.75rem' }}>
                      {isVi ? 'NGÀY 02' : isTh ? 'วันที่ 02' : 'DAY 02'}
                    </span>
                    <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                      {isVi ? 'BÀ NÀ HILLS – HỘI AN – ĐÀ NẴNG (Rừng Dừa & Phố Cổ Hội An)' : 'BA NA HILLS – HOI AN – DA NANG (ล่องเรือกระด้ง & ฮอยอัน)'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                
                {/* VIP Golden Hours Comprehensive Showcase (Rich Media & Schedule) */}
                <div style={{
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)',
                  border: '2px solid #f59e0b',
                  borderRadius: '1.25rem',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  boxShadow: '0 8px 25px rgba(245, 158, 11, 0.18)'
                }}>
                  {/* Top VIP Badge & Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '46px', height: '46px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)'
                      }}>
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '3px' }}>
                          <span style={{ background: '#d97706', color: '#fff', fontSize: '0.7rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {isVi ? 'ĐẶC QUYỀN VIP MERCURE' : isTh ? 'สิทธิพิเศษระดับ VIP MERCURE' : 'MERCURE VIP PRIVILEGE'}
                          </span>
                          <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                            {isVi ? '06:00 – 07:15 SÁNG' : isTh ? '06:00 – 07:15 น.' : '06:00 – 07:15 AM'}
                          </span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#78350f', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                          {isVi ? 'Trải Nghiệm "Golden Hours" Đón Bình Minh Cầu Vàng' : isTh ? 'สัมผัสประสบการณ์ "Golden Hours" สะพานมือสีทองยามเช้าตรู่' : 'Exclusive "Golden Hours" Sunrise at Golden Bridge'}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Descriptive Narrative */}
                  <p style={{ margin: '0 0 1.25rem', fontSize: '0.925rem', color: '#78350f', lineHeight: 1.75 }}>
                    {isVi 
                      ? 'Bước lên Cầu Vàng vào một trong những khoảnh khắc đẹp nhất trong ngày. Khi những tia nắng đầu tiên khẽ chạm nhẹ lên núi rừng Bà Nà, Cầu Vàng dần hiện ra giữa mây trời, nổi bật với đôi bàn tay đá khổng lồ, thảm rừng xanh và làn sương sớm bảng lảng. Nhờ lưu trú tại Mercure Làng Pháp, bạn được đón những chuyến cáp treo sớm độc quyền từ đỉnh núi để cảm nhận biểu tượng Đà Nẵng theo cách nhẹ nhàng và tinh tế hơn: ít vội vã hơn, nhiều khoảng không hơn và đủ thời gian để bạn thong thả tận hưởng khung cảnh theo nhịp riêng của mình.' 
                      : isTh
                        ? 'สัมผัสสะพานมือสีทองในห้วงเวลาที่งดงามและสงบที่สุดของวัน สิทธิพิเศษสำหรับผู้เข้าพักที่ Mercure Bana Hills ให้คุณได้ตื่นขึ้นมากลางหมู่บ้านฝรั่งเศส นั่งกระเช้ารอบเช้าตรู่สู่สะพานมือยามแสงแดดแรกทอประกายผ่านทะเลหมอกและป่าเขาเขียวขจี เป็นวิธีที่ผ่อนคลายและประทับใจยิ่งขึ้นในการท่องเที่ยว — ไม่เร่งรีบ มีพื้นที่ส่วนตัวกว้างขวาง และเต็มอิ่มกับบรรยากาศอันน่าหลงใหลในจังหวะของตัวคุณเอง'
                        : 'Step onto the Golden Bridge during the most magical and serene moment of the day. Exclusive to guests staying at Mercure Bana Hills, you can wake up right in the French Village and take early morning cable cars before the crowds arrive. As the first sunbeams touch the mountain peaks and morning mist, enjoy a softer, more intimate experience: less rushing, more open space, and all the time in the world to embrace the breathtaking beauty at your own pace.'}
                  </p>

                  {/* 2-Column Photo & Feature Showcase */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ position: 'relative', height: '180px', borderRadius: '0.85rem', overflow: 'hidden', border: '1px solid #fde68a' }}>
                      <img 
                        src="/assets/golden-bridge-sunrise.jpg" 
                        alt="Golden Bridge Sunrise" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '0.75rem 1rem' }}>
                        <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 800 }}>
                          {isVi ? '🌅 Bình minh Cầu Vàng vắng người' : isTh ? '🌅 พระอาทิตย์ขึ้นสะพานมือ ไร้ผู้คน' : '🌅 Sunrise at Golden Bridge'}
                        </span>
                      </div>
                    </div>

                    <div style={{ position: 'relative', height: '180px', borderRadius: '0.85rem', overflow: 'hidden', border: '1px solid #fde68a' }}>
                      <img 
                        src="/assets/cable-car-sunrise.jpg" 
                        alt="Early Cable Car Sunrise" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '0.75rem 1rem' }}>
                        <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 800 }}>
                          {isVi ? '🚡 Tuyến cáp treo sớm Ga Louvre ➔ Bordeaux' : isTh ? '🚡 กระเช้ารอบเช้า สถานี Louvre ➔ Bordeaux' : '🚡 Early Cable Car Louvre ➔ Bordeaux'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Early Cable Car Time Slots Grid */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '0.85rem', padding: '1rem', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#92400e', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={15} style={{ color: '#d97706' }} />
                      <span>{isVi ? 'Lịch 3 chuyến cáp treo sớm độc quyền (Ga Louvre ➔ Ga Bordeaux):' : isTh ? 'รอบกระเช้าเช้าพิเศษเฉพาะผู้พัก (สถานี Louvre ➔ Bordeaux):' : 'Exclusive Early Cable Car Schedule (Louvre ➔ Bordeaux):'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
                      <div style={{ background: '#fff', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1px solid #fef3c7', textAlign: 'center' }}>
                        <div style={{ fontWeight: 900, color: '#d97706', fontSize: '0.95rem' }}>06:00 – 06:05</div>
                        <div style={{ fontSize: '0.75rem', color: '#78350f' }}>{isVi ? 'Chuyến 1 (Đón bình minh)' : isTh ? 'รอบที่ 1 (ชมพระอาทิตย์ขึ้น)' : 'Slot 1 (Sunrise)'}</div>
                      </div>
                      <div style={{ background: '#fff', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1px solid #fef3c7', textAlign: 'center' }}>
                        <div style={{ fontWeight: 900, color: '#d97706', fontSize: '0.95rem' }}>06:30 – 06:35</div>
                        <div style={{ fontSize: '0.75rem', color: '#78350f' }}>{isVi ? 'Chuyến 2 (Săn biển mây)' : isTh ? 'รอบที่ 2 (สัมผัสทะเลหมอก)' : 'Slot 2 (Cloud Sea)'}</div>
                      </div>
                      <div style={{ background: '#fff', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1px solid #fef3c7', textAlign: 'center' }}>
                        <div style={{ fontWeight: 900, color: '#d97706', fontSize: '0.95rem' }}>07:00 – 07:05</div>
                        <div style={{ fontSize: '0.75rem', color: '#78350f' }}>{isVi ? 'Chuyến 3 (Nắng mai dịu mát)' : isTh ? 'รอบที่ 3 (แสงเช้าสดใส)' : 'Slot 3 (Morning Sun)'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 900, color: '#00533d' }}>
                  {isVi ? 'Hoạt động & Lịch trình chi tiết trong ngày:' : isTh ? 'ไฮไลท์และกิจกรรมในวันที่สอง:' : 'Day 2 Activities:'}
                </h4>
                <ul style={{ margin: '0 0 2rem', paddingLeft: '1.35rem', color: '#334155', lineHeight: 1.8, fontSize: '0.975rem' }}>
                  {isVi ? (
                    <>
                      <li><strong>06:00 – 07:00: Trải nghiệm "Golden Hours" Cầu Vàng:</strong> Thức dậy giữa mây ngàn, đón tuyến cáp treo sớm đến Cầu Vàng ngắm bình minh và chụp ảnh vắng người tuyệt đối.</li>
                      <li><strong>07:30 – 08:30: Ăn sáng buffet thịnh soạn:</strong> Thưởng thức bữa sáng quốc tế tại nhà hàng khách sạn Mercure Bà Nà Hills.</li>
                      <li><strong>09:00: Xuống cáp treo đi Hội An:</strong> Rời Bà Nà Hills, xe đưa đoàn di chuyển đến Đô thị cổ Hội An.</li>
                      <li><strong>Trải nghiệm Thuyền thúng Rừng dừa Bảy Mẫu Cẩm Thanh:</strong> Khám phá nét đẹp sông nước miền Trung, xem nghệ nhân biểu diễn múa thúng giăng lưới.</li>
                      <li><strong>Khám phá Phố cổ Hội An:</strong> Đi bộ tham quan Chùa Cầu Nhật Bản, Nhà cổ Tấn Ký, Hội quán Phúc Kiến.</li>
                      <li><strong>Check-in Faifo Coffee Rooftop:</strong> Quán cà phê có góc ban công ngắm toàn cảnh mái ngói rêu phong Hội An (tự túc đồ uống).</li>
                      <li><strong>Về Đà Nẵng:</strong> Nhận phòng khách sạn 4 sao tại trung tâm thành phố Đà Nẵng, tự do dạo biển Mỹ Khê về đêm.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>06:00 – 07:00: สัมผัส Golden Hours สะพานมือสีทอง:</strong> ตื่นรับอากาศบริสุทธิ์บนยอดเขา นั่งกระเช้ารอบเช้าสู่สะพานมือสีทอง ถ่ายรูปวิวปัง ไร้ผู้คนรบกวน</li>
                      <li><strong>07:30 – 08:30: รับประทานอาหารเช้าบุฟเฟ่ต์:</strong> บุฟเฟ่ต์นานาชาติ ณ ห้องอาหารของโรงแรม Mercure Ba Na Hills</li>
                      <li><strong>09:00: ลงกระเช้าสู่ฮอยอัน:</strong> เดินทางมุ่งหน้าสู่เมืองมรดกโลกฮอยอัน</li>
                      <li><strong>นั่งเรือกระด้งหมู่บ้านกั๊มทาน (Cam Thanh Coconut Village):</strong> สัมผัสวิถีชีวิตชาวประมง ชมการหมุนเรือกระด้งสุดมันส์และชมธรรมชาติป่ามะพร้าว</li>
                      <li><strong>เดินชมเมืองโบราณฮอยอัน (Hoi An Ancient Town):</strong> ชมสะพานญี่ปุ่นโบราณ (Japanese Covered Bridge), บ้านโบราณตระกูลเติ๋นกี, สมาคมชาวจีนฟุกเกี๋ยน</li>
                      <li><strong>เช็คอินร้านกาแฟ Faifo Coffee:</strong> จุดชมวิวเมืองเก่าฮอยอันจากมุมสูงบนดาดฟ้ายอดฮิต (ไม่รวมค่าเครื่องดื่ม)</li>
                      <li><strong>เดินทางกลับดานัง:</strong> เช็คอินเข้าสู่โรงแรมริมทะเล/ใจกลางเมืองดานัง 4 ดาว</li>
                    </>
                  )}
                </ul>

                {/* Culinary & Hotel Showcase */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.25rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 900, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Utensils size={17} />
                      {isVi ? 'Bữa trưa (Lunch 11$): Nhà hàng Chic Chillax Hội An' : 'มื้อกลางวัน (Lunch 11$): Nhà hàng Chic Chillax Hoi An'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {isVi 
                        ? '1. Chả giò chiên giòn • 2. Gỏi bắp chuối tôm thịt • 3. Súp nấm hương • 4. Cá diêu hồng hấp cuốn nấm & bắp cải • 5. Gà xào gừng • 6. Cải ngọt xào tỏi • 7. Cơm chiên rau củ • 8. Dưa hấu tráng miệng' 
                        : '1. เปาะเปี๊ยะทอด • 2. ยำหัวปลีกุ้ง • 3. ซุปเห็ด • 4. ปลาทับทิมนึ่ง + กะหล่ำปลีห่อเห็ด • 5. ไก่ผัดขิง • 6. ผักกวางตุ้งผัดกระเทียม • 7. ข้าวผัดผักรวม • 8. แตงโม'}
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Utensils size={17} />
                      {isVi ? 'Bữa tối (Dinner): Long Qiao Seafood Buffet + TÔM HÙM' : 'มื้อค่ำ (Dinner): Long Qiao Seafood Buffet + กุ้งมังกร'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {isVi 
                        ? 'Buffet hải sản tươi sống hấp, lẩu hải sản đặc sắc + ĐẶC BIỆT TẶNG KÈM ½ TÔM HÙM NƯỚNG BƠ TỎI / KHÁCH.' 
                        : 'บุฟเฟ่ต์ซีฟู้ดของสดนึ่ง, หม้อไฟซีฟู้ดทะเลรวม + พิเศษรวมกุ้งมังกรอบเนย ½ ตัวต่อท่าน'}
                    </div>
                  </div>

                  <div style={{ gridColumn: '1 / -1', background: '#fdf4ff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0abfc' }}>
                    <div style={{ fontWeight: 900, color: '#86198f', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Hotel size={17} />
                      {isVi ? 'Khách sạn nghỉ đêm: Khách sạn Đông Dương (Dong Duong Hotel 4*) hoặc tương đương tại Đà Nẵng' : 'โรงแรมที่พัก (Overnight): Dong Duong Hotel (4 Stars) Da Nang หรือเทียบเท่า'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeDayTab === 3 && (
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '1.25rem', overflow: 'hidden', background: '#fff' }}>
              <div style={{ position: 'relative', height: '300px' }}>
                <img 
                  src="/assets/linh-ung-pagoda.jpg" 
                  alt="Da Nang Linh Ung" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                  display: 'flex', alignItems: 'flex-end', padding: '2rem'
                }}>
                  <div>
                    <span style={{ background: '#00533d', color: '#fff', fontSize: '0.85rem', fontWeight: 800, padding: '0.3rem 0.85rem', borderRadius: '0.4rem', marginRight: '0.75rem' }}>
                      {isVi ? 'NGÀY 03' : isTh ? 'วันที่ 03' : 'DAY 03'}
                    </span>
                    <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                      {isVi ? 'ĐÀ NẴNG CITY TOUR – TIỄN SÂN BAY (Chùa Linh Ứng & Chợ Hàn)' : isTh ? 'DA NANG CITY TOUR – AIRPORT (วัดลิงอึ๋ง & ตลาดฮาน)' : 'DA NANG CITY TOUR - AIRPORT'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 900, color: '#00533d' }}>
                  {isVi ? 'Hoạt động & Lịch trình chi tiết trong ngày:' : isTh ? 'ไฮไลท์และกิจกรรมในวันที่สาม:' : 'Day 3 Activities:'}
                </h4>
                <ul style={{ margin: '0 0 2rem', paddingLeft: '1.35rem', color: '#334155', lineHeight: 1.8, fontSize: '0.975rem' }}>
                  {isVi ? (
                    <>
                      <li><strong>Ăn sáng:</strong> Thưởng thức bữa sáng tại khách sạn, làm thủ tục trả phòng.</li>
                      <li><strong>Viếng Chùa Linh Ứng Bán đảo Sơn Trà:</strong> Chiêm bái Tượng Phật Bà Quan Âm cao 67m hướng biển, ngắm toàn cảnh bờ biển Đà Nẵng.</li>
                      <li><strong>Check-in Sơn Trà Marina Café:</strong> Quán cà phê phong cách Địa Trung Hải trắng xanh tựa Santorini (tự túc đồ uống).</li>
                      <li><strong>Chụp ảnh Cầu Rồng & Công viên APEC:</strong> Biểu tượng kiến trúc hiện đại của thành phố Đà Nẵng.</li>
                      <li><strong>Mua sắm đặc sản Chợ Hàn (Han Market):</strong> Mua quà lưu niệm, bánh kẹo đặc sản, hạt sen sấy, cà phê...</li>
                      <li><strong>Tiễn sân bay Đà Nẵng:</strong> Xe đưa đoàn ra sân bay làm thủ tục xuất cảnh về lại Thái Lan. Kết thúc tour tốt đẹp.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>อาหารเช้า:</strong> รับประทานอาหารเช้า ณ โรงแรมที่พักดานัง</li>
                      <li><strong>ไหว้พระวัดลิงอึ๋ง แหลมเซินตรา (Linh Ung Pagoda):</strong> สักการะองค์เจ้าแม่กวนอิมสีขาวสูง 67 เมตรที่ใหญ่ที่สุดในเวียดนาม ชมวิวอ่าวดานังแบบพาโนรามา</li>
                      <li><strong>เช็คอิน Son Tra Marina Café:</strong> คาเฟ่สไตล์ซานโตรินีสีขาวฟ้าสุดชิคริมทะเล (ไม่รวมอาหารและเครื่องดื่ม)</li>
                      <li><strong>ถ่ายรูปสะพานมังกร (Dragon Bridge) & สวนสาธารณะ APEC:</strong> แลนด์มาร์กสัญลักษณ์แห่งเมืองดานัง</li>
                      <li><strong>ชอปปิ้งตลาดฮาน (Han Market):</strong> ชอปปิ้งของฝากขึ้นชื่อ เม็ดบัวอบแห้ง, เสื้อผ้า, กาแฟเวียดนาม, ขนมท้องถิ่น</li>
                      <li><strong>ส่งสนามบินดานัง:</strong> นำคณะส่งสนามบินดานังเพื่อเดินทางกลับประเทศไทยโดยสวัสดิภาพ</li>
                    </>
                  )}
                </ul>

                {/* Culinary & Hotel Showcase */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.25rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 900, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Utensils size={17} />
                      {isVi ? 'Bữa trưa (Lunch 12$): Nhà hàng Madam Lân' : 'มื้อกลางวัน (Lunch 12$): Nhà hàng Madam Lan'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {isVi 
                        ? '1. Gỏi cuốn tôm thịt • 2. Chả giò hải sản • 3. Cá kho tộ đậm đà • 4. Rau muống xào tỏi • 5. Cơm trắng • 6. Canh cua đồng trứng cà • 7. Trái cây tươi' 
                        : '1. เปาะเปี๊ยะสดกุ้งหมู • 2. เปาะเปี๊ยะทะเลทอด • 3. ปลาต้มเค็มหม้อดิน (Cá kho tộ) • 4. ผัดผักบุ้ง • 5. ข้าวสวย • 6. แกงจืดไข่ปู • 7. ผลไม้สด'}
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Utensils size={17} />
                      {isVi ? 'Bữa tối (Dinner): Bánh Mì Đà Nẵng' : 'มื้อเย็น (Dinner): Banh Mi Vietnam'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {isVi 
                        ? 'Bánh mì kẹp thịt truyền thống giòn ngon phục vụ đoàn dùng trước khi lên máy bay.' 
                        : 'ขนมปังฝรั่งเศสสไตล์เวียดนามกรอบนอกนุ่มใน เสิร์ฟให้คณะรับประทานก่อนขึ้นเครื่องบิน'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

      </section>

      {/* 5. B2B EXECUTIVE PRICING TERMINAL & MARGIN SIMULATOR (DUAL COLUMN SPLIT-SCREEN) */}
      <section id="pricing-terminal" style={{ maxWidth: '1280px', margin: '0 auto 4rem', padding: '0 2rem' }}>
        
        {/* Main Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#00533d', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.5rem', background: '#ecfdf5', padding: '0.35rem 0.95rem', borderRadius: '0.5rem', border: '1px solid #a7f3d0' }}>
            <Calculator size={16} />
            <span>{agentConfig.isAgent || agentConfig.hideNet 
              ? (isVi ? 'BẢNG TÍNH GIÁ TOUR TRỌN GÓI' : isTh ? 'โปรแกรมคำนวณราคาทัวร์' : 'TOUR PRICE CALCULATOR')
              : (isVi ? 'BẢNG GIÁ NET B2B & BỘ CÔNG CỤ BÁO GIÁ ĐẠI LÝ' : isTh ? 'ตารางราคา NET B2B & เครื่องมือทำใบเสนอราคา' : 'B2B NET PRICING & QUOTATION SIMULATOR')}</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.65rem', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif", lineHeight: 1.2 }}>
            {agentConfig.isAgent || agentConfig.hideNet
              ? (isVi ? 'Công Cụ Tính Giá Tour Theo Số Lượng Khách' : isTh ? 'ระบบคำนวณราคาทัวร์สำหรับคณะเดินทาง' : 'Group Tour Quotation Calculator')
              : (isVi ? 'Biểu Phí NET Đại Lý & Hệ Thống Tính Toán Lợi Nhuận' : isTh ? 'ตารางราคาตัวแทนและระบบจำลองใบเสนอราคา' : 'B2B Net Matrix & Profit Engine')}
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {isVi 
              ? 'Áp dụng từ 01/04 - 30/12/2026 • Đã bao gồm khách sạn 4 sao, ăn uống trọn gói, xe VIP, HDV, cáp treo Bà Nà & toàn bộ vé tham quan' 
              : isTh 
                ? 'ช่วงเวลาเดินทาง: 01/04 - 30/12/2026 (ราคา NET รวมที่พัก 4 ดาว, อาหารครบทุกมื้อ, รถ, ไกด์ และตั๋วเข้าชมทั้งหมด)' 
                : 'Travel Period: 01/04 - 30/12/2026 (All-inclusive 4-star Hotel, Full Board Meals, Van, Tour Guide, Ba Na Cable Car & Tickets)'}
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
                    ? (isVi ? 'Bảng Giá Tour Trọn Gói Theo Số Lượng Khách' : isTh ? 'ตารางราคาทัวร์ตามจำนวนผู้เดินทาง' : 'All-Inclusive Tour Rates by Group Size')
                    : (isVi ? 'Biểu Phí NET Gốc Theo Đoàn' : isTh ? 'ตารางราคา NET ตามขนาดกรุ๊ป' : 'Official B2B Net Rates')}
                </h3>
              </div>
            </div>

            {/* List 6 Mốc Giá (Hiển thị mượt mà theo chế độ B2B hoặc Khách lẻ) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PRICE_GRID.map((p, idx) => {
                const isSelected = selectedBandIdx === idx;
                const retailUsd = Math.round(p.usd * (1 + (agentConfig.isAgent || agentConfig.hideNet ? agentMarginPercent : 0) / 100));
                return (
                  <div
                    key={idx}
                    onClick={() => handleBandChange(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.15rem',
                      borderRadius: '0.85rem',
                      border: isSelected ? '2px solid #059669' : '1px solid #e2e8f0',
                      background: isSelected ? '#ecfdf5' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 4px 12px rgba(5, 150, 105, 0.12)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: isSelected ? '#00533d' : '#cbd5e1',
                        color: '#fff', fontSize: '0.75rem', fontWeight: 900,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {idx + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? '#00533d' : '#0f172a' }}>
                          {getBandLabel(p)}
                          {idx === 2 && (
                            <span style={{ marginLeft: '6px', fontSize: '0.7rem', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                              ⭐ {isVi ? 'Phổ biến' : 'ยอดนิยม'}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                          <Car size={13} style={{ color: '#059669' }} />
                          <span>{getVehicleLabel(p)}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: isSelected ? '#00533d' : '#0f172a' }}>
                        {currency === 'THB' ? `฿${Math.round(retailUsd * effectiveRate).toLocaleString('en-US')}` : `${retailUsd}`} <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>/ {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>
                        {currency === 'THB' ? `≈ ${retailUsd} USD` : `≈ ฿${Math.round(retailUsd * effectiveRate).toLocaleString('en-US')}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Khung Phụ Thu Bổ Sung (Surcharges Summary) */}
            <div style={{ background: '#f8fafc', padding: '1.15rem 1.25rem', borderRadius: '0.85rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', marginBottom: '0.15rem' }}>
                <Info size={16} style={{ color: '#059669' }} />
                <span>{isVi ? 'Quy định phụ thu & tùy chọn xe:' : isTh ? 'ข้อกำหนดการชาร์จเพิ่ม & อัปเกรดรถ:' : 'Surcharges & Vehicle Policy:'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>• {isVi ? 'Phụ thu phòng đơn (Single Supplement):' : isTh ? 'ห้องพักเดี่ยว (Single Supplement):' : 'Single Supplement:'}</span>
                <strong style={{ color: '#be123c' }}>+$70 USD (+฿{Math.round(70 * effectiveRate).toLocaleString('en-US')}) / {isVi ? 'phòng' : isTh ? 'ห้อง' : 'room'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>• {isVi ? 'Limousine VIP 7–9 chỗ (+89$/trọn tour):' : isTh ? 'อัปเกรด Limousine VIP 7–9 ที่นั่ง:' : 'VIP Limousine 7–9 Seats:'}</span>
                <strong style={{ color: '#00533d' }}>+$89 USD / {isVi ? 'trọn tour' : isTh ? 'ทั้งทริป' : 'tour'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>• {isVi ? 'Limousine VIP 14–15 chỗ (+168$/trọn tour):' : isTh ? 'อัปเกรด Limousine VIP 14–15 ที่นั่ง:' : 'VIP Limousine 14–15 Seats:'}</span>
                <strong style={{ color: '#00533d' }}>+$168 USD / {isVi ? 'trọn tour' : isTh ? 'ทั้งทริป' : 'tour'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>• {isVi ? 'Phụ thu Lễ (29/04 – 02/05/2026):' : isTh ? 'ชาร์จช่วงวันหยุด (29/04 – 02/05/2026):' : 'Holiday Surcharge (29/04 – 02/05/2026):'}</span>
                <strong style={{ color: '#b45309' }}>+$18 USD / {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>• {isVi ? 'Phụ thu Giáng Sinh (24/12 – 25/12/2026):' : isTh ? 'ชาร์จช่วงคริสต์มาส (24/12 – 25/12/2026):' : 'Christmas Surcharge (24/12 – 25/12/2026):'}</span>
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
                    : (isVi ? 'Mô Phỏng Báo Giá & Biên Lợi Nhuận' : isTh ? 'เครื่องมือจำลองใบเสนอราคา' : 'Real-time Profit Simulator')}
                </h3>
              </div>
            </div>

            {/* Input Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {/* Input 1: Nhóm khách & Số khách thực tế */}
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                  {isVi ? '1. Chọn nhóm & số khách đoàn:' : isTh ? '1. กลุ่มและจำนวนคนจริง (Pax):' : '1. Group Size Band & Pax:'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '0.65rem' }}>
                  <select
                    value={selectedBandIdx}
                    onChange={(e) => handleBandChange(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: '0.6rem', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.875rem', background: '#f8fafc', color: '#0f172a' }}
                  >
                    {PRICE_GRID.map((p, idx) => {
                      const retailVal = Math.round(p.usd * (1 + (agentConfig.isAgent || agentConfig.hideNet ? agentMarginPercent : 0) / 100));
                      return (
                        <option key={idx} value={idx}>
                          {getBandLabel(p)} ({currency === 'THB' ? `฿${Math.round(retailVal * effectiveRate).toLocaleString('en-US')}` : `${retailVal}`})
                        </option>
                      );
                    })}
                  </select>

                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '0.6rem', padding: '2px' }}>
                    <button
                      onClick={() => handlePaxChange(paxCount - 1)}
                      disabled={paxCount <= 2}
                      title={paxCount <= 2 ? (isVi ? 'Tối thiểu 2 khách' : 'ขั้นต่ำ 2 ท่าน') : ''}
                      style={{
                        width: '32px', height: '32px', border: 'none',
                        background: paxCount <= 2 ? '#f1f5f9' : '#fff',
                        borderRadius: '0.4rem',
                        cursor: paxCount <= 2 ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: paxCount <= 2 ? '#94a3b8' : '#0f172a',
                        opacity: paxCount <= 2 ? 0.4 : 1,
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
                      disabled={paxCount >= 14}
                      title={paxCount >= 14 ? (isVi ? 'Tối đa 14 khách cho tour này' : 'สูงสุด 14 ท่านสำหรับทัวร์นี้') : ''}
                      style={{
                        width: '32px', height: '32px', border: 'none',
                        background: paxCount >= 14 ? '#f1f5f9' : '#fff',
                        borderRadius: '0.4rem',
                        cursor: paxCount >= 14 ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: paxCount >= 14 ? '#94a3b8' : '#0f172a',
                        opacity: paxCount >= 14 ? 0.4 : 1,
                        transition: 'all 0.15s'
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Input 2: Phòng đơn & Tùy chọn Limousine */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '0.65rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                    {isVi ? '2. Phòng đơn (+70$):' : isTh ? '2. ห้องเดี่ยว (+70$):' : '2. Single (+70$):'}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '0.6rem', padding: '2px' }}>
                    <button
                      onClick={() => setSingleRooms(Math.max(0, singleRooms - 1))}
                      style={{ width: '32px', height: '32px', border: 'none', background: '#fff', borderRadius: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '0.875rem', color: singleRooms > 0 ? '#be123c' : '#475569' }}>
                      {singleRooms}
                    </span>
                    <button
                      onClick={() => setSingleRooms(Math.min(10, singleRooms + 1))}
                      style={{ width: '32px', height: '32px', border: 'none', background: '#fff', borderRadius: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                    {isVi ? '3. Nâng cấp Limousine:' : isTh ? '3. อัปเกรด Limousine:' : '3. Vehicle Upgrade:'}
                  </label>
                  <select
                    value={upgradeLimousine}
                    onChange={e => setUpgradeLimousine(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.6rem', borderRadius: '0.6rem', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.825rem', background: '#f8fafc', color: '#0f172a' }}
                  >
                    <option value="none">{isVi ? 'Xe tiêu chuẩn theo đoàn' : 'รถมาตรฐาน'}</option>
                    <option value="limo9">Limousine VIP 7-9 (+89$)</option>
                    <option value="limo15">Limousine VIP 14-15 (+168$)</option>
                  </select>
                </div>
              </div>

              {/* Tùy chọn Giai đoạn Lễ (29/04-02/05 & 24-25/12) */}
              <div 
                onClick={() => setIsHoliday(!isHoliday)}
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
                  +18$/pax
                </span>
              </div>

              {/* Input 4: Tỷ giá quy đổi & Đơn vị tiền tệ (USD ➔ THB) */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.825rem', fontWeight: 800, color: '#334155' }}>
                    {isVi ? '4. Tỷ giá quy đổi (USD ➔ THB):' : isTh ? '4. อัตราแลกเปลี่ยน (USD ➔ THB):' : '4. Exchange Rate (USD ➔ THB):'}
                  </label>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 800 }}>
                    1 USD = {effectiveRate} THB
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="100"
                      value={exchangeRate}
                      onChange={(e) => setExchangeRate(e.target.value)}
                      placeholder="35"
                      style={{
                        width: '100%',
                        padding: '0.55rem 2.8rem 0.55rem 0.75rem',
                        borderRadius: '0.6rem',
                        border: '1px solid #cbd5e1',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        background: '#f8fafc',
                        color: '#00533d',
                        outline: 'none'
                      }}
                      title={isVi ? 'Nhập tỷ giá USD / THB' : 'Enter USD / THB exchange rate'}
                    />
                    <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b', fontSize: '0.78rem', pointerEvents: 'none' }}>
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
                        style={{
                          padding: '0.55rem 0.5rem',
                          borderRadius: '0.5rem',
                          border: Number(exchangeRate) === rate ? '1.5px solid #059669' : '1px solid #e2e8f0',
                          background: Number(exchangeRate) === rate ? '#ecfdf5' : '#f8fafc',
                          color: Number(exchangeRate) === rate ? '#00533d' : '#64748b',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        {rate}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input 4: Mức Lợi Nhuận Đại Lý (Segmented Pills - Hidden in Client Mode) */}
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
                        style={{
                          padding: '0.5rem 0.2rem',
                          borderRadius: '0.5rem',
                          border: isAct ? '2px solid #059669' : '1px solid #cbd5e1',
                          background: isAct ? '#00533d' : '#f8fafc',
                          color: isAct ? '#fff' : '#334155',
                          fontWeight: 900,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s'
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
                          • {isVi ? `Đã gồm +${singleRooms * calculation.singleSupp} (${singleRooms} phòng đơn)` : `รวมชาร์จพักเดี่ยว ${singleRooms * calculation.singleSupp} (${singleRooms} ห้อง)`}
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
                          + ${singleRooms * calculation.singleSupp} USD ({singleRooms} {isVi ? 'phòng đơn' : 'ห้องพักเดี่ยว'})
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
                    {currency === 'THB' ? `฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')}` : `${calculation.suggestedSellPerPax}`}{' '}
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#047857' }}>/ {isVi ? 'khách' : 'ท่าน'}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700 }}>
                    {currency === 'THB' ? `(≈ ${calculation.suggestedSellPerPax} USD / khách)` : `(≈ ฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')} / khách)`}
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
                      <span>🏨 {isVi ? `+ ${singleRooms * calculation.singleSupp} USD phụ thu ${singleRooms} phòng đơn` : isTh ? `+ ฿${Math.round(singleRooms * calculation.singleSupp * effectiveRate).toLocaleString('en-US')} (ชาร์จห้องพักเดี่ยว ${singleRooms} ห้อง)` : `+ ${singleRooms * calculation.singleSupp} USD (${singleRooms} Single Room Supp)`}</span>
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
                    boxShadow: '0 3px 10px rgba(0, 83, 61, 0.18)',
                    transition: 'all 0.2s'
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
                    transition: 'all 0.2s',
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
                  onClick={() => setShowAgentModal(true)}
                  type="button"
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
                    gap: '0.35rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Share2 size={14} style={{ color: '#059669' }} />
                  <span>{isVi ? '🏷️ Tạo Link Gửi Khách (Gắn Thương Hiệu & Ẩn Giá NET)' : isTh ? '🏷️ สร้างลิงก์ส่งลูกค้า (ใส่แบรนด์ & ซ่อนราคา NET)' : '🏷️ Generate Client Share Link'}</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </section>


      {/* 6. B2B TERMS, INCLUSIONS & EXCLUSIONS */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 4rem', padding: '0 2rem' }}>
        <div style={{
          background: '#fff', borderRadius: '1.5rem', padding: '2.5rem',
          border: '1px solid #e2e8f0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)'
        }}>
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2rem', color: '#0f172a', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
            {agentConfig.isAgent || agentConfig.hideNet
              ? (isVi ? 'ĐIỀU KHOẢN & DỊCH VỤ TOUR TRỌN GÓI' : isTh ? 'เงื่อนไขและข้อกำหนดการให้บริการ' : 'Tour Terms & Conditions')
              : (isVi ? 'ĐIỀU KHOẢN DỊCH VỤ & QUY ĐỊNH B2B' : isTh ? 'เงื่อนไขและข้อกำหนดการให้บริการ (B2B Terms & Conditions)' : 'B2B Terms & Conditions')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            {/* Inclusions */}
            <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #bbf7d0' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', margin: '0 0 1rem', fontWeight: 900, fontSize: '1.05rem' }}>
                <CheckCircle2 size={20} />
                {isVi ? 'Giá Tour Bao Gồm (Inclusions)' : isTh ? 'อัตรานี้รวม (Inclusions)' : 'Inclusions'}
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#14532d', lineHeight: 1.8 }}>
                {isVi ? (
                  <>
                    <li>Khách sạn 4 sao tiêu chuẩn (2-3 khách/phòng): 1 đêm Mercure Bà Nà Hills + 1 đêm Đông Dương Đà Nẵng.</li>
                    <li>2 bữa sáng buffet tại khách sạn + 3 bữa chính set menu tại các nhà hàng nổi tiếng (Ngon Thị Hoa, Chic Chillax, Madam Lân).</li>
                    <li><strong>Đặc biệt: 2 bữa buffet thượng hạng (Beer Plaza Bà Nà + Buffet Hải sản Long Qiao TẶNG ½ TÔM HÙM NƯỚNG BƠ)</strong> + Bánh mì.</li>
                    <li>Xe du lịch máy lạnh đời mới chất lượng cao phục vụ theo suốt hành trình.</li>
                    <li>Hướng dẫn viên tiếng Thái / tiếng Anh chuyên nghiệp phục vụ đoàn.</li>
                    <li>Vé cáp treo Bà Nà Hills khứ hồi + Toàn bộ vé tham quan và vé thuyền thúng Rừng dừa theo chương trình.</li>
                    <li>Bảo hiểm du lịch quốc tế trọn gói theo quy định hiện hành của Luật Du lịch Việt Nam.</li>
                  </>
                ) : (
                  <>
                    <li>โรงแรมที่พักมาตรฐาน 4 ดาว (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม (Mercure Bana Hills 1N + Dong Duong 1N)</li>
                    <li>อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 3 มื้อ (Ngon Thi Hoa, Chic Chillax, Madam Lan)</li>
                    <li><strong>พิเศษ: บุฟเฟ่ต์ 2 มื้อดัง (Beer Plaza Bana Hills + Long Qiao รวมกุ้งมังกรอบเนย ½ ตัว/ท่าน)</strong> + ขนมปัง Banh Mi</li>
                    <li>รถตู้ปรับอากาศคุณภาพดีนำเที่ยวตามโปรแกรมตลอดการเดินทาง</li>
                    <li>ไกด์ท้องถิ่นสื่อสารภาษาไทยดูแลตลอดทริป</li>
                    <li>บัตรกระเช้าลอยฟ้าบานาฮิลล์ไป-กลับ + บัตรเข้าชมสถานที่เที่ยวทั้งหมดตามโปรแกรม + ค่าเรือกระด้ง</li>
                    <li>ประกันอุบัติเหตุการเดินทางสำหรับนักท่องเที่ยวต่างชาติตามกฎหมายการท่องเที่ยวของเวียดนาม</li>
                  </>
                )}
              </ul>
            </div>

            {/* Exclusions */}
            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #fecaca' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', margin: '0 0 1rem', fontWeight: 900, fontSize: '1.05rem' }}>
                <XCircle size={20} />
                {isVi ? 'Giá Tour Không Bao Gồm (Exclusions)' : isTh ? 'อัตรานี้ไม่รวม (Exclusions)' : 'Exclusions'}
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#7f1d1d', lineHeight: 1.8 }}>
                {isVi ? (
                  <>
                    <li>Tiền Tip cho Hướng dẫn viên và Lái xe: <strong>600 THB/khách/tour</strong> (với đoàn từ 8 khách trở lên: <strong>300 THB/khách/tour</strong>).</li>
                    <li>Vé máy bay quốc tế khứ hồi Thái Lan - Việt Nam.</li>
                    <li>Chi phí cá nhân ngoài chương trình (đồ uống phát sinh, giặt ủi, điện thoại...).</li>
                  </>
                ) : (
                  <>
                    <li>ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ <strong>600 THB / ท่าน / ทริป</strong> (หากกรุ๊ป 8 ท่านขึ้นไป: <strong>300 THB / ท่าน / ทริป</strong>)</li>
                    <li>ตั๋วเครื่องบินระหว่างประเทศ ไป-กลับ ไทย - เวียดนาม</li>
                    <li>ค่าใช้จ่ายส่วนตัวอื่นๆ ที่ไม่ได้ระบุในโปรแกรม (เช่น เครื่องดื่มสั่งเพิ่ม, ค่าโทรศัพท์, ค่าซักรีด)</li>
                  </>
                )}
              </ul>
            </div>

            {/* Child Policy */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1rem', fontWeight: 900, fontSize: '1.05rem' }}>
                {isVi ? '👶 Chính Sách Trẻ Em (Child Policy)' : isTh ? '👶 ราคาสาหรับเด็ก (Child Policy)' : 'Child Policy'}
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#334155', lineHeight: 1.8 }}>
                {isVi ? (
                  <>
                    <li><strong>Trẻ em 0 - 2 tuổi:</strong> Miễn phí 100%.</li>
                    <li><strong>Trẻ em 3 - 6 tuổi:</strong> Tính 50% giá tour người lớn (ngủ chung giường với bố mẹ; nếu yêu cầu kê giường phụ tính thêm phí phòng đơn).</li>
                    <li><strong>Trẻ em từ 7 tuổi trở lên:</strong> Tính 100% giá tour như người lớn.</li>
                  </>
                ) : (
                  <>
                    <li><strong>เด็ก 0-2 ขวบ:</strong> ฟรี (Free of charge)</li>
                    <li><strong>เด็ก 3-6 ขวบ:</strong> คิด 50% ของราคาทัวร์ (พักกับผู้ใหญ่ ไม่เสริมเตียง; หากต้องการเตียงเสริมจ่ายเพิ่มเท่าค่าพักเดี่ยว)</li>
                    <li><strong>เด็ก 7 ขวบขึ้นไป:</strong> คิด 100% ของราคาทัวร์ (ใช้สิทธิ์เหมือนผู้ใหญ่)</li>
                  </>
                )}
              </ul>
            </div>

            {/* Payment & Cancellation */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1rem', fontWeight: 900, fontSize: '1.05rem' }}>
                {isVi ? '💳 Điều Kiện Thanh Toán & Hủy Phạt' : isTh ? '💳 การชำระเงิน & นโยบายยกเลิก' : 'Payment & Cancellation'}
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#334155', lineHeight: 1.8 }}>
                {isVi ? (
                  <>
                    <li><strong>Đặt cọc:</strong> 30% tổng giá trị tour ngay khi xác nhận đặt đoàn.</li>
                    <li><strong>Thanh toán phần còn lại:</strong> 14 ngày trước ngày khởi hành.</li>
                    <li><strong>Hủy trước 21 ngày:</strong> Không phạt phí (Miễn phí 100%).</li>
                    <li><strong>Hủy từ 20 đến 07 ngày trước ngày đi:</strong> Phạt 50% tổng giá trị tour.</li>
                    <li><strong>Hủy trong vòng 06 ngày trước ngày đi:</strong> Phạt 90% tổng giá trị tour.</li>
                  </>
                ) : (
                  <>
                    <li><strong>มัดจำ:</strong> 30% ของยอดทั้งหมดหลังจากแจ้งคอนเฟิร์มกรุ๊ป</li>
                    <li><strong>ยอดที่เหลือ:</strong> โอนชำระเงินส่วนที่เหลือ 14 วันก่อนวันเดินทาง</li>
                    <li><strong>ยกเลิกก่อน 21 วันเช็คอิน:</strong> ไม่โดนชาร์จ (No charge)</li>
                    <li><strong>ยกเลิก 20 ถึง 7 วันก่อนเดินทาง:</strong> ชาร์จ 50% ราคาทัวร์</li>
                    <li><strong>ยกเลิกตั้งแต่ 6 วันก่อนเดินทาง:</strong> ชาร์จ 90% ราคาทัวร์</li>
                  </>
                )}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 7. B2B AGENT RESERVATION & DIRECT LINE CONTACT FORM */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 5rem', padding: '0 2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #003829 0%, #00533d 100%)',
          borderRadius: '1.5rem', padding: '3rem', color: '#fff',
          boxShadow: '0 25px 50px -12px rgba(0, 56, 41, 0.4)'
        }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'center' }}>
            
            {/* Form Side */}
            <div>
              <h3 style={{ fontSize: '2.1rem', fontWeight: 900, margin: '0 0 0.85rem', lineHeight: 1.2, fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                {agentConfig.isAgent && agentConfig.name 
                  ? (isVi ? `Gửi Yêu Cầu Tư Vấn Đến ${agentConfig.name}` : isTh ? `ส่งคำขอข้อมูลการเดินทางถึง ${agentConfig.name}` : `Submit Tour Inquiry to ${agentConfig.name}`)
                  : (isVi ? 'Gửi Yêu Cầu Báo Giá B2B Nhanh Cho Đại Lý' : isTh ? 'ขอใบเสนอราคา B2B / ล็อคโควต้าสำหรับตัวแทน' : 'Request B2B Quotation & Group Allotment')}
              </h3>
              <p style={{ color: '#d1fae5', fontSize: '0.95rem', margin: '0 0 2rem', lineHeight: 1.6 }}>
                {agentConfig.isAgent && agentConfig.name
                  ? (isVi ? `Điền thông tin liên hệ để chuyên viên tư vấn của ${agentConfig.name} liên hệ và hỗ trợ quý khách chi tiết nhất:` : `กรอกข้อมูลการเดินทางเพื่อให้เจ้าหน้าที่ของ ${agentConfig.name} ติดต่อกลับและดูแลท่านอย่างดีที่สุด:`)
                  : (isVi ? 'Điền thông tin đoàn để nhận Phiếu xác nhận đặt tour (Confirmation Slip) và báo giá chính thức trong vòng 15 phút:' : 'กรอกข้อมูลรายละเอียดกรุ๊ป เจ้าหน้าที่ Green Sea Tour ประจำตลาดไทยจะติดต่อกลับและส่ง Confirmation Slip ภายใน 15 นาที:')}
              </p>

              {submitted ? (
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
                  <CheckCircle2 size={52} style={{ color: '#4ade80', margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
                    {isVi ? 'Đã gửi yêu cầu thành công!' : isTh ? 'ส่งคำขอสำเร็จแล้ว!' : 'Request Sent Successfully!'}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: '#d1fae5', margin: 0 }}>
                    {isVi ? 'Bộ phận kinh doanh Green Sea Tour sẽ liên hệ lại quý đối tác ngay qua LINE / Zalo / WhatsApp.' : 'We are preparing your confirmation slip.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#e2e8f0' }}>
                      {agentConfig.isAgent 
                        ? (isVi ? 'Họ và Tên Quý Khách (Full Name)' : isTh ? 'ชื่อ-นามสกุลของคุณ (Full Name)' : 'Your Full Name')
                        : (isVi ? 'Tên Công Ty / Đại Lý (Travel Agency)' : isTh ? 'ชื่อบริษัทตัวแทน (Travel Agency Name)' : 'Agency Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={agentConfig.isAgent ? (isVi ? 'Ví dụ: Nguyễn Văn A' : 'e.g. Somchai Prasert') : (isVi ? 'Ví dụ: ABC Travel' : 'e.g. ABC Travel')}
                      value={agentForm.agencyName}
                      onChange={e => setAgentForm({ ...agentForm, agencyName: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '0.6rem', border: 'none', fontSize: '0.925rem', boxSizing: 'border-box', background: '#fff', color: '#0f172a' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#e2e8f0' }}>
                      {isVi ? 'Người liên hệ (Contact Person)' : isTh ? 'ชื่อผู้ติดต่อ (Contact Person)' : 'Contact Person'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isVi ? 'Tên người liên hệ' : 'Contact Person'}
                      value={agentForm.contactName}
                      onChange={e => setAgentForm({ ...agentForm, contactName: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '0.6rem', border: 'none', fontSize: '0.925rem', boxSizing: 'border-box', background: '#fff', color: '#0f172a' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#e2e8f0' }}>
                      {isVi ? 'Số điện thoại / LINE ID / WhatsApp' : isTh ? 'เบอร์โทร / LINE ID / WhatsApp' : 'Phone / LINE ID'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+84... / +66... / LINE ID"
                      value={agentForm.phoneLine}
                      onChange={e => setAgentForm({ ...agentForm, phoneLine: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '0.6rem', border: 'none', fontSize: '0.925rem', boxSizing: 'border-box', background: '#fff', color: '#0f172a' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#e2e8f0' }}>
                      {isVi ? 'Ngày dự kiến khởi hành' : isTh ? 'วันเดินทางโดยประมาณ' : 'Estimated Date'} *
                    </label>
                    <input
                      type="date"
                      required
                      value={agentForm.departureDate}
                      onChange={e => setAgentForm({ ...agentForm, departureDate: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '0.6rem', border: 'none', fontSize: '0.925rem', boxSizing: 'border-box', background: '#fff', color: '#0f172a' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#e2e8f0' }}>
                      {isVi ? 'Yêu cầu đặc biệt (Nâng cấp xe Limousine, phòng Family Bunk, ăn kiêng...)' : isTh ? 'ความต้องการเพิ่มเติม (เช่น อัปเกรด Limousine, ห้อง Family Bunk, เมนูอาหารพิเศษ)' : 'Special Requests'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isVi ? 'Nhập ghi chú yêu cầu thêm nếu có...' : 'Additional notes...'}
                      value={agentForm.specialRequests}
                      onChange={e => setAgentForm({ ...agentForm, specialRequests: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '0.6rem', border: 'none', fontSize: '0.925rem', boxSizing: 'border-box', background: '#fff', color: '#0f172a', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <button
                      type="submit"
                      style={{
                        width: '100%', padding: '1rem', borderRadius: '0.75rem', background: '#f59e0b',
                        color: '#0f172a', border: 'none', fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)', letterSpacing: '0.3px'
                      }}
                    >
                      <Send size={18} />
                      {isVi ? 'GỬI YÊU CẦU BÁO GIÁ B2B' : isTh ? 'ขอใบเสนอราคา B2B' : 'Request B2B Quotation'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* QR Code & Contacts Side (White-Label Dynamic) */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)',
              borderRadius: '1.25rem', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center'
            }}>
              {agentConfig.isAgent && agentConfig.name ? (
                <div>
                  <div style={{
                    width: '68px', height: '68px', borderRadius: '1.25rem',
                    background: '#ffffff', color: '#00533d',
                    fontWeight: 900, fontSize: '2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                  }}>
                    {agentConfig.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.35rem' }}>
                    {agentConfig.name.toUpperCase()}
                  </div>
                  <div style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    {isVi ? 'Đại Lý Du Lịch Chuyên Nghiệp' : isTh ? 'ตัวแทนท่องเที่ยวอย่างเป็นทางการ' : 'Authorized Travel Partner'}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: '0.85rem' }}>
                    {agentConfig.tel && (
                      <a href={`tel:${agentConfig.tel}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fde047', textDecoration: 'none', fontWeight: 800, fontSize: '0.95rem' }}>
                        <Phone size={18} />
                        <span>Hotline: {agentConfig.tel}</span>
                      </a>
                    )}
                    {agentConfig.line && (
                      <a href={agentConfig.line.startsWith('http') ? agentConfig.line : `https://line.me/ti/p/~${agentConfig.line.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#86efac', textDecoration: 'none', fontWeight: 800, fontSize: '0.95rem' }}>
                        <MessageSquare size={18} />
                        <span>LINE ID: {agentConfig.line}</span>
                      </a>
                    )}
                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.4, marginTop: '0.35rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.5rem' }}>
                      {isVi ? '✓ Cam kết chất lượng dịch vụ tiêu chuẩn cao nhất cho chuyến đi của quý khách.' : '✓ มุ่งมั่นให้บริการคุณภาพระดับมาตรฐานสากลเพื่อความสุขในการเดินทางของคุณ'}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <a href="https://lin.ee/Pwro79k" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <img 
                      src="/assets/line-qr.png" 
                      alt="GreenSea LINE Official QR Code" 
                      style={{ width: '140px', height: '140px', borderRadius: '0.85rem', background: '#fff', padding: '0.5rem', margin: '0 auto 0.75rem', display: 'block' }}
                    />
                    <div style={{ background: '#00b900', color: '#fff', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', fontSize: '0.78rem', fontWeight: 900, display: 'inline-block' }}>
                      {isVi ? 'Bấm vào đây để kết nối LINE' : 'คลิกเพิ่มเพื่อน LINE Official'}
                    </div>
                  </a>
                  <div style={{ fontWeight: 900, fontSize: '1.15rem', margin: '0.85rem 0 0.25rem', fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                    GreenSea LINE Official
                  </div>
                  <div style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                    LINE ID: https://lin.ee/Pwro79k
                  </div>

                  {/* Direct Team Contacts */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: '#e2e8f0', textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                    <div>📍 <strong>GreenSeaTour</strong> - {isVi ? 'DMC Inbound Việt Nam' : 'บริษัทแลนด์เวียดนาม สำหรับกรุ๊ปไทย'}</div>
                    <div>📌 <strong>{isVi ? 'Địa chỉ:' : 'ที่อยู่:'}</strong> 516 Nguyen Huu Tho, Da Nang city</div>
                    <div>📞 <strong>Hotline:</strong> <a href="https://wa.me/84987434343" target="_blank" rel="noreferrer" style={{ color: '#fde047', textDecoration: 'none', fontWeight: 800 }}>(+84) 987.43.43.43</a></div>
                    <div>📧 <strong>Email:</strong> <a href="mailto:sale1@greenseatour.vn" style={{ color: '#93c5fd', textDecoration: 'none' }}>sale1@greenseatour.vn</a></div>
                    <div>🌐 <strong>Website:</strong> <a href="https://www.greensealandtourvietnam.com" target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none' }}>www.greensealandtourvietnam.com</a></div>
                    
                    {/* Sales Representatives Direct LINE with QR Codes */}
                    <div style={{ marginTop: '0.75rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                      <div style={{ fontWeight: 800, color: '#fde047', marginBottom: '0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{isVi ? 'Phụ trách thị trường Thái Lan:' : 'ฝ่ายขายตลาดไทย (Thai Sales Team):'}</span>
                        <span style={{ fontSize: '0.7rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>24/7 Online</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <a href="https://line.me/ti/p/BSLZR5dyBa" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.12)', padding: '0.5rem', borderRadius: '0.5rem', textDecoration: 'none', color: '#fff', textAlign: 'center', transition: 'all 0.2s' }}>
                          <img src="/assets/qr-kim.png" alt="Ms. Kim LINE" style={{ width: '64px', height: '64px', borderRadius: '4px', background: '#fff', padding: '2px', margin: '0 auto 4px', display: 'block' }} />
                          <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>Ms. Kim</div>
                          <div style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: 700 }}>LINE Direct →</div>
                        </a>
                        <a href="https://line.me/ti/p/U1vOdylKTL" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.12)', padding: '0.5rem', borderRadius: '0.5rem', textDecoration: 'none', color: '#fff', textAlign: 'center', transition: 'all 0.2s' }}>
                          <img src="/assets/qr-khanh.png" alt="Mr. Khanh LINE" style={{ width: '64px', height: '64px', borderRadius: '4px', background: '#fff', padding: '2px', margin: '0 auto 4px', display: 'block' }} />
                          <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>Mr. Khanh</div>
                          <div style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: 700 }}>LINE Direct →</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 8. LUXURY EDITORIAL FOOTER WITH GHOST WATERMARK */}
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

              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 1.5rem', maxWidth: '340px' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
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
                        516 Nguyễn Hữu Thọ, Đà Nẵng, Việt Nam
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
            </div>

            {/* Column 1: Tuyến Tour B2B */}
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1.25rem', whiteSpace: 'nowrap' }}>
                {isVi ? 'Tuyến Điểm Tour' : isTh ? 'โปรแกรมเส้นทาง' : 'Tour Routes'}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem' }}>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#pricing-terminal" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 600 }}>
                    {isVi ? 'Đà Nẵng – Bà Nà – Hội An' : isTh ? 'ดานัง – บานาฮิลล์ – ฮอยอัน' : 'Da Nang – Ba Na – Hoi An'}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <button onClick={() => { if (onBack) onBack(); else window.location.href = '/'; }} style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {isVi ? 'Miền Bắc (Hà Nội – Sa Pa – Ninh Bình)' : isTh ? 'ภาคเหนือ (ฮานอย – ซาปา – นิงห์บิงห์)' : 'North Vietnam Tours'}
                  </button>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <button onClick={() => { if (onBack) onBack(); else window.location.href = '/'; }} style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {isVi ? 'Miền Nam (Sài Gòn – Mũi Né – Đà Lạt)' : isTh ? 'ภาคใต้ (ไซ่ง่อน – มุยเน่ – ดาลัด)' : 'South Vietnam Tours'}
                  </button>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <button onClick={() => { if (onBack) onBack(); else window.location.href = '/'; }} style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap' }}>
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
                  <a href="#pricing-terminal" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
                    {agentConfig.isAgent || agentConfig.hideNet
                      ? (isVi ? 'Bảng Giá 2 - 14 Khách' : isTh ? 'ตารางราคา 2-14 ท่าน' : 'Rate Grid 2-14 Pax')
                      : (isVi ? 'Bảng Giá NET 2 - 14 Pax' : isTh ? 'ตารางราคา NET 2-14 ท่าน' : 'B2B Net Rate Grid')}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <a href="#pricing-terminal" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
                    {isVi ? 'Công Cụ Tính Lợi Nhuận' : isTh ? 'ระบบคำนวณกำไร Margin' : 'Margin Calculator'}
                  </a>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                    {isVi ? 'Quy Định Đặt Cọc & Hủy Phạt' : isTh ? 'เงื่อนไขมัดจำและยกเลิก' : 'Payment & Cancellation'}
                  </span>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                    {isVi ? 'Chính Sách Giá Trẻ Em' : isTh ? 'ราคาสาหรับเด็ก' : 'Child Policy'}
                  </span>
                </li>
                <li style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                    {isVi ? 'Tùy Chọn Limousine VIP' : isTh ? 'อัปเกรดรถ Limousine' : 'Limousine Upgrade'}
                  </span>
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
                <div style={{
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
                      style={{ width: '64px', height: '64px', borderRadius: '0.4rem', background: '#fff', padding: '2px', border: '1px solid #86efac', display: 'block', margin: '0 auto' }}
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
                <div style={{
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
                      style={{ width: '64px', height: '64px', borderRadius: '0.4rem', background: '#fff', padding: '2px', border: '1px solid #cbd5e1', display: 'block', margin: '0 auto' }}
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
                <div style={{
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
                      style={{ width: '64px', height: '64px', borderRadius: '0.4rem', background: '#fff', padding: '2px', border: '1px solid #cbd5e1', display: 'block', margin: '0 auto' }}
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
              <span style={{ color: '#059669', fontWeight: 800 }}>
                {agentConfig.isAgent ? (isVi ? 'Chương Trình Tour Độc Quyền' : isTh ? 'โปรแกรมทัวร์มาตรฐานพรีเมียม' : 'Premium Tour Program') : (isVi ? 'DMC Đối Tác Thái Lan' : 'DMC for Thailand Market')}
              </span>
            </div>
          </div>

        </div>
      </footer>

    
      {/* 8. WHITE-LABEL AGENT CUSTOMIZER MODAL */}
      {showAgentModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.25rem'
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '1.25rem', maxWidth: '580px', width: '100%',
            padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
            border: '1px solid #e2e8f0', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a7f3d0' }}>
                  <UserCheck size={20} style={{ color: '#059669' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
                    {isVi ? 'Cài Đặt Thương Hiệu Đại Lý (White-Label)' : isTh ? 'ตั้งค่าแบรนด์ตัวแทนท่องเที่ยว (White-Label)' : 'Agent White-Label Settings'}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {isVi ? 'Tùy chỉnh thông tin để gửi link hoặc xuất poster cho khách lẻ' : 'ใส่ข้อมูลติดต่อของคุณสำหรับส่งลิงก์และรูปภาพให้ลูกค้า'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAgentModal(false)}
                style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Inputs Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                  {isVi ? '🏢 Tên Công Ty / Đại Lý Của Bạn:' : isTh ? '🏢 ชื่อบริษัท / ตัวแทนของคุณ:' : 'Agency Name:'}
                </label>
                <input
                  type="text"
                  placeholder={isVi ? 'Ví dụ: Siam Travel Co., Ltd' : 'เช่น Siam Travel Co., Ltd'}
                  value={agentConfig.name}
                  onChange={(e) => setAgentConfig({ ...agentConfig, name: e.target.value, isAgent: true })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                    {isVi ? '📞 Số Điện Thoại / Hotline:' : isTh ? '📞 เบอร์โทรศัพท์ / Hotline:' : 'Phone / Hotline:'}
                  </label>
                  <input
                    type="text"
                    placeholder="+66 81 234 5678"
                    value={agentConfig.tel}
                    onChange={(e) => setAgentConfig({ ...agentConfig, tel: e.target.value, isAgent: true })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                    {isVi ? '💬 LINE ID / Link:' : isTh ? '💬 LINE ID หรือ ลิงก์ LINE:' : 'LINE ID / Link:'}
                  </label>
                  <input
                    type="text"
                    placeholder="@siamtravel"
                    value={agentConfig.line}
                    onChange={(e) => setAgentConfig({ ...agentConfig, line: e.target.value, isAgent: true })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Hide Net Rate Toggle */}
              <div style={{
                background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '0.75rem',
                border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1e293b' }}>
                    {isVi ? '🔒 Ẩn Cột Giá Gốc (Hide B2B Net Rates)' : isTh ? '🔒 ซ่อนตารางราคา NET (แสดงเฉพาะราคาขาย)' : 'Hide B2B Net Rates'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {isVi ? 'Chỉ hiển thị giá bán cuối cùng kèm mức lời Margin cho khách xem' : 'ลูกค้าจะเห็นเฉพาะราคาขายรวม Margin แล้ว'}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={agentConfig.hideNet}
                  onChange={(e) => setAgentConfig({ ...agentConfig, hideNet: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#059669' }}
                />
              </div>
            </div>

            {/* Live Client Share URL Box */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #a7f3d0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#065f46', fontWeight: 800, fontSize: '0.825rem', marginBottom: '0.45rem' }}>
                <Link2 size={16} />
                {isVi ? 'ĐƯỜNG LINK GỬI KHÁCH HÀNG (ĐÃ GẮN THƯƠNG HIỆU):' : isTh ? 'ลิงก์สำหรับส่งให้ลูกค้า (ใส่แบรนด์ของคุณแล้ว):' : 'CLIENT SHARE LINK (WHITE-LABEL):'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#047857', wordBreak: 'break-all', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #bbf7d0', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                {clientShareUrl}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleCopyAgentLink}
                  style={{
                    flex: 1, padding: '0.65rem 1rem', borderRadius: '0.55rem', border: 'none',
                    background: copiedAgentLink ? '#16a34a' : '#059669', color: '#fff',
                    fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    boxShadow: '0 2px 6px rgba(5, 150, 105, 0.2)'
                  }}
                >
                  {copiedAgentLink ? <CheckCheck size={16} /> : <Copy size={16} />}
                  <span>{copiedAgentLink ? (isVi ? 'Đã sao chép link!' : 'คัดลอกลิงก์แล้ว!') : (isVi ? 'Sao chép Link gửi khách' : 'คัดลอกลิงก์ส่งลูกค้า')}</span>
                </button>
                <a
                  href={clientShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '0.65rem 1rem', borderRadius: '0.55rem', border: '1px solid #059669',
                    background: '#ffffff', color: '#065f46', fontWeight: 800, fontSize: '0.85rem',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem'
                  }}
                >
                  <ExternalLink size={15} />
                  <span>{isVi ? 'Mở thử link' : 'เปิดดูตัวอย่าง'}</span>
                </a>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {agentConfig.isAgent ? (
                <button
                  onClick={() => {
                    setAgentConfig({ isAgent: false, name: '', tel: '', line: '', hideNet: false });
                    setShowAgentModal(false);
                  }}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.825rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  {isVi ? '✕ Xóa cài đặt đại lý (về mặc định)' : '✕ ล้างการตั้งค่าตัวแทน'}
                </button>
              ) : <div />}
              <button
                onClick={() => setShowAgentModal(false)}
                style={{ padding: '0.65rem 1.5rem', borderRadius: '0.6rem', border: 'none', background: '#0f172a', color: '#ffffff', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer' }}
              >
                {isVi ? 'Áp Dụng Ngay' : 'ตกลง'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}