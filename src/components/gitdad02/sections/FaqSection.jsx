import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection({ isVi, isTh }) {
  const [expandedId, setExpandedId] = useState('git-bus-allocation');

  const faqs = [
    {
      id: 'git-bus-allocation',
      questionVi: 'Tiêu chuẩn phân bổ xe du lịch cho các quy mô đoàn (8 – 42 khách) như thế nào?',
      questionTh: 'มาตรฐานการจัดสรรรถบัสสำหรับขนาดกรุ๊ปต่างๆ (8 – 42 ท่าน) เป็นอย่างไร?',
      questionEn: 'How are tourist coaches allocated for different group sizes (8 – 42 pax)?',
      answerVi: 'Green Sea Tour phân bổ xe đời mới có điều hòa mát lạnh và khoang hành lý rộng rãi:\n• Đoàn 8 – 14 khách: Xe 29 chỗ (Mini bus) rộng rãi.\n• Đoàn 15 – 19 khách: Xe 35 chỗ cao cấp.\n• Đoàn 20 – 42 khách: Xe 45 chỗ Universe đời mới sang trọng.',
      answerTh: 'กรีนซีทัวร์จัดสรรรถบัสปรับอากาศรุ่นใหม่ สะอาด กว้างขวาง:\n• กรุ๊ป 8 – 14 ท่าน: รถบัส 29 ที่นั่ง (Mini bus)\n• กรุ๊ป 15 – 19 ท่าน: รถบัส 35 ที่นั่ง\n• กรุ๊ป 20 – 42 ท่าน: รถบัส 45 ที่นั่ง Universe',
      answerEn: 'Green Sea Tour provides modern spacious air-conditioned coaches:\n• 8 – 14 Pax: 29-Seat Mini Bus\n• 15 – 19 Pax: 35-Seat Coach\n• 20 – 42 Pax: 45-Seat Bus Universe'
    },
    {
      id: 'git-tour-leader-foc',
      questionVi: 'Chính sách miễn phí FOC dành cho Trưởng đoàn Thái Lan (Tour Leader) quy định ra sao?',
      questionTh: 'นโยบายฟรีหัวหน้าทัวร์ (Tour Leader FOC) มีเงื่อนไขอย่างไร?',
      questionEn: 'What is the Tour Leader (TL) FOC policy for group bookings?',
      answerVi: '• Đoàn từ 15 khách người lớn trở lên: MIỄN PHÍ 100% cho 1 Trưởng đoàn Thái Lan (được bố trí ngủ phòng đơn riêng biệt không tính phí).\n• Nếu đoàn có thêm Trưởng đoàn thứ 2: Ngủ chung phòng với TL1 phụ thu +$70; ngủ riêng phòng đơn phụ thu +$190.\n• Đoàn 8 – 14 khách: Chưa đủ điều kiện FOC 15 pax (nếu có TL ngủ phòng đơn phụ thu +$190).',
      answerTh: '• กรุ๊ป 15 ท่านขึ้นไป: ฟรี 100% สำหรับหัวหน้าทัวร์ 1 ท่าน (พักห้องเดี่ยว ไม่คิดค่าใช้จ่าย)\n• หากมีหัวหน้าทัวร์คนที่ 2: พักห้องเดียวกันกับ TL ท่านแรก +$70, แยกพักห้องเดี่ยว +$190\n• กรุ๊ป 8 – 14 ท่าน: ยังไม่ถึงเกณฑ์ฟรี 15 ท่าน (หากมีหัวหน้าทัวร์พักเดี่ยว +$190)',
      answerEn: '• 15+ Adult Pax: 1 Tour Leader 100% FOC (Single room stay included free of charge).\n• 2nd Extra Tour Leader: Twin share with 1st TL +$70, Single room +$190.\n• 8 – 14 Pax: Under 15 pax FOC threshold (TL single room +$190).'
    },
    {
      id: 'git-evening-flights',
      questionVi: 'Nếu đoàn bay chuyến chiều/tối (như VN626 lúc 19:45 hoặc FD638 lúc 17:30) thì xử lý lịch trình ra sao?',
      questionTh: 'หากคณะเดินทางด้วยเที่ยวบินช่วงเย็น/ค่ำ (เช่น VN626 เวลา 19:45 หรือ FD638 เวลา 17:30) จะปรับโปรแกรมอย่างไร?',
      questionEn: 'How is the itinerary adjusted for afternoon/evening flights (e.g. VN626 or FD638)?',
      answerVi: 'Quy tắc nghiệp vụ: Tuyệt đối không đưa đoàn lên Bà Nà vào buổi tối vì cáp treo và các khu vui chơi đóng cửa sau 17:30.\n• Xử lý: Xe đón đoàn ăn tối đặc sản, nhận phòng khách sạn 4 sao trung tâm Đà Nẵng Đêm 1; toàn bộ lịch trình tham quan & nghỉ đêm Mercure Bà Nà Hills được chuyển sang Ngày 2 trọn vẹn.',
      answerTh: 'หลักการปฏิบัติการ: ไม่นำคณะขึ้นบานาฮิลล์ช่วงค่ำ เนื่องจากกระเช้าและสวนสนุกปิดหลัง 17:30 น.\n• การปรับเปลี่ยน: รถรับคณะทานมื้อค่ำ เช็คอินโรงแรม 4 ดาวใจกลางดานังคืนแรก และสลับโปรแกรมเที่ยวพร้อมพักค้างคืนบนบานาฮิลล์ไปเป็นวันที่ 2',
      answerEn: 'Operating rule: Groups are never transferred to Ba Na Hills at night since cable cars and attractions close after 5:30 PM.\n• Adjustment: Welcome dinner in Da Nang, Night 1 in 4-star city hotel; the full Ba Na Hills mountaintop stay is moved to Day 2.'
    },
    {
      id: 'git-lobster-buffet',
      questionVi: 'Đặc quyền ẩm thực tại Buffet Hải Sản Long Qiao và Buffet Beer Plaza gồm những gì?',
      questionTh: 'ไฮไลท์อาหารมื้อค่ำที่บุฟเฟต์ซีฟู้ด Long Qiao และ Beer Plaza มีอะไรบ้าง?',
      questionEn: 'What are the dining highlights at Long Qiao Seafood Buffet and Beer Plaza?',
      answerVi: '• Bữa tối Ngày 1 (Beer Plaza Bà Nà Hills): Đại tiệc buffet quốc tế Á - Âu hơn 100 món trong không gian quảng trường rực rỡ.\n• Bữa tối Ngày 2 (Long Qiao cạnh Cầu Rồng): Buffet hải sản nướng lẩu thả ga (tôm, mực, cá, nghêu, dimsum...) và ĐẶC BIỆT TẶNG NỬA CON TÔM HÙM NƯỚNG BƠ cho từng khách.',
      answerTh: '• มื้อค่ำวันที่ 1 (Beer Plaza บานาฮิลล์): บุฟเฟต์นานาชาติกว่า 100 เมนู ท่ามกลางบรรยากาศการแสดงดนตรีสด\n• มื้อค่ำวันที่ 2 (Long Qiao ริมสะพานมังกร): บุฟเฟต์ปิ้งย่างชาบูซีฟู้ดไม่อั้น พร้อมของแถมพิเศษ กุ้งมังกรอบเนยคนละครึ่งตัว',
      answerEn: '• Night 1 Dinner (Beer Plaza Ba Na): Over 100 international Asian-Western dishes with live music.\n• Night 2 Dinner (Long Qiao by Dragon Bridge): Unlimited seafood BBQ & hotpot + COMPLIMENTARY BAKED BUTTER LOBSTER HALF for each guest.'
    },
    {
      id: 'git-thai-visa',
      questionVi: 'Khách quốc tịch Thái Lan nhập cảnh Việt Nam du lịch có cần xin Visa không? Điều kiện hộ chiếu là gì?',
      questionTh: 'นักท่องเที่ยวสัญชาติไทยเข้าเวียดนามต้องขอวีซ่าหรือไม่? และมีเงื่อนไขพาสปอร์ตอย่างไร?',
      questionEn: 'Do Thai citizens need a visa to travel to Vietnam? What are the passport requirements?',
      answerVi: 'Khách quốc tịch Thái Lan khi nhập cảnh vào Việt Nam để du lịch được MIỄN THỊ THỰC (VISA) 30 ngày.\nĐiều kiện bắt buộc:\n1. Hộ chiếu (Passport): Còn hạn sử dụng ít nhất 6 tháng tính từ ngày nhập cảnh.\n2. Số trang trống: Còn ít nhất 2 trang trống để đóng dấu xuất nhập cảnh.',
      answerTh: 'นักท่องเที่ยวสัญชาติไทยได้รับการ "ยกเว้นวีซ่า (Free Visa)" 30 วัน\nเงื่อนไขบังคับ:\n1. หนังสือเดินทาง (Passport): ต้องมีอายุคงเหลือไม่น้อยกว่า 6 เดือน นับจากวันเดินทางเข้าประเทศ\n2. จำนวนหน้าว่าง: มีหน้าว่างเหลืออย่างน้อย 2 หน้า สำหรับประทับตราตรวจคนเข้าเมือง',
      answerEn: 'Thai tourists are GRANTED 30-DAY VISA EXEMPTION.\nMandatory requirements:\n1. Passport validity: At least 6 months remaining from entry date.\n2. Blank pages: At least 2 blank pages for immigration stamps.'
    }
  ];

  return (
    <section id="faq-section" style={{ maxWidth: '1240px', margin: '0 auto 4.5rem', padding: '0 2rem' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '1.75rem',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
            fontSize: '1.95rem',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 0.5rem'
          }}>
            {isVi ? 'Giải Đáp Thắc Mắc Thường Gặp B2B (Tour Đoàn GIT)' : isTh ? 'คำถามที่พบบ่อยสำหรับตัวแทนท่องเที่ยว (กรุ๊ปเหมา GIT)' : 'B2B Frequently Asked Questions (Group Tour)'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            {isVi ? 'Tổng hợp các quy định điều hành, tiêu chuẩn xe, cơ cấu phòng và quyền lợi Trưởng đoàn.' : isTh ? 'รวบรวมระเบียบการจัดทัวร์ มาตรฐานรถบัส การจัดห้องพัก และสิทธิ์หัวหน้าทัวร์' : 'Group logistics, coach fleet standards, rooming policies and Tour Leader benefits.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  border: isExpanded ? '1.5px solid #059669' : '1px solid #e2e8f0',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  background: isExpanded ? '#f0fdf4' : '#f8fafc'
                }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  type="button"
                  style={{
                    width: '100%',
                    padding: '1.15rem 1.35rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    {isVi ? faq.questionVi : isTh ? faq.questionTh : faq.questionEn}
                  </span>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: isExpanded ? '#059669' : '#ffffff',
                    color: isExpanded ? '#ffffff' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, border: '1px solid #cbd5e1'
                  }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div style={{
                    padding: '0 1.35rem 1.25rem',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: '#334155',
                    whiteSpace: 'pre-line',
                    borderTop: '1px dashed #bbf7d0'
                  }}>
                    <div style={{ paddingTop: '0.75rem' }}>
                      {isVi ? faq.answerVi : isTh ? faq.answerTh : faq.answerEn}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
