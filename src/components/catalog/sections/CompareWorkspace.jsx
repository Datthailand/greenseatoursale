import React from 'react';
import { Columns2, Square, ArrowLeftRight, X } from 'lucide-react';
import DetailPanel from '../detail/DetailPanel';
import { t } from '../constants';

export default function CompareWorkspace({
  tour1,
  tour2,
  allTours,
  onSelectTour1,
  onSelectTour2,
  onCloseTour,
  onExitCompare,
  currency,
  language,
  hidePrice,
  hideMeals,
  hidePdf,
  onOpenLanding
}) {
  return (
    <div className="compare-workspace desktop-only">
      {/* Top Banner / Actions for Side-by-side Mode */}
      <div className="compare-header-bar">
        <div className="compare-header-title">
          <div className="compare-badge">
            <Columns2 size={16} />
            <span>{language === 'TH' ? 'โหมดเปรียบเทียบ 2 ทัวร์พร้อมกัน' : 'Chế độ đối chiếu 2 tour song song'}</span>
          </div>
          <span className="compare-header-hint">
            {language === 'TH'
              ? 'เลื่อนดูราคา pax, โรงแรม, และโปรแกรมวันต่อวันของทั้ง 2 ทัวร์เพื่อตัดสินใจ'
              : 'Cuộn đối chiếu chi tiết bảng giá pax, tiêu chuẩn phòng và lịch trình từng ngày'}
          </span>
        </div>

        <button
          type="button"
          className="compare-exit-btn"
          onClick={onExitCompare}
          title={language === 'TH' ? 'กลับไปดูทีละทัวร์' : 'Quay lại xem từng tour'}
        >
          <Square size={14} />
          <span>{language === 'TH' ? 'กลับไปดูทีละทัวร์' : 'Xem từng tour'}</span>
        </button>
      </div>

      {/* Side-by-side Dual Column Workspace */}
      <div className="compare-grid">
        {/* Column 1 */}
        <div className="compare-col">
          <div className="compare-col-header">
            <div className="compare-col-tag col-tag-1">
              <span>{language === 'TH' ? 'ทัวร์ 1' : 'Tour 1'}</span>
              <strong>{tour1?.code}</strong>
            </div>
            <select
              className="compare-tour-switcher"
              value={tour1?.id || ''}
              onChange={(e) => onSelectTour1(e.target.value)}
              aria-label="Switch Tour 1"
            >
              {allTours.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === tour2?.id}>
                  {t.code} - {t.title} ({t.duration}D)
                </option>
              ))}
            </select>
            {tour1 && (
              <button
                type="button"
                className="compare-col-close"
                onClick={() => onCloseTour(tour1.id)}
                title={language === 'TH' ? 'ปิดทัวร์นี้' : 'Đóng tour này'}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="compare-col-body">
            {tour1 ? (
              <DetailPanel
                tour={tour1}
                currency={currency}
                language={language}
                onClose={() => onCloseTour(tour1.id)}
                onSave={() => {}}
                onReset={() => {}}
                onOpenLanding={onOpenLanding}
                hidePrice={hidePrice}
                hideMeals={hideMeals}
                hidePdf={hidePdf}
              />
            ) : (
              <div className="compare-empty-col">
                <p>{language === 'TH' ? 'โปรดเลือกทัวร์ 1' : 'Vui lòng chọn Tour 1'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Column 2 */}
        <div className="compare-col">
          <div className="compare-col-header">
            <div className="compare-col-tag col-tag-2">
              <span>{language === 'TH' ? 'ทัวร์ 2' : 'Tour 2'}</span>
              <strong>{tour2?.code}</strong>
            </div>
            <select
              className="compare-tour-switcher"
              value={tour2?.id || ''}
              onChange={(e) => onSelectTour2(e.target.value)}
              aria-label="Switch Tour 2"
            >
              {allTours.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === tour1?.id}>
                  {t.code} - {t.title} ({t.duration}D)
                </option>
              ))}
            </select>
            {tour2 && (
              <button
                type="button"
                className="compare-col-close"
                onClick={() => onCloseTour(tour2.id)}
                title={language === 'TH' ? 'ปิดทัวร์นี้' : 'Đóng tour này'}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="compare-col-body">
            {tour2 ? (
              <DetailPanel
                tour={tour2}
                currency={currency}
                language={language}
                onClose={() => onCloseTour(tour2.id)}
                onSave={() => {}}
                onReset={() => {}}
                onOpenLanding={onOpenLanding}
                hidePrice={hidePrice}
                hideMeals={hideMeals}
                hidePdf={hidePdf}
              />
            ) : (
              <div className="compare-empty-col">
                <p>{language === 'TH' ? 'โปรดเลือกทัวร์ 2' : 'Vui lòng chọn Tour 2'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
