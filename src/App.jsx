import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  Filter,
  Globe2,
  Languages,
  MapPin,
  PlaneTakeoff,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react';
import { regions, tours } from './data/tours.js';
import { pdfExtracts } from './data/pdfExtracts.js';

const packageFilters = ['All', 'FIT', 'GIT'];
const sortModes = ['Popular', 'Price Low', 'Duration'];

const EXCHANGE_RATE = 35; // 1 USD = 35 THB

const translations = {
  EN: {
    travelStyle: 'Travel Style',
    region: 'Region',
    allRegions: 'All Regions',
    searchPlaceholder: 'Search by tour code, route, destination, keyword...',
    filters: 'Filters',
    sortBy: 'Sort by',
    from: 'From',
    perPerson: 'per person',
    days: 'Days',
    nights: 'Nights',
    groupSize: 'Group Size:',
    hotelStandard: 'Hotel Standard:',
    dailyDeparture: 'Daily Departure',
    viewPdf: 'View PDF',
    copyQuote: 'Copy Quote Notes',
    itineraryOverview: 'Itinerary Overview',
    originalProgram: 'Tour Program from PDF',
    originalPriceTerms: 'Price / Terms from PDF',
    sourcePdf: 'Source PDF Text',
    showSource: 'Show Source Text',
    hideSource: 'Hide Source Text',
    sourceLoading: 'Loading source text...',
    sourceUnavailable: 'PDF source text is not available for this tour.',
    sourceError: 'Could not load PDF source text.',
    inclusions: 'Inclusions',
    exclusions: 'Exclusions',
    cancellationPolicy: 'Cancellation Policy',
    paymentTerms: 'Payment Terms',
    page: 'Page',
    noMatching: 'No matching tour',
    tryAnother: 'Try another code, region, or package filter.',
    resetFilters: 'Reset Filters',
    priceGrid: 'Price Grid Preview',
    season: 'Season',
    single: 'Single',
    tagline: 'Travel - Experience - Memories',
    day: 'Day',
    meals: 'Meals',
    overnight: 'Overnight',
    notAvailable: 'N/A',
    note: 'Note',
    noCharge: 'No charge',
    bookingDeposit: 'Booking deposit',
    finalPayment: 'Final payment',
    paymentMethods: 'Payment methods',
    bankTransfer: 'Bank Transfer',
    lunch: 'Lunch',
    dinner: 'Dinner',
    childRates: 'Child Rates',
    vehicleInfo: 'Vehicle / Upgrade',
  },
  TH: {
    travelStyle: 'รูปแบบการเดินทาง',
    region: 'ภูมิภาค',
    allRegions: 'ทุกภูมิภาค',
    searchPlaceholder: 'ค้นหาด้วยรหัสทัวร์, เส้นทาง, จุดหมาย...',
    filters: 'ตัวกรอง',
    sortBy: 'เรียงตาม',
    from: 'จาก',
    perPerson: 'ต่อคน',
    days: 'วัน',
    nights: 'คืน',
    groupSize: 'ขนาดกลุ่ม:',
    hotelStandard: 'มาตรฐานโรงแรม:',
    dailyDeparture: 'ออกเดินทางทุกวัน',
    viewPdf: 'ดู PDF',
    copyQuote: 'คัดลอกใบเสนอราคา',
    itineraryOverview: 'รายละเอียดการเดินทาง',
    originalProgram: 'โปรแกรมทัวร์จาก PDF',
    originalPriceTerms: 'ราคา / เงื่อนไขจาก PDF',
    sourcePdf: 'ข้อความต้นฉบับจาก PDF',
    showSource: 'แสดงข้อความต้นฉบับ',
    hideSource: 'ซ่อนข้อความต้นฉบับ',
    sourceLoading: 'กำลังโหลดข้อความต้นฉบับ...',
    sourceUnavailable: 'ไม่มีข้อความต้นฉบับ PDF สำหรับทัวร์นี้',
    sourceError: 'ไม่สามารถโหลดข้อความต้นฉบับ PDF ได้',
    inclusions: 'รวม',
    exclusions: 'ไม่รวม',
    cancellationPolicy: 'นโยบายยกเลิก',
    paymentTerms: 'เงื่อนไขการชำระเงิน',
    page: 'หน้า',
    noMatching: 'ไม่พบทัวร์ที่ตรงกัน',
    tryAnother: 'ลองค้นหาด้วยรหัส, ภูมิภาค หรือตัวกรองอื่น',
    resetFilters: 'รีเซ็ตตัวกรอง',
    priceGrid: 'ตารางราคา',
    season: 'ฤดูกาล',
    single: 'เดี่ยว',
    tagline: 'ท่องเที่ยว - ประสบการณ์ - ความทรงจำ',
    day: 'วันที่',
    meals: 'มื้ออาหาร',
    overnight: 'พักค้างคืน',
    notAvailable: 'ไม่มี',
    note: 'หมายเหตุ',
    noCharge: 'ไม่มีค่าใช้จ่าย',
    bookingDeposit: 'เงินมัดจำ',
    finalPayment: 'ชำระส่วนที่เหลือ',
    paymentMethods: 'วิธีชำระเงิน',
    bankTransfer: 'โอนเงินผ่านธนาคาร',
    lunch: 'มื้อเที่ยง',
    dinner: 'มื้อเย็น',
    childRates: 'ราคาสำหรับเด็ก',
    vehicleInfo: 'ประเภทรถ / อัปเกรดรถ',
  },
};

