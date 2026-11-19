import React from 'react';
import { OPTIONAL_ACTIVITIES } from '../constants';
import { X, Check } from 'lucide-react';

export default function AddonsModal({ isVi, isTh, selectedAddons = [], setSelectedAddons, onClose }) {
  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff', borderRadius: '1.5rem', width: '100%',
          maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto',
          padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.25rem' }}>
              {isVi ? 'Dịch Vụ Tham Quan & Nâng Cấp Ẩm Thực' : isTh ? 'บริการท่องเที่ยวเสริม & อัปเกรดอาหาร' : 'Optional Excursions & Dining Upgrades'}
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748b', margin: 0 }}>
              {isVi ? 'Tick chọn các dịch vụ để tự động cộng vào bảng tính giá đoàn B2B' : isTh ? 'คลิกเลือกเพื่อรวมในใบเสนอราคาและรายงานต้นทุน' : 'Select options to automatically include in quotation'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* List of Addons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {OPTIONAL_ACTIVITIES.map(activity => {
            const isSelected = selectedAddons.includes(activity.id);
            return (
              <div
                key={activity.id}
                onClick={() => toggleAddon(activity.id)}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  border: isSelected ? '2px solid #00533d' : '1px solid #e2e8f0',
                  background: isSelected ? '#f0fdf4' : '#f8fafc',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>
                    {isVi ? activity.nameVi : isTh ? activity.nameTh : activity.nameEn}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {isVi ? activity.descVi : isTh ? activity.descTh : activity.descEn}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0, marginLeft: '1rem' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#00533d' }}>
                    +${activity.priceUsd}
                  </div>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px',
                    border: isSelected ? 'none' : '2px solid #cbd5e1',
                    background: isSelected ? '#00533d' : '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff'
                  }}>
                    {isSelected && <Check size={16} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          type="button"
          style={{
            width: '100%', padding: '0.85rem', borderRadius: '0.85rem',
            background: '#00533d', color: '#ffffff', fontWeight: 900,
            fontSize: '0.95rem', border: 'none', cursor: 'pointer'
          }}
        >
          {isVi ? 'Hoàn tất' : isTh ? 'เรียบร้อย' : 'Done'}
        </button>
      </div>
    </div>
  );
}
