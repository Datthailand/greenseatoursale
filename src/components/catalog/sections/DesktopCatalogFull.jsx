import React from 'react';
import { Search, Filter, MapPin, CalendarDays, Users, Building2, Columns2, Eye, Check } from 'lucide-react';
import FilterBar from './FilterBar';
import { formatMoney, getHotelStandard, t } from '../constants';

export default function DesktopCatalogFull({
  filteredTours,
  openTourTabs,
  onOpenTour,
  onOpenAndCompare,
  packageFilter,
  setPackageFilter,
  regionFilter,
  setRegionFilter,
  query,
  setQuery,
  sortMode,
  cycleSortMode,
  currency,
  language,
  hidePrice,
  resetFilters,
  showNotice
}) {
  const isOneTourOpen = openTourTabs.length === 1;

  return (
    <div className="desktop-catalog-full desktop-only">
      {/* Top Filter Bar */}
      <div className="desktop-catalog-filter-wrap">
        <FilterBar
          packageFilter={packageFilter}
          setPackageFilter={setPackageFilter}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          query={query}
          setQuery={setQuery}
          sortMode={sortMode}
          cycleSortMode={cycleSortMode}
          language={language}
          showNotice={showNotice}
        />
      </div>

      {/* Catalog Tours Grid */}
      <div className="desktop-catalog-grid">
        {filteredTours.map((tour) => {
          const isOpen = openTourTabs.includes(tour.id);

          return (
            <div key={tour.id} className={`desktop-grid-card ${isOpen ? 'is-opened' : ''}`}>
              <div className="desktop-grid-thumb">
                <img
                  src={tour.image || tour.thumb || tour.assets?.thumb || tour.assets?.cover}
                  alt={tour.title}
                  onError={(e) => {
                    if (tour.assets?.thumb || tour.assets?.cover) {
                      e.target.src = tour.assets.thumb || tour.assets.cover;
                    }
                  }}
                />
                <span className="desktop-grid-duration">
                  <CalendarDays size={13} />
                  {tour.duration} {t('days', language)} / {Math.max(tour.duration - 1, 1)} {t('nights', language)}
                </span>
                <span className={`desktop-grid-type ${tour.packageType.toLowerCase()}`}>
                  {tour.packageType}
                </span>
              </div>

              <div className="desktop-grid-body">
                <div className="desktop-grid-header">
                  <span className="desktop-grid-code">{tour.code}</span>
                  <h3 className="desktop-grid-title">{tour.title}</h3>
                </div>

                <div className="desktop-grid-route">
                  <MapPin size={14} />
                  <span>{tour.route}</span>
                </div>

                <div className="desktop-grid-chips">
                  <span>
                    <Users size={13} />
                    {tour.groupRange}
                  </span>
                  <span>
                    <Building2 size={13} />
                    {getHotelStandard(tour)}
                  </span>
                </div>

                <div className="desktop-grid-footer">
                  {!hidePrice ? (
                    <div className="desktop-grid-price">
                      <span className="price-label">{t('from', language)}</span>
                      <strong className="price-val">{formatMoney(tour.priceFrom, currency)}</strong>
                      <span className="price-sub">{t('perPerson', language)}</span>
                    </div>
                  ) : (
                    <div className="desktop-grid-price">
                      <span className="price-label">Green Sea Tour B2B</span>
                    </div>
                  )}

                  <div className="desktop-grid-actions">
                    {isOpen ? (
                      <button
                        type="button"
                        className="btn-grid-active"
                        onClick={() => onOpenTour(tour.id)}
                      >
                        <Check size={14} />
                        <span>{language === 'TH' ? 'ดูรายละเอียด' : 'Xem chi tiết'}</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn-grid-open"
                          onClick={() => onOpenTour(tour.id)}
                        >
                          <Eye size={14} />
                          <span>{language === 'TH' ? 'เปิดแท็บ' : 'Mở xem'}</span>
                        </button>

                        {isOneTourOpen && (
                          <button
                            type="button"
                            className="btn-grid-compare"
                            onClick={() => onOpenAndCompare(tour.id)}
                            title={language === 'TH' ? 'เปรียบเทียบกับทัวร์ที่เปิดอยู่' : 'Đối chiếu song song với tour đang mở'}
                          >
                            <Columns2 size={14} />
                            <span>{language === 'TH' ? 'เปรียบเทียบ' : 'Đối chiếu'}</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!filteredTours.length && (
        <div className="empty-state">
          <Search size={22} />
          <strong>{t('noMatching', language)}</strong>
          <span>{t('tryAnother', language)}</span>
          <button className="utility-button" type="button" onClick={resetFilters}>
            <Filter size={18} /> {t('resetFilters', language)}
          </button>
        </div>
      )}
    </div>
  );
}