function t(key, language) {
  return translations[language]?.[key] || translations.EN[key] || key;
}

function formatMoney(value, currency) {
  if (currency === 'THB') {
    return `${Math.round(value * EXCHANGE_RATE).toLocaleString()} ฿`;
  }
  return `$${value.toLocaleString()}`;
}

function getHotelStandard(tour) {
  if (tour.hotel.includes('5*')) return '5* Standard';
  if (tour.hotel.includes('3*') && tour.hotel.includes('4*')) return '3* / 4* Standard';
  if (tour.hotel.includes('4*')) return '4* Standard';
  if (tour.hotel.includes('3*')) return '3* Standard';
  return 'Standard';
}

function getMeals(day, duration) {
  if (day === 1) return 'L, D';
  if (day === duration) return 'B';
  return 'B, L, D';
}

function getQuoteText(tour, currency) {
  const bestRow = tour.priceRows.reduce((winner, row) => {
    const rowMin = Math.min(...row.cells.map((cell) => cell.value));
    const winnerMin = Math.min(...winner.cells.map((cell) => cell.value));
    return rowMin < winnerMin ? row : winner;
  }, tour.priceRows[0]);
  const bestCell = bestRow.cells.reduce((winner, cell) => (cell.value < winner.value ? cell : winner), bestRow.cells[0]);

  return [
    `${tour.code} - ${tour.title}`,
    `Package: ${tour.packageType} | Region: ${tour.region} | Duration: ${tour.duration} days`,
    `Route: ${tour.route}`,
    `Price from: ${formatMoney(tour.priceFrom, currency)}/pax (${bestCell.band} pax, ${bestRow.season})`,
    `Single supplement: ${bestRow.single}`,
    `Hotel: ${tour.hotel}`,
    `Vehicle: ${tour.vehicle}`,
    `Source: ${tour.assets.label}, ${tour.sourcePages}`,
  ].join('\n');
}

