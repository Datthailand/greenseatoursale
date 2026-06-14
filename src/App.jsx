import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Filter,
  Globe2,
  MapPin,
  PlaneTakeoff,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react';
import { regions, tours } from './data/tours.js';
import Admin from './components/Admin.jsx';

const packageFilters = ['FIT', 'GIT'];
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
    northVietnam: 'North Vietnam',
    centralVietnam: 'Central Vietnam',
    southernVietnam: 'Southern Vietnam',
    phuQuoc: 'Phu Quoc',
    noPriceData: 'No pricing data available',
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
    northVietnam: 'เวียดนามเหนือ',
    centralVietnam: 'เวียดนามกลาง',
    southernVietnam: 'เวียดนามใต้',
    phuQuoc: 'ฟูโกว๊ก',
    noPriceData: 'ไม่มีข้อมูลราคา',
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



function getQuoteText(tour, currency) {
  if (!tour.priceRows || tour.priceRows.length === 0) {
    return [
      `${tour.code} - ${tour.title}`,
      `Package: ${tour.packageType} | Region: ${tour.region} | Duration: ${tour.duration} days`,
      `Route: ${tour.route}`,
      `Hotel: ${tour.hotel}`,
      `Vehicle: ${tour.vehicle}`,
    ].join('\n');
  }

  const bestRow = tour.priceRows.reduce((winner, row) => {
    if (!row.cells || row.cells.length === 0) return winner;
    const rowMin = Math.min(...row.cells.map((cell) => cell.value));
    const winnerMin = Math.min(...winner.cells.map((cell) => cell.value));
    return rowMin < winnerMin ? row : winner;
  }, tour.priceRows[0]);

  if (!bestRow || !bestRow.cells || bestRow.cells.length === 0) {
    return [
      `${tour.code} - ${tour.title}`,
      `Package: ${tour.packageType} | Region: ${tour.region} | Duration: ${tour.duration} days`,
      `Route: ${tour.route}`,
      `Hotel: ${tour.hotel}`,
      `Vehicle: ${tour.vehicle}`,
    ].join('\n');
  }

  const bestCell = bestRow.cells.reduce((winner, cell) => (cell.value < winner.value ? cell : winner), bestRow.cells[0]);

  return [
    `${tour.code} - ${tour.title}`,
    `Package: ${tour.packageType} | Region: ${tour.region} | Duration: ${tour.duration} days`,
    `Route: ${tour.route}`,
    `Price from: ${formatMoney(tour.priceFrom, currency)}/pax (${bestCell.band} pax, ${bestRow.season})`,
    `Single supplement: ${bestRow.single || 'N/A'}`,
    `Hotel: ${tour.hotel}`,
    `Vehicle: ${tour.vehicle}`,
    `Source: ${tour.assets?.label || 'N/A'}, ${tour.sourcePages || 'N/A'}`,
  ].join('\n');
}

const ThailandFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="16" height="11" style={{ borderRadius: '1px', display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="900" height="600" fill="#a51931"/>
    <rect y="100" width="900" height="400" fill="#f4f5f8"/>
    <rect y="200" width="900" height="200" fill="#2d2a4a"/>
  </svg>
);

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="16" height="11" style={{ borderRadius: '1px', display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M0 0v30h50V0z" fill="#012169"/>
    <path d="M0 0l50 30M50 0L0 30" stroke="#fff" stroke-width="6"/>
    <path d="M0 0l50 30M50 0L0 30" stroke="#c8102e" stroke-width="4"/>
    <path d="M0 15h50M25 0v30" stroke="#fff" stroke-width="10"/>
    <path d="M0 15h50M25 0v30" stroke="#c8102e" stroke-width="6"/>
  </svg>
);

const regionKeyMap = {
  'North Vietnam': 'northVietnam',
  'Central Vietnam': 'centralVietnam',
  'Southern Vietnam': 'southernVietnam',
  'Phu Quoc': 'phuQuoc',
};

function App() {
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return new URLSearchParams(window.location.search).get('admin') === 'true';
  });
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const hideParam = searchParams.get('hide') || '';
  const viewParam = searchParams.get('view') || '';
  const isPublicView = viewParam.toLowerCase() === 'public' || viewParam.toLowerCase() === 'client';
  
  const shouldHidePrice = isPublicView || hideParam.includes('price') || hideParam.includes('pricing');
  const shouldHideMeals = isPublicView || hideParam.includes('meals') || hideParam.includes('restaurant') || hideParam.includes('restaurants') || hideParam.includes('meal');
  const shouldHidePdf = isPublicView || hideParam.includes('pdf') || hideParam.includes('link');

  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('TH');
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
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        setIsAdminMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const id = window.setTimeout(() => setNotice(''), 2200);
    return () => window.clearTimeout(id);
  }, [notice]);

  const selectedTour = filteredTours.find((tour) => tour.id === selectedId) || filteredTours[0] || null;



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

  if (isAdminMode) {
    return <Admin onBack={() => setIsAdminMode(false)} />;
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
          <button className="currency-btn" type="button" onClick={cycleCurrency}>
            {currency}
          </button>
          <button className="language-btn" type="button" aria-label="Language" onClick={cycleLanguage}>
            {language === 'TH' ? <ThailandFlag /> : <UKFlag />}
            <span>{language}</span>
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
                    <Users size={16} />
                    {option}
                  </button>
                ))}
              </div>
            </div>

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
                hidePrice={shouldHidePrice}
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
            onClose={() => showNotice('Detail panel stays open on desktop')}
            onSave={() => showNotice(`Saved ${selectedTour.code} to shortlist`)}
            onReset={resetFilters}
            containerRef={detailRef}
            hidePrice={shouldHidePrice}
            hideMeals={shouldHideMeals}
            hidePdf={shouldHidePdf}
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

