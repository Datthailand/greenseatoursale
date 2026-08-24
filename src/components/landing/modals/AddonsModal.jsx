import React from 'react';
import { OPTIONAL_ACTIVITIES } from '../constants';
import { X, Check, Trash2 } from 'lucide-react';

export default function AddonsModal({ isVi, isTh, selectedAddons, setSelectedAddons, onClose }) {
  return (
    <div
      className="modal-backdrop-smooth"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="modal-card-smooth"
        style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>
              {isVi ? 'Dịch Vụ Tham Quan Mở Rộng' : isTh ? 'เลือกบริการท่องเที่ยวเสริม (Option เสริม)' : 'Optional Excursions & Add-on Tours'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              {isVi ? 'Tick chọn các dịch vụ để tự động tính vào bảng giá B2B' : isTh ? 'คลิกเลือกเพื่อรวมในใบเสนอราคาและรายงานต้นทุน' : 'Select add-on services to include in B2B quotation'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Activities List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
          {OPTIONAL_ACTIVITIES.map(activity => {
            const isSelected = selectedAddons.includes(activity.id);
            return (
              <div
                key={activity.id}
                onClick={() => {
                  setSelectedAddons(prev => 
                    isSelected ? prev.filter(id => id !== activity.id) : [...prev, activity.id]
                  );
                }}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  border: isSelected ? '2px solid #059669' : '1px solid #e2e8f0',
                  background: isSelected ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid #059669' : '2px solid #cbd5e1',
                    background: isSelected ? '#059669' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isSelected && <Check size={14} color="#ffffff" strokeWidth={3} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                      {isVi ? activity.nameVi : isTh ? activity.nameTh : activity.nameEn}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {isVi ? activity.descVi : isTh ? activity.descTh : activity.descEn}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#059669' }}>
                    +${activity.priceUsd}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {isVi ? '/ khách' : isTh ? '/ ท่าน' : '/ pax'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <button
            onClick={() => setSelectedAddons([])}
            style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Trash2 size={14} />
            {isVi ? 'Bỏ chọn tất cả' : isTh ? 'ล้างการเลือกทั้งหมด' : 'Clear all'}
          </button>

          <button
            onClick={onClose}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.65rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            {isVi ? `Xác nhận (${selectedAddons.length} dịch vụ)` : isTh ? `ยืนยัน (${selectedAddons.length} รายการ)` : `Done (${selectedAddons.length} items)`}
          </button>
        </div>
      </div>
    </div>
  );
}
