import React from 'react';
import { UserCheck, X, Copy, CheckCheck, ExternalLink } from 'lucide-react';

export default function AgentWhiteLabelModal({
  isVi,
  isTh,
  agentConfig = {},
  setAgentConfig,
  agentMarginPercent,
  setAgentMarginPercent,
  clientShareUrl,
  handleCopyAgentLink,
  copiedAgentLink,
  onClose
}) {
  return (
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
                {isVi ? 'Tạo Link Gửi Khách Theo Thông Tin Đại Lý' : isTh ? 'สร้างลิงก์ส่งลูกค้าตามแบรนด์เอเจนซี่' : 'Create Branded Client Link'}
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
              value={agentConfig.name || ''}
              onChange={(e) => setAgentConfig({ ...agentConfig, name: e.target.value, isAgent: true })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                {isVi ? '📞 Hotline:' : isTh ? '📞 เบอร์โทรศัพท์:' : 'Hotline:'}
              </label>
              <input
                type="text"
                placeholder={isVi ? '090-xxx-xxxx' : '08x-xxx-xxxx'}
                value={agentConfig.tel || ''}
                onChange={(e) => setAgentConfig({ ...agentConfig, tel: e.target.value, isAgent: true })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: '#334155', marginBottom: '0.35rem' }}>
                {isVi ? '💬 LINE ID:' : isTh ? '💬 LINE ID:' : 'LINE ID:'}
              </label>
              <input
                type="text"
                placeholder="@youragency"
                value={agentConfig.line || ''}
                onChange={(e) => setAgentConfig({ ...agentConfig, line: e.target.value, isAgent: true })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* Generated Branded URL */}
        <div style={{ background: '#f0fdf4', border: '1.5px dashed #86efac', borderRadius: '0.85rem', padding: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', marginBottom: '0.4rem' }}>
            {isVi ? '🔗 Link gửi khách hàng (Đã tự động ẩn giá NET):' : isTh ? '🔗 ลิงก์สำหรับส่งลูกค้า (ซ่อนราคา NET แล้ว):' : '🔗 Branded Client Link (NET Rates Hidden):'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857', wordBreak: 'break-all', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #bbf7d0', marginBottom: '0.75rem' }}>
            {clientShareUrl}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleCopyAgentLink}
              type="button"
              style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', background: copiedAgentLink ? '#059669' : '#00533d', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.825rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            >
              {copiedAgentLink ? <CheckCheck size={16} /> : <Copy size={16} />}
              <span>{copiedAgentLink ? (isVi ? 'Đã copy link!' : 'คัดลอกแล้ว!') : (isVi ? 'Sao chép link gửi khách' : 'คัดลอกลิงก์')}</span>
            </button>
            <a
              href={clientShareUrl}
              target="_blank"
              rel="noreferrer"
              style={{ padding: '0.6rem 0.85rem', borderRadius: '0.6rem', background: '#ffffff', border: '1.5px solid #059669', color: '#059669', textDecoration: 'none', fontWeight: 800, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ExternalLink size={15} />
              <span>{isVi ? 'Xem thử' : 'ดูตัวอย่าง'}</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => {
              setAgentConfig({ name: '', tel: '', line: '', isAgent: false });
              onClose();
            }}
            type="button"
            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
          >
            {isVi ? '✕ Xóa thông tin đại lý' : isTh ? '✕ ล้างข้อมูลตัวแทน' : '✕ Reset Agent Info'}
          </button>
          <button
            onClick={onClose}
            type="button"
            style={{ padding: '0.65rem 1.5rem', borderRadius: '0.75rem', background: '#00533d', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer' }}
          >
            {isVi ? 'Áp dụng ngay' : isTh ? 'บันทึกและใช้งาน' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
