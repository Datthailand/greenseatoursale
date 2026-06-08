import React, { useEffect, useMemo, useState } from 'react';
import {
  BadgeDollarSign,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  FileDown,
  FileText,
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

const packageFilters = ['All', 'FIT', 'GIT'];
const sortModes = ['Popular', 'Price Low', 'Duration'];
const navItems = [
  { label: 'Sales Kits', icon: FileText },
  { label: 'My Quotes', icon: Copy },
  { label: 'Bookings', icon: CalendarDays },
  { label: 'Partners', icon: Users },
  { label: 'Reports', icon: BarChart3 },
];

function money(value) {
  return `$${value}`;
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

function getQuoteText(tour) {
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
    `Price from: ${money(tour.priceFrom)}/pax (${bestCell.band} pax, ${bestRow.season})`,
    `Single supplement: ${bestRow.single}`,
    `Hotel: ${tour.hotel}`,
    `Vehicle: ${tour.vehicle}`,
    `Source: ${tour.assets.label}, ${tour.sourcePages}`,
  ].join('\n');
}

function App() {
  const [activeNav, setActiveNav] = useState('Sales Kits');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');
  const [packageFilter, setPackageFilter] = useState('FIT');
  const [regionFilter, setRegionFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('Popular');
  const [selectedId, setSelectedId] = useState(tours[0].id);
  const [notice, setNotice] = useState('');

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

  const selectedTour = tours.find((tour) => tour.id === selectedId) || filteredTours[0] || tours[0];

  async function copyQuote(tour) {
    try {
      await navigator.clipboard.writeText(getQuoteText(tour));
      setNotice(`Copied quote notes for ${tour.code}`);
    } catch {
      setNotice('Copy failed. Browser blocked clipboard access.');
    }
  }

  function showNotice(message) {
    setNotice(message);
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
          <div className="brand-mark">GS</div>
          <div>
            <strong>GREEN SEA TOUR</strong>
            <span>Travel - Experience - Memories</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={label === activeNav ? 'is-active' : ''}
              key={label}
              type="button"
              onClick={() => {
                setActiveNav(label);
                setNotice(label === 'Sales Kits' ? 'Sales kit catalog is active' : `${label} workspace is not connected yet`);
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

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
          <button className="icon-button alert" type="button" aria-label="Notifications" onClick={() => showNotice('3 sales reminders pending')}>
            <Bell size={18} />
            <span>3</span>
          </button>
          <div className="user-chip">
            <div>PT</div>
            <span>
              <strong>Phat Tan</strong>
              Sales Executive
            </span>
          </div>
        </div>
      </header>

      <main className="workspace">
        <section className="catalog-panel">
          <div className="filters-grid">
            <div className="filter-block">
              <span>Travel Style</span>
              <div className="segmented" aria-label="Package filter">
                {packageFilters.slice(1).map((option) => (
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
              <span>Region</span>
              <div className="region-row" aria-label="Region filter">
                {['All Regions', ...regions].map((option) => {
                  const value = option === 'All Regions' ? 'All' : option;
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
                placeholder="Search by tour code, route, destination, keyword..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button className="utility-button" type="button" onClick={() => showNotice(`Active filters: ${packageFilter}, ${regionFilter}`)}>
              <Filter size={18} />
              Filters
            </button>
            <button className="sort-button" type="button" onClick={cycleSortMode}>
              <span>Sort by</span>
              {sortMode}
              <ChevronDown size={15} />
            </button>
          </div>

          <div className="tour-list">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                active={tour.id === selectedTour.id}
                onSelect={() => setSelectedId(tour.id)}
              />
            ))}
            {!filteredTours.length && (
              <div className="empty-state">
                <Search size={22} />
                <strong>No matching tour</strong>
                <span>Try another code, region, or package filter.</span>
              </div>
            )}
          </div>
        </section>

        <DetailPanel
          tour={selectedTour}
          onCopy={() => copyQuote(selectedTour)}
          onClose={() => showNotice('Detail panel stays open on desktop')}
          onSave={() => showNotice(`Saved ${selectedTour.code} to shortlist`)}
        />
      </main>

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

function TourCard({ tour, active, onSelect }) {
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
            <span>From</span>
            <strong>USD {tour.priceFrom}</strong>
            <small>per person</small>
          </div>
        </div>
        <div className="route-line">
          <MapPin size={15} />
          {tour.route}
        </div>
        <div className="card-facts">
          <span>
            <CalendarDays size={14} />
            {tour.duration} Days / {Math.max(tour.duration - 1, 1)} Nights
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
            Daily Departure
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ tour, onCopy, onClose, onSave }) {
  return (
    <section className="detail-panel">
      <button className="close-button" type="button" aria-label="Close detail" onClick={onClose}>
        <X size={22} />
      </button>

      <div className="detail-header">
        <div className="detail-title">
          <div className="detail-code">
            <span className={`package-chip ${tour.packageType.toLowerCase()}`}>{tour.packageType}</span>
            <strong>{tour.code}</strong>
          </div>
          <h1>{tour.title}</h1>
          <div className="detail-meta">
            <span>
              <CalendarDays size={15} />
              {tour.duration} Days / {Math.max(tour.duration - 1, 1)} Nights
            </span>
            <span>
              <MapPin size={15} />
              {tour.route}
            </span>
            <span>
              <PlaneTakeoff size={15} />
              Daily Departure
            </span>
          </div>
          <div className="detail-facts-line">
            <span>
              <strong>Group Size:</strong> {tour.groupRange}
            </span>
            <span>
              <strong>Hotel Standard:</strong> {getHotelStandard(tour)}
            </span>
          </div>
        </div>

        <div className="detail-price">
          <span>From</span>
          <strong>USD {tour.priceFrom}</strong>
          <small>per person</small>
        </div>
      </div>

      <div className="detail-actions">
        <a className="primary-button" href={tour.assets.pdf} target="_blank" rel="noreferrer">
          <ExternalLink size={17} />
          View PDF
        </a>
        <button className="ghost-link" type="button" onClick={onCopy}>
          <Copy size={17} />
          Copy Quote Notes
        </button>
        <button className="star-button" type="button" aria-label="Save tour" onClick={onSave}>
          <Star size={18} />
        </button>
      </div>

      <div className="detail-divider" />

      <section className="detail-section">
        <h3>Itinerary Overview</h3>
        <ItineraryTable tour={tour} />
      </section>

      <section className="detail-section">
        <PricePreview tour={tour} />
      </section>

      <section className="detail-section inclusion-grid">
        <ListBlock icon={CheckCircle2} title="Inclusions" items={tour.inclusions} tone="include" />
        <ListBlock icon={X} title="Exclusions" items={tour.exclusions} tone="exclude" />
      </section>

      <section className="bottom-grid">
        <SmallInfoCard
          title="Cancellation Policy"
          rows={[
            ['21+ days prior', 'No charge'],
            ['20 - 7 days prior', '50%'],
            ['0 - 6 days prior', '90%'],
          ]}
        />
        <SmallInfoCard
          title="Payment Terms"
          rows={[
            ['Booking deposit', '30%'],
            ['Final payment', '7-14 days prior'],
            ['Payment methods', 'Bank Transfer'],
          ]}
        />
        <SourceCard tour={tour} />
      </section>
    </section>
  );
}

function ItineraryTable({ tour }) {
  return (
    <div className="itinerary-table">
      {tour.itinerary.map((day) => (
        <div className="itinerary-row" key={`${tour.id}-${day.day}`}>
          <div className="itinerary-day">Day {day.day}</div>
          <div className="itinerary-main">
            <strong>{day.title}</strong>
            <span>{day.notes.slice(0, 2).join(', ')}</span>
          </div>
          <div className="itinerary-side">
            <span>
              <Languages size={14} />
              Meals: {getMeals(day.day, tour.duration)}
            </span>
            <span>
              <BriefcaseBusiness size={14} />
              Overnight: {day.day === tour.duration ? 'N/A' : tour.nights}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PricePreview({ tour }) {
  const bands = tour.priceRows[0].cells.map((cell) => cell.band);
  return (
    <>
      <div className="section-title-row">
        <h3>Price Grid Preview <span>(USD per person)</span></h3>
      </div>
      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Season</th>
              {bands.map((band) => (
                <th key={band}>{band}</th>
              ))}
              <th>Single</th>
            </tr>
          </thead>
          <tbody>
            {tour.priceRows.map((row) => (
              <tr key={row.season}>
                <td>{row.season}</td>
                {row.cells.map((cell) => (
                  <td key={`${row.season}-${cell.band}`}>USD {cell.value}</td>
                ))}
                <td>{row.single}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!!tour.surcharges?.length && (
        <p className="price-note">Note: {tour.surcharges.slice(0, 2).join(' / ')}</p>
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

function SourceCard({ tour }) {
  return (
    <div className="small-info-card source-card">
      <h3>Source PDF</h3>
      <div className="source-file">
        <FileDown size={16} />
        <span>{tour.assets.label}</span>
      </div>
      <div className="info-row">
        <span>Page</span>
        <strong>{tour.sourcePages}</strong>
      </div>
      <a href={tour.assets.pdf} target="_blank" rel="noreferrer">
        <ExternalLink size={15} />
        Download PDF
      </a>
    </div>
  );
}

export default App;
