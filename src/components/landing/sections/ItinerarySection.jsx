import React from 'react';
import { Clock, Hotel, Sparkles, Utensils } from 'lucide-react';

export default function ItinerarySection({ isVi, isTh, activeDayTab, setActiveDayTab, agentConfig }) {
  return (
    <>
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
                  <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
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

                  <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
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
                      <li><strong>09:00: Xuống cáp treo đi Hội An:</strong> Rời Bà Nà Hills, xe đưa đoàn di chuyển đến Phố cổ Hội An.</li>
                      <li><strong>Thuyền thúng Rừng dừa Bảy Mẫu Cẩm Thanh:</strong> xem nghệ nhân biểu diễn múa thúng giăng lưới.</li>
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
                  <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
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

                  <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
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
                  <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
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

                  <div className="culinary-card-interactive" style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
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

    </>
  );
}
