import React from 'react';
import { Users, Search, Filter, ChevronDown } from 'lucide-react';
import { packageFilters, regionKeyMap, t } from '../constants';
import { regions } from '../../../data/tours';

export default function FilterBar({
  packageFilter,
  setPackageFilter,
  regionFilter,
  setRegionFilter,
  query,
  setQuery,
  sortMode,
  cycleSortMode,
  language,
  showNotice
}) {
  return (
    <>
      <div className="filters-grid">
        {/* Package Travel Style */}
        <div className="filter-block">
          <span>{t('travelStyle', language)}</span>
          <div className="segmented" aria-label="Package filter">
            {packageFilters.map((option) => (
              <button
                className={option === packageFilter ? 'is-active' : ''}
                key={option}
                type="button"
                onClick={() => setPackageFilter(option)}
              >
                <Users size={16} />
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div className="filter-block region-block">
          <span>{t('region', language)}</span>
          <div className="region-row" aria-label="Region filter">
            {[t('allRegions', language), ...regions].map((option) => {
              const isAll = option === t('allRegions', language);
              const value = isAll ? 'All' : option;
              const label = isAll ? option : t(regionKeyMap[option] || option, language);
              return (
                <button
                  className={value === regionFilter ? 'is-active' : ''}
                  key={option}
                  type="button"
                  onClick={() => setRegionFilter(value)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search and Sort Row */}
      <div className="search-row">
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            value={query}
            placeholder={t('searchPlaceholder', language)}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button
          className="utility-button"
          type="button"
          onClick={() => showNotice(`Active filters: ${packageFilter}, ${regionFilter}`)}
        >
          <Filter size={18} />
          {t('filters', language)}
        </button>
        <button className="sort-button" type="button" onClick={cycleSortMode}>
          <span>{t('sortBy', language)}</span>
          {sortMode}
          <ChevronDown size={15} />
        </button>
      </div>
    </>
  );
}
