import React, { useState, useMemo, useEffect } from 'react';
import { GIT_PRICE_GRID, SURCHARGES, OPTIONAL_ACTIVITIES, EXCHANGE_RATE } from './gitdad02/constants';
import NavbarSection from './gitdad02/sections/NavbarSection';
import HeroSection from './gitdad02/sections/HeroSection';
import DestinationAccordion from './gitdad02/sections/DestinationAccordion';
import ItinerarySection from './gitdad02/sections/ItinerarySection';
import FlightScheduleSection from './gitdad02/sections/FlightScheduleSection';
import PricingTerminalSection from './gitdad02/sections/PricingTerminalSection';
import TermsSection from './gitdad02/sections/TermsSection';
import FaqSection from './gitdad02/sections/FaqSection';
import PartnersMarquee from './gitdad02/sections/PartnersMarquee';
import FooterSection from './gitdad02/sections/FooterSection';

import AddonsModal from './gitdad02/modals/AddonsModal';
import AgentWhiteLabelModal from './gitdad02/modals/AgentWhiteLabelModal';
import QuoteDrawer from './gitdad02/modals/QuoteDrawer';
import { generateAndDownloadPoster } from './gitdad02/features/posterGenerator';

export default function GITDAD02LandingPage({ onBack }) {
  // Query parameters initialization
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const initialLang = (searchParams.get('lang') || 'TH').toUpperCase();
  const initialCur = (searchParams.get('cur') || 'USD').toUpperCase();
  const initialAgentName = searchParams.get('agent_name') || searchParams.get('agency') || '';
  const initialAgentTel = searchParams.get('agent_tel') || searchParams.get('tel') || '';
  const initialAgentLine = searchParams.get('agent_line') || searchParams.get('line') || '';
  const initialMargin = Number(searchParams.get('margin')) || 15;

  const [language, setLanguage] = useState(initialLang);
  const [currency, setCurrency] = useState(initialCur);
  const [exchangeRate, setExchangeRate] = useState(EXCHANGE_RATE || 35);
  const effectiveRate = useMemo(() => {
    const r = parseFloat(exchangeRate);
    return !isNaN(r) && r > 0 ? r : 35;
  }, [exchangeRate]);

  const isVi = language === 'VI';
  const isTh = language === 'TH';

  // Interactive tabs state
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [activeDayTab, setActiveDayTab] = useState(1);

  // Pricing Terminal State
  const [selectedBandIdx, setSelectedBandIdx] = useState(3); // 20-24 pax
  const [paxCount, setPaxCount] = useState(20);
  const [singleRooms, setSingleRooms] = useState(0);
  const [extraTourLeaders, setExtraTourLeaders] = useState(0);
  const [isHoliday, setIsHoliday] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [agentMarginPercent, setAgentMarginPercent] = useState(initialMargin);

  // Modals Visibility
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showAddonsModal, setShowAddonsModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  // Status & Feedback
  const [submitted, setSubmitted] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [copiedAgentLink, setCopiedAgentLink] = useState(false);
  const [isExportingPoster, setIsExportingPoster] = useState(false);

  // Agent White-Label Config
  const [agentConfig, setAgentConfig] = useState({
    name: initialAgentName,
    tel: initialAgentTel,
    line: initialAgentLine,
    isAgent: Boolean(initialAgentName || initialAgentTel || initialAgentLine)
  });

  const [agentForm, setAgentForm] = useState({
    agencyName: agentConfig.name || '',
    lineId: agentConfig.line || '',
    phone: agentConfig.tel || '',
    travelDate: '',
    notes: ''
  });

  const selectedBand = GIT_PRICE_GRID[selectedBandIdx] || GIT_PRICE_GRID[0];

  const handleBandChange = (idx) => {
    const bandIdx = Number(idx);
    setSelectedBandIdx(bandIdx);
    const band = GIT_PRICE_GRID[bandIdx];
    if (band) {
      const newCount = band.minPax;
      setPaxCount(newCount);
      if (newCount % 2 !== 0) {
        setSingleRooms(1);
      } else {
        setSingleRooms(0);
      }
    }
  };

  const handlePaxChange = (val) => {
    const validPax = Math.max(8, Math.min(42, Number(val)));
    setPaxCount(validPax);
    const matchedIdx = GIT_PRICE_GRID.findIndex(b => validPax >= b.minPax && validPax <= b.maxPax);
    if (matchedIdx !== -1) {
      setSelectedBandIdx(matchedIdx);
    }
    if (validPax % 2 !== 0) {
      setSingleRooms(1);
    } else {
      setSingleRooms(0);
    }
  };

  // Live Price Calculation Engine (Consistent with FITDAD01 & B2B Twin/Double standard)
  const calculation = useMemo(() => {
    const baseNetPerPax = selectedBand ? selectedBand.netUsd : 160;
    const holidaySurchargePerPax = isHoliday ? (paxCount >= 15 ? SURCHARGES.holidayBigGroupUsd : SURCHARGES.holidaySmallGroupUsd) : 0;
    const singleSupp = isHoliday ? (SURCHARGES.singleRoomUsd + 10) : SURCHARGES.singleRoomUsd; // $65 (thường) / $75 (lễ)
    const singleRoomsTotal = singleRooms * singleSupp;

    // Addons
    const addonsPerPaxTotal = selectedAddons.reduce((acc, addonId) => {
      const act = OPTIONAL_ACTIVITIES.find(a => a.id === addonId);
      return acc + (act ? act.priceUsd : 0);
    }, 0);
    const selectedAddonsList = selectedAddons.map(id => OPTIONAL_ACTIVITIES.find(a => a.id === id)).filter(Boolean);
    const addonsTotalGroup = addonsPerPaxTotal * paxCount;

    // Total Net for the whole group (Green Sea receives)
    const netPerPax = baseNetPerPax + holidaySurchargePerPax + addonsPerPaxTotal;
    const totalNetGroup = (netPerPax * paxCount) + singleRoomsTotal;
    const netPerPaxAvg = paxCount > 0 ? (totalNetGroup / paxCount) : 0;

    // Retail margin (Twin/Double sharing standard base)
    const marginMultiplier = 1 + (agentMarginPercent / 100);
    const baseSellPerPax = (baseNetPerPax * marginMultiplier) + addonsPerPaxTotal;
    const suggestedSellPerPax = Math.round(baseSellPerPax + holidaySurchargePerPax);

    // Total retail group price = (Base per pax * paxCount) + single room add-ons
    const totalSellGroup = (suggestedSellPerPax * paxCount) + singleRoomsTotal;
    const agentProfit = totalSellGroup - totalNetGroup;

    return {
      baseNetPerPax,
      holidaySurchargePerPax,
      singleSupp,
      singleRoomsTotal,
      addonsPerPaxTotal,
      selectedAddonsList,
      addonsTotalGroup,
      totalNetGroup,
      netPerPaxAvg: Math.round(netPerPaxAvg),
      suggestedSellPerPax,
      totalSellGroup,
      agentProfit: Math.max(0, Math.round(agentProfit)),

      // Aliases for compatibility
      baseNetUsd: baseNetPerPax,
      baseTotalUsd: baseNetPerPax * paxCount,
      singleSurchargeUsd: singleRoomsTotal,
      addonsTotalUsd: addonsTotalGroup,
      holidayTotalUsd: holidaySurchargePerPax * paxCount,
      totalNetUsd: totalNetGroup,
      netPerPaxUsd: netPerPax,
      totalRetailUsd: totalSellGroup,
      retailPerPaxUsd: suggestedSellPerPax,
      totalProfitUsd: Math.max(0, Math.round(agentProfit))
    };
  }, [selectedBand, paxCount, singleRooms, selectedAddons, isHoliday, agentMarginPercent]);

  const formatPrice = (usdVal) => {
    if (currency === 'THB') {
      const val = Math.round(usdVal * effectiveRate);
      return `฿${val.toLocaleString()}`;
    }
    return `$${Math.round(usdVal).toLocaleString()}`;
  };

  const handleCopyQuote = () => {
    const quoteLines = [
      `📋 BÁO GIÁ TOUR ĐOÀN B2B - GITDAD02`,
      `Chương trình: Đà Nẵng – Bà Nà Hills – Hội An (3N2Đ Mercure 4*)`,
      `Số lượng khách: ${paxCount} pax (${isVi ? selectedBand.bandLabel : isTh ? selectedBand.bandLabelTh : selectedBand.bandLabelEn})`,
      `Tiêu chuẩn xe: ${isVi ? selectedBand.vehicle : isTh ? selectedBand.vehicleTh : selectedBand.vehicleEn}`,
      paxCount >= 15 ? `Quyền lợi: Miễn phí 1 Trưởng đoàn FOC (phòng đơn)` : ``,
      `🏨 Phụ thu phòng đơn: ${singleRooms > 0 ? `${singleRooms} phòng (+${formatPrice(calculation.singleSupp)}/phòng)` : 'Không có'}`,
      `Giá NET gốc (Twin/Double): ${formatPrice(calculation.baseNetPerPax || calculation.baseNetUsd)} / khách`,
      `Giá BÁN đề xuất: ${formatPrice(calculation.suggestedSellPerPax || calculation.retailPerPaxUsd)} / khách`,
      `Tổng tiền NET cả đoàn: ${formatPrice(calculation.totalNetGroup || calculation.totalNetUsd)}`,
      `Tổng giá bán thu khách: ${formatPrice(calculation.totalSellGroup || calculation.totalRetailUsd)}`,
      `Tổng lợi nhuận dự kiến: +${formatPrice(calculation.agentProfit || calculation.totalProfitUsd)}`,
      `Hotline điều hành Green Sea Tour: (+84) 987.43.43.43 (LINE OA: @greenseatour)`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(quoteLines);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2200);
  };

  const clientShareUrl = useMemo(() => {
    const base = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('tour', 'gitdad02');
    params.set('mode', 'landing');
    params.set('lang', language);
    params.set('cur', currency);
    params.set('view', 'client');
    params.set('hide', 'price,margin');
    if (agentConfig.name) params.set('agent_name', agentConfig.name);
    if (agentConfig.tel) params.set('agent_tel', agentConfig.tel);
    if (agentConfig.line) params.set('agent_line', agentConfig.line);
    if (agentMarginPercent > 0) params.set('margin', agentMarginPercent.toString());
    return `${base}?${params.toString()}#pricing-terminal`;
  }, [language, currency, agentConfig, agentMarginPercent]);

  const handleCopyAgentLink = () => {
    navigator.clipboard.writeText(clientShareUrl);
    setCopiedAgentLink(true);
    setTimeout(() => setCopiedAgentLink(false), 2200);
  };

  const handleExportPoster = async () => {
    setIsExportingPoster(true);
    try {
      await generateAndDownloadPoster({
        tourCode: 'GITDAD02',
        tourTitle: 'Đà Nẵng – Bà Nà Hills – Hội An (Tour Đoàn Lớn)',
        tourTitleTh: 'ดานัง – บานาฮิลล์ – ฮอยอัน (กรุ๊ปเหมา GIT)',
        paxCount,
        bandLabel: isVi ? selectedBand.bandLabel : isTh ? selectedBand.bandLabelTh : selectedBand.bandLabelEn,
        vehicleLabel: isVi ? selectedBand.vehicle : isTh ? selectedBand.vehicleTh : selectedBand.vehicleEn,
        retailPriceFormatted: formatPrice(calculation.retailPerPaxUsd),
        currency,
        agentConfig,
        isTh
      });
    } catch (e) {
      console.error('Export poster failed:', e);
    } finally {
      setIsExportingPoster(false);
    }
  };

  const getBandLabel = (p) => isVi ? p.bandLabel : isTh ? p.bandLabelTh : p.bandLabelEn;
  const getVehicleLabel = (p) => isVi ? p.vehicle : isTh ? p.vehicleTh : p.vehicleEn;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      {/* 1. Navbar */}
      <NavbarSection
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        isVi={isVi}
        isTh={isTh}
        agentConfig={agentConfig}
        onBack={onBack}
        onOpenQuote={() => setShowQuoteModal(true)}
        onOpenWhiteLabel={() => setShowAgentModal(true)}
      />

      {/* 2. Hero Section */}
      <HeroSection
        isVi={isVi}
        isTh={isTh}
        language={language}
        currency={currency}
        effectiveRate={effectiveRate}
        calculation={calculation}
        selectedBand={selectedBand}
        agentConfig={agentConfig}
        formatPrice={formatPrice}
        handleCopyQuote={handleCopyQuote}
        copiedQuote={copiedQuote}
        agentMarginPercent={agentMarginPercent}
      />

      {/* 3. Destination Accordion */}
      <DestinationAccordion
        isVi={isVi}
        isTh={isTh}
        activeGalleryIdx={activeGalleryIdx}
        setActiveGalleryIdx={setActiveGalleryIdx}
        agentConfig={agentConfig}
      />

      {/* 4. Itinerary Timeline */}
      <ItinerarySection
        isVi={isVi}
        isTh={isTh}
        activeDayTab={activeDayTab}
        setActiveDayTab={setActiveDayTab}
        agentConfig={agentConfig}
      />

      {/* 5. Flight Schedule Matching */}
      <FlightScheduleSection
        isVi={isVi}
        isTh={isTh}
      />

      {/* 6. Pricing Terminal Engine */}
      <PricingTerminalSection
        isVi={isVi}
        isTh={isTh}
        language={language}
        currency={currency}
        setCurrency={setCurrency}
        effectiveRate={effectiveRate}
        exchangeRate={exchangeRate}
        setExchangeRate={setExchangeRate}
        selectedBandIdx={selectedBandIdx}
        handleBandChange={handleBandChange}
        paxCount={paxCount}
        handlePaxChange={handlePaxChange}
        singleRooms={singleRooms}
        setSingleRooms={setSingleRooms}
        extraTourLeaders={extraTourLeaders}
        setExtraTourLeaders={setExtraTourLeaders}
        isHoliday={isHoliday}
        setIsHoliday={setIsHoliday}
        agentMarginPercent={agentMarginPercent}
        setAgentMarginPercent={setAgentMarginPercent}
        selectedBand={selectedBand}
        calculation={calculation}
        formatPrice={formatPrice}
        getBandLabel={getBandLabel}
        getVehicleLabel={getVehicleLabel}
        agentConfig={agentConfig}
        handleCopyQuote={handleCopyQuote}
        copiedQuote={copiedQuote}
        handleExportPoster={handleExportPoster}
        isExportingPoster={isExportingPoster}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
        setShowAddonsModal={setShowAddonsModal}
        setShowAgentModal={setShowAgentModal}
      />

      {/* 7. Terms & Included Services */}
      <TermsSection
        isVi={isVi}
        isTh={isTh}
      />

      {/* 8. FAQ Accordion */}
      <FaqSection
        isVi={isVi}
        isTh={isTh}
      />

      {/* 9. Thai Travel Partners Marquee */}
      <PartnersMarquee
        isVi={isVi}
        isTh={isTh}
      />

      {/* 10. Footer with TTAA Trust Badge */}
      <FooterSection
        isVi={isVi}
        isTh={isTh}
        agentConfig={agentConfig}
        onBack={onBack}
        onOpenWhiteLabel={() => setShowAgentModal(true)}
      />

      {/* Modals & Slide-over Drawer */}
      {showAddonsModal && (
        <AddonsModal
          isVi={isVi}
          isTh={isTh}
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
          onClose={() => setShowAddonsModal(false)}
        />
      )}

      {showAgentModal && (
        <AgentWhiteLabelModal
          isVi={isVi}
          isTh={isTh}
          agentConfig={agentConfig}
          setAgentConfig={setAgentConfig}
          agentMarginPercent={agentMarginPercent}
          setAgentMarginPercent={setAgentMarginPercent}
          clientShareUrl={clientShareUrl}
          handleCopyAgentLink={handleCopyAgentLink}
          copiedAgentLink={copiedAgentLink}
          onClose={() => setShowAgentModal(false)}
        />
      )}

      <QuoteDrawer
        isVi={isVi}
        isTh={isTh}
        currency={currency}
        showQuoteModal={showQuoteModal}
        setShowQuoteModal={setShowQuoteModal}
        calculation={calculation}
        selectedBand={selectedBand}
        paxCount={paxCount}
        singleRooms={singleRooms}
        formatPrice={formatPrice}
        agentConfig={agentConfig}
        agentForm={agentForm}
        setAgentForm={setAgentForm}
        submitted={submitted}
        setSubmitted={setSubmitted}
      />
    </div>
  );
}