function TourCard({ tour, active, onSelect, currency, language, hidePrice }) {
  return (
    <button className={`tour-card ${active ? 'is-active' : ''}`} type="button" onClick={onSelect}>
      <img src={tour.assets.thumb || tour.assets.cover} alt="" />
      <div className="tour-card-body">
        <div className="tour-card-title-row">
          <div>
            <strong>{tour.code}</strong>
            <h2>{tour.title}</h2>
          </div>
          {!hidePrice && (
            <div className="card-price">
              <span>{t('from', language)}</span>
              <strong>{formatMoney(tour.priceFrom, currency)}</strong>
              <small>{t('perPerson', language)}</small>
            </div>
          )}
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

function DetailPanel({ tour, onClose, onSave, currency, language, containerRef, hidePrice, hideMeals, hidePdf }) {
  const inclusions = language === 'TH' && tour.inclusionsTh ? tour.inclusionsTh : tour.inclusions;
  const exclusions = language === 'TH' && tour.exclusionsTh ? tour.exclusionsTh : tour.exclusions;
  const childRates = language === 'TH' && tour.childRatesTh ? tour.childRatesTh : tour.childRates;
  const paymentRows = language === 'TH' && tour.paymentTermsTh ? tour.paymentTermsTh : tour.paymentTermsRows;
  const cancellationRows = language === 'TH' && tour.cancellationPolicyTh ? tour.cancellationPolicyTh : tour.cancellationRows;


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

        {!hidePrice && (
          <div className="detail-price">
            <span>{t('from', language)}</span>
            <strong>{formatMoney(tour.priceFrom, currency)}</strong>
            <small>{t('perPerson', language)}</small>
          </div>
        )}
      </div>

      <div className="detail-actions">
        {!hidePdf && (
          <a className="primary-button" href={tour.assets.pdf} target="_blank" rel="noreferrer">
            <ExternalLink size={17} />
            {t('viewPdf', language)}
          </a>
        )}
        <button className="star-button" type="button" aria-label="Save tour" onClick={onSave}>
          <Star size={18} />
        </button>
      </div>

      <div className="detail-divider" />

      <section className="detail-section">
        <h3>{t('itineraryOverview', language)}</h3>
        <ItineraryTable tour={tour} language={language} hideMeals={hideMeals} />
      </section>

      {!hidePrice && (
        <section className="detail-section">
          <PricePreview tour={tour} currency={currency} language={language} />
        </section>
      )}

      <section className="detail-section inclusion-grid">
        <ListBlock icon={CheckCircle2} title={t('inclusions', language)} items={inclusions} tone="include" />
        <ListBlock icon={X} title={t('exclusions', language)} items={exclusions} tone="exclude" />
      </section>

      <section className="bottom-grid">
        {!hidePrice && childRates?.length > 0 && <SmallInfoCard title={t('childRates', language)} rows={childRates.map((item) => [item, ''])} />}
        {!hidePrice && (
          <SmallInfoCard
            title={t('paymentTerms', language)}
            rows={paymentRows || [
              [t('bookingDeposit', language), '30%'],
              [t('finalPayment', language), '7-14 days prior'],
              [t('paymentMethods', language), t('bankTransfer', language)],
            ]}
          />
        )}
        {!hidePrice && (
          <SmallInfoCard
            title={t('cancellationPolicy', language)}
            rows={cancellationRows || [
              ['21+ days prior', t('noCharge', language)],
              ['20 - 7 days prior', '50%'],
              ['0 - 6 days prior', '90%'],
            ]}
          />
        )}
        {!hidePrice && !tour.pdfPriceLayout && tour.remarksTh && (tour.remarksTh.left?.length > 0 || tour.remarksTh.right?.length > 0) && (
          <div className="remarks-card">
            <h3>{language === 'TH' ? 'นโยบายหัวหน้าทัวร์' : 'Tour Leader Policy'}</h3>
            <div className="remarks-grid">
              {tour.remarksTh.left && tour.remarksTh.left.length > 0 && (
                <div className="remarks-col">
                  <span className="remarks-col-title">{tour.remarksTh.left[0]}</span>
                  <ul className="remarks-list">
                    {tour.remarksTh.left.slice(1).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.remarksTh.right && tour.remarksTh.right.length > 0 && (
                <div className="remarks-col">
                  <span className="remarks-col-title">{tour.remarksTh.right[0]}</span>
                  <ul className="remarks-list">
                    {tour.remarksTh.right.slice(1).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Line Contact */}
      <a
        href="https://line.me/ti/p/U1vOdylKTL"
        target="_blank"
        rel="noopener noreferrer"
        className="line-contact-block"
      >
        <img
          src="/assets/line-qr.png"
          alt="Line QR Code"
          className="line-qr-img"
        />
        <div className="line-contact-text">
          <span className="line-contact-label">ติดต่อผ่าน LINE</span>
          <span className="line-contact-sub">แสกน QR หรือคลิกเพื่อเพิ่มเพื่อน</span>
        </div>
      </a>
    </section>
  );
}



function ItineraryTable({ tour, language, hideMeals }) {
  return (
    <div className={`itinerary-table ${hideMeals ? 'hide-meals' : ''}`}>
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
              {overnight && overnight !== t('notAvailable', language) && (
                <div className="itinerary-overnight-pdf">
                  {t('overnight', language)}: {overnight}
                </div>
              )}
            </div>
            {!hideMeals && (lunch || dinner) && (
              <div className="itinerary-side">
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PricePreview({ tour, currency, language }) {
  if (!tour.priceRows || tour.priceRows.length === 0) {
    return <p className="price-note">{t('noPriceData', language) || 'No price data available'}</p>;
  }
  const bands = tour.priceRows[0]?.cells?.map((cell) => cell.band) || [];
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
                <td>{row.single?.replace(' USD', '$')}</td>
              </tr>
            ))}
            {tour.pdfPriceLayout && tour.priceExtraRows?.map((row) => (
              <tr className="price-extra-row" key={row.label}>
                <td className="multiline-cell">{row.label}</td>
                {row.cells ? (
                  row.cells.map((c, i) => (
                    <td key={i} colSpan={c.colSpan} className="multiline-cell">{c.text}</td>
                  ))
                ) : (
                  <td colSpan={bands.length}>{row.merged}</td>
                )}
                <td>{row.single?.replace(' USD', '$')}</td>
              </tr>
            ))}
            {!tour.pdfPriceLayout && tour.priceExtraRows?.map((row) => {
              const renderedColSpan = row.cells ? row.cells.reduce((acc, c) => acc + c.colSpan, 0) : 0;
              const remaining = bands.length - renderedColSpan;
              return (
                <tr className="price-extra-row" key={row.label}>
                  <td>{row.label}</td>
                  {row.cells ? (
                    <>
                      {row.cells.map((c, i) => (
                        <td key={i} colSpan={c.colSpan}>{c.text}</td>
                      ))}
                      {remaining > 0 && <td colSpan={remaining}></td>}
                    </>
                  ) : (
                    <td colSpan={bands.length}>{row.merged || ''}</td>
                  )}
                  <td>{row.single?.replace(' USD', '$') || ''}</td>
                </tr>
              );
            })}
            {tour.vehicleRows?.map((row) => (
              <tr className="vehicle-table-row" key={row.label}>
                <td>{row.label}</td>
                {row.cells ? (
                  row.cells.map((c, i) => (
                    <td key={i} colSpan={c.colSpan} className="multiline-cell">{c.text}</td>
                  ))
                ) : (
                  <>
                    <td className="multiline-cell" colSpan={row.leftSpan || Math.floor((bands.length + 1) / 2)}>{row.left}</td>
                    <td className="multiline-cell" colSpan={row.rightSpan || Math.ceil((bands.length + 1) / 2)}>{row.right}</td>
                  </>
                )}
              </tr>
            ))}
            {tour.pdfPriceLayout && tour.remarksTh && (tour.remarksTh.left?.length > 0 || tour.remarksTh.right?.length > 0) && (() => {
              const totalBandCols = bands.length + 1; // +1 for นอนเดียว col
              const vehicleRow = tour.vehicleRows?.[0];
              let defaultLeftSpan = Math.floor(totalBandCols / 2);
              if (vehicleRow && vehicleRow.cells && vehicleRow.cells.length > 1) {
                defaultLeftSpan = vehicleRow.cells.slice(0, -1).reduce((acc, c) => acc + c.colSpan, 0);
              }
              const leftSpan = tour.remarksLeftSpan || defaultLeftSpan;
              const middleSpan = tour.remarksMiddleSpan || 0;
              const rightSpan = tour.remarksRightSpan || (totalBandCols - leftSpan - middleSpan);
              const leftText = tour.remarksTh.left?.join('\n') || '';
              const rightText = tour.remarksTh.right?.join('\n') || '';
              return (
                <tr className="remarks-table-row">
                  <td className="remarks-table-label">หมายเหตุ</td>
                  {leftText && <td colSpan={leftSpan} className="multiline-cell remarks-table-cell">{leftText}</td>}
                  {!!middleSpan && <td colSpan={middleSpan} className="remarks-table-cell-empty"></td>}
                  {rightText && <td colSpan={rightSpan} className="multiline-cell remarks-table-cell">{rightText}</td>}
                </tr>
              );
            })()}
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
