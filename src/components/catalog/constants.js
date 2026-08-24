export const packageFilters = ['GIT', 'FIT'];
export const sortModes = ['Popular', 'Price Low', 'Duration'];

export const EXCHANGE_RATE = 35; // 1 USD = 35 THB

export const translations = {
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

export function t(key, language) {
  return translations[language]?.[key] || translations.EN[key] || key;
}

export function formatMoney(value, currency) {
  if (currency === 'THB') {
    return `${Math.round(value * EXCHANGE_RATE).toLocaleString()} ฿`;
  }
  return `$${value.toLocaleString()}`;
}

export function getHotelStandard(tour) {
  if (tour.hotel.includes('5*')) return '5* Standard';
  if (tour.hotel.includes('3*') && tour.hotel.includes('4*')) return '3* / 4* Standard';
  if (tour.hotel.includes('4*')) return '4* Standard';
  if (tour.hotel.includes('3*')) return '3* Standard';
  return 'Standard';
}

export function getQuoteText(tour, currency) {
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

export const regionKeyMap = {
  'North Vietnam': 'northVietnam',
  'Central Vietnam': 'centralVietnam',
  'Southern Vietnam': 'southernVietnam',
  'Phu Quoc': 'phuQuoc',
};
