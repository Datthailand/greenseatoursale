import React, { useState, useMemo, useEffect } from 'react';
import { ScrollSplitCard } from './ui/ScrollSplitCard';
import { PRICE_GRID, OPTIONAL_ACTIVITIES } from './landing/constants';
import { generateAndDownloadPoster } from './landing/features/posterGenerator';

// Sections
import NavbarSection from './landing/sections/NavbarSection';
import HeroSection from './landing/sections/HeroSection';
import DestinationAccordion from './landing/sections/DestinationAccordion';
import ItinerarySection from './landing/sections/ItinerarySection';
import FlightScheduleSection from './landing/sections/FlightScheduleSection';
import PricingTerminalSection from './landing/sections/PricingTerminalSection';
import TermsSection from './landing/sections/TermsSection';
import FaqSection from './landing/sections/FaqSection';
import PartnersMarquee from './landing/sections/PartnersMarquee';
import FooterSection from './landing/sections/FooterSection';

// Modals
import AddonsModal from './landing/modals/AddonsModal';
import AgentWhiteLabelModal from './landing/modals/AgentWhiteLabelModal';
import QuoteDrawer from './landing/modals/QuoteDrawer';
import FaqModal from './landing/modals/FaqModal';

export default function FITDAD01LandingPage({ onBack, defaultLang = 'VI' }) {
  const [language, setLanguage] = useState(defaultLang); // 'VI', 'TH', or 'EN'
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'THB'
  const [exchangeRate, setExchangeRate] = useState(35); // Custom user-entered USD/THB exchange rate
  const effectiveRate = useMemo(() => {
    const r = parseFloat(exchangeRate);
    return !isNaN(r) && r > 0 ? r : 35;
  }, [exchangeRate]);
  const [activeDayTab, setActiveDayTab] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0); // Interactive Accordion Gallery
  const [activeFlightOrigin, setActiveFlightOrigin] = useState('BKK'); // 'BKK', 'DMK', 'CNX'
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [showAddonsModal, setShowAddonsModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);

  
  // Auto scroll to target section if URL hash present
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, []);
  
  // Interactive Agent Calculator (Fully Synchronized)
  const [selectedBandIdx, setSelectedBandIdx] = useState(2); // default 6-7 pax
  const [paxCount, setPaxCount] = useState(6);
  const [singleRooms, setSingleRooms] = useState(0);
  const [upgradeLimousine, setUpgradeLimousine] = useState('none'); // 'none', 'limo9', 'limo15'
  const [isHoliday, setIsHoliday] = useState(false);
  const [agentMarginPercent, setAgentMarginPercent] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('margin');
    if (m !== null && !isNaN(Number(m))) {
      return Number(m);
    }
    return 15; // default 15%
  });

  // White-Label Agent configuration (from URL params or modal)
  const [agentConfig, setAgentConfig] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const isAgent = params.get('agent') === '1' || params.get('agent') === 'true';
    return {
      isAgent,
      name: params.get('name') || params.get('agent_name') || '',
      tel: params.get('tel') || params.get('agent_tel') || params.get('phone') || '',
      line: params.get('line') || params.get('agent_line') || '',
      hideNet: params.get('hidenet') === '1' || params.get('hide_net') === 'true' || false
    };
  });
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [isExportingPoster, setIsExportingPoster] = useState(false);
  const [copiedAgentLink, setCopiedAgentLink] = useState(false);

  // Export Poster Trigger
  const handleExportPoster = async () => {
    setIsExportingPoster(true);
    try {
      await generateAndDownloadPoster({
        calculation,
        paxCount,
        selectedBand,
        vehicleLabel: getVehicleLabel(selectedBand),
        singleRooms,
        isHoliday,
        currency,
        effectiveRate,
        language,
        agentConfig
      });
    } catch (err) {
      console.error('Failed to export poster:', err);
    } finally {
      setIsExportingPoster(false);
    }
  };

  // Generate White-Label Client Link
  const clientShareUrl = useMemo(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('tour', 'fitdad01');
    params.set('mode', 'landing');
    if (agentConfig.name) {
      params.set('agent', '1');
      params.set('name', agentConfig.name);
      if (agentConfig.tel) params.set('tel', agentConfig.tel);
      if (agentConfig.line) params.set('line', agentConfig.line);
      if (agentConfig.hideNet) params.set('hidenet', '1');
      params.set('margin', agentMarginPercent.toString());
    }
    return baseUrl + '?' + params.toString() + '#pricing-terminal';
  }, [agentConfig, agentMarginPercent]);

  const handleCopyAgentLink = () => {
    navigator.clipboard.writeText(clientShareUrl);
    setCopiedAgentLink(true);
    setTimeout(() => setCopiedAgentLink(false), 2500);
  };
  
  // Dynamic two-way band <-> pax synchronization
  const getBandIdxForPax = (pax) => {
    if (pax <= 3) return 0; // 2-3 pax ($350)
    if (pax <= 5) return 1; // 4-5 pax ($260)
    if (pax <= 7) return 2; // 6-7 pax ($230)
    if (pax <= 9) return 3; // 8-9 pax ($206)
    if (pax <= 11) return 4; // 10-11 pax ($198)
    return 5; // 12-14+ pax ($194)
  };

  const handlePaxChange = (newPax) => {
    const validPax = Math.max(2, Math.min(14, newPax));
    setPaxCount(validPax);
    setSelectedBandIdx(getBandIdxForPax(validPax));
    if (validPax % 2 !== 0) {
      setSingleRooms(1);
    } else {
      setSingleRooms(0);
    }
  };

  const handleBandChange = (newBandIdx) => {
    const idx = Number(newBandIdx);
    setSelectedBandIdx(idx);
    const defaultPaxPerBand = [2, 4, 6, 8, 10, 12];
    const newCount = defaultPaxPerBand[idx] || 2;
    setPaxCount(newCount);
    if (newCount % 2 !== 0) {
      setSingleRooms(1);
    } else {
      setSingleRooms(0);
    }
  };
  
  // UI states
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [agentForm, setAgentForm] = useState({
    agencyName: '',
    contactName: '',
    phoneLine: '',
    departureDate: '',
    pax: 6,
    specialRequests: ''
  });

  const selectedBand = PRICE_GRID[selectedBandIdx];
  const isTh = language === 'TH';
  const isVi = language === 'VI';

  // Calculate Prices (Consistent & Transparent Surcharge Math + Optional Excursions)
  const calculation = useMemo(() => {
    const baseNetPerPax = selectedBand ? selectedBand.usd : 230;
    const holidaySurchargePerPax = isHoliday ? 18 : 0;
    const singleSupp = isHoliday ? 88 : 70;
    const singleRoomsTotal = singleRooms * singleSupp;
    
    // Optional Excursions calculation
    const addonsPerPaxTotal = selectedAddons.reduce((sum, id) => {
      const item = OPTIONAL_ACTIVITIES.find(a => a.id === id);
      return sum + (item ? item.priceUsd : 0);
    }, 0);
    const selectedAddonsList = selectedAddons.map(id => OPTIONAL_ACTIVITIES.find(a => a.id === id)).filter(Boolean);
    const addonsTotalGroup = addonsPerPaxTotal * paxCount;

    let limoExtra = 0;
    if (upgradeLimousine === 'limo9') limoExtra = 89;
    if (upgradeLimousine === 'limo15') limoExtra = 168;

    // Total Net for the whole group (Green Sea receives)
    const netPerPax = baseNetPerPax + holidaySurchargePerPax + addonsPerPaxTotal;
    const totalNetGroup = (netPerPax * paxCount) + singleRoomsTotal + limoExtra;
    const netPerPaxAvg = totalNetGroup / paxCount;
    
    // Base Tour Selling Price per pax (Twin/Double sharing standard):
    const marginMultiplier = 1 + (agentMarginPercent / 100);
    const baseSellPerPax = (baseNetPerPax * marginMultiplier) + addonsPerPaxTotal;
    const limoSellPerPax = limoExtra / paxCount;
    
    const suggestedSellPerPax = Math.round(baseSellPerPax + holidaySurchargePerPax + limoSellPerPax);
    
    // Total retail group price = (Base per pax * paxCount) + single room add-ons
    const totalSellGroup = (suggestedSellPerPax * paxCount) + singleRoomsTotal;
    const agentProfit = totalSellGroup - totalNetGroup;

    return {
      netPerPax,
      singleSupp,
      singleRoomsTotal,
      limoExtra,
      addonsPerPaxTotal,
      selectedAddonsList,
      addonsTotalGroup,
      totalNetGroup,
      netPerPaxAvg: Math.round(netPerPaxAvg),
      suggestedSellPerPax,
      totalSellGroup,
      agentProfit: Math.max(0, Math.round(agentProfit))
    };
  }, [selectedBand, paxCount, singleRooms, upgradeLimousine, isHoliday, agentMarginPercent, selectedAddons]);

  const formatPrice = (usdAmount) => {
    if (currency === 'THB') {
      return `฿${Math.round(usdAmount * effectiveRate).toLocaleString('en-US')}`;
    }
    return `${Math.round(usdAmount).toLocaleString('en-US')}`;
  };

  const getBandLabel = (p) => {
    if (isVi) return p.paxLabelVi;
    if (isTh) return p.paxLabelTh;
    return p.paxLabelEn;
  };

  const getVehicleLabel = (p) => {
    if (isVi) return p.vehicleVi;
    if (isTh) return p.vehicleTh;
    return p.vehicleEn;
  };

  // Copy B2B quote for LINE/Zalo
  const handleCopyQuote = () => {
    let text = '';
    if (isVi) {
      text = `🌟 CHƯƠNG TRÌNH TOUR ĐÀ NẴNG - BÀ NÀ - HỘI AN 3N2Đ (MÃ: FITDAD01)
✨ Điểm nhấn hành trình VIP:
• Nghỉ 1 đêm trên đỉnh Bà Nà Hills (Mercure Danang French Village) + 1 đêm khách sạn 4 sao Đà Nẵng.
• ĐẶC QUYỀN VIP GOLDEN HOURS: Mở tuyến cáp treo sớm 06:00 sáng chạm đỉnh Cầu Vàng đón bình minh trong sương mây — thời điểm lý tưởng nhất để ghi lại vẻ đẹp của Cầu Vàng.
• Vé cáp treo Bà Nà khứ hồi + Check-in Cầu Vàng (Golden Bridge) + Fantasy Park + Vườn hoa Làng Pháp.
• Thuyền thúng Rừng dừa Bảy Mẫu Cẩm Thanh + Khám phá Phố cổ Hội An + Faifo Coffee.
• 2 Buffet lớn (Beer Plaza Bà Nà + Buffet Hải sản Long Qiao TẶNG ½ TÔM HÙM NƯỚNG BƠ) + 3 bữa set menu nhà hàng nổi tiếng (Ngon Thị Hoa, Chic Chillax, Madam Lân) + Bánh Mì.
• Xe du lịch VIP đưa đón riêng + Hướng dẫn viên nói tiếng Thái Lan / tiếng Anh nhiệt tình suốt tuyến.
• Đã bao gồm Bảo hiểm du lịch quốc tế theo quy định của Luật Du lịch Việt Nam.

👥 Số lượng khách: ${paxCount} khách (${getBandLabel(selectedBand)})
💰 Giá báo đề xuất: ${currency === 'THB' ? `฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')}` : `${calculation.suggestedSellPerPax} USD`} / khách (Tỷ giá: 1 USD = ${effectiveRate} THB)
🏨 Phụ thu phòng đơn: ${singleRooms > 0 ? `${singleRooms} phòng (+${formatPrice(calculation.singleSupp)}/phòng)` : 'Không có'}${calculation.selectedAddonsList.length > 0 ? `\n🎯 Dịch vụ tham quan mở rộng: ${calculation.selectedAddonsList.map(a => `${a.nameVi} (+${a.priceUsd})`).join(', ')}` : ''}
📄 Xem chi tiết hình ảnh & lịch trình: ${agentConfig?.isAgent ? clientShareUrl : 'https://greenseatour.vn/?tour=fitdad01&mode=landing'}
🏢 ${agentConfig?.isAgent && agentConfig?.name ? `Đại lý: ${agentConfig.name}` : 'GreenSeaTour - Land Tour Operator Chuyên Tuyến Thái Lan'}
${agentConfig?.isAgent ? (agentConfig.tel ? `📞 Hotline: ${agentConfig.tel}` : '') : '📞 Phone / WhatsApp: (+84) 987.43.43.43'}
${agentConfig?.isAgent ? (agentConfig.line ? `📲 LINE: ${agentConfig.line}` : '') : '📲 LINE Official: https://lin.ee/Pwro79k'}
${agentConfig?.isAgent ? '' : '🌐 Website: www.greensealandtourvietnam.com'}`;
    } else {
      text = `🌟 โปรแกรมทัวร์เวียดนามกลางสุดพรีเมียม (Private VIP FIT)
📍 ดานัง – บานาฮิลล์ – ฮอยอัน 3 วัน 2 คืน (FITDAD01)
✨ ไฮไลท์พิเศษ:
• พักบนยอดเขาบานาฮิลล์ 1 คืน (Mercure Danang French Village) + ดานัง 1 คืน (4 ดาว)
• สิทธิพิเศษ VIP GOLDEN HOURS: นั่งกระเช้ารอบเช้าพิเศษ 06:00 น. เช็คอินสะพานมือสีทองช่วงพระอาทิตย์ขึ้น ท่ามกลางทะเลหมอก ช่วงเวลาที่ดีที่สุดสำหรับการถ่ายภาพความประทับใจ (เฉพาะผู้พัก Mercure)
• ขึ้นกระเช้าบานาฮิลล์ + เช็คอินสะพานมือสีทอง (Golden Bridge) + Fantasy Park + สวนดอกไม้
• นั่งเรือกระด้งหมู่บ้านกั๊มทาน + เดินชมเมืองโบราณฮอยอัน + คาเฟ่ Faifo
• อาหารจัดเต็ม 2 บุฟเฟ่ต์ดัง (Beer Plaza + บุฟเฟ่ต์ซีฟู้ดรวมกุ้งมังกร ½ ตัว) + 3 มื้ออาหารเซ็ตพิเศษ (Ngon Thi Hoa, Chic Chillax, Madam Lan)
• รถตู้ปรับอากาศนำเที่ยวตลอดทริป + ไกด์ภาษาไทยดูแลส่วนตัว
• รวมประกันอุบัติเหตุการเดินทางสำหรับนักท่องเที่ยวต่างชาติตามกฎหมายเวียดนาม

👥 จำนวนผู้เดินทาง: ${paxCount} ท่าน (${selectedBand.paxLabelTh})
💰 ราคาเสนอพิเศษ: ${currency === 'THB' ? `฿${Math.round(calculation.suggestedSellPerPax * effectiveRate).toLocaleString('en-US')}` : `${calculation.suggestedSellPerPax} USD`} / ท่าน (อัตราแลกเปลี่ยน: 1 USD = ${effectiveRate} THB)
🏨 ห้องพักเดี่ยว: ${singleRooms > 0 ? `${singleRooms} ห้อง (+${formatPrice(calculation.singleSupp)}/ห้อง)` : 'ไม่มี'}${calculation.selectedAddonsList.length > 0 ? `\n🎯 บริการท่องเที่ยวเสริม: ${calculation.selectedAddonsList.map(a => `${a.nameTh} (+${a.priceUsd})`).join(', ')}` : ''}
📄 ดูโปรแกรมและรูปภาพเต็ม: ${agentConfig?.isAgent ? clientShareUrl : 'https://greenseatour.vn/?tour=fitdad01&mode=landing'}
🏢 ${agentConfig?.isAgent && agentConfig?.name ? `ตัวแทนจำหน่าย: ${agentConfig.name}` : 'GreenSeaTour - บริษัทแลนด์เวียดนาม สำหรับกรุ๊ปไทย'}
${agentConfig?.isAgent ? (agentConfig.tel ? `📞 เบอร์โทร / Hotline: ${agentConfig.tel}` : '') : '📞 Phone / WhatsApp: (+84) 987.43.43.43'}
${agentConfig?.isAgent ? (agentConfig.line ? `📲 LINE ID: ${agentConfig.line}` : '') : '📲 LINE Official: https://lin.ee/Pwro79k'}
${agentConfig?.isAgent ? '' : '🌐 Website: www.greensealandtourvietnam.com'}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <div style={{
      background: '#fcfdfd',
      color: '#0f172a',
      minHeight: '100vh',
      fontFamily: isTh 
        ? "'Prompt', 'Sarabun', system-ui, sans-serif" 
        : "'Be Vietnam Pro', 'Plus Jakarta Sans', system-ui, sans-serif",
      WebkitFontSmoothing: 'antialiased'
    }}>
      
      {/* 1. REACTBITS FLOATING GLASS NAVBAR */}
      <NavbarSection
        language={language} setLanguage={setLanguage}
        currency={currency} setCurrency={setCurrency}
        isVi={isVi} isTh={isTh}
        agentConfig={agentConfig}
        onBack={onBack}
        onOpenQuote={() => setShowQuoteModal(true)}
        onOpenWhiteLabel={() => setShowAgentModal(true)}
      />

      {/* 2. MAJESTIC CINEMATIC HERO SECTION */}
      <HeroSection
        isVi={isVi} isTh={isTh} language={language}
        currency={currency} effectiveRate={effectiveRate}
        calculation={calculation} selectedBand={selectedBand}
        agentConfig={agentConfig} formatPrice={formatPrice}
        handleCopyQuote={handleCopyQuote} copiedQuote={copiedQuote}
        agentMarginPercent={agentMarginPercent}
      />

      {/* 2.5 SCROLL SPLIT CARD — 3 Thế Mạnh Khi Hợp Tác Với Green Sea Tour */}
      <div id="scroll-split-section" />
      {!agentConfig.isAgent && (
        <ScrollSplitCard
          imageSrc="/assets/golden-bridge.jpg"
          isVi={isVi}
          isTh={isTh}
          onOpenWhiteLabel={() => setShowAgentModal(true)}
          onOpenQuote={() => setShowQuoteModal(true)}
        />
      )}

      {/* 3. INTERACTIVE EXPANDING DESTINATION HIGHLIGHTS ACCORDION */}
      <DestinationAccordion
        isVi={isVi} isTh={isTh}
        activeGalleryIdx={activeGalleryIdx} setActiveGalleryIdx={setActiveGalleryIdx}
        agentConfig={agentConfig}
      />

      {/* 4. INTERACTIVE DAY-BY-DAY TIMELINE & CULINARY SHOWCASE */}
      <ItinerarySection
        isVi={isVi} isTh={isTh}
        activeDayTab={activeDayTab} setActiveDayTab={setActiveDayTab}
        agentConfig={agentConfig}
      />

      {/* 4.5 REAL FLIGHT SCHEDULE MATCHING & AIRPORT TRANSFERS */}
      <FlightScheduleSection
        isVi={isVi} isTh={isTh}
        activeFlightOrigin={activeFlightOrigin} setActiveFlightOrigin={setActiveFlightOrigin}
      />

      {/* 5. B2B EXECUTIVE PRICING TERMINAL & MARGIN SIMULATOR */}
      <PricingTerminalSection
        isVi={isVi} isTh={isTh} language={language}
        currency={currency} setCurrency={setCurrency}
        effectiveRate={effectiveRate} exchangeRate={exchangeRate} setExchangeRate={setExchangeRate}
        selectedBandIdx={selectedBandIdx} handleBandChange={handleBandChange}
        paxCount={paxCount} handlePaxChange={handlePaxChange}
        singleRooms={singleRooms} setSingleRooms={setSingleRooms}
        upgradeLimousine={upgradeLimousine} setUpgradeLimousine={setUpgradeLimousine}
        isHoliday={isHoliday} setIsHoliday={setIsHoliday}
        agentMarginPercent={agentMarginPercent} setAgentMarginPercent={setAgentMarginPercent}
        selectedBand={selectedBand} calculation={calculation}
        formatPrice={formatPrice} getBandLabel={getBandLabel} getVehicleLabel={getVehicleLabel}
        agentConfig={agentConfig}
        handleCopyQuote={handleCopyQuote} copiedQuote={copiedQuote}
        handleExportPoster={handleExportPoster} isExportingPoster={isExportingPoster}
        selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons}
        setShowAddonsModal={setShowAddonsModal}
        setShowAgentModal={setShowAgentModal}
      />

      {/* 6. B2B TERMS, INCLUSIONS & EXCLUSIONS */}
      <TermsSection isVi={isVi} isTh={isTh} agentConfig={agentConfig} />

      {/* 6.5 B2B FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <FaqSection
        isVi={isVi} isTh={isTh}
        expandedFaqId={expandedFaqId} setExpandedFaqId={setExpandedFaqId}
        onOpenFaqModal={() => setShowFaqModal(true)}
        onOpenQuoteDrawer={() => setShowQuoteModal(true)}
        onOpenWhiteLabel={() => setShowAgentModal(true)}
      />

      {/* 7.5 THAI TRAVEL PARTNERS MARQUEE */}
      <PartnersMarquee isVi={isVi} isTh={isTh} />

      {/* 8. FOOTER */}
      <FooterSection
        isVi={isVi} isTh={isTh}
        agentConfig={agentConfig}
        onBack={onBack}
        onOpenWhiteLabel={() => setShowAgentModal(true)}
      />

      {/* OPTIONAL EXCURSIONS POPUP MODAL */}
      {showAddonsModal && (
        <AddonsModal
          isVi={isVi} isTh={isTh}
          selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons}
          onClose={() => setShowAddonsModal(false)}
        />
      )}

      {/* WHITE-LABEL AGENT CUSTOMIZER MODAL */}
      {showAgentModal && (
        <AgentWhiteLabelModal
          isVi={isVi} isTh={isTh}
          agentConfig={agentConfig} setAgentConfig={setAgentConfig}
          agentMarginPercent={agentMarginPercent} setAgentMarginPercent={setAgentMarginPercent}
          clientShareUrl={clientShareUrl}
          handleCopyAgentLink={handleCopyAgentLink} copiedAgentLink={copiedAgentLink}
          onClose={() => setShowAgentModal(false)}
        />
      )}

      {/* FAQ KNOWLEDGE HUB POPUP MODAL */}
      {showFaqModal && (
        <FaqModal
          isVi={isVi} isTh={isTh}
          onClose={() => setShowFaqModal(false)}
          onOpenQuoteDrawer={() => {
            setShowFaqModal(false);
            setShowQuoteModal(true);
          }}
        />
      )}

      {/* FLOATING ACTION BUBBLE + SLIDE-OVER QUOTE DRAWER */}
      <QuoteDrawer
        isVi={isVi} isTh={isTh} language={language}
        currency={currency} effectiveRate={effectiveRate}
        showQuoteModal={showQuoteModal} setShowQuoteModal={setShowQuoteModal}
        calculation={calculation} selectedBand={selectedBand}
        paxCount={paxCount} singleRooms={singleRooms}
        formatPrice={formatPrice} getBandLabel={getBandLabel} getVehicleLabel={getVehicleLabel}
        agentConfig={agentConfig}
        agentForm={agentForm} setAgentForm={setAgentForm}
        submitted={submitted} setSubmitted={setSubmitted}
      />

    </div>
  );
}