// HTML5 Canvas Quote Poster Generator (Crisp 1080x1920 2x Retina PNG)
export async function generateAndDownloadPoster({
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
    ctx.fillText('📍 514 - 516 Nguyễn Hữu Thọ, Q. Cẩm Lệ, TP. Đà Nẵng, Việt Nam', 540, 1730);
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
