import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function TermsSection({ isVi, isTh, agentConfig = {} }) {
  return (
      <section id="terms-section" style={{ maxWidth: '1240px', margin: '0 auto 4rem', padding: '0 2rem' }}>
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
                    <li>Khách sạn 4 sao tiêu chuẩn (2 khách/phòng): 1 đêm Mercure Bà Nà Hills + 1 đêm Đông Dương Đà Nẵng.</li>
                    <li>2 bữa sáng buffet tại khách sạn + 3 bữa chính set menu tại các nhà hàng nổi tiếng (Ngon Thị Hoa, Chic Chillax, Madam Lân).</li>
                    <li><strong>Đặc biệt: 2 bữa buffet thượng hạng (Beer Plaza Bà Nà + Buffet Hải sản Long Qiao TẶNG ½ TÔM HÙM NƯỚNG BƠ)</strong> + Bánh mì.</li>
                    <li>Xe du lịch máy lạnh đời mới chất lượng cao phục vụ theo suốt hành trình.</li>
                    <li>Hướng dẫn viên tiếng Thái / tiếng Anh chuyên nghiệp phục vụ đoàn.</li>
                    <li>Vé cáp treo Bà Nà Hills khứ hồi + Toàn bộ vé tham quan và vé thuyền thúng Rừng dừa theo chương trình.</li>
                    <li>Bảo hiểm du lịch quốc tế trọn gói theo quy định hiện hành của Luật Du lịch Việt Nam.</li>
                  </>
                ) : (
                  <>
                    <li>โรงแรมที่พักมาตรฐาน 4 ดาว (ห้องละ 2 ท่าน) ทุกคืนที่ระบุในโปรแกรม (Mercure Bana Hills 1N + Dong Duong 1N)</li>
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
  );
}
