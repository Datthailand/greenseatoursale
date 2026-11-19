import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, Award, AlertTriangle, CreditCard } from 'lucide-react';

export default function TermsSection({ isVi, isTh }) {
  return (
    <section id="terms-section" style={{ maxWidth: '1240px', margin: '0 auto 4.5rem', padding: '0 2rem' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '1.75rem',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif",
            fontSize: '1.95rem',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 0.5rem'
          }}>
            {isVi ? 'Dịch Vụ Bao Gồm & Điều Khoản Tour Đoàn GIT' : isTh ? 'บริการที่รวมในแพ็กเกจ & เงื่อนไขกรุ๊ปเหมา GIT' : 'Included Services & Group Tour Terms'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            {isVi ? 'Chính sách minh bạch dành riêng cho các đối tác lữ hành và công ty du lịch Thái Lan.' : isTh ? 'นโยบายและเงื่อนไขที่ชัดเจนสำหรับพันธมิตรบริษัททัวร์ไทย' : 'Transparent policies for Thai travel agencies.'}
          </p>
        </div>

        {/* 2 Grid: Inclusions & Exclusions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Inclusions */}
          <div style={{ background: '#f0fdf4', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid #bbf7d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#166534', fontWeight: 900, fontSize: '1.1rem' }}>
              <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
              <span>{isVi ? 'Giá Tour Đã Bao Gồm' : isTh ? 'บริการที่รวมในราคาทัวร์' : 'Included in Tour Price'}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#14532d' }}>
              <li>✓ {isVi ? 'Khách sạn 4 sao tiêu chuẩn (2 khách/phòng): 1 đêm Mercure Bà Nà Hills + 1 đêm Đà Nẵng 4*.' : isTh ? 'โรงแรมมาตรฐาน 4 ดาว (พักคู่ 2 ท่าน/ห้อง): 1 คืน Mercure บานาฮิลล์ + 1 คืนดานัง 4 ดาว' : '4-Star hotels (Twin sharing): 1N Mercure Ba Na Hills + 1N Da Nang 4*.'}</li>
              <li>✓ {isVi ? 'Ăn uống trọn gói: 2 bữa sáng buffet + 2 bữa chính set menu đặc sản (6$) + 2 bữa đại tiệc Buffet (Beer Plaza & Long Qiao tặng tôm hùm).' : isTh ? 'อาหารครบมื้อ: 2 บุฟเฟต์เช้า + 2 เซตเมนูโต๊ะ (6$) + 2 บุฟเฟต์ใหญ่ (Beer Plaza & Long Qiao แถมกุ้งมังกร)' : 'Full meals: 2 breakfast buffets + 2 set menus + 2 grand buffets (Beer Plaza & Lobster).'}</li>
              <li>✓ {isVi ? 'Xe du lịch máy lạnh đời mới 29 / 35 / 45 chỗ Universe theo quy mô đoàn.' : isTh ? 'รถบัสปรับอากาศคุณภาพดี 29 / 35 / 45 ที่นั่ง Universe ตามขนาดกรุ๊ป' : 'Modern air-conditioned coach (29/35/45-seat Universe) matching group size.'}</li>
              <li>✓ {isVi ? 'Vé cáp treo Bà Nà Hills khứ hồi + Vé tham quan tất cả các điểm trong lịch trình.' : isTh ? 'ตั๋วขึ้นกระเช้าบานาฮิลล์ไป-กลับ + ตั๋วเข้าชมทุกสถานที่ตามที่ระบุในโปรแกรม' : 'Round-trip Ba Na Hills cable car tickets + all attraction entrance fees.'}</li>
              <li>✓ {isVi ? 'Hướng dẫn viên địa phương tiếng Thái / tiếng Anh chuyên nghiệp suốt tuyến.' : isTh ? 'ไกด์ท้องถิ่นสื่อสารภาษาไทยหรืออังกฤษดูแลตลอดการเดินทาง' : 'Professional local Thai or English speaking tour guide.'}</li>
              <li>✓ {isVi ? 'Nước uống đóng chai và bảo hiểm du lịch theo quy định.' : isTh ? 'น้ำดื่มบริการบนรถและประกันอุบัติเหตุการเดินทาง' : 'Complimentary bottled water and standard travel insurance.'}</li>
            </ul>
          </div>

          {/* Exclusions */}
          <div style={{ background: '#fef2f2', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid #fecaca' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#991b1b', fontWeight: 900, fontSize: '1.1rem' }}>
              <XCircle size={20} style={{ color: '#dc2626' }} />
              <span>{isVi ? 'Giá Tour Không Bao Gồm' : isTh ? 'บริการที่ไม่รวมในราคาทัวร์' : 'Excluded from Tour Price'}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#7f1d1d' }}>
              <li>✕ {isVi ? 'Vé máy bay quốc tế khứ hồi Thái Lan ↔ Đà Nẵng.' : isTh ? 'ตั๋วเครื่องบินไป-กลับระหว่างประเทศ ไทย ↔ ดานัง' : 'International round-trip flights Thailand ↔ Da Nang.'}</li>
              <li>✕ {isVi ? 'Tiền tip cho Hướng dẫn viên & Lái xe: 300 THB / khách / toàn tour.' : isTh ? 'ค่าทิปไกด์ท้องถิ่นและคนขับรถ: 300 บาท / ท่าน / ทริป' : 'Tip for Guide & Driver: 300 THB / pax / trip.'}</li>
              <li>✕ {isVi ? 'Chi phí cá nhân: Đồ uống tự gọi trong bữa ăn, giặt là, điện thoại.' : isTh ? 'ค่าใช้จ่ายส่วนตัว เช่น เครื่องดื่มสั่งพิเศษ ซักรีด ค่าโทรศัพท์' : 'Personal expenses: Extra beverages, laundry, phone calls.'}</li>
              <li>✕ {isVi ? 'Các dịch vụ tham quan mở rộng ngoài chương trình.' : isTh ? 'ค่าเข้าชมหรือบริการเสริมอื่นๆ ที่ไม่ได้ระบุในโปรแกรม' : 'Optional excursion tours not listed in itinerary.'}</li>
              <li>✕ {isVi ? 'Thuế VAT (nếu xuất hóa đơn tài chính tại Việt Nam).' : isTh ? 'ภาษีมูลค่าเพิ่ม VAT (กรณีขอใบกำกับภาษีในเวียดนาม)' : 'VAT tax (if invoice requested in Vietnam).'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Policy Cards: Tour Leader FOC & Cancellation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* FOC TL Policy */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem', color: '#00533d', fontWeight: 800, fontSize: '0.95rem' }}>
              <Award size={18} style={{ color: '#059669' }} />
              <span>{isVi ? 'Chính Sách Trưởng Đoàn (TL)' : isTh ? 'นโยบายหัวหน้าทัวร์' : 'Tour Leader Policy'}</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.55 }}>
              {isVi 
                ? '• Đoàn ≥ 15 pax: Miễn phí 1 Trưởng đoàn (FOC ngủ phòng đơn).\n• Nếu thêm 1 TL thứ 2: ngủ chung +$70, ngủ riêng đơn +$190.\n• Đoàn 8 - 14 pax: Không FOC (TL ngủ đơn phụ thu +$190).'
                : isTh
                  ? '• กรุ๊ป ≥ 15 ท่าน: ฟรีหัวหน้าทัวร์ 1 ท่าน (พักห้องเดี่ยว)\n• หากเพิ่มหัวหน้าทัวร์อีก 1 ท่าน: นอนด้วยกัน +$70, แยกนอนเดี่ยว +$190\n• กรุ๊ป 8 - 14 ท่าน: ไม่ฟรี (หัวหน้าทัวร์นอนเดี่ยว +$190)'
                  : '• 15+ Pax: 1 Tour Leader FOC (Single room).\n• Extra TL: Twin share +$70, Single room +$190.\n• 8 - 14 Pax: No FOC (TL single +$190).'}
            </div>
          </div>

          {/* Child Policy */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem', color: '#00533d', fontWeight: 800, fontSize: '0.95rem' }}>
              <ShieldCheck size={18} style={{ color: '#059669' }} />
              <span>{isVi ? 'Chính Sách Trẻ Em' : isTh ? 'นโยบายราคาเด็ก' : 'Child Policy'}</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.55 }}>
              {isVi 
                ? '• Trẻ 0 - 2 tuổi: Miễn phí 100% giá tour.\n• Trẻ 3 - 6 tuổi: 50% giá tour (ngủ chung giường bố mẹ).\n• Trẻ ≥ 7 tuổi: 100% giá tour (hưởng quyền lợi như người lớn).'
                : isTh
                  ? '• เด็ก 0 - 2 ขวบ: ฟรี 100%\n• เด็ก 3 - 6 ขวบ: คิด 50% ค่าทัวร์ (นอนเตียงเดียวกับผู้ใหญ่)\n• เด็ก 7 ขวบขึ้นไป: คิด 100% ค่าทัวร์ ได้สิทธิ์เหมือนผู้ใหญ่'
                  : '• 0 - 2 Years: 100% Free.\n• 3 - 6 Years: 50% tour fee (sharing bed with parents).\n• 7+ Years: 100% tour fee (full adult benefits).'}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem', color: '#00533d', fontWeight: 800, fontSize: '0.95rem' }}>
              <CreditCard size={18} style={{ color: '#059669' }} />
              <span>{isVi ? 'Đặt Cọc & Hủy Phạt' : isTh ? 'การมัดจำและยกเลิก' : 'Deposit & Cancellation'}</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.55 }}>
              {isVi 
                ? '• Đặt cọc: 30% sau khi xác nhận đoàn; thanh toán 70% trước 15 ngày khởi hành.\n• Hủy trước 21 ngày: miễn phí 100%.\n• Hủy 20 – 7 ngày: phạt 50%.\n• Hủy trong 6 ngày: phạt 90%.'
                : isTh
                  ? '• มัดจำ: 30% หลังคอนเฟิร์มกรุ๊ป; ชำระส่วนที่เหลือ 15 วันก่อนเดินทาง\n• ยกเลิกก่อน 21 วัน: ฟรีไม่มีค่าธรรมเนียม\n• ยกเลิก 20 – 7 วัน: ชาร์จ 50%\n• ยกเลิกภายใน 6 วัน: ชาร์จ 90%'
                  : '• Deposit: 30% on confirmation; balance 15 days prior.\n• Cancel before 21 days: 100% Free.\n• Cancel 20 – 7 days: 50% fee.\n• Cancel within 6 days: 90% fee.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
