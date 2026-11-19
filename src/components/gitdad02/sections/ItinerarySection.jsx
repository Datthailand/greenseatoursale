import React, { useState } from 'react';
import { Clock, Hotel, Sparkles, Utensils } from 'lucide-react';

export default function ItinerarySection({ isVi, isTh, activeDayTab: propDayTab, setActiveDayTab: propSetDayTab, agentConfig }) {
  const [internalDayTab, setInternalDayTab] = useState(1);
  const activeDayTab = propDayTab !== undefined ? propDayTab : internalDayTab;
  const setActiveDayTab = propSetDayTab || setInternalDayTab;

  return (
    <>
      {/* 4. INTERACTIVE DAY-BY-DAY TIMELINE & CULINARY SHOWCASE */}
      <section id="itinerary" style={{ maxWidth: '1240px', margin: '0 auto 5rem', padding: '0 2rem' }}>
        
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
            {isVi ? 'Lịch Trình Độc Quyền & Trải Nghiệm Ẩm Thực Khách Đoàn' : isTh ? 'ตารางทัวร์และประสบการณ์อาหารระดับพรีเมียมสำหรับกรุ๊ปเหมา' : 'Exclusive Group Itinerary & Dining'}
          </h2>
          
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            {isVi 
              ? 'Hành trình được tối ưu hóa cho các đoàn khách lớn 8 – 42 khách, đảm bảo nghỉ dưỡng đỉnh cao tại Mercure Bà Nà Hills và ẩm thực buffet hải sản thịnh soạn:' 
              : 'ออกแบบโปรแกรมอย่างพิถีพิถันสำหรับกรุ๊ปใหญ่ 8 – 42 ท่าน พร้อมอาหารบุฟเฟต์คุณภาพสูงและที่พัก Mercure บนยอดเขาครบครัน:'}
          </p>
        </div>

        {/* 3 Day Interactive Tabs */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem', marginBottom: '2rem'
        }}>
          {[
            { day: 1, titleVi: 'Ngày 1: Chạm Đỉnh Bà Nà Hills', titleTh: 'วันที่ 1: ยอดเขาบานาฮิลล์', titleEn: 'Day 1: Ba Na Hills Peak', subVi: 'Sơn Trà • Lên cáp treo • Đêm Làng Pháp • Nghỉ Mercure', subTh: 'วัดลิงอึ๋ง • ขึ้นกระเช้า • ค่ำคืนหมู่บ้านฝรั่งเศส • พัก Mercure' },
            { day: 2, titleVi: 'Ngày 2: Rừng Dừa & Phố Cổ Hội An', titleTh: 'วันที่ 2: ล่องเรือกระด้ง & ฮอยอัน', titleEn: 'Day 2: Coconut Jungle & Hoi An', subVi: 'Golden Hours Cầu Vàng • Rừng Dừa • Buffet Tôm Hùm', subTh: 'Golden Hours สะพานมือ • ล่องเรือกระด้ง • บุฟเฟต์กุ้งมังกร' },
            { day: 3, titleVi: 'Ngày 3: Chợ Hàn & Tiễn Sân Bay', titleTh: 'วันที่ 3: ตลาดฮาน & ส่งสนามบิน', titleEn: 'Day 3: Han Market & Departure', subVi: 'Mua sắm Chợ Hàn • Bánh Mì đặc sản • Tiễn sân bay', subTh: 'ชอปปิ้งตลาดฮาน • ขนมปังบั๋นหมี่ • ส่งสนามบิน' }
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
                    <li><strong>Đón khách tại Sân bay Đà Nẵng (DAD):</strong> Hướng dẫn viên nói tiếng Thái Lan và xe du lịch 29–45 chỗ đón đoàn tại sân bay Đà Nẵng.</li>
                    <li><strong>Viếng Chùa Linh Ứng Bán đảo Sơn Trà:</strong> Chiêm bái Tượng Phật Bà Quan Âm cao 67m hướng biển Đông.</li>
                    <li><strong>Check-in Son Tra Marina Café:</strong> Thưởng ngoạn quán cafe phong cách Địa Trung Hải nhìn ra vịnh Đà Nẵng (tự túc đồ uống).</li>
                    <li><strong>Lên Cáp treo Bà Nà Hills:</strong> Trải nghiệm tuyến cáp treo đạt nhiều kỷ lục thế giới, ngắm toàn cảnh núi rừng hùng vĩ.</li>
                    <li><strong>Check-in Cầu Vàng & Khu vui chơi Fantasy Park:</strong> Tự do dạo bước Cầu Vàng và trải nghiệm hơn 105 trò chơi trong nhà miễn phí.</li>
                    <li><strong>Nghỉ đêm Mercure Danang French Village 4*:</strong> Nhận phòng khách sạn trên đỉnh núi, tận hưởng không khí Làng Pháp se lạnh và sẵn sàng cho đặc quyền Golden Hours sáng sớm hôm sau.</li>
                  </>
                ) : (
                  <>
                    <li><strong>รับคณะที่สนามบินดานัง (DAD):</strong> ไกด์ภาษาไทยและรถบัสปรับอากาศ 29–45 ที่นั่ง รอรับคณะที่สนามบินดานัง</li>
                    <li><strong>ไหว้พระวัดลิงอื๋ง แหลมเซินตรา:</strong> สักการะองค์เจ้าแม่กวนอิมสีขาวสูง 67 เมตร ริมทะเล</li>
                    <li><strong>เช็คอิน Son Tra Marina Café:</strong> คาเฟ่สไตล์ซานโตรินีสีขาวฟ้าสุดชิคริมทะเล (ไม่รวมค่าเครื่องดื่ม)</li>
                    <li><strong>ขึ้นกระเช้าลอยฟ้าบานาฮิลล์:</strong> สัมผัสกระเช้าลอยฟ้าที่ยาวและสูงที่สุดระดับโลก ชมวิวธรรมชาติอันงดงาม</li>
                    <li><strong>เช็คอินสะพานมือสีทอง & สวนสนุก Fantasy Park:</strong> จุดถ่ายรูปแลนด์มาร์กระดับโลกและสนุกกับเครื่องเล่นฟรีมากมาย</li>
                    <li><strong>เช็คอินโรงแรม Mercure French Village 4*:</strong> พักผ่อนและสัมผัสอากาศเย็นสบายตลอดทั้งคืนบนบานาฮิลล์ พร้อมเตรียมรับสิทธิพิเศษ Golden Hours ยามเช้าตรู่</li>
                  </>
                )}
              </ul>

              {/* Culinary & Hotel Showcase */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 900, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Utensils size={17} />
                    {isVi ? 'Bữa trưa (Lunch 6$): Nhà hàng Sơn Dương' : 'มื้อกลางวัน (Lunch 6$): Nhà hàng Sơn Dương'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {isVi 
                      ? '1. Nem hải sản giòn rụm • 2. Mực chiên nước mắm • 3. Gà chiên nước mắm • 4. Cá sốt chanh dây • 5. Thịt kho trứng • 6. Chả cá xào cà chua • 7. Sò xào cay kiểu Hoa • 8. Rau xào dầu hào • 9. Canh rong biển thịt bằm đậu hũ • 10. Cơm trắng & Trái cây' 
                      : '1. เปาะเปี๊ยะทะเล • 2. ปลาหมึกทอดน้ำปลา • 3. ไก่ทอดน้ำปลา • 4. ปลาทอดราดซอสเสาวรส • 5. หมูไข่พะโล้ • 6. ปลายอผัดมะเขือเทศ • 7. หอยผัดซอสจีน • 8. ผักผัดน้ำมันหอย • 9. แกงจืดหมูสับเต้าหู้ • 10. ข้าวสวย & ผลไม้'}
                  </div>
                </div>

                <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Utensils size={17} />
                    {isVi ? 'Bữa tối (Dinner): Đại tiệc Buffet Beer Plaza Bà Nà' : 'มื้อค่ำ (Dinner): บุฟเฟต์ Beer Plaza บานาฮิลล์'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {isVi 
                      ? 'Đại tiệc buffet quốc tế hơn 100 món Á - Âu phong phú kèm biểu diễn âm nhạc rộn ràng trên đỉnh Bà Nà Hills.' 
                      : 'บุฟเฟต์นานาชาติระดับพรีเมียมบนยอดเขาบานาฮิลล์ พร้อมอาหารมากกว่า 100 เมนูและการแสดงดนตรีสด'}
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1', background: '#fdf4ff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0abfc' }}>
                  <div style={{ fontWeight: 900, color: '#86198f', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Hotel size={17} />
                    {isVi ? 'Khách sạn nghỉ đêm: Mercure Danang French Village Bana Hills 4*' : 'โรงแรมที่พัก (Overnight): Mercure Danang French Village Bana Hills 4*'}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#701a75', marginTop: '3px' }}>
                    {isVi ? '*Trường hợp chọn phòng Family Bunk (3 khách/phòng): phụ thu +20$/phòng/đêm' : '*กรณีเลือกพักห้อง Family Bunk (พัก 3 ท่าน): ชาร์จเพิ่ม +$20 USD/ห้อง/คืน'}
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
                    {isVi ? 'BÀ NÀ HILLS – HỘI AN – ĐÀ NẴNG (Rừng Dừa & Buffet Tôm Hùm)' : 'BA NA HILLS – HOI AN – DA NANG (ล่องเรือกระด้ง & บุฟเฟต์กุ้งมังกร)'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              
              {/* VIP Golden Hours Comprehensive Showcase */}
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
                    ? 'Bước lên Cầu Vàng vào một trong những khoảnh khắc đẹp nhất trong ngày. Nhờ lưu trú tại Mercure Làng Pháp, bạn được đón những chuyến cáp treo sớm độc quyền từ đỉnh núi để cảm nhận biểu tượng Đà Nẵng thanh vắng, không đông đúc và chụp ảnh tuyệt đẹp.' 
                    : isTh
                      ? 'สัมผัสสะพานมือสีทองในห้วงเวลาที่งดงามและสงบที่สุดของวัน สิทธิพิเศษสำหรับผู้เข้าพักที่ Mercure Bana Hills ให้คุณได้ตื่นขึ้นมากลางหมู่บ้านฝรั่งเศส นั่งกระเช้ารอบเช้าตรู่สู่สะพานมือยามแสงแดดแรกทอประกายผ่านทะเลหมอก ไร้ผู้คนรบกวน'
                      : 'Step onto the Golden Bridge during the most magical and serene moment of the day. Exclusive to guests staying at Mercure Bana Hills.'}
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
                    <li><strong>06:00 – 07:00: Trải nghiệm "Golden Hours" Cầu Vàng:</strong> Thức dậy giữa mây ngàn, đón tuyến cáp treo sớm ngắm bình minh Cầu Vàng và chụp ảnh vắng người.</li>
                    <li><strong>07:30 – 08:30: Ăn sáng buffet tại Mercure:</strong> Thưởng thức bữa sáng quốc tế và dạo vườn hoa Le Jardin D'Amour trước khi xuống núi.</li>
                    <li><strong>09:30: Xuống cáp treo đi Hội An:</strong> Xe 29-45 chỗ đưa đoàn di chuyển đến Phố cổ Hội An.</li>
                    <li><strong>Thuyền thúng Rừng dừa Bảy Mẫu Cẩm Thanh:</strong> Xem nghệ nhân biểu diễn múa thúng xoay điêu luyện.</li>
                    <li><strong>Khám phá Phố cổ Hội An:</strong> Dạo bước qua Chùa Cầu Nhật Bản, Nhà cổ Tấn Ký, Hội quán Phúc Kiến và phố đèn lồng.</li>
                    <li><strong>Làng đá Non Nước & Chụp ảnh Cầu Rồng:</strong> Chiêm ngưỡng tượng điêu khắc đá tinh xảo và check-in Cầu Rồng Đà Nẵng.</li>
                    <li><strong>Về Đà Nẵng:</strong> Nhận phòng khách sạn 4 sao tại trung tâm thành phố Đà Nẵng.</li>
                  </>
                ) : (
                  <>
                    <li><strong>06:00 – 07:00: สัมผัส Golden Hours สะพานมือสีทอง:</strong> ตื่นรับอากาศบริสุทธิ์บนยอดเขา นั่งกระเช้ารอบเช้าสู่สะพานมือสีทอง ถ่ายรูปวิวปัง ไร้ผู้คนรบกวน</li>
                    <li><strong>07:30 – 08:30: รับประทานอาหารเช้าบุฟเฟต์ Mercure:</strong> บุฟเฟต์นานาชาติ ณ ห้องอาหารของโรงแรมและชมสวนดอกไม้ฝรั่งเศส</li>
                    <li><strong>09:30: ลงกระเช้าสู่ฮอยอัน:</strong> รถบัสนำคณะเดินทางมุ่งหน้าสู่เมืองมรดกโลกฮอยอัน</li>
                    <li><strong>นั่งเรือกระด้งป่ามะพร้าว (Cam Thanh Coconut Village):</strong> สัมผัสการหมุนเรือกระด้งสุดมันส์ตามจังหวะดนตรี</li>
                    <li><strong>เดินชมเมืองโบราณฮอยอัน:</strong> ชมสะพานญี่ปุ่นโบราณ, บ้านโบราณตระกูลเติ๋นกี, สมาคมชาวจีนฟุกเกี๋ยน</li>
                    <li><strong>หมู่บ้านหินอ่อน & ถ่ายรูปสะพานมังกร:</strong> แวะชมงานหัตถกรรมหินอ่อนและถ่ายรูปแลนด์มาร์กสะพานมังกร</li>
                    <li><strong>เดินทางกลับดานัง:</strong> เช็คอินเข้าสู่โรงแรม 4 ดาวใจกลางเมืองดานัง</li>
                  </>
                )}
              </ul>

              {/* Culinary & Hotel Showcase */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 900, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Utensils size={17} />
                    {isVi ? 'Bữa trưa (Lunch 6$): Nhà hàng Hà Nội Old' : 'มื้อกลางวัน (Lunch 6$): Nhà hàng Hà Nội Old'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {isVi 
                      ? '1. Nghêu hấp sả • 2. Gà xào gừng • 3. Tôm thịt kho tộ • 4. Cá kho nồi đất • 5. Trứng chiên thịt bằm • 6. Đậu hũ sốt cà chua • 7. Rau xào tỏi • 8. Canh rau thịt bằm • 9. Cơm trắng • 10. Món tráng miệng & Trà đá' 
                      : '1. หอยลายนึ่ง • 2. ไก่ผัดขิง • 3. กุ้งหมูต้มเค็ม • 4. ปลาตุ๋นหม้อดิน • 5. ไข่เจียวหมูสับ • 6. เต้าหู้ซอสมะเขือเทศ • 7. ผัดผัก • 8. แกงจืดผักหมูสับ • 9. ข้าวสวย • 10. ของหวาน + ชาเย็น'}
                  </div>
                </div>

                <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Utensils size={17} />
                    {isVi ? 'Bữa tối (Dinner): Long Qiao Buffet + TẶNG ½ TÔM HÙM' : 'มื้อค่ำ (Dinner): บุฟเฟต์ซีฟู้ด Long Qiao + แถมกุ้งมังกร'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {isVi 
                      ? 'Buffet hải sản nướng lẩu thả ga cạnh Cầu Rồng + ĐẶC BIỆT TẶNG KÈM ½ TÔM HÙM NƯỚNG BƠ TỎI / KHÁCH (*nâng cấp 1 con nguyên: +7$/khách).' 
                      : 'บุฟเฟต์ปิ้งย่างชาบูซีฟู้ดไม่อั้นติดสะพานมังกร + แถมฟรีกุ้งมังกรอบเนยคนละครึ่งตัว (*เพิ่มเป็น 1 ตัวเต็ม: +7$/ท่าน)'}
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1', background: '#fdf4ff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0abfc' }}>
                  <div style={{ fontWeight: 900, color: '#86198f', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Hotel size={17} />
                    {isVi ? 'Khách sạn nghỉ đêm: Hadana, TGT, Magnolia (4 sao tiêu chuẩn) hoặc tương đương tại Đà Nẵng' : 'โรงแรมที่พัก (Overnight): Hadana, TGT, Magnolia (4 ดาว) หรือเทียบเท่าในดานัง'}
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
                src="/assets/dragon-bridge.jpg" 
                alt="Da Nang City & Han Market" 
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
                    {isVi ? 'CHỢ HÀN ĐÀ NẴNG – BÁNH MÌ ĐẶC SẢN – TIỄN SÂN BAY' : isTh ? 'ตลาดฮานดานัง – ขนมปังบั๋นหมี่ – ส่งสนามบิน' : 'HAN MARKET - BANH MI - AIRPORT TRANSFER'}
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
                    <li><strong>Ăn sáng buffet:</strong> Thưởng thức bữa sáng tại khách sạn 4 sao, làm thủ tục trả phòng.</li>
                    <li><strong>Mua sắm đặc sản Chợ Hàn (Han Market):</strong> Mua quà lưu niệm, bánh kẹo hạt điều, trà sen sấy, cà phê...</li>
                    <li><strong>Thưởng thức Bánh mì đặc sản:</strong> Mỗi khách được tặng 1 phần bánh mì kẹp thịt đặc sản giòn thơm (hoặc tùy chọn nâng cấp lên set menu 6$).</li>
                    <li><strong>Tiễn sân bay Đà Nẵng:</strong> Xe 29–45 chỗ đưa đoàn ra sân bay làm thủ tục xuất cảnh về lại Thái Lan. Kết thúc tour tốt đẹp.</li>
                  </>
                ) : (
                  <>
                    <li><strong>อาหารเช้าบุฟเฟต์:</strong> รับประทานอาหารเช้า ณ โรงแรมที่พักดานัง และเช็คเอาท์สัมภาระ</li>
                    <li><strong>ชอปปิ้งตลาดฮาน (Han Market):</strong> ซื้อของฝากขึ้นชื่อ เม็ดมะม่วงหิมพานต์, ชาดอกบัว, กาแฟเวียดนาม, ขนมท้องถิ่น</li>
                    <li><strong>ลิ้มลองขนมปังบั๋นหมี่เวียดนาม:</strong> แถมฟรีขนมปังบั๋นหมี่กรอบนอกนุ่มใน (หรือเลือกอัปเกรดเป็นเซตโต๊ะ +6$/ท่าน)</li>
                    <li><strong>ส่งสนามบินดานัง:</strong> รถบัส 29-45 ที่นั่ง นำคณะส่งสนามบินดานังเพื่อเดินทางกลับประเทศไทยโดยสวัสดิภาพ</li>
                  </>
                )}
              </ul>

              {/* Culinary & Hotel Showcase */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 900, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Utensils size={17} />
                    {isVi ? 'Bữa trưa (Lunch): Bánh Mì Đặc Sản Đà Nẵng / Hội An' : 'มื้อกลางวัน (Lunch): ขนมปังบั๋นหมี่ชื่อดัง'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {isVi 
                      ? 'Tặng kèm bánh mì kẹp giòn thơm đặc sản miền Trung (*Nâng cấp set menu 8 món Việt Nam tại nhà hàng: +6$/khách).' 
                      : 'แถมฟรีขนมปังบั๋นหมี่เวียดนามแท้ (*อัปเกรดเป็นเซตเมนู 8 อย่าง ณ ภัตตาคาร: +6$/ท่าน)'}
                  </div>
                </div>

                <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Hotel size={17} />
                    {isVi ? 'Tiễn sân bay quốc tế Đà Nẵng (DAD)' : 'ส่งสนามบินนานาชาติดานัง (DAD)'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {isVi 
                      ? 'Hướng dẫn viên và lái xe hỗ trợ sắp xếp hành lý đoàn đông và làm thủ tục lên máy bay chu đáo.' 
                      : 'ทีมงานไกด์และคนขับช่วยดูแลสัมภาระกรุ๊ปใหญ่และอำนวยความสะดวกในการเช็คอิน'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </section>
    </>
  );
}
