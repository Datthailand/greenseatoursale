import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { regions, tours } from './data/tours.js';
import { landingTours } from './data/landingTours.js';
import Admin from './components/Admin.jsx';
import TourLandingPage from './components/TourLandingPage.jsx';
import FITDAD01LandingPage from './components/FITDAD01LandingPage.jsx';

import { sortModes, t } from './components/catalog/constants.js';
import CatalogNavbar from './components/catalog/sections/CatalogNavbar.jsx';
import FilterBar from './components/catalog/sections/FilterBar.jsx';
import TourCard from './components/catalog/sections/TourCard.jsx';
import DetailPanel from './components/catalog/detail/DetailPanel.jsx';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return new URLSearchParams(window.location.search).get('admin') === 'true';
  });
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const hideParam = searchParams.get('hide') || '';
  const viewParam = searchParams.get('view') || '';
  const keyParam = searchParams.get('key') || '';
  const isPublicView = viewParam.toLowerCase() === 'public' || viewParam.toLowerCase() === 'client';
  
  const isExplicitPublic = isPublicView || hideParam.includes('price') || hideParam.includes('meals');
  const isExplicitAgent = keyParam.toLowerCase() === 'greenseatour_agent' ||
                           keyParam.toLowerCase() === 'greensea_agent' ||
                           keyParam.toLowerCase() === 'agent' ||
                           keyParam.toLowerCase() === 'partner' ||
                           keyParam.toLowerCase() === 'b2b' ||
                           viewParam.toLowerCase() === 'agent';

  const [isPublicMode, setIsPublicMode] = useState(() => {
    if (isExplicitPublic) {
      return true; // Explicit public parameter overrides everything
    }
    if (isExplicitAgent) {
      try {
        localStorage.setItem('greensea_role', 'agent');
      } catch (e) {
        console.error('LocalStorage not available:', e);
      }
      return false; // Explicit agent key forces agent view (isPublicMode = false)
    }
    
    // Otherwise, check localStorage
    try {
      const savedRole = localStorage.getItem('greensea_role');
      if (savedRole === 'agent') {
        return false; // Saved agent role -> show agent view
      }
    } catch (e) {
      console.error('Error reading LocalStorage:', e);
    }
    
    // Default for general B2C public visitors: Hide sensitive info
    return true; 
  });
  
  const shouldHidePrice = isPublicMode || hideParam.includes('price') || hideParam.includes('pricing');
  const shouldHideMeals = isPublicMode || hideParam.includes('meals') || hideParam.includes('restaurant') || hideParam.includes('restaurants') || hideParam.includes('meal');
  const shouldHidePdf = isPublicMode || hideParam.includes('pdf') || hideParam.includes('link');

  const initialTour = useMemo(() => {
    const tourParam = searchParams.get('tour') || searchParams.get('id') || searchParams.get('code');
    if (tourParam) {
      const match = tours.find(t => 
        t.id.toLowerCase() === tourParam.toLowerCase() || 
        t.code.toLowerCase() === tourParam.toLowerCase() ||
        `${t.packageType}${t.code}`.toLowerCase() === tourParam.toLowerCase()
      );
      if (match) return match;
    }
    return tours.find(t => t.packageType === 'GIT') || tours[0];
  }, [searchParams]);

  const [landingTourId, setLandingTourId] = useState(() => {
    if (searchParams.get('mode') === 'landing' || searchParams.get('page') === 'landing' || searchParams.get('landing') === 'true') {
      const tourParam = searchParams.get('tour') || searchParams.get('id') || searchParams.get('code');
      if (tourParam) {
        const match = landingTours.find(t =>
          t.id.toLowerCase() === tourParam.toLowerCase() ||
          t.code.toLowerCase() === tourParam.toLowerCase() ||
          `${t.packageType}${t.code}`.toLowerCase() === tourParam.toLowerCase()
        );
        if (match) return match.id;
      }
      return landingTours[0]?.id || null;
    }
    return null;
  });

  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('TH');
  const [packageFilter, setPackageFilter] = useState(initialTour?.packageType || 'GIT');
  const [regionFilter, setRegionFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('Popular');
  const [selectedId, setSelectedId] = useState(initialTour?.id || tours.find(t => t.packageType === 'GIT')?.id || tours[0].id);
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
    // Clean up key and view agent parameters from address bar to prevent accidental sharing
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('key') || params.get('view') === 'agent') {
        params.delete('key');
        if (params.get('view') === 'agent') {
          params.delete('view');
        }
        const newSearch = params.toString();
        const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;
        window.history.replaceState({}, '', newUrl);
      }
    } catch (e) {
      console.error('Error cleaning up URL parameters:', e);
    }
  }, []);

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
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'p') {
        setIsPublicMode(prev => {
          const next = !prev;
          setNotice(next ? "Public View Activated" : "Agent View Activated");
          return next;
        });
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

  if (landingTourId) {
    if (landingTourId === 'fitdad01') {
      return (
        <FITDAD01LandingPage
          onBack={() => {
            setLandingTourId(null);
            const params = new URLSearchParams(window.location.search);
            params.delete('mode');
            params.delete('page');
            params.delete('landing');
            const newSearch = params.toString();
            const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;
            window.history.replaceState({}, '', newUrl);
          }}
        />
      );
    }
    const currentLandingTour = landingTours.find(t => t.id === landingTourId) || landingTours[0];
    return (
      <TourLandingPage
        tour={currentLandingTour}
        initialLanguage={language}
        initialCurrency={currency}
        onBack={() => {
          setLandingTourId(null);
          const params = new URLSearchParams(window.location.search);
          params.delete('mode');
          params.delete('page');
          params.delete('landing');
          const newSearch = params.toString();
          const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;
          window.history.replaceState({}, '', newUrl);
        }}
      />
    );
  }

  return (
    <div className="app">
      {/* Top Navbar */}
      <CatalogNavbar
        currency={currency}
        cycleCurrency={cycleCurrency}
        language={language}
        cycleLanguage={cycleLanguage}
      />

      <main className="workspace">
        {/* Left Side: Catalog Tour Cards Panel */}
        <section className="catalog-panel">
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
                  onClick={resetFilters}
                >
                  <Filter size={18} /> {t('resetFilters', language)}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Right Side: Tour Detail Panel */}
        {selectedTour ? (
          <DetailPanel
            tour={selectedTour}
            currency={currency}
            language={language}
            onClose={() => showNotice('Detail panel stays open on desktop')}
            onSave={() => showNotice(`Saved ${selectedTour.code} to shortlist`)}
            onReset={resetFilters}
            onOpenLanding={(tourId) => {
              setLandingTourId(tourId.toLowerCase());
              const params = new URLSearchParams(window.location.search);
              params.set('mode', 'landing');
              params.set('tour', tourId.toLowerCase());
              const newUrl = window.location.pathname + `?${params.toString()}#pricing-terminal`;
              window.history.pushState({}, '', newUrl);
            }}
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

export default App;
