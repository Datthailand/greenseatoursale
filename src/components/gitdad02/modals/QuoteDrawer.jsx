import React from 'react';
import { Send, X, Check, Phone, MessageSquare, Building2, Calendar, Users, Bus, FileText } from 'lucide-react';
import { ThailandFlag } from '../../landing/ui/Flags';

export default function QuoteDrawer({
  isVi,
  isTh,
  currency,
  showQuoteModal,
  setShowQuoteModal,
  calculation,
  selectedBand,
  paxCount,
  singleRooms,
  formatPrice,
  agentConfig = {},
  agentForm = {},
  setAgentForm,
  submitted,
  setSubmitted
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Floating Action Bubble */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 90 }}>
        <button
          onClick={() => setShowQuoteModal(true)}
          type="button"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.85rem 1.45rem', borderRadius: '9999px',
            background: 'linear-gradient(135deg, #00533d 0%, #006f52 100%)',
            color: '#ffffff', fontWeight: 900, fontSize: '0.95rem',
            boxShadow: '0 10px 25px -5px rgba(0, 83, 61, 0.45)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            cursor: 'pointer', transition: 'all 0.2s ease'
          }}
        >
          <Send size={18} />
          <span>{isVi ? 'Báo Giá Đoàn B2B' : isTh ? 'ขอใบเสนอราคากรุ๊ป' : 'Request Group Quote'}</span>
        </button>
      </div>

      {/* Slide-over Drawer Backdrop */}
      {showQuoteModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)',
            display: 'flex', justifyContent: 'flex-end'
          }}
          onClick={() => setShowQuoteModal(false)}
        >
          {/* Drawer Panel */}
          <div
            style={{
              width: '100%', maxWidth: '480px', height: '100%',
              background: '#ffffff', boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.15)',
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ padding: '1.5rem', background: '#00533d', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, color: '#a7f3d0', marginBottom: '0.5rem' }}>
                  <ThailandFlag width={14} height={10} />
                  <span>{isVi ? 'DÀNH RIÊNG CHO ĐẠI LÝ THÁI LAN' : isTh ? 'สำหรับเอเจนซี่ไทยโดยเฉพาะ' : 'FOR THAI AGENCIES'}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif" }}>
                  {isVi ? 'Gửi Yêu Cầu Báo Giá Đoàn GIT' : isTh ? 'ขอใบเสนอราคาด่วนสำหรับกรุ๊ปเหมา' : 'Request Group Incentive Quote'}
                </h3>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                style={{ background: 'rgba(255, 255, 255, 0.15)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quote Summary Strip */}
            <div style={{ background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '1rem 1.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: '#166534', fontWeight: 700 }}>{isVi ? 'Tour:' : isTh ? 'ทัวร์:' : 'Tour:'}</span>
                <strong style={{ color: '#0f172a' }}>GITDAD02 (3N2Đ Mercure Bà Nà)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: '#166534', fontWeight: 700 }}>{isVi ? 'Số lượng:' : isTh ? 'จำนวน:' : 'Group:'}</span>
                <strong style={{ color: '#0f172a' }}>{paxCount} {isVi ? 'khách' : isTh ? 'ท่าน' : 'pax'} ({isVi ? selectedBand.vehicle : isTh ? selectedBand.vehicleTh : selectedBand.vehicleEn})</strong>
              </div>
              {singleRooms > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#166534', fontWeight: 700 }}>{isVi ? 'Phòng đơn:' : isTh ? 'ห้องเดี่ยว:' : 'Single Room:'}</span>
                  <strong style={{ color: '#b91c1c' }}>{singleRooms} {isVi ? 'phòng' : isTh ? 'ห้อง' : 'rooms'} (+${singleRooms * (calculation.singleSupp || 65)})</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #86efac', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                <span style={{ color: '#166534', fontWeight: 800 }}>{isVi ? 'Tổng tiền NET ước tính:' : isTh ? 'ยอด NET ประมาณการ:' : 'Estimated Total NET:'}</span>
                <strong style={{ color: '#00533d', fontSize: '1.05rem' }}>{formatPrice(calculation.totalNetGroup || calculation.totalNetUsd)}</strong>
              </div>
            </div>

            {/* Form Body */}
            <div style={{ padding: '1.5rem', flex: 1 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '2px solid #a7f3d0' }}>
                    <Check size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem' }}>
                    {isVi ? 'Đã Nhận Yêu Cầu Của Quý Đại Lý!' : isTh ? 'ได้รับข้อมูลเรียบร้อยแล้ว!' : 'Quotation Request Received!'}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                    {isVi 
                      ? 'Đội ngũ điều hành Green Sea Tour sẽ kiểm tra phòng khách sạn và gửi bảng báo giá NET chi tiết qua LINE / WhatsApp trong khoảng 15 phút.'
                      : isTh 
                        ? 'ทีมงานกรีนซีทัวร์จะเช็คห้องพักและส่งใบเสนอราคา NET ละเอียดทาง LINE / WhatsApp ภายใน 15 นาที'
                        : 'Our operations team will confirm availability and reply via LINE/WhatsApp within 15 minutes.'}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setShowQuoteModal(false); }}
                    type="button"
                    style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', background: '#00533d', color: '#ffffff', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                  >
                    {isVi ? 'Hoàn tất' : isTh ? 'เรียบร้อย' : 'Done'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                      🏢 {isVi ? 'Tên Công Ty / Đại Lý Du Lịch (*):' : isTh ? 'ชื่อบริษัทตัวแทนท่องเที่ยว (*):' : 'Travel Agency Name (*):'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isVi ? 'Ví dụ: Bangkok Holiday Travel' : 'เช่น Bangkok Holiday Travel'}
                      value={agentForm.agencyName || ''}
                      onChange={(e) => setAgentForm({ ...agentForm, agencyName: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                        💬 {isVi ? 'LINE ID (*):' : isTh ? 'LINE ID (*):' : 'LINE ID (*):'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="@lineid"
                        value={agentForm.lineId || ''}
                        onChange={(e) => setAgentForm({ ...agentForm, lineId: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                        📞 {isVi ? 'Hotline / WhatsApp:' : isTh ? 'เบอร์โทรศัพท์:' : 'Phone / WhatsApp:'}
                      </label>
                      <input
                        type="text"
                        placeholder="+66 8x-xxx-xxxx"
                        value={agentForm.phone || ''}
                        onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                      📅 {isVi ? 'Ngày Khởi Hành Dự Kiến:' : isTh ? 'วันเดินทางที่คาดการณ์:' : 'Expected Travel Date:'}
                    </label>
                    <input
                      type="date"
                      value={agentForm.travelDate || ''}
                      onChange={(e) => setAgentForm({ ...agentForm, travelDate: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                      📝 {isVi ? 'Ghi Chú Thêm (Chuyến bay, yêu cầu ăn kiêng...):' : isTh ? 'ข้อกำหนดเพิ่มเติม (ไฟล์ทบิน, อาหารพิเศษ...):' : 'Special Notes (Flight, Dietary...):'}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={isVi ? 'Nhập thông tin chuyến bay hoặc yêu cầu đặc biệt của đoàn...' : 'ระบุเที่ยวบินหรือความต้องการพิเศษของกรุ๊ป...'}
                      value={agentForm.notes || ''}
                      onChange={(e) => setAgentForm({ ...agentForm, notes: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%', padding: '0.95rem', borderRadius: '0.85rem',
                      background: '#00533d', color: '#ffffff', fontWeight: 900,
                      fontSize: '1rem', border: 'none', cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0, 83, 61, 0.35)',
                      marginTop: '0.5rem'
                    }}
                  >
                    {isVi ? 'Gửi Yêu Cầu Báo Giá B2B' : isTh ? 'ส่งคำขอใบเสนอราคา B2B' : 'Request B2B Quotation'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