function App() {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');
  const [packageFilter, setPackageFilter] = useState('FIT');
  const [regionFilter, setRegionFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('Popular');
  const [selectedId, setSelectedId] = useState(tours[0].id);
  const [notice, setNotice] = useState('');
  const detailRef = useRef(null);

  const handleSelectTour = (id) => {
    setSelectedId(id);
    setTimeout(() => {
      if (window.innerWidth <= 1240 && detailRef.current) {
        detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const filteredTours = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = tours.filter((tour) => {
      const matchesPackage = packageFilter === 'All' || tour.packageType === packageFilter;
      const matchesRegion = regionFilter === 'All' || tour.region === regionFilter;
      const haystack = `${tour.code} ${tour.title} ${tour.route} ${tour.region} ${tour.packageType}`.toLowerCase();
      return matchesPackage && matchesRegion && (!normalized || haystack.includes(normalized));
    });

    return [...matches].sort((a, b) => {
      if (sortMode === 'Price Low') return a.priceFrom - b.priceFrom;
      if (sortMode === 'Duration') return a.duration - b.duration || a.priceFrom - b.priceFrom;
      return tours.findIndex((tour) => tour.id === a.id) - tours.findIndex((tour) => tour.id === b.id);
    });
  }, [packageFilter, query, regionFilter, sortMode]);

  useEffect(() => {
    if (filteredTours.length && !filteredTours.some((tour) => tour.id === selectedId)) {
      setSelectedId(filteredTours[0].id);
    }
  }, [filteredTours, selectedId]);

  useEffect(() => {
    if (!notice) return undefined;
    const id = window.setTimeout(() => setNotice(''), 2200);
    return () => window.clearTimeout(id);
  }, [notice]);

  const selectedTour = filteredTours.find((tour) => tour.id === selectedId) || filteredTours[0] || null;

  async function copyQuote(tour) {
    try {
      await navigator.clipboard.writeText(getQuoteText(tour, currency));
      setNotice(`Copied quote notes for ${tour.code}`);
    } catch {
      setNotice('Copy failed. Browser blocked clipboard access.');
    }
  }

  function showNotice(message) {
    setNotice(message);
  }

  function resetFilters() {
    setPackageFilter('All');
    setRegionFilter('All');
    setQuery('');
    setNotice('Filters cleared');
  }

  function cycleSortMode() {
    const nextMode = sortModes[(sortModes.indexOf(sortMode) + 1) % sortModes.length];
    setSortMode(nextMode);
    setNotice(`Sorted by ${nextMode}`);
  }

  function cycleCurrency() {
    const nextCurrency = currency === 'USD' ? 'THB' : 'USD';
    setCurrency(nextCurrency);
    setNotice(`Currency display set to ${nextCurrency}`);
  }

  function cycleLanguage() {
    const nextLanguage = language === 'EN' ? 'TH' : 'EN';
    setLanguage(nextLanguage);
    setNotice(`Language preference set to ${nextLanguage}`);
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <img src="/assets/logo.jpg" alt="Green Sea Tour Logo" className="brand-logo" />
          <div>
            <strong>GREEN SEA TOUR</strong>
            <span>{t('tagline', language)}</span>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="select-button" type="button" onClick={cycleCurrency}>
            {currency}
            <ChevronDown size={15} />
          </button>
          <button className="icon-button" type="button" aria-label="Language" onClick={cycleLanguage}>
            <Globe2 size={18} />
            {language}
            <ChevronDown size={14} />
          </button>


        </div>
      </header>

      <main className="workspace">
        <section className="catalog-panel">
          <div className="filters-grid">
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
                    {option === 'All' ? <Globe2 size={16} /> : <Users size={16} />}
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block region-block">
              <span>{t('region', language)}</span>
              <div className="region-row" aria-label="Region filter">
                {[t('allRegions', language), ...regions].map((option) => {
                  const value = option === t('allRegions', language) ? 'All' : option;
                  return (
                    <button
                      className={value === regionFilter ? 'is-active' : ''}
                      key={option}
                      type="button"
                      onClick={() => setRegionFilter(value)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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
            <button className="utility-button" type="button" onClick={() => showNotice(`Active filters: ${packageFilter}, ${regionFilter}`)}>
              <Filter size={18} />
              {t('filters', language)}
            </button>
            <button className="sort-button" type="button" onClick={cycleSortMode}>
              <span>{t('sortBy', language)}</span>
              {sortMode}
              <ChevronDown size={15} />
            </button>
          </div>

          <div className="tour-list">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                currency={currency}
                language={language}
                active={tour.id === selectedTour?.id}
                onSelect={() => handleSelectTour(tour.id)}
              />
            ))}
            {!filteredTours.length && (
              <div className="empty-state">
                <Search size={22} />
                <strong>{t('noMatching', language)}</strong>
                <span>{t('tryAnother', language)}</span>
                <button
                  className="utility-button"
                  type="button"
                  onClick={() => {
                    setPackageFilter('All');
                    setRegionFilter('All');
                    setQuery('');
                    setNotice('Filters cleared');
                  }}
                >
                  <Filter size={18} /> {t('resetFilters', language)}
                </button>
              </div>
            )}
          </div>
        </section>

        {selectedTour ? (
          <DetailPanel
            tour={selectedTour}
            currency={currency}
            language={language}
            onCopy={() => copyQuote(selectedTour)}
            onClose={() => showNotice('Detail panel stays open on desktop')}
            onSave={() => showNotice(`Saved ${selectedTour.code} to shortlist`)}
            onReset={resetFilters}
            containerRef={detailRef}
          />
        ) : (
          <section className="detail-panel detail-empty" ref={detailRef}>
            <div className="empty-state">
              <Search size={22} />
              <strong>{t('noMatching', language)}</strong>
              <span>{t('tryAnother', language)}</span>
              <button className="utility-button" type="button" onClick={resetFilters}>
                <Filter size={18} /> {t('resetFilters', language)}
              </button>
            </div>
          </section>
        )}
      </main>

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

function TourCard({ tour, active, onSelect, currency, language }) {
  return (
    <button className={`tour-card ${active ? 'is-active' : ''}`} type="button" onClick={onSelect}>
      <img src={tour.assets.thumb || tour.assets.cover} alt="" />
      <div className="tour-card-body">
        <div className="tour-card-title-row">
          <div>
            <strong>{tour.code}</strong>
            <h2>{tour.title}</h2>
          </div>
          <div className="card-price">
            <span>{t('from', language)}</span>
            <strong>{formatMoney(tour.priceFrom, currency)}</strong>
            <small>{t('perPerson', language)}</small>
          </div>
        </div>
        <div className="route-line">
          <MapPin size={15} />
          {tour.route}
        </div>
        <div className="card-facts">
          <span>
            <CalendarDays size={14} />
            {tour.duration} {t('days', language)} / {Math.max(tour.duration - 1, 1)} {t('nights', language)}
          </span>
          <span>
            <Users size={14} />
            {tour.groupRange}
          </span>
          <span>
            <Building2 size={14} />
            {getHotelStandard(tour)}
          </span>
          <span>
            <PlaneTakeoff size={14} />
            {t('dailyDeparture', language)}
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ tour, onCopy, onClose, onSave, currency, language, containerRef }) {
  const [showPdfSource, setShowPdfSource] = useState(false);
  const pdfSource = pdfExtracts[tour.code] || null;
  const inclusions = language === 'TH' && tour.inclusionsTh ? tour.inclusionsTh : tour.inclusions;
  const exclusions = language === 'TH' && tour.exclusionsTh ? tour.exclusionsTh : tour.exclusions;
  const childRates = language === 'TH' && tour.childRatesTh ? tour.childRatesTh : tour.childRates;
  const paymentRows = language === 'TH' && tour.paymentTermsTh ? tour.paymentTermsTh : tour.paymentTermsRows;
  const cancellationRows = language === 'TH' && tour.cancellationPolicyTh ? tour.cancellationPolicyTh : tour.cancellationRows;

  useEffect(() => {
    setShowPdfSource(false);
  }, [tour.code]);

  return (
    <section className="detail-panel" ref={containerRef}>
      <button className="close-button" type="button" aria-label="Close detail" onClick={onClose}>
        <X size={22} />
      </button>

      <div className="detail-header">
        <div className="detail-title">
          <div className="detail-code">
            <strong>{tour.code}</strong>
            <span className={`package-chip ${tour.packageType.toLowerCase()}`}>{tour.packageType}</span>
          </div>
          <h1>{tour.title}</h1>
          <div className="detail-meta">
            <span>
              <CalendarDays size={15} />
              {tour.duration} {t('days', language)} / {Math.max(tour.duration - 1, 1)} {t('nights', language)}
            </span>
            <span>
              <MapPin size={15} />
              {tour.route}
            </span>
            <span>
              <PlaneTakeoff size={15} />
              {t('dailyDeparture', language)}
            </span>
          </div>
          <div className="detail-facts-line">
            <span>
              <strong>{t('groupSize', language)}</strong> {tour.groupRange}
            </span>
            <span>
              <strong>{t('hotelStandard', language)}</strong> {getHotelStandard(tour)}
            </span>
          </div>
        </div>

        <div className="detail-price">
          <span>{t('from', language)}</span>
          <strong>{formatMoney(tour.priceFrom, currency)}</strong>
          <small>{t('perPerson', language)}</small>
        </div>
      </div>

      <div className="detail-actions">
        <a className="primary-button" href={tour.assets.pdf} target="_blank" rel="noreferrer">
          <ExternalLink size={17} />
          {t('viewPdf', language)}
        </a>
        <button className="ghost-link" type="button" onClick={onCopy}>
          <Copy size={17} />
          {t('copyQuote', language)}
        </button>
        <button className="star-button" type="button" aria-label="Save tour" onClick={onSave}>
          <Star size={18} />
        </button>
      </div>

      <div className="detail-divider" />

      <section className="detail-section">
        <h3>{t('itineraryOverview', language)}</h3>
        <ItineraryTable tour={tour} language={language} />
      </section>

      <section className="detail-section">
        <PricePreview tour={tour} currency={currency} language={language} />
      </section>

      <section className="detail-section inclusion-grid">
        <ListBlock icon={CheckCircle2} title={t('inclusions', language)} items={inclusions} tone="include" />
        <ListBlock icon={X} title={t('exclusions', language)} items={exclusions} tone="exclude" />
      </section>

      <section className="bottom-grid">
        {childRates?.length > 0 && <SmallInfoCard title={t('childRates', language)} rows={childRates.map((item) => [item, ''])} />}
        <SmallInfoCard
          title={t('paymentTerms', language)}
          rows={paymentRows || [
            [t('bookingDeposit', language), '30%'],
            [t('finalPayment', language), '7-14 days prior'],
            [t('paymentMethods', language), t('bankTransfer', language)],
          ]}
        />
        <SmallInfoCard
          title={t('cancellationPolicy', language)}
          rows={cancellationRows || [
            ['21+ days prior', t('noCharge', language)],
            ['20 - 7 days prior', '50%'],
            ['0 - 6 days prior', '90%'],
          ]}
        />
      </section>

      <PdfSourceSection
        tour={tour}
        language={language}
        source={pdfSource}
        status="ready"
        isOpen={showPdfSource}
        onToggle={() => setShowPdfSource((isOpen) => !isOpen)}
      />
    </section>
  );
}

function PdfSourceSection({ tour, language, source, status, isOpen, onToggle }) {
  return (
    <section className={`pdf-source-section ${isOpen ? 'is-open' : ''}`}>
      <button className="source-toggle" type="button" aria-expanded={isOpen} onClick={onToggle}>
        <span>
          <strong>{t('sourcePdf', language)}</strong>
          <small>{tour.assets.label}</small>
        </span>
        <span className="source-toggle-action">
          {isOpen ? t('hideSource', language) : t('showSource', language)}
          <ChevronDown size={15} />
        </span>
      </button>

      {isOpen && (
        <div className="source-drawer">
          {status === 'loading' && <p className="source-state">{t('sourceLoading', language)}</p>}
          {status === 'error' && <p className="source-state">{t('sourceError', language)}</p>}
          {status === 'ready' && !source && <p className="source-state">{t('sourceUnavailable', language)}</p>}
          {status === 'ready' && source && (
            <>
              <section className="detail-section source-text-section">
                <h3>{t('originalProgram', language)} <span>{tour.code} - PDF p{source.itineraryPage}</span></h3>
                <PdfTextBlock text={source.itineraryText} />
              </section>

              <section className="detail-section source-text-section">
                <h3>{t('originalPriceTerms', language)} <span>{tour.code} - PDF p{source.pricePage}</span></h3>
                <PdfTextBlock text={source.priceText} />
              </section>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function PdfTextBlock({ text }) {
  return <pre className="pdf-text-block">{text}</pre>;
}

function ItineraryTable({ tour, language }) {
  return (
    <div className="itinerary-table">
      {tour.itinerary.map((day) => {
        const title = language === 'TH' && day.titleTh ? day.titleTh : day.title;
        const notes = language === 'TH' && day.notesTh ? day.notesTh : day.notes;
        const lunch = language === 'TH' && day.lunchTh ? day.lunchTh : day.lunch;
        const dinner = language === 'TH' && day.dinnerTh ? day.dinnerTh : day.dinner;
        const lunchMenu = language === 'TH' ? (day.lunchMenuTh || day.lunchMenu || []) : (day.lunchMenu || []);
        const dinnerMenu = language === 'TH' ? (day.dinnerMenuTh || day.dinnerMenu || []) : (day.dinnerMenu || []);
        const overnight = language === 'TH' && day.overnightTh
          ? day.overnightTh
          : (day.overnight || (day.day === tour.duration ? t('notAvailable', language) : tour.nights));

        return (
          <div className="itinerary-row" key={`${tour.id}-${day.day}`}>
            <div className="itinerary-day">{t('day', language)} {day.day}</div>
            <div className="itinerary-main">
              <strong>{title}</strong>
              <ul className="itinerary-notes">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="itinerary-side">
              <span>
                <Languages size={14} />
                {t('meals', language)}: {getMeals(day.day, tour.duration)}
              </span>
              <span>
                <BriefcaseBusiness size={14} />
                {t('overnight', language)}: {overnight}
              </span>
              {(lunch || dinner) && (
                <div className="meal-venues">
                  {lunch && (
                    <div>
                      <strong>{t('lunch', language)}: {lunch}</strong>
                      {!!lunchMenu?.length && (
                        <ol>
                          {lunchMenu.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                  {dinner && (
                    <div>
                      <strong>{t('dinner', language)}: {dinner}</strong>
                      {!!dinnerMenu?.length && (
                        <ol>
                          {dinnerMenu.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PricePreview({ tour, currency, language }) {
  const bands = tour.priceRows[0].cells.map((cell) => cell.band);
  return (
    <>
      <div className="section-title-row">
        <h3>{t('priceGrid', language)} <span>({currency} {t('perPerson', language)})</span></h3>
      </div>
      <div className="table-shell">
        <table className={tour.pdfPriceLayout ? 'pdf-price-table' : ''}>
          <thead>
            {tour.pdfPriceLayout && (
              <tr className="pdf-price-title-row">
                <th colSpan={bands.length + 2}>{tour.code} ราคาสำหรับช่วง 01/04-30/12/2026</th>
              </tr>
            )}
            <tr>
              <th>{tour.pdfPriceLayout ? 'จำนวนลูกค้า' : t('season', language)}</th>
              {bands.map((band) => (
                <th key={band}>{band}</th>
              ))}
              <th>{tour.pdfPriceLayout ? 'นอนเดี่ยว' : t('single', language)}</th>
            </tr>
          </thead>
          <tbody>
            {tour.priceRows.map((row) => (
              <tr className={tour.pdfPriceLayout ? 'pdf-main-price-row' : ''} key={row.season}>
                <td className="multiline-cell">
                  {row.season.includes(' - ') ? row.season.replace(' - ', '\n') : row.season}
                </td>
                {row.cells.map((cell) => (
                  <td key={`${row.season}-${cell.band}`}>{formatMoney(cell.value, currency)}</td>
                ))}
                <td>{row.single}</td>
              </tr>
            ))}
            {tour.pdfPriceLayout && tour.priceExtraRows?.map((row) => (
              <tr className="price-extra-row" key={row.label}>
                <td className="multiline-cell">{row.label}</td>
                <td colSpan={bands.length}>{row.merged}</td>
                <td>{row.single}</td>
              </tr>
            ))}
            {!tour.pdfPriceLayout && tour.priceExtraRows?.map((row) => (
              <tr className="price-extra-row" key={row.label}>
                <td>{row.label}</td>
                {bands.map((band, index) => (
                  <td key={`${row.label}-${band}`}>{row.cells?.[index] || ''}</td>
                ))}
                <td>{row.single || ''}</td>
              </tr>
            ))}
            {tour.pdfPriceLayout && tour.vehicleRows?.map((row) => (
              <tr className="vehicle-table-row" key={row.label}>
                <td>{row.label}</td>
                <td className="multiline-cell" colSpan={row.leftSpan || Math.floor((bands.length + 1) / 2)}>{row.left}</td>
                <td className="multiline-cell" colSpan={row.rightSpan || Math.ceil((bands.length + 1) / 2)}>{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!!tour.surcharges?.length && !tour.priceExtraRows?.length && (
        <p className="price-note">{t('note', language)}: {tour.surcharges.slice(0, 2).join(' / ')}</p>
      )}
    </>
  );
}

function ListBlock({ icon: Icon, title, items, tone }) {
  return (
    <div className={`list-block ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Icon size={14} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SmallInfoCard({ title, rows }) {
  return (
    <div className="small-info-card">
      <h3>{title}</h3>
      {rows.map(([label, value]) => (
        <div className="info-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}


export default App;
