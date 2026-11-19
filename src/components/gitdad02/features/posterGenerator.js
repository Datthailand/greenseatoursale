export async function generateAndDownloadPoster({
  tourCode = 'GITDAD02',
  tourTitle = 'Đà Nẵng – Bà Nà Hills – Hội An',
  tourTitleTh = 'ดานัง – บานาฮิลล์ – ฮอยอัน',
  paxCount = 20,
  bandLabel = '20 - 24 khách',
  vehicleLabel = 'Xe 45 chỗ Universe',
  retailPriceFormatted = '$197',
  currency = 'USD',
  agentConfig = {},
  isTh = true
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  // 1. Draw Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
  bgGrad.addColorStop(0, '#002b1f');
  bgGrad.addColorStop(0.35, '#004b3a');
  bgGrad.addColorStop(0.7, '#006f52');
  bgGrad.addColorStop(1, '#002b1f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Decorative Header Bar
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Prompt", "Playfair Display", sans-serif';
  ctx.fillText(agentConfig.isAgent && agentConfig.name ? agentConfig.name.toUpperCase() : 'GREEN SEA TOUR', 80, 120);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px "Prompt", sans-serif';
  ctx.fillText(isTh ? 'โปรแกรมทัวร์กรุ๊ปเหมาพิเศษ 3 วัน 2 คืน' : 'CHƯƠNG TRÌNH TOUR ĐOÀN ĐẶC BIỆT 3N2Đ', 80, 160);

  // 3. Tour Title Box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.roundRect(80, 220, 920, 320, 30);
  ctx.fill();

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 28px "Prompt", sans-serif';
  ctx.fillText(tourCode + ' • ' + (isTh ? 'กรุ๊ปเหมา ' + paxCount + ' ท่าน' : 'Đoàn ' + paxCount + ' Khách'), 120, 280);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 52px "Prompt", "Playfair Display", serif';
  ctx.fillText(isTh ? tourTitleTh : tourTitle, 120, 360);

  ctx.fillStyle = '#d1fae5';
  ctx.font = '30px "Prompt", sans-serif';
  ctx.fillText(isTh ? 'พักบนยอดเขาบานาฮิลล์ 4 ดาว • แถมกุ้งมังกร • รถบัส VIP' : '1 Đêm Mercure Bà Nà Hills 4* • Tặng Tôm Hùm • Xe Universe', 120, 430);

  // 4. Price Showcase Card
  const priceGrad = ctx.createLinearGradient(80, 580, 1000, 980);
  priceGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
  priceGrad.addColorStop(1, 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = priceGrad;
  ctx.beginPath();
  ctx.roundRect(80, 580, 920, 420, 35);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 30px "Prompt", sans-serif';
  ctx.fillText(isTh ? 'ราคาพิเศษต่อท่าน (รวมทุกอย่าง):' : 'GIÁ TOUR TRỌN GÓI / KHÁCH:', 130, 660);

  ctx.fillStyle = '#fef08a';
  ctx.font = '900 120px "Prompt", sans-serif';
  ctx.fillText(retailPriceFormatted, 130, 800);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px "Prompt", sans-serif';
  ctx.fillText(isTh ? `ขนาดกรุ๊ป: ${bandLabel} (${vehicleLabel})` : `Quy mô: ${bandLabel} (${vehicleLabel})`, 130, 880);

  if (paxCount >= 15) {
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 28px "Prompt", sans-serif';
    ctx.fillText(isTh ? '★ ฟรีหัวหน้าทัวร์ 1 ท่าน (พักห้องเดี่ยว)' : '★ Miễn phí 1 Trưởng đoàn FOC (ngủ phòng đơn)', 130, 940);
  }

  // 5. 5 Key Highlights List
  const highlights = isTh ? [
    '✓ พักค้างคืนบนยอดเขาบานาฮิลล์ โรงแรม 4 ดาว Mercure French Village',
    '✓ สิทธิ์ชมสะพานมือ Golden Bridge ยามเช้าตรู่ ไร้ผู้คนแออัด',
    '✓ บุฟเฟต์ซีฟู้ด Long Qiao แถมฟรีกุ้งมังกรอบเนยร้อนๆ คนละครึ่งตัว',
    '✓ ล่องเรือกระด้งป่ามะพร้าว และเดินเที่ยวเมืองมรดกโลกฮอยอัน',
    '✓ รถบัสปรับอากาศคุณภาพดี พร้อมไกด์ดูแลตลอดการเดินทาง'
  ] : [
    '✓ Nghỉ đêm trên đỉnh Bà Nà Hills tại Khách sạn 4 sao Mercure',
    '✓ Đặc quyền đón bình minh Cầu Vàng thanh vắng lúc 06:30 sáng',
    '✓ Đại tiệc Buffet Hải sản Long Qiao tặng nửa con tôm hùm nướng bơ/khách',
    '✓ Trải nghiệm Thuyền thúng Rừng dừa & dạo Phố cổ Hội An lung linh',
    '✓ Xe du lịch Universe đời mới & Hướng dẫn viên suốt tuyến'
  ];

  ctx.fillStyle = '#ffffff';
  ctx.font = '500 28px "Prompt", sans-serif';
  let startY = 1070;
  highlights.forEach(hl => {
    ctx.fillText(hl, 100, startY);
    startY += 65;
  });

  // 6. Contact Footer Box
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.roundRect(80, 1480, 920, 340, 30);
  ctx.fill();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 32px "Prompt", sans-serif';
  ctx.fillText(isTh ? 'ติดต่อสอบถามและจองโปรแกรม:' : 'LIÊN HỆ ĐẶT TOUR & TƯ VẤN:', 130, 1560);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Prompt", sans-serif';
  const contactName = agentConfig.name || 'Green Sea Tour Vietnam';
  ctx.fillText(contactName, 130, 1630);

  ctx.fillStyle = '#d1fae5';
  ctx.font = '30px "Prompt", sans-serif';
  const hotline = agentConfig.tel ? `Hotline: ${agentConfig.tel}` : 'Hotline: (+84) 987.43.43.43';
  const lineInfo = agentConfig.line ? `LINE ID: ${agentConfig.line}` : 'LINE OA: @greenseatour';
  ctx.fillText(`${hotline}   |   ${lineInfo}`, 130, 1700);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '22px "Prompt", sans-serif';
  ctx.fillText('Vietnam Inbound Land Tour Operator • Trusted Partner for Thai Agencies', 130, 1760);

  // 7. Download Trigger
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Tour_Poster_${tourCode}_${paxCount}pax.png`;
  link.href = dataUrl;
  link.click();
}
