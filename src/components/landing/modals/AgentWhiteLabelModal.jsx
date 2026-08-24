import React from 'react';
import { UserCheck, X, Link2, Copy, CheckCheck, ExternalLink } from 'lucide-react';

export default function AgentWhiteLabelModal({ isVi, isTh, agentConfig, setAgentConfig, agentMarginPercent, setAgentMarginPercent, clientShareUrl, handleCopyAgentLink, copiedAgentLink, onClose }) {
  return (
    <div className="modal-backdrop-smooth" style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="modal-card-smooth" style={{
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
            onClick={onClose}
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
                onClose();
              }}
              style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.825rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
            >
              {isVi ? '✕ Xóa cài đặt đại lý (về mặc định)' : '✕ ล้างการตั้งค่าตัวแทน'}
            </button>
          ) : <div />}
          <button
            onClick={onClose}
            style={{ padding: '0.65rem 1.5rem', borderRadius: '0.6rem', border: 'none', background: '#0f172a', color: '#ffffff', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer' }}
          >
            {isVi ? 'Áp Dụng Ngay' : 'ตกลง'}
          </button>
        </div>
      </div>
    </div>
  );
}
