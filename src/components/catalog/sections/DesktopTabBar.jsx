import React from 'react';
import { LayoutGrid, X, Columns2, Square, ArrowLeftRight, Check } from 'lucide-react';
import { t } from '../constants';

export default function DesktopTabBar({
  openTourTabs,
  activeTab,
  setActiveTab,
  onCloseTab,
  language,
  onToggleCompare,
  allTours
}) {
  const isCompare = activeTab === 'compare';
  const hasTwoTours = openTourTabs.length === 2;

  return (
    <div className="desktop-tab-bar desktop-only" role="tablist" aria-label="Tour workspaces">
      <div className="desktop-tabs-left">
        {/* Pinned Tab 1: Catalog Overview */}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'catalog'}
          className={`desktop-tab-item ${activeTab === 'catalog' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('catalog')}
          title={language === 'TH' ? 'ดูรายการทัวร์ทั้งหมด' : 'View all tours catalog'}
        >
          <LayoutGrid size={15} />
          <span>{language === 'TH' ? 'รายการทัวร์ทั้งหมด' : 'All Tours'}</span>
        </button>

        {/* Dynamic Tour Tabs (Max 2) */}
        {openTourTabs.map((tourId, idx) => {
          const tour = allTours.find(t => t.id === tourId);
          if (!tour) return null;
          const isActive = activeTab === tourId && !isCompare;
          const durationText = `${tour.duration} ${t('days', language)} / ${Math.max(tour.duration - 1, 1)} ${t('nights', language)}`;

          return (
            <div
              key={tourId}
              role="tab"
              aria-selected={isActive}
              className={`desktop-tab-item tour-tab ${isActive ? 'is-active' : ''} ${isCompare ? 'is-comparing' : ''}`}
              onClick={() => setActiveTab(tourId)}
              title={`${tour.code}: ${tour.title}`}
            >
              <span className="tab-tour-code">{tour.code}</span>
              <span className="tab-tour-title">{tour.title}</span>
              <span className="tab-tour-duration">{durationText}</span>
              <button
                type="button"
                className="tab-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tourId, e);
                }}
                title={language === 'TH' ? 'ปิดแท็บนี้' : 'Close tab'}
                aria-label={`Close ${tour.code}`}
              >
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="desktop-tabs-right">
        {/* Side-by-side Compare Toggle (When 2 tours are open) */}
        {hasTwoTours && (
          <button
            type="button"
            className={`desktop-compare-btn ${isCompare ? 'is-active' : ''}`}
            onClick={onToggleCompare}
            title={
              isCompare
                ? (language === 'TH' ? 'กลับไปดูทีละทัวร์' : 'Switch back to single tour view')
                : (language === 'TH' ? 'เปรียบเทียบ 2 ทัวร์นี้พร้อมกัน' : 'Compare these 2 tours side-by-side')
            }
          >
            {isCompare ? (
              <>
                <Square size={14} />
                <span>{language === 'TH' ? 'ดูทีละทัวร์' : (language === 'EN' ? 'Single View' : 'Xem từng tour')}</span>
              </>
            ) : (
              <>
                <Columns2 size={15} />
                <span>{language === 'TH' ? 'เปรียบเทียบ 2 ทัวร์' : (language === 'EN' ? 'Compare 2 Tours' : 'So sánh 2 tour')}</span>
              </>
            )}
          </button>
        )}

        {/* Max 2 Badge Indicator */}
        <span className="tab-limit-pill" title="Mở tối đa 2 tour cùng lúc để đối chiếu">
          {openTourTabs.length}/2 {language === 'TH' ? 'ทัวร์เปิดอยู่' : 'Tours open'}
        </span>
      </div>
    </div>
  );
}
