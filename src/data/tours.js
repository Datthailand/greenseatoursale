const kitAssets = {
  fitCentral: {
    pdf: '/sales-kits/fit-central-vietnam-2026.pdf',
    cover: '/assets/covers/fit-central-vietnam-2026.png',
    thumb: '/assets/thumbs/fit-central-vietnam-2026.jpg',
    label: 'Sales kit FIT - Central Vietnam 2026',
  },
  fitNorth: {
    pdf: '/sales-kits/fit-north-vietnam-2026.pdf',
    cover: '/assets/covers/fit-north-vietnam-2026.png',
    thumb: '/assets/thumbs/fit-north-vietnam-2026.jpg',
    label: 'Sales kit FIT - North Vietnam 2026',
  },
  fitPhuQuoc: {
    pdf: '/sales-kits/fit-phu-quoc-2026.pdf',
    cover: '/assets/covers/fit-phu-quoc-2026.png',
    thumb: '/assets/thumbs/fit-phu-quoc-2026.jpg',
    label: 'Sales kit FIT - Phu Quoc 2026',
  },
  fitSouth: {
    pdf: '/sales-kits/fit-southern-vietnam-2026.pdf',
    cover: '/assets/covers/fit-southern-vietnam-2026.png',
    thumb: '/assets/thumbs/fit-southern-vietnam-2026.jpg',
    label: 'Sales kit FIT - Southern Vietnam 2026',
  },
  gitCentral: {
    pdf: '/sales-kits/git-central-vietnam-2026.pdf',
    cover: '/assets/covers/git-central-vietnam-2026.png',
    thumb: '/assets/thumbs/git-central-vietnam-2026.jpg',
    label: 'Sales kit GIT - Central Vietnam 2026',
  },
  gitNorth: {
    pdf: '/sales-kits/git-north-vietnam-2026.pdf',
    cover: '/assets/covers/git-north-vietnam-2026.png',
    thumb: '/assets/thumbs/git-north-vietnam-2026.jpg',
    label: 'Sales kit GIT - North Vietnam 2026',
  },
  gitPhuQuoc: {
    pdf: '/sales-kits/git-phu-quoc-vietnam-2026.pdf',
    cover: '/assets/covers/git-phu-quoc-vietnam-2026.png',
    thumb: '/assets/thumbs/git-phu-quoc-vietnam-2026.jpg',
    label: 'Sales kit GIT - Phu Quoc Vietnam 2026',
  },
  gitSouth: {
    pdf: '/sales-kits/git-southern-vietnam-2026.pdf',
    cover: '/assets/covers/git-southern-vietnam-2026.png',
    thumb: '/assets/thumbs/git-southern-vietnam-2026.jpg',
    label: 'Sales kit GIT - Southern Vietnam 2026',
  },
};

const fitBandsSmall = ['2-3', '4-5', '6-7', '8-9', '10-11', '12-14'];
const fitBands = ['4-5', '6-7', '8-9', '10-11', '12-14'];
const gitBands = ['8-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-42'];
const pqc02Bands = ['8-9', '12-14', '15-19', '20-24', '25-29', '30-34', '35-42'];

const sharedTerms = {
  inclusions: [
    'Hotels in twin/triple rooms for all listed nights',
    'Breakfast at hotel and listed main meals or buffets',
    'Quality air-conditioned vehicle by group size',
    'Local guide in Thai or English on request',
    'Entrance tickets for attractions listed in the program',
  ],
  exclusions: [
    'Guide and driver tip per program',
    'Personal expenses and optional shows/meals',
    'Any service not clearly listed in the program',
  ],
  policies: [
    '30% deposit after group confirmation',
    'Balance payment 7-14 days before departure depending on sales kit',
    'No charge before 21 days from check-in',
    '20 to 7 days before departure: 50% tour charge',
    'From 6 days before departure: 90% tour charge',
  ],
};

const makePrice = (season, bands, values, single) => ({
  season,
  cells: bands.map((band, index) => ({ band, value: values[index] })),
  single,
});

const makeTour = (tour) => {
  const rowMinimums = tour.priceRows.flatMap((row) => row.cells.map((cell) => cell.value));
  return {
    ...tour,
    priceFrom: Math.min(...rowMinimums),
    inclusions: tour.inclusions || sharedTerms.inclusions,
    exclusions: tour.exclusions || sharedTerms.exclusions,
    policies: tour.policies || sharedTerms.policies,
  };
};

export const regions = ['North Vietnam', 'Central Vietnam', 'Southern Vietnam', 'Phu Quoc'];

export const tours = [
  makeTour({
    id: 'fitdad01',
    code: 'FITDAD01',
    packageType: 'FIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Ba Na Hills, Hoi An',
    route: 'Da Nang > Ba Na Hills > Hoi An',
    duration: 3,
    nights: 'Ba Na Hills 1N + Da Nang 1N',
    hotel: 'Mercure Ba Na Hill and Dong Duong Hotel 4* or similar',
    groupRange: '2-14 pax',
    vehicle: '16-seat or 29-seat mini bus; limousine upgrade available',
    tip: '600 THB/pax/trip, or 300 THB/pax/trip from 8 pax',
    assets: kitAssets.fitCentral,
    sourcePages: 'Itinerary p3, price p4',
    surcharges: ['29/04-02/05/2026 +18 USD/pax', '24-25/12/2026 single +88 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBandsSmall, [350, 260, 230, 206, 198, 194], '+70 USD')],
    highlights: ['Golden Bridge and Ba Na Hills overnight', 'Hoi An Ancient Town and basket boat', 'Linh Ung pagoda, Son Tra Marina, Dragon Bridge, Han Market'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Ba Na Hills',
            titleTh: 'DA NANG – BA NA HILLS',
            notes: ['Airport pickup', 'Cable car to Ba Na Hills', 'Golden Bridge, Fantasy Park, Flower Garden', 'Overnight at Mercure Ba Na Hills'],
            notesTh: ['รับคณะที่สนามบิน ที่สนามบิน', 'ขึ้นกระเช้าบำนำฮิวล์', 'ชมสะพานมือ', 'สวนสนุกบำนำฮิวล์', 'สวนดอกไม้', '*ถ้าใช้หอ้ งFamily Bunk พัก3ท่าน +25$/ห้อง/คืน'],
            lunch: 'Ngon Thi Hoa 11$',
            dinner: 'Beer plaza buffet',
            overnightTh: 'พักที่ Mercure Ba Na Hill',
            lunchMenuTh: ['เฝอไก่', 'เปำะเปี๊ยะกุ้ง หมูสด', 'แหนมเนือง', 'ขนมฮอยหมูย่า ง', 'ข้าวผัดไข่', 'ผลไม้'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'Ba Na Hills - Hoi An - Da Nang',
            titleTh: 'BA NA HILLS – HOI AN – DA NANG',
            notes: ['Hotel breakfast', 'Hoi An Ancient Town walk', 'Basket boat ride', 'Faifo coffee stop, drinks excluded'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ลงกระเช้า แล้วเดินทางไปฮอยอัน', 'เดินชมเมืองโบราณฮอยอัน', 'นัง่ เรือกระด้ง', 'ร้านกำแฟ Faifo (ไม่รวมเครื่ องดื่ม)', 'กลับไปดานัง'],
            lunch: 'Chic Chillax Hoi An 11$',
            dinner: 'Long Qiao buffet',
            overnightTh: 'พักที่ Dong Duong Hotel (4 Stars) or similar',
            lunchMenuTh: ['เปำะเปี๊ยะทอด', 'ยำหัวปลีกงุ้', 'ซุปเห็ด', 'ปลาทับทิมนึ่ง + กะหล่ำปลีห่อเห็ด', 'ไก่ผดั ขิง', 'ผักกวำงตุง้ ผัดกระเทียม', 'ข้าวผัดผักรวม', 'แตงโม'],
            dinnerMenuTh: ['ของสดนึ่ง', 'หม้อไฟ', 'รวมกุ้ง มังกรอบเนย ½ ตัว/ท่าน'],
          },
      {
            day: 3,
            title: 'Da Nang - Airport',
            titleTh: 'DA NANG - AIRPORT',
            notes: ['Linh Ung pagoda', 'Son Tra Marina photo stop', 'Dragon Bridge and Han Market', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ไหว้พระวัดลิงอื๋ง', 'Sontra Marina Café (ไม่รวมอาหารและเครื่ องดื่ม)', 'ถ่ายรูปสะพานมังกร', 'ชอปปิ้ งตลาดฮำน', 'ไปสนามบิน ส่ งคณะ จบโปรแกรม'],
            lunch: 'Madam Lan 12$',
            dinner: 'Banh mi',
            overnightTh: '',
            lunchMenuTh: ['เปำะเปี๊ยะสดกุ้งหมู', 'เปำะเปี๊ยะทะเลทอด', 'ปลาต้มเค็มหม้อดิน', 'ผัดผักบุง้', 'ข้าว', 'แกงจืดไข่ปู', 'ผลไม้'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '350', single: '' },
      { label: '29/04-02/05/2026', merged: '+18$/pax', single: '+88$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 3 มื้อ + บุฟเฟ่ ต์ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                  300baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fitdad02',
    code: 'FITDAD02',
    packageType: 'FIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Ba Na Hills, Hoi An',
    route: 'Da Nang > Ba Na Hills > Hoi An',
    duration: 4,
    nights: 'Ba Na Hills 1N + Da Nang 2N',
    hotel: 'Mercure Ba Na Hotel and Dong Duong Hotel 4* or similar',
    groupRange: '2-14 pax',
    vehicle: '16-seat or 29-seat mini bus; limousine upgrade available',
    tip: '800 THB/pax/trip, or 400 THB/pax/trip from 8 pax',
    assets: kitAssets.fitCentral,
    sourcePages: 'Itinerary p5, price p6',
    surcharges: ['29/04-02/05/2026 +20 USD/pax', '24-25/12/2026 single +100 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBandsSmall, [395, 290, 255, 229, 220, 215], '+80 USD')],
    highlights: ['Ba Na Hills overnight', 'Hoi An Ancient Town and basket boat', 'Da Nang city photos and Han Market shopping'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Ba Na Hills',
            titleTh: 'DA NANG – BA NA HILLS',
            notes: ['Airport pickup', 'Cable car and Golden Bridge', 'Fantasy Park and Flower Garden'],
            notesTh: ['รับคณะที่สนามบิน ที่สนามบิน', 'ขึ้นกระเช้าบำนำฮิวล์', 'ชมสะพานมือ', 'สวนสนุกบำนำฮิวล์', 'สวนดอกไม้', '*ถ้าใช้หอ้ งFamily Bunk พัก3ท่าน +25$/ห้อง/คืน'],
            lunch: 'Ngon Thi Hoa',
            dinner: 'Mercure buffet',
            overnightTh: 'พักที่ Mercure Bana Hotel (4 Stars)',
            lunchMenuTh: ['เฝอไก่', 'เปำะเปี๊ยะกุ้ง หมูสด', 'แหนมเนื อง', 'ขนมฮอยหมูย่ำง', 'ข้าวผัดไข่', 'ผลไม้'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'Ba Na Hills - Hoi An - Da Nang',
            titleTh: 'BA NA HILLS – HOI AN',
            notes: ['Hoi An Ancient Town', 'Basket boat ride', 'Faifo coffee stop, drinks excluded'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ลงกระเช้า', 'แล้วเดินทางไปฮอยอัน', 'เดินชมเมืองโบราณฮอยอัน', 'นัง่ เรือกระด้ง', 'ร้านกำแฟ Faifo (ไม่รวมเครื่ องดื่ม)', 'กลับไปดานัง'],
            lunch: 'Chic Chillax Hoi An',
            dinner: 'Organic',
            overnightTh: 'พักที่ Dong Duong Hotel (4 Stars) or similar',
            lunchMenuTh: ['เปำะเปี๊ยะทอด', 'ยำหัวปลีกุ้ง', 'ซุ ปเห็ด', 'ปลาทับทิมนึ่ ง + กะหล่ำปลีห่อเห็ด', 'ไก่ผดั ขิง', 'ผักกวำงตุง้ ผัดกระเทียม', 'ข้าวผัดผักรวม', 'แตงโม'],
            dinnerMenuTh: ['ซุ ปไก่เมล็ดบัว', 'เซคบัญ   ๊ ก๊วน (ขนมปำกหม้อ)', 'บัญ๊ ก๊วน', 'ไก่ซอสเห็ด', 'หมูยอ', 'ไข่', 'เซคทะเลนึ่ ง หอยหลำยชนิ ด', 'ปลาหมึก ข้าวโพด แครอท', 'หม้อไฟทะเล กุ้ง ปลาทะเล หมูสำม', 'ชั้น ทอดมันปลา ทอดมันปลาหมึก', 'เต้ำหู ้ ผัก และเส้นหมี่', 'พุดดิ้งมะพร้ำว'],
          },
      {
            day: 3,
            title: 'Da Nang City',
            titleTh: 'DA NANG',
            notes: ['Linh Ung pagoda', 'Son Tra Marina', 'Dragon Bridge and Love Bridge photo stops'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ไหว้พระวัดลิงอื๋ง', 'Sontra Marina Café (ไม่รวมเครื่ องดื่ม)', 'ถ่ายรูปสะพานมังกร', 'ถ่ายรูปที่สะพานแห่งควำมรัก'],
            lunch: 'Madam Lan',
            dinner: 'Long Qiao buffet',
            overnightTh: 'พักที่ Dong Duong Hotel (4 Stars) or similar',
            lunchMenuTh: ['เปำะเปี๊ยะสดกุ้งหมู', 'เปำะเปี๊ยะทะเลทอด', 'ปลาต้มเค็มหม้อดิน', 'ผัดผักบุง้', 'ข้าว', 'แกงจืดไข่ปู', 'ผลไม้'],
            dinnerMenuTh: ['ของสดนึ่ง', 'หม้อไฟ', 'รวมกุ้ง มังกรอบเนย ½ ตัว/ท่าน'],
          },
      {
            day: 4,
            title: 'Da Nang - Airport',
            titleTh: 'DA NANG - AIRPORT',
            notes: ['Hotel breakfast', 'Han Market shopping', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ชอปปิ้ งตลาดฮำน', 'ไปสนามบิน ส่ งคณะ จบโปรแกรม'],
            lunch: 'Banh mi',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '395', single: '' },
      { label: '29/04-02/05/2026', merged: '+20$/pax', single: '+100$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 4 มื้อ + บุฟเฟ่ ต์ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                        400baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fithan01',
    code: 'FITHAN01',
    packageType: 'FIT',
    region: 'North Vietnam',
    title: 'Ha Noi, Tam Dao, Ninh Binh',
    route: 'Ha Noi > Tam Dao > Ninh Binh',
    duration: 3,
    nights: 'Ha Noi 1N + Tam Dao 1N',
    hotel: 'Venus Hotel 4+* and La Sante Hotel & Spa 4* or similar',
    groupRange: '4-14 pax',
    vehicle: '16-seat or 29-seat mini bus',
    tip: '600 THB/pax/trip, or 300 THB/pax/trip from 8 pax',
    assets: kitAssets.fitNorth,
    sourcePages: 'Itinerary p3, price p4',
    surcharges: ['29/04-02/05/2026 +30 USD/pax', '24-26/12/2026 single +100 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBands, [245, 205, 185, 178, 170], '+70 USD')],
    highlights: ['Tam Dao stone church and Quan Gio cafe', 'Mega Grand World and Ha Noi old quarter', 'Tam Coc boat in Ninh Binh'],
    itinerary: [
      {
            day: 1,
            title: 'Ha Noi - Tam Dao',
            titleTh: 'HA NOI – TAM DAO',
            notes: ['Airport pickup', 'Tam Dao stone church', 'Quan Gio cafe, drinks excluded'],
            notesTh: ['รับคณะที่สนามบิน เดินทางไปตำมดำว', 'โบสถ์หินตำมด๋ ำว', 'ร้านกำแฟ Quan Gio (ไม่รวมเครื่ องดื่ม)'],
            lunch: 'Rock Cafe 15$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4+ star: Venus hotel or similar',
            lunchMenuTh: ['สลัดใส่ เนื้อรมควัน', 'มันฝรั่งทอด', 'แซลมอนซอสเสำวรส', 'ขนมปังกระเทียมเนย', 'ขนมหวาน'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'Tam Dao - Ha Noi',
            titleTh: 'TAM DAO – HA NOI',
            notes: ['Free time in Tam Dao', 'Return to Ha Noi', 'Mega Grand World, Hoan Kiem Lake, 36 Streets'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'อิสระเที่ยวเมืองตำมด๋ ำว', 'เดินทางกลับฮำนอย', 'Mega Grand World', 'ทะเลสาบคืนดำบ', 'ถนน สาย 36'],
            lunch: 'Ngon PBC 20$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star: La Sante hotel and Spa or similar',
            lunchMenuTh: ['ยำไหลบัวกุ้ง หมู', 'ขนมเบื้องญวน', 'เปำะเปี๊ยะปูทอด', 'ปลาหมึกแดดเดียวทอด', 'ขนมจีน หมูย่า ง', 'หอยโข่งผัดมะขำม', 'ผลไม้ + ชำ'],
            dinnerMenuTh: [],
          },
      {
            day: 3,
            title: 'Ninh Binh - Airport',
            titleTh: 'NINH BINH – AIRPORT',
            notes: ['Transfer to Ninh Binh', 'Tam Coc boat trip', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปนิงห์บินห์', 'ล่องเรือตำมก๊อก', 'ไปสนามบิน ส่ งคณะ จบโปรแกรม'],
            lunch: 'Vu Bao 22$',
            dinner: 'ไม่ รวม',
            overnightTh: '',
            lunchMenuTh: ['สลัดไข่สำหร่ ำยทะเล', 'ไก่น่ ึง', 'หอยทำกยัดไส้ต๋ ุน', 'หมูสำมชั้นทอด', 'ผักกำดผัดเห็ด', 'ข้าว', 'แกงส้ม', 'ผลไม้'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '245', single: '' },
      { label: '29/04-02/05/2026', merged: '+30$/pax', single: '+100$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 3 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                  300baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fithan02',
    code: 'FITHAN02',
    packageType: 'FIT',
    region: 'North Vietnam',
    title: 'Ha Noi and Sapa',
    route: 'Ha Noi > Sapa',
    duration: 4,
    nights: 'Sapa 2N + Ha Noi 1N',
    hotel: 'Babeeni 4* or similar, plus Ha Noi 4* hotel',
    groupRange: '4-14 pax',
    vehicle: '16-seat or 29-seat mini bus',
    tip: '800 THB/pax/trip, or 400 THB/pax/trip from 8 pax',
    assets: kitAssets.fitNorth,
    sourcePages: 'Itinerary p5, price p6',
    surcharges: ['29/04-02/05/2026 +30 USD/pax', '24-26/12/2026 single +95 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBands, [350, 300, 275, 260, 255], '+65 USD')],
    highlights: ['Cat Cat village and Moana Sapa', 'Sapa church and night market', 'Fansipan station area and mountain-view routing'],
    itinerary: [
      {
            day: 1,
            title: 'Ha Noi - Sapa',
            titleTh: 'HA NOI – SAPA',
            notes: ['Airport pickup', 'Drive to Sapa', 'Cat Cat village, Moana, Sapa church, night market'],
            notesTh: ['รับคณะที่สนามบิน แล้วเดินทางไปซำปำ (ประมำณ 6 ชั่วโมง)', 'หมู่บ้า นก๊ำดๆ', 'ร้านกำแฟ Moana (รวมน้ำเปล่ำท่านละ 1 ขวด) - โบสถ์ หิน', 'ตลาดไนต์ซำปำ', 'รับประทานอาหารเย็นและพักผ่อนที่โรงแรม'],
            lunch: 'Lam Dong luxury 14$',
            dinner: 'Cho Tinh Quan 14$',
            overnightTh: 'Hotel 4 star: Babeeni or similar',
            lunchMenuTh: ['ไก่ผดั ตะไคร้พริ ก', 'หมูเคี่ยวซอสน้ำปลาใส่ พริ ก', 'ซี่โครงหมูผดั เปรี้ ยวหวาน', 'ปลา รำดซอสเปรี้ ยวเผ็ด', 'ไข่เจียวใส่ ตน้ หอม', 'แกงผักกำดใส่ หมูสับ', 'ข้าวสวย', 'ผลไม้ + น้ำเปล่ำ'],
            dinnerMenuTh: ['มีกำรแสดงรำพื้นเมือง', 'ปลาสเตอร์เจียนทอดเกลือ', 'ปลาแซนมอนย่ำงซิสฟักทอง', 'มันฝรั่งทอด', 'ผัดหมูสับ', 'หม้อไฟไก่', 'เห็ดจุ่ม + ผักสด', 'ผลไม้', 'ชำ'],
          },
      {
            day: 2,
            title: 'Sapa',
            titleTh: 'SAPA',
            notes: ['Hotel breakfast', 'Fansipan station area', 'Sapa sightseeing and local set meals'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'นัง่ รถรำงจำกเมือง ไปสถำนีกระเช้า', 'ขึ้นกระเช้า Faxipan', 'Option: รถรำงขึ้นยอดเขำ +7$/pax/one way (ยังไม่รวม)', 'ไหว้พระวัด Fanxipan', 'ลงกระเช้า', 'Option: Rong May Glass Bridge +23$/pax (ยังไม่รวม)'],
            lunch: 'Van Sam (Fanxipan Station)',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star: Babeeni or similar',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: [],
          },
      {
            day: 3,
            title: 'Sapa - Ha Noi',
            titleTh: 'SAPA – HA NOI',
            notes: ['Morning in Sapa', 'Return to Ha Noi', 'Evening city time'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางกลับฮำนอย', 'แวะร้านเยื้อไผ่', 'ถนน สาย 36', 'ทะเลสาบคืนดำบ'],
            lunch: 'Dong Mai 15$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star: La Sante hotel and Spa or similar',
            lunchMenuTh: ['ไก่หมุนน้ำผึ้ง', 'ปลาซอสเปรี้ ยวเผ็ด', 'หมูเคี่ยวซอสน้ำปลาใส่ พริ ก', 'ปลาหมึกผัดสับปะรดและหัวหอม', 'ผักผัดกระเทียม', 'แกงลูกชิ้นหมูเห็ดหอม', 'ข้าว + ผลไม้ + น้ำเปล่ำ'],
            dinnerMenuTh: [],
          },
      {
            day: 4,
            title: 'Ha Noi - Airport',
            titleTh: 'HA NOI – AIRPORT',
            notes: ['Hotel breakfast', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ถ่ายรูปที่ Mega World', 'สุ สำนลุงโฮ (ถ่ายรูปด้ำนอนก)', 'วัดเฉินก๊วก', 'ไปสนามบิน ส่ งคณะ จบโปรแกรม'],
            lunch: 'Ngon PBC 20$',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['ยำไหลบัวกุ้ง หมู', 'ขนมเบื้องญวน', 'เปำะเปี๊ยะปูทอด', 'ปลาหมึกแดดเดียวทอด', 'ขนมจีน หมูย่า ง', 'หอยโข่งผัดมะขำม', 'ผลไม้ + ชำ'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '350', single: '' },
      { label: '29/04-02/05/2026', merged: '+30$/pax', single: '+95$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 4 มื้อ + บุฟเฟ่ ต์ 1 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                  400baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fithan03',
    code: 'FITHAN03',
    packageType: 'FIT',
    region: 'North Vietnam',
    title: 'Ha Noi, Ha Long, Ninh Binh',
    route: 'Ha Noi > Ha Long > Ninh Binh',
    duration: 4,
    nights: 'Ha Noi 2N + Ha Long 1N',
    hotel: 'The Watson Premium 5* and La Sante Hotel & Spa 4* or similar',
    groupRange: '4-14 pax',
    vehicle: '16-seat or 29-seat mini bus',
    tip: '800 THB/pax/trip, or 400 THB/pax/trip from 8 pax',
    assets: kitAssets.fitNorth,
    sourcePages: 'Itinerary p7, price p8',
    surcharges: ['29/04-02/05/2026 +30 USD/pax', '24-26/12/2026 single +100 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBands, [322, 278, 257, 255, 250], '+70 USD')],
    highlights: ['Ha Long Queen Sun World cable car', 'Ha Long Bay cruise and cave visit', 'Ninh Binh day with boat route'],
    itinerary: [
      {
            day: 1,
            title: 'Ha Noi - Ha Long',
            titleTh: 'HA NOI – HA LONG',
            notes: ['Airport pickup', 'Mega Grand World photo stop', 'Queen Sun World cable car'],
            notesTh: ['รับคณะที่สนามบิน', 'เดินทางเมืองฮำลอง (ประมำณ 3 ชั่วโมง)', 'แวะถ่ายรูป Mega Grand World', 'นัง่ กระเช้าข้ำมทะเล Queen Sun World'],
            lunch: 'Ngon PBC 20$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 5 star: The Watson Premium or similar',
            lunchMenuTh: ['ยำไหลบัวกุ้ง หมู', 'ขนมเบื้องญวน', 'เปำะเปี๊ยะปูทอด', 'ปลาหมึกแดดเดียวทอด', 'ขนมจีน หมูย่า ง', 'หอยโข่งผัดมะขำม', 'ผลไม้ + ชำ'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'Ha Long - Ha Noi',
            titleTh: 'HA LONG – HA NOI',
            notes: ['Ha Long Bay cruise', 'Cave visit', 'Return to Ha Noi old quarter'],
            notesTh: ['รับประทานอาหารเช้าที่โรงแรม', 'ล่องเรืออ่ำวฮำลอง เกำะต่างๆ', 'ถ้ ำสวรรค์', 'เดินทางกลบฮำนอย', 'โบสถ์ฮำนอย', 'ถนน 36สาย'],
            lunch: 'Sen A Dong',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star: La sante hotel & Spa or similar',
            lunchMenuTh: ['Buffet'],
            dinnerMenuTh: [],
          },
      {
            day: 3,
            title: 'Ninh Binh - Ha Noi',
            titleTh: 'NINH BINH - HA NOI',
            notes: ['Ninh Binh sightseeing', 'Boat route and countryside stops', 'Return to Ha Noi'],
            notesTh: ['รับประทานอาหารเช้าที่โรงแรม', 'เดินทางนิงห์บิงห์', 'ล่องเรือตำมก๊ก', 'กลับฮำนอย'],
            lunch: 'Vu Bao 22$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star: La sante hotel & Spa or similar',
            lunchMenuTh: ['สลัดไข่สำหร่ ำยทะเล', 'ไก่น่ ึง', 'หอยทำกยัดไส้ต๋ ุน', 'หมูสำมชั้นทอด', 'ผักกำดผัดเห็ด', 'ข้าว', 'แกงส้ม', 'ผลไม้'],
            dinnerMenuTh: [],
          },
      {
            day: 4,
            title: 'Ha Noi - Airport',
            titleTh: 'HA NOI –– AIRPORT',
            notes: ['Hotel breakfast', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้าที่โรงแรม', 'ช้สุสำนลุงโฮ และบริ เวณบ้านลุงโฮ วัดเสำเดียว', 'วัดเฉินก๊วก', 'ชอปปิ้ ง Lotte Mall ไปสนามบิน ส่ งคณะ จบโปรแกรม'],
            lunch: 'Sen',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['Buffet'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '322', single: '' },
      { label: '29/04-02/05/2026', merged: '+30$/pax', single: '+100$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 4 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                    400baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fitpqc01',
    code: 'FITPQC01',
    packageType: 'FIT',
    region: 'Phu Quoc',
    title: 'Phu Quoc Island',
    route: 'Phu Quoc > Hon Thom > Grand World',
    duration: 3,
    nights: 'Phu Quoc 2N',
    hotel: 'Vin Holiday Fiesta 4* standard or similar',
    groupRange: '4-14 pax',
    vehicle: '16-seat or 29-seat mini bus',
    tip: '600 THB/pax/trip, or 300 THB/pax/trip from 8 pax',
    assets: kitAssets.fitPhuQuoc,
    sourcePages: 'Itinerary p3, price p4',
    surcharges: ['29/04-02/05/2026 +25 USD/pax', '24-25/12/2026 +50 USD/pax'],
    priceRows: [makePrice('01/04-30/12/2026', fitBands, [220, 190, 177, 171, 170], '+80 USD')],
    highlights: ['Hon Thom cable car and Aquatopia', 'Sunset Town and Kiss Bridge', 'VinWonders, Grand World, Venice show area'],
    itinerary: [
      {
            day: 1,
            title: 'Phu Quoc - Hon Thom Cable Car',
            titleTh: 'PHU QUOC – HON THOM CABLE CAR',
            notes: ['Airport pickup', 'Hon Thom cable car', 'Aquatopia water park', 'Sunset Town and Kiss Bridge'],
            notesTh: ['รับคณะที่สนามบินฟูก๊วก', 'ไปเที่ยวกระเช้าทะเล Hon Thom', 'สวนสนุก สวนน้ำ Aquatopia ชำยหำด Hon Thom', 'ถ่ายรูปโซน Sunset town', 'ถ่ายรูปสะพานจูบ แลนด์มำกใหม่ของฟูก๊วก Option 1: The Kiss of Sea Show +26$/pax (21.00-21.35) ยกเว้นวันอังคำร Option 2: Set menu at Bavavia restaurant +23$/pax'],
            lunch: 'Bun Quay Kien Xay 5$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['ขนมจีนซีฟูด Full Toping', 'คนละชำม + 1 solf drink'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'VinWonders - Grand World',
            titleTh: 'VIN WONDER',
            notes: ['VinWonders amusement park', 'Aquarium and water park', 'Grand World and Venice show area'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนสนุก Vin Wonder สวนน้ำ และ Aquarium', 'ไปเที่ยว Grand World Phu Quoc ที่ได้ฉำยำนำมว่ำ Venice แห่งเวียดนำม', 'ชมบ้านไม้ไผ่', 'หมู่บ้า น Venice โชว์กลำงคืน', 'อิสระเล่นคำซีโนที่ Corona Casino', 'อิสระชมโชว์ The color of venice จักขึ้นบริ เวณแม่น้ำเวนิส 21.30-22.00 Option 1: ล่องเรือ Gondola +9$/pax (ยังไม่รวม) Option 2: Teddy Bear Museum +9$/pax (ยังไม่รวม)'],
            lunch: 'Vin Wonder',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: [],
          },
      {
            day: 3,
            title: 'Phu Quoc - Airport',
            titleTh: 'AIRPORT',
            notes: ['Hotel breakfast', 'Pearl shopping stop', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ส่ งคณะไปสนามบิน'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '220', single: '' },
      { label: '29/04-02/05/2026', merged: '+25$/pax', single: '+105$' },
      { label: '24-25/12/2026', merged: '+50$/pax', single: '+130$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 2 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                           ท่านขึ้นไป 300baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fitpqc02',
    code: 'FITPQC02',
    packageType: 'FIT',
    region: 'Phu Quoc',
    title: 'Phu Quoc Island',
    route: 'Phu Quoc > Grand World > Hon Thom',
    duration: 4,
    nights: 'Phu Quoc 3N',
    hotel: 'Vin Holiday Fiesta 4* standard or similar',
    groupRange: '4-14 pax',
    vehicle: '16-seat or 29-seat mini bus',
    tip: '800 THB/pax/trip, or 400 THB/pax/trip from 8 pax',
    assets: kitAssets.fitPhuQuoc,
    sourcePages: 'Itinerary p5, price p6',
    surcharges: ['29/04-02/05/2026 +35 USD/pax', '24/12/2026-02/01/2027 +60 USD/pax'],
    priceRows: [makePrice('01/04-30/12/2026', fitBands, [268, 233, 215, 210, 205], '+110 USD')],
    highlights: ['Ho Quoc pagoda, Dinh Cau and bamboo house', 'VinWonders and Grand World', 'Hon Thom cable car and Sunset Town'],
    itinerary: [
      {
            day: 1,
            title: 'Phu Quoc',
            titleTh: 'PHU QUOC',
            notes: ['Airport pickup', 'Ho Quoc pagoda', 'Dinh Cau shrine', 'Bamboo house and Grand World night show'],
            notesTh: ['รับคณะที่สนามบินฟูก๊วก แล้วขึ้นรถ', 'ไปวัดโฮก๊วก', 'ไปสำรเจ้ำ Dinh Cau', 'ชมบ้านไม้ไผ่', 'หมู่บ้า น Venice โชว์กลำงคืน'],
            lunch: 'Bun Quay Kien Xay 5$',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['ขนมจีนซีฟูด Full Toping', 'คนละชำม + 1 solf drink'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'VinWonders - Grand World',
            titleTh: 'VIN WONDER -GRAND WORLD',
            notes: ['VinWonders', 'Aquarium and water park', 'Free time in Grand World'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนสนุก Vin Wonder', 'สวนน้ำ และ Aquarium', 'อิสระใน Grand World', 'อิสระชมโชว์ The color of venice จักขึ้นบริ เวณแม่น้ำเวนิส 21.30-22.00'],
            lunch: 'Vin Wonder',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['Buffet'],
            dinnerMenuTh: [],
          },
      {
            day: 3,
            title: 'Hon Thom Cable Car',
            titleTh: 'PHU QUOC – HON THOM CABLE CAR',
            notes: ['Hon Thom cable car', 'Aquatopia', 'Sunset Town and Kiss Bridge'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ไปเที่ยวกระเช้าทะเล Hon Thom', 'สวนสนุก สวนน้ำ Aquatopia ชำยหำด Hon Thom', 'ถ่ายรูปโซนใหม่ฟูก๊วก Mediterranean Sunset Town', 'ถ่ายรูปสะพานจูป แลนด์มำกใหม่ของฟูก๊วก Option 1: The Kiss of Sea Show +26$/pax (21.00-21.35) ยกเว้น วันอังคำร Option 2: Set menu at Bavavia restaurant +23$/pax'],
            lunch: 'Hon Thom',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star: Roma Phu Quoc or similar (Sunset town zone)',
            lunchMenuTh: ['Buffet'],
            dinnerMenuTh: [],
          },
      {
            day: 4,
            title: 'Phu Quoc - Airport',
            titleTh: 'AIRPORT',
            notes: ['Hotel breakfast', 'Pearl shopping stop', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ส่ งคณะไปสนามบิน'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '268', single: '' },
      { label: '29/04-02/05/2026', merged: '+35$/pax', single: '+145$' },
      { label: '24/12/2026-02/01/2027', merged: '+60$/pax', single: '+170$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 3 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                         400baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fitcxr01',
    code: 'FITCXR01',
    packageType: 'FIT',
    region: 'Southern Vietnam',
    title: 'Nha Trang and Da Lat',
    route: 'Nha Trang > Da Lat > Nha Trang',
    duration: 4,
    nights: 'Nha Trang 2N + Da Lat 1N',
    hotel: 'Nha Trang and Da Lat 4* standard hotels or similar',
    groupRange: '2-14 pax',
    vehicle: '16-seat or 29-seat mini bus; limousine upgrade for 7-9 pax',
    tip: '800 THB/pax/trip, or 400 THB/pax/trip from 8 pax',
    assets: kitAssets.fitSouth,
    sourcePages: 'Itinerary p3, price p4',
    surcharges: ['29/04-02/05/2026 +30 USD/pax', '24-25/12/2026 single +95 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBandsSmall, [422, 294, 260, 242, 230, 222], '+65 USD')],
    highlights: ['Da Lat city and night market', 'Tuyen Lam cable car and Datanla waterfall', 'Vinpearl Wonder Nha Trang'],
    itinerary: [
      {
            day: 1,
            title: 'Nha Trang - Da Lat',
            titleTh: 'NHA TRANG – DA LAT',
            notes: ['Airport pickup', 'Drive to Da Lat', 'Lam Vien Square and night market'],
            notesTh: ['รับคณะที่สนามบิน', 'เดินทางไปดำลัด (ประมำณ 3-3.5 ชั่วโมง)', 'จุตุรัต Lam Vien', 'ตลาดไนต์ดำลัด'],
            lunch: 'Hon Giao',
            dinner: 'BBQ Garden Dalat',
            overnightTh: 'Hotel 4 star: Goldient Boutique or similar',
            lunchMenuTh: ['หมูป่ำผัดตะไคร้พริ ก', 'กุ้ง รำดซอสเนยกระเทียม', 'หมูสำมชั้นหนังกรอบ', 'ปลาบำซำตุ๋นในหม้อดิน', 'ไข่เจียว', 'สลัดน้ำสลัดแบบน้ำส้มสายชู', 'ซุปผักกำดใส่ หมู', 'ข้าวสวย', 'ของหวาน + ชำน้ำแข็ง'],
            dinnerMenuTh: [],
          },
      {
            day: 2,
            title: 'Da Lat - Nha Trang',
            titleTh: 'DA LAT – NHA TRANG',
            notes: ['Tuyen Lam cable car', 'Datanla waterfall alpine coaster', 'Hydrangea garden, return to Nha Trang'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'กระเช้า Tuyen Lam (1 ขำ) วัดตุ๊กลัม', 'น้ำตำกดำทันลำ นัง่ รถรำงไปกลับ', 'วัดมังกร', 'สวนดอกไม้ไฮเดนเยีย', 'เดินทางกลับไปไปญำจำง'],
            lunch: 'Hoang Gia',
            dinner: 'Galangal',
            overnightTh: 'Hotel 4 star: Panama or similar',
            lunchMenuTh: ['ปลาทับทิมนึ่ง', 'หมูตม้ ไข่', 'ซี่โครงหมูย่า งงำ', 'สลัดน้ำใส', 'กุ้ง ผัดเค็ม', 'หม้อไฟปลาสเตอร์เจียน', 'ข้าว + ชำเย็น'],
            dinnerMenuTh: ['เฝอ', 'ขนมเบื้องญวน', 'ซี่โครงหมูตม้ เค็ม', 'กุงั ต้มเค็ม', 'ข้าวผัดสับปะรด', 'ผักบุง้ ผัดกระเทียม', 'ผลไม้'],
          },
      {
            day: 3,
            title: 'Nha Trang',
            titleTh: 'NHA TRANG',
            notes: ['Vinpearl Wonder', 'Island cable car and amusement park', 'Nha Trang night market'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'นัง่ กระเช้าข้ำมทะเล ไปสวนสนุก VinPearl', 'อิสระกับเครื่ องเล่นมำกมำย', 'นัง่ กระเช้ากลับฝั่ง', 'วัดลองเซิน', 'โบสถ์หิน', 'ตลาดไนต์'],
            lunch: 'Vinpearl Wonder',
            dinner: 'Free Style ไม่ รวม',
            overnightTh: 'Hotel 4 star: Panama or similar',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: ['*ถ้ารวมอาหารเย็น +14$/pax'],
          },
      {
            day: 4,
            title: 'Nha Trang - Airport',
            titleTh: 'AIRPORT',
            notes: ['Hotel breakfast', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ส่ งสนามบิน'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '422', single: '' },
      { label: '29/04-02/05/2026', merged: '+30$/pax', single: '+95$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 5 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                          400baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'fitsgn01',
    code: 'FITSGN01',
    packageType: 'FIT',
    region: 'Southern Vietnam',
    title: 'Ho Chi Minh and Mui Ne',
    route: 'Ho Chi Minh > Mui Ne > Ho Chi Minh',
    duration: 3,
    nights: 'Ho Chi Minh 1N + Mui Ne 1N',
    hotel: 'Mui Ne and Ho Chi Minh 4* standard hotels or similar',
    groupRange: '2-14 pax',
    vehicle: '16-seat or 29-seat mini bus; limousine upgrade available',
    tip: '600 THB/pax/trip, or 300 THB/pax/trip from 8 pax',
    assets: kitAssets.fitSouth,
    sourcePages: 'Itinerary p5, price p6',
    surcharges: ['29/04-02/05/2026 +35 USD/pax', '24-25/12/2026 single +110 USD'],
    priceRows: [makePrice('01/04-30/12/2026', fitBandsSmall, [545, 362, 308, 286, 267, 255], '+78 USD')],
    highlights: ['Fairy Stream, red and white sand dunes', 'Jeep ride in Mui Ne', 'Ho Chi Minh city tour and Saigon river dinner cruise'],
    itinerary: [
      {
            day: 1,
            title: 'Ho Chi Minh - Mui Ne',
            titleTh: 'HO CHI MINH – MUI NE',
            notes: ['Airport pickup', 'Fairy Stream', 'Red Sand Dunes and fishing village'],
            notesTh: ['รับคณะที่สนามบิน', 'เดินทางไปมุยแน่ (ประมำณ 4 ชั่วโมง)', 'เดินลำธำรสวรรค์', 'ชมทะเลทรำยแดง', 'ชมทะเลทรำยแดง (รวมรถจี๊ป)', 'หมู่บ้า นชำวประโมงค์'],
            lunch: 'Cao Phat 15$',
            dinner: 'Huong Phat 12$',
            overnightTh: 'Hotel 4 star: Vipol, Unique or similar',
            lunchMenuTh: ['ปลาบ้งเลำตุ๋นในหม้อดิน', 'ยำดอกกล้วย', 'ไก่ทอดคลุกน้ำปลา', 'กุ้ง ผัดเคี่ยวน้ำปลากับหมูสำมชั้น', 'ดอกกะหล่ำผัดสไตล์เสฉวน', 'แกงส้มปลารสเปรี้ ยว', 'ข้าวสวย', 'ชำน้ำแข็ง'],
            dinnerMenuTh: ['สลัดไข่', 'ยำยอดมะพร้ำวทะเล', 'ข้าวผัดรวมมิตร', 'กุ้ง ผัดหมูเค็มหวาน', 'ดอกฟักทองผัดกระเทียม', 'แกงส้มกุ้ง', 'ปลาหมึกทอดน้ำปลา', 'ผักรวมลวก จิ้มแจ่ว'],
          },
      {
            day: 2,
            title: 'Mui Ne - Ho Chi Minh',
            titleTh: 'MUI NE – DA LAT',
            notes: ['White Sand Dunes with jeep', 'Return to Ho Chi Minh', 'Walking street, Uncle Ho statue, Cafe Apartment, Saigon dinner cruise'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปเมืองดำลัด', 'สวนดอกไม้ไฮเดนเยีย', 'กระเช้า Tuyen Lam (1 ขำ) วัดตุ๊กลัม', 'น้ำตำกดำทันลำ นัง่ รถรำงไปกลับ', 'ตลาดไนต์ดำลัด'],
            lunch: 'Hoang Gia',
            dinner: 'BBQ Garden Dalat buffet',
            overnightTh: 'Hotel 4 star: Goldient Boutique or similar',
            lunchMenuTh: ['ปลาทับทิมนึ่ง', 'หมูตม้ ไข่', 'ซี่โครงหมูย่า งงำ', 'สลัดน้ำใส', 'กุ้ง ผัดเค็ม', 'หม้อไฟปลาสเตอร์เจียน', 'ข้าว + ชำเย็น'],
            dinnerMenuTh: ['รวมน้ำชำท่านละ 1 แก้ว'],
          },
      {
            day: 3,
            title: 'Ho Chi Minh - Airport',
            titleTh: 'DA LAT – HO CHI MINH',
            notes: ['Independence Palace', 'Notre Dame Cathedral and Central Post Office', 'Ben Thanh Market, airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปโฮจิมินห์ (ประมำณ 6-7 ชั่วโมง)', 'ถนนคนเดิน Nguyen Hue', 'อนุสำวรี ลุงโฮ', 'Café Apartment'],
            lunch: 'Song Chau',
            dinner: 'Ganh Bong Sen',
            overnightTh: 'Hotel 4 star: Athena, Cicilia or similar',
            lunchMenuTh: ['ยำรวม + ข้าวเกรี ยบกุ้ง', 'ปอเปี๊ยะทอด', 'หมูต๋ ุนหน่อไม้', 'ปลาบำซำเนื้อแล่ทอดเสิ ร์ฟพร้อมกิมจิ', 'ดอกกะหล่ำผัดกับหมู', 'ซุปไก่ใส่ เห็ดสด', 'ข้าวสวย', 'ผลไม้ + ชำน้ำแข็ง'],
            dinnerMenuTh: ['Buffee'],
          },
      {
            day: 4,
            title: '',
            titleTh: 'HO CHI MINH CITY TOUR – AIRPORT',
            notes: [],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ทำเนียบอิสระภำพ', 'โบสถ์นอเธอดัม', 'ไปรษณี กลำง', 'วัดเจ้ำแม่ทบั ทิม', 'ตลาดเบ๋ นถัน่', 'ส่ งสนามบิน'],
            lunch: 'Bep Me In (Michelin Bib Gourmand)',
            dinner: 'Free Style ไม่ รวม',
            overnightTh: '',
            lunchMenuTh: ['ขนมเบื้องญวนกุ้ง และหมู', 'ยำใหลบัวกุ้ง หมู', 'ข้าวผัดทะเล', 'น่องไก่ย่า งเกลือพริ ก', 'หมูทอดงำ'],
            dinnerMenuTh: ['*ถ้ารวมอาหารเย็น +14$/pax'],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '01/04-30/12/2026', merged: '545', single: '' },
      { label: '29/04-02/05/2026', merged: '+35$/pax', single: '+110$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '16 seats', right: '29 seats (mini bus)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 5 มื้อ + บุฟเฟ่ ต์ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี                                                                                    8 ท่านขึ้นไป 400baht/pax/trip)', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับ', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุใน'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: [], right: [] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'dad01',
    code: 'DAD01',
    packageType: 'GIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Ba Na Hills, Hoi An',
    route: 'Da Nang > Hoi An > Ba Na Hills',
    duration: 3,
    nights: 'Da Nang 2N',
    hotel: 'Da Nang 4* standard hotel or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '300 THB/pax/trip',
    assets: kitAssets.gitCentral,
    sourcePages: 'Itinerary p2, price p3',
    surcharges: ['29/04-02/05/2026 +18 USD/pax for small bands', '24-26/12/2026 single +40 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [159, 152, 145, 140, 136, 133, 131], '+25 USD')],
    highlights: ['Hoi An Ancient Town', 'Ba Na Hills and Golden Bridge', 'Da Nang city photo stops'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Hoi An',
            titleTh: 'DA NANG – HOI AN',
            notes: ['Airport pickup', 'Hoi An Ancient Town', 'Da Nang overnight'],
            notesTh: ['รับคณะที่สนามบิน', 'รับประทานอาหารกลางวันเสร็จแล้วเดินทางเข้าสู่เมืองฮอยอัน', 'เดินเมืองโบราณฮอยอัน', 'เรือกระด้ง', 'หมู่บ้านแกะสลักหินอ่อน กลับดานัง'],
            lunch: 'Son Duong 6$',
            dinner: 'Hanoi Old 6$',
            overnightTh: 'Hotel 4 stars: Hadana, TGT, Magnolia (4 stars) or similar',
            lunchMenuTh: ['เปาะเปี๊ยะทะเล', 'ปลาหมึกทอดน้ำปลา', 'ไก่ทอดน้ำปลา', 'ปลาทอดราดซอสเสาวรส', 'หมูไข่พะโล้', 'ปลายอผัดมะเขือเทศ', 'หอยผัดซอสจีน', 'ผักผัดน้ำมันหอย', 'แกงจืด หมูสับ เต้าหู้', 'ข้าว ผลไม้ น้ำเปล่า'],
            dinnerMenuTh: ['ยำหัวปลีใส่กุ้งและหมู', 'หอยลายผัดซอสเสฉวน', 'กุ้งผัดหมูเค็ม', 'ปลาทอดซอสเปรี้ยวหวาน', 'ไก่ทอดน้ำปลา', 'มะเขือยาวทอด', 'ผักบุ้งผัด', 'แกงจืดผัก', 'ข้าวสวย', 'ไข่ต้มราดซีอิ๊ว', 'ของหวาน + ชาเย็น'],
          },
      {
            day: 2,
            title: 'Ba Na Hills',
            titleTh: 'DA NANG – BANA HILLS',
            notes: ['Cable car', 'Golden Bridge, Fantasy Park and flower garden', 'Return to Da Nang'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ขึ้นกระเช้าบานาฮิวล์', 'ชมสะพานมือ สวนสนุกบานาฮิวล์ สวนดอกไม้', 'ลงกระเช้า', 'ถ่ายรูปสะพานมังกร'],
            lunch: 'Ba Na hills (buffet)',
            dinner: 'Long Qiao – Buffet เสิร์ฟที่โต๊ะ',
            overnightTh: 'Hotel 4 stars: Hadana, TGT, Magnolia (4 stars) or similar',
            lunchMenuTh: [],
            dinnerMenuTh: ['ของทะเล เนื้อ ผัก ติ่มซำ ... สดนึ่งชาบู', 'สั่งได้ไม่อั้นร้านติดกับสะพานมังกร', '*แถมฟรี กุ้งมังกรอบเนย คนละครึ่งตัว', 'ถ้าเพิ่มเป็นกุ้งมังกรคนละตัว +7$/pax'],
          },
      {
            day: 3,
            title: 'Da Nang - Airport',
            titleTh: 'AIRPORT',
            notes: ['City photo stops', 'Shopping time', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ไหว้พระวัดลิงอื๋ง', 'Son Tra Marina (ไม่รวมเครื่องดื่ม)', 'ชอปปิ้งตลาดฮาน', 'ไปสนามบิน ส่งคณะ จบโปรแกรม'],
            lunch: 'Banh mi (แถมขนมปัง)',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['*ถ้าเพิ่มเป็นเซตเมนู +6$/pax'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      {
        label: '29/04-02/05/2026\n24-26/12/2026',
        cells: [
          { text: '+18$/pax', colSpan: 2 },
          { text: '+15$/pax', colSpan: 4 },
          { text: '', colSpan: 1 }
        ],
        single: '+40$'
      }
    ],
    vehicleRows: [
      {
        label: 'Vehicle type',
        cells: [
          { text: '29 seats (mini bus)', colSpan: 2 },
          { text: '35 seats', colSpan: 1 },
          { text: '45 seats (bus)', colSpan: 5 }
        ]
      }
    ],
    inclusionsTh: ['โรงแรมที่พัก (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 2 มื้อ + บุฟเฟ่ 2 มื้อ', 'รถปรับอากาศคุณภาพดี', 'ไกด์ท้องถิ่นสื่อสารภาษาไทย หรืออังกฤษตามความต้องการ', 'บัตรเข้าชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 300baht/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ากับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรีหัวหน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +120$'], right: ['ฟรีหัวหน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +70$', 'แยกนอนเดี่ยว +120$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'dad02',
    code: 'DAD02',
    packageType: 'GIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Ba Na Hills, Hoi An',
    route: 'Da Nang > Ba Na Hills > Hoi An',
    duration: 3,
    nights: 'Da Nang 1N + Ba Na Hills 1N',
    hotel: 'Da Nang 4* standard and Ba Na Hills hotel or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '300 THB/pax/trip',
    assets: kitAssets.gitCentral,
    sourcePages: 'Itinerary p4, price p5',
    surcharges: ['29/04-02/05/2026 +28/+25 USD by band', '24-26/12/2026 single +90 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [186, 179, 177, 171, 166, 163, 160], '+65 USD')],
    highlights: ['Ba Na Hills overnight', 'Golden Bridge and Fantasy Park', 'Hoi An Ancient Town'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Ba Na Hills',
            titleTh: 'DA NANG – BANA HILLS',
            notes: ['Airport pickup', 'Cable car', 'Golden Bridge and Ba Na attractions'],
            notesTh: ['รับคณะที่สนามบิน เดินทางไปบำนำฮิวล์', 'ไหว้พระวัดลิงอื๋ง', 'Son Tra Marina (ไม่รวมเครื่ องดื่ม)', 'ขึ้นกระเช้าบำนำฮิวล์', 'ชมสะพานมือ', 'สวนสนุกบำนำฮิวล์', 'ทำนข้าวเย็นและพักผ่อนที่โรงแรม', '*กรณี พกั 3 คนที่บำนำฮิวล์ใช้ห้อง Family Bunk +20$/ห้อง/คืน'],
            lunch: 'Son Duong 6$',
            dinner: 'Beer Plaza',
            overnightTh: 'พักที่ Mercure Ba Na Hills',
            lunchMenuTh: ['เปำะเปี๊ยะทะเล', 'ปลาหมึกทอดน้ำปลา', 'ไก่ทอดน้ำปลา', 'ปลาทอดรำดซอสเสำวรส', 'หมูไข่พะโล้', 'ปลายอผัดมะเขือเทศ', 'หอยผัดซอสจีน', 'ผักผัดน้ำมันหอย', 'แกงจืด หมูสับ เต้ำหู้', 'ข้าว ผลไม้ น้ำเปล่ำ'],
            dinnerMenuTh: ['Buffee'],
          },
      {
            day: 2,
            title: 'Ba Na Hills - Hoi An - Da Nang',
            titleTh: 'BANA HILLS – HOI AN',
            notes: ['Hoi An Ancient Town', 'Basket boat or city walk depending program', 'Return to Da Nang'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนดอกไม้ ลงกระเช้า แล้วเดินทางไปฮอยอัน', 'เดินเมืองโบราณฮอยอัน', 'เรือกระด้ง', 'หมู่บ้า นแกะสลักหิ นอ่อน กลับดานัง', 'ถ่ายรูปสะพานมังกร'],
            lunch: 'Hanoi Old 6$',
            dinner: 'Long Qiao – Buffet เสริฟที่โต๊ ะ',
            overnightTh: 'Hotel 4 stars: Hadana, TGT, Magnolia (4 stars) or similar',
            lunchMenuTh: ['หอยลำยนึ่ง', 'ไก่ผดั ขิง', 'กุ้ง หมูตม้ เค็ม', 'ปลาตุ๋นหม้อดิน', 'ไข่เจียวหมูสับ', 'เต้ำหู้ซอสมะเขือเทศ', 'ผัดผัก', 'แกงจืด ผัก หมูสับ', 'ข้าวสวย', 'ของหวาน + ชำเย็น'],
            dinnerMenuTh: ['ของทะเลำ เนื้อ ผัก ติ่มซำ ... สดนึ่งชำบู', 'สั่งได้ไม่อั้นร้านติดกับสะพานมังกร', '*แถมฟรี กุ้ง มังกรอบเนย คนละครึ่งตัว', '**ถ้าเพิ่มเป็นกุ้ง มังกรคนละตัว +7$/pax'],
          },
      {
            day: 3,
            title: 'Da Nang - Airport',
            titleTh: 'AIRPORT',
            notes: ['Linh Ung pagoda and city photos', 'Han Market', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ตลาดฮำน', 'ไปสนามบิน ส่งคณะ จบโปรแกรม'],
            lunch: 'Banh mi (แถมขนมปัง)',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['*ถ้าเพิ่มเป็นเซตเมนู +6$/pax'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      {
        label: '29/04-02/05/2026\n24-26/12/2026',
        cells: [
          { text: '28$/pax', colSpan: 2 },
          { text: '25$/pax', colSpan: 4 },
          { text: '', colSpan: 1 }
        ],
        single: '+90$'
      }
    ],
    vehicleRows: [
      {
        label: 'Vehicle type',
        cells: [
          { text: '29 seats (mini bus)', colSpan: 2 },
          { text: '35 seats', colSpan: 1 },
          { text: '45 seats (bus)', colSpan: 5 }
        ]
      }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 2 มื้อ + บุฟเฟ่ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 300bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +190$', 'แยกนอนเดี่ยว +190$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +70$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '15 วันก่อนเดินทาง'],
      ['ใช้เรทโอนเงินของช่อง Selling ในเว็บ Supperich สี เขียว ณ วันที่โอนเงิน', 'ยอดคงเหลือ']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'dad03',
    code: 'DAD03',
    packageType: 'GIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Ba Na Hills, Hoi An',
    route: 'Da Nang > Ba Na Hills > Hoi An',
    duration: 4,
    nights: 'Da Nang 2N + Ba Na Hills 1N',
    hotel: 'Da Nang 4* standard and Ba Na Hills hotel or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitCentral,
    sourcePages: 'Itinerary p6, price p7',
    surcharges: ['29/04-02/05/2026 +28/+25 USD by band', '24-26/12/2026 single +100 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [210, 205, 200, 193, 187, 183, 180], '+75 USD')],
    highlights: ['Ba Na Hills overnight', 'Hoi An Ancient Town', 'Da Nang city and shopping day'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Ba Na Hills',
            titleTh: 'DA NANG – BANA HILLS',
            notes: ['Airport pickup', 'Ba Na Hills cable car', 'Golden Bridge and Fantasy Park'],
            notesTh: ['รับคณะที่สนามบิน เดินทางไปบำนำฮิวล์', 'ขึ้นกระเช้าบำนำฮิวล์', 'ชมสะพานมือ', '-สวนสนุกบำนำฮิวล์', '*กรณี พกั 3 ท่านใช้ห้อง Family Bunk +20$/ห้อง/คืน'],
            lunch: 'Son Duong 6$',
            dinner: 'Beer Plaza',
            overnightTh: 'พักที่ Mercure Ba Na Hill',
            lunchMenuTh: ['ขำไก่ทอดรำดซอส', 'ปลาหมึกทอดน้ำปลา', 'ไก่ทอดน้ำปลา', 'ปลาทอดรำดซอสเสำวรส', 'หมูไข่พะโล้', 'ปลายอผัดมะเขือเทศ', 'หอยผัดซอสจีน', 'ผักผัดน้ำมันหอย', 'แกงจืด หมูสับ เต้ำหู้', 'ข้าว ผลไม้ น้ำเปล่ำ'],
            dinnerMenuTh: ['Buffee'],
          },
      {
            day: 2,
            title: 'Ba Na Hills - Hoi An - Da Nang',
            titleTh: 'BANA HILLS – DA NANG',
            notes: ['Hoi An Ancient Town', 'Basket boat', 'Return to Da Nang'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนดอกไม้', 'ลงกระเช้า แล้วเดินทางไปดานัง', 'ไหว้พระวัดลิงอื๋ง', 'Son Tra Marina café (ไม่รวมเครื่ องดื่ม)', 'ถ่ายรูปสะพานมังกร', 'ถ่ายรูปสวน APEC'],
            lunch: 'ไม่ รวม',
            dinner: 'Hoa Vien 12.5$',
            overnightTh: 'Hotel 4 stars: Hadana, Magnolia (4 stars) or similar',
            lunchMenuTh: ['*ถ้ารวมอาหารเที่ยงเป็นบุฟเฟ่ Four Season,', 'Beer Plaza, Lavender +14$/pax'],
            dinnerMenuTh: ['ยำทะเล', 'กุ้ง มังกรซอสกระเทียม คนละ ½ ตัว', 'หม้อไฟรวม ปูม้า กุ้ง ปลาหมึก ปลา หอย', 'เห็ด เต้ำหู้', 'ปลาหมึกทอดซอส', 'ไก่ทอดน้ำปลา', 'ไข่เจียว', 'ผัดผัก', 'ข้าวสวย', 'ผลไม้', 'ไวน์แดงโต๊ะละ 1 ขวด', '*ถ้าอัพเกทเป็นกุ้ง มังกรท่านละ 1 ตัว +7$/pax'],
          },
      {
            day: 3,
            title: 'Da Nang City',
            titleTh: 'DA NANG – HOI AN',
            notes: ['Linh Ung pagoda', 'Son Tra Marina', 'Dragon Bridge and Love Bridge'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปฮอยอัน', 'เดินเมืองโบราณฮอยอัน', 'เรือกระด้ง', 'เที่ยวหมู่บ้า นแกะสลักหิ นอ่อน', 'กลับไปดานัง'],
            lunch: 'Hanoi Old 6$',
            dinner: 'Long Qiao – Buffet เสริฟที่โต๊ ะ',
            overnightTh: 'Hotel 4 stars: Hadana, Magnolia (4 stars) or similar',
            lunchMenuTh: ['ยำหัวปลีใส่ กงุ้ และหมู', 'หอยลำยผัดซอสเสฉวน', 'กุ้ง ผัดหมูเค็ม', 'ปลาทอดซอสเปรี้ ยวหวาน', 'ไก่ทอดน้ำปลา', 'มะเขือยำวทอด', 'ผักบุง้ ผัด', 'แกงจืดผัก', 'ข้าวสวย', 'ไข่ตม้ รำดซีอิ๊ว', 'ของหวาน + ชำเย็น'],
            dinnerMenuTh: ['ของทะเลำ เนื้อ ผัก ติ่มซำ ... สดนึ่ง', 'ชำบู', 'สั่งได้ไม่อั้นร้านติดกับสะพานมังกร', '*แถม กุ้ง มังกรอบเนยคนละครึ่งตัว', 'ถ้าเพิ่มเป็นกุ้ง มังกรคนละตัว +7$/pax'],
          },
      {
            day: 4,
            title: 'Da Nang - Airport',
            titleTh: 'AIRPORT',
            notes: ['Han Market shopping', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ชอปปิ้ งตลาดฮำน', 'ไปสนามบิน ส่งคณะ จบโปรแกรม'],
            lunch: 'Banh Mi (แถมขนมปังคนละชิ้น)',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['*ถ้าเพิ่มเป็นเซดเมนู +6$/pax'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      {
        label: '29/04-02/05/2026\n24-26/12/2026',
        cells: [
          { text: '+28$', colSpan: 2 },
          { text: '+25$', colSpan: 4 },
          { text: '', colSpan: 1 }
        ],
        single: '+100$'
      }
    ],
    vehicleRows: [
      {
        label: 'Vehicle type',
        cells: [
          { text: '29 seats (mini bus)', colSpan: 2 },
          { text: '35 seats', colSpan: 1 },
          { text: '45 seats (bus)', colSpan: 5 }
        ]
      }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 3 มื้อ + บุฟเฟ่ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +200$', 'แยกนอนเดี่ยว +200$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +70$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '15 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'dad04',
    code: 'DAD04',
    packageType: 'GIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Ba Na Hills, Hoi An',
    route: 'Da Nang > Ba Na Hills > Hoi An',
    duration: 4,
    nights: 'Da Nang 1N + Ba Na Hills 2N',
    hotel: 'Ba Na Hills hotel and Da Nang 4* standard hotel or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitCentral,
    sourcePages: 'Itinerary p8, price p9',
    surcharges: ['29/04-02/05/2026 +45/+40 USD by band', '24-26/12/2026 single +155 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [265, 260, 258, 248, 241, 237, 233], '+115 USD')],
    highlights: ['Two nights on Ba Na Hills', 'Golden Bridge, Fantasy Park and flower garden', 'Hoi An and Da Nang city highlights'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Ba Na Hills',
            titleTh: 'DA NANG – BANA HILLS',
            notes: ['Airport pickup', 'Linh Ung pagoda', 'Ba Na Hills cable car'],
            notesTh: ['รับคณะที่สนามบิน', 'ไหว้พระวัดลิงอื๋ง', 'Marina Cafe (ไม่รวมเครื่ องดื่ม)', 'ถ่ายรูปสะพานมังกร', 'ขึ้นกระเช้าบำนำฮิวล์', '*กรณี พกั 3 ท่านที่บำนำฮิวล์ใช้ห้อง Family Bunk +20$/ห้อง/คืน'],
            lunch: 'Son Duong 6$',
            dinner: 'Beer Plaza',
            overnightTh: 'พักที่ Mercure Ba Na Hill',
            lunchMenuTh: ['ขำไก่ทอดรำดซอส', 'ปลาหมึกทอดน้ำปลา', 'ไก่ทอดน้ำปลา', 'ปลาทอดรำดซอสเสำวรส', 'หมูไข่พะโล้', 'ปลายอผัดมะเขือเทศ', 'หอยผัดซอสจีน', 'ผักผัดน้ำมันหอย', 'แกงจืด หมูสับ เต้ำหู้', 'ข้าว ผลไม้ น้ำเปล่ำ'],
            dinnerMenuTh: ['Buffee'],
          },
      {
            day: 2,
            title: 'Ba Na Hills',
            titleTh: 'BANA HILLS',
            notes: ['Full Ba Na Hills day', 'Golden Bridge', 'Fantasy Park and flower garden'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนสนุก Fantasy Park', 'สะพานมือ', 'พระองค์ใหญ่', 'สวนดอกไม้', '*กรณี พกั 3 ท่านที่บำนำฮิวล์ใช้ห้อง Family Bunk +20$/ห้อง/คืน'],
            lunch: 'ไม่ รวม',
            dinner: 'Beer Plaza',
            overnightTh: 'พักที่ Mercure Ba Na Hill',
            lunchMenuTh: ['*ถ้ารวมอาหารเที่ยงเป็นบุฟเฟ่', 'Four Season, Beer Plaza, Lavender', '+14$/pax'],
            dinnerMenuTh: ['Buffee'],
          },
      {
            day: 3,
            title: 'Ba Na Hills - Hoi An - Da Nang',
            titleTh: 'BA NA HILLS – HOI AN – DA NANG',
            notes: ['Hoi An Ancient Town', 'Basket boat or coffee stop', 'Return to Da Nang'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ลงกระเช้า', 'แล้วเดินทางไปฮอยอัน', 'หมู่บ้า นหิ นอ่อน', 'เรือกระด้ง', 'เยีย่ มเมืองโบราณฮอยอัน แล้วกลับไปดานัง'],
            lunch: 'Hanoi Old 6$',
            dinner: 'Long Qiao – Buffet เสริฟที่โต๊ ะ',
            overnightTh: 'Hotel 4 stars: Hadana, TGT, Magnolia (4 stars) or similar',
            lunchMenuTh: ['ยำหัวปลีใส่ กงุ้ และหมู', 'หอยลำยผัดซอสเสฉวน', 'กุ้ง ผัดหมูเค็ม', 'ปลาทอดซอสเปรี้ ยวหวาน', 'ไก่ทอดน้ำปลา', 'มะเขือยำวทอด', 'ผักบุง้ ผัด', 'แกงจืดผัก', 'ข้าวสวย', 'ไข่ตม้ รำดซีอิ๊ว', 'ของหวาน + ชำเย็น'],
            dinnerMenuTh: ['ของทะเลำ เนื้อ ผัก ติ่มซำ ... สดนึ่ ง', 'ชำบู', 'สั่งได้ไม่อั้นร้านติดกับสะพานมังกร', '*แถม กุ้ง มังกรอบเนยคนละครึ่งตัว', 'ถ้าเพิม่ เป็นกุ้ง มังกรคนละตัว +7$/pax'],
          },
      {
            day: 4,
            title: 'Da Nang - Airport',
            titleTh: 'AIRPORT',
            notes: ['Han Market shopping', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ตลาดฮำน', 'ส่งคณะไปสนามบิน จบโปรแกรม'],
            lunch: 'Banh Mi (แถมขนมปังคนละชิ้น)',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['*ถ้าเพิ่มเป็นเซดเมนู +6$/pax'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      {
        label: '29/04-02/05/2026\n24-26/12/2026',
        cells: [
          { text: '+45$', colSpan: 2 },
          { text: '+40$', colSpan: 4 },
          { text: '', colSpan: 1 }
        ],
        single: '+155$'
      }
    ],
    vehicleRows: [
      {
        label: 'Vehicle type',
        cells: [
          { text: '29 seats (mini bus)', colSpan: 2 },
          { text: '35 seats', colSpan: 1 },
          { text: '45 seats (bus)', colSpan: 5 }
        ]
      }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 2 มื้อ + บุฟเฟ่ 3 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +300$', 'แยกนอนเดี่ยว +300$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +80$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '15 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'dad05',
    code: 'DAD05',
    packageType: 'GIT',
    region: 'Central Vietnam',
    title: 'Da Nang, Hue, Ba Na Hills, Hoi An',
    route: 'Da Nang > Hue > Ba Na Hills > Hoi An',
    duration: 4,
    nights: 'Da Nang 1N + Hue 1N + Ba Na Hills 1N',
    hotel: 'Central Vietnam 4* standard hotels or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitCentral,
    sourcePages: 'Itinerary p10, price p11',
    surcharges: ['29/04-02/05/2026 +27/+25 USD by band', '24-26/12/2026 single +103 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [223, 215, 213, 205, 199, 194, 191], '+78 USD')],
    highlights: ['Hue imperial route', 'Ba Na Hills and Golden Bridge', 'Hoi An Ancient Town'],
    itinerary: [
      {
            day: 1,
            title: 'Da Nang - Hue',
            titleTh: 'DA NANG – HUE',
            notes: ['Airport pickup', 'Transfer to Hue', 'Hue city highlights'],
            notesTh: ['รับคณะที่สนามบิน เดินทางเว้', 'วัดเทียนมุ', 'ชอปปิ้ งตลาดดงบำ', 'ล่องเรือ ชมกำรแสดงจักรพรรคบนเรือ'],
            lunch: 'Son Duong 6$',
            dinner: 'Queen Palace 6.5$',
            overnightTh: 'Hotel 4 stars standard: Cherish, Thanh Lich or similar',
            lunchMenuTh: ['ขำไก่ทอดรำดซอส', 'ปลาหมึกทอดน้ำปลา', 'ไก่ทอดน้ำปลา', 'ปลาทอดรำดซอสเสำวรส', 'หมูไข่พะโล้', 'ปลายอผัดมะเขือเทศ', 'หอยผัดซอสจีน', 'ผักผัดน้ำมันหอย', 'แกงจืด หมูสับ เต้ำหู้', 'ข้าว ผลไม้ น้ำเปล่ำ'],
            dinnerMenuTh: ['ยำหัวปลีกงุ้ หมู - ข้าวเกรี ยบกุ้ง', 'ปลาทับทิมนึ่ งซีอิ๊ว', 'ไก่ซอสเห็ด', 'กุ้ง หมูผดั เค็ม', 'แหนมเนือง', 'ไข่เจียวหมูสับ', 'ผักกำดผัดน้ำมันหอย', 'แกงจืดใส่ ไข่ปู', 'ข้าว', 'ผลไม้'],
          },
      {
            day: 2,
            title: 'Hue - Da Nang',
            titleTh: 'HUE – BA NA HILLS',
            notes: ['Imperial city route', 'Return via Hai Van area', 'Da Nang overnight'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ถ่ายรูปด้ำนนอก พระรำชวังไดโนย', 'นัง่ 3 ล้อชมรอบพระรำชวัง (รวมทิปให้คนปั่นเรี ยบร้อย)', 'ขึ้นกระเช้าบำนำฮิวล์', 'สวนสนุกบำนำฮิวล์', 'สวนดอกไม้', '*กรณี พกั 3 ท่านที่บำนำฮิวล์ใช้ห้อง Family Bunk +20$/ห้อง/คืน'],
            lunch: 'Lucky Pearl (seafood) 6$',
            dinner: 'Mercure hotel buffee',
            overnightTh: 'พักที่ Mercure Ba Na Hills',
            lunchMenuTh: ['ส้มตำ', 'กุ้ง นึ่ ง', 'หอยนำงรมย่ำง', 'ปลาหำงเหลืองนึ่ งซีอิ๊ว', 'เนื้อปูม้า ผัดหอม', 'หมูทอด', 'ผัดผักบุง้', 'ไข่เจียว', 'ต้มยำทะเล', 'ข้าว + ผลไม้'],
            dinnerMenuTh: [],
          },
      {
            day: 3,
            title: 'Ba Na Hills - Hoi An',
            titleTh: 'BA NA HILLS – HOI AN',
            notes: ['Ba Na Hills cable car', 'Golden Bridge', 'Hoi An Ancient Town'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ชมสะพานมือ', 'ลงกระเช้า', 'เรือกระด้ง', 'เยีย่ มเมืองโบราณโฮยอัน แล้วกลับไปดานัง', 'แวะหมู่บ้า นหิ นอ่อน', 'ถ่ายรูปสะพานมังกร'],
            lunch: 'Hanoi Old 6$',
            dinner: 'Long Qiao – Buffet เสริฟที่โต๊ ะ',
            overnightTh: 'Hotel 4 stars: Hadana, TGT, Magnolia (4 stars) or similar',
            lunchMenuTh: ['ยำหัวปลีใส่ กงุ้ และหมู', 'หอยลำยผัดซอสเสฉวน', 'กุ้ง ผัดหมูเค็ม', 'ปลาทอดซอสเปรี้ ยวหวาน', 'ไก่ทอดน้ำปลา', 'มะเขือยำวทอด', 'ผักบุง้ ผัด', 'แกงจืดผัก', 'ข้าวสวย', 'ไข่ตม้ รำดซีอิ๊ว', 'ของหวาน + ชำเย็น'],
            dinnerMenuTh: ['ของทะเลำ เนื้อ ผัก ติ่มซำ ... สดนึ่ ง', 'ชำบู', 'สั่งได้ไม่อั้นร้านติดกับสะพานมังกร', '*แถม กุ้งมังกรอบเนยคนละครึ่งตัว', 'ถ้าเพิม่ เป็นกุ้ง มังกรคนละตัว +7$/pax'],
          },
      {
            day: 4,
            title: 'Da Nang - Airport',
            titleTh: 'AIRPORT',
            notes: ['Market shopping', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ไหว้พระวัดลิงอื๋ง', 'ตลาดฮำน', 'ส่งคณะไปสนามบิน จบโปรแกรม'],
            lunch: 'Banh Mi (แถมขนมปังคนละชิ้น)',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['*ถ้าเพิ่มเป็นเซดเมนู +7$/pax'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      {
        label: '29/04-02/05/2026\n24-26/12/2026',
        cells: [
          { text: '+27$', colSpan: 2 },
          { text: '+25$', colSpan: 4 },
          { text: '', colSpan: 1 }
        ],
        single: '+103$'
      }
    ],
    vehicleRows: [
      {
        label: 'Vehicle type',
        cells: [
          { text: '29 seats (mini bus)', colSpan: 2 },
          { text: '35 seats (coach)', colSpan: 1 },
          { text: '45 seats (bus)', colSpan: 5 }
        ]
      }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 4 มื้อ + บุฟเฟ่ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +220$', 'แยกนอนเดี่ยว +220$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +70$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิ ร์ มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '15 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'han01',
    code: 'HAN01',
    packageType: 'GIT',
    region: 'North Vietnam',
    title: 'Ha Noi, Sapa, Ninh Binh',
    route: 'Ha Noi > Sapa > Ninh Binh',
    duration: 4,
    nights: 'Ha Noi 1N + Sapa 2N',
    hotel: 'North Vietnam 4* standard hotels or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitNorth,
    sourcePages: 'Itinerary p2, price p3',
    surcharges: ['29/04-02/05/2026 +25/+22 USD by band', '24-25/12/2026 single +70 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [242, 224, 213, 199, 189, 183, 178], '+45 USD')],
    highlights: ['Sapa mountain route', 'Cat Cat village and Fansipan area', 'Ninh Binh countryside and boat trip'],
    itinerary: [
      {
            day: 1,
            title: 'Ha Noi - Sapa',
            titleTh: 'HA NOI – SAPA',
            notes: ['Airport pickup', 'Drive to Sapa', 'Sapa town and night market'],
            notesTh: ['รับคณะที่สนามบิน แล้วเดินทางไปซำปำ (ประมำณ 6ชั่วโมง)', 'หมู่บ้า นก๊ำดๆ', 'ร้านกำแฟ Moana (รวมน้ำเปล่ำท่านละ 1 ขวด) - โบสถ์หิน', 'ตลาดไนต์ซำปำ', 'รับประทานอาหารเย็นและพักผ่อนที่โรงแรม'],
            lunch: 'Lam Dong luxury 6$',
            dinner: 'Hotel 7$',
            overnightTh: 'Hotel 4 stars standard: Passion, Azure or similar',
            lunchMenuTh: ['เป็ ดต้ม', 'ปลาน้ำตกทอดใบชะพลู', 'หมูผดั เผ็ด', 'เปำะเปี๊ยะทอด', 'อกไก่ผดั ผักรวม', 'เต้ำหู้คลุกต้นหอม', 'ไข่เจียวใส่ ตน้ หอม', 'ผักผัดกระเทียม', 'แกงผักรวมใส่ หมูสับ', 'ข้าว + ผลไม้ + น้ำเปล่ำ'],
            dinnerMenuTh: ['มันฝรั่งทอด', 'ไข่เจียวหมูสับ', 'ปลาทับทิมนึ่ งซี อิ้ว', 'ไก่ป่ำอบน้ำผึ้ง', 'หมูทอด', 'เต้ำหู้ซอสมะเขือเทศ', 'กะหล่ำปลีลวก + ไข่ลวก', 'แกงจืดผักกำด หมูสับ', 'ข้าว', 'ผลไม้ + ชำ'],
          },
      {
            day: 2,
            title: 'Sapa',
            titleTh: 'SAPA',
            notes: ['Cat Cat village', 'Moana or mountain photo route', 'Fansipan area option per program'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'นัง่ รถรำงจำกเมือง ไปสถำนี กระเช้า', 'ขึ้นกระเช้า Faxipan', 'Option: รถรำงขึ้นยอดเขำ +7$/pax/one way (ยังไม่รวม)', 'ไหว้พระวัด Fanxipan', 'ลงกระเช้า', 'Option: Rong May Glass Bridge +23$/pax (ยังไม่รวม)'],
            lunch: 'Van Sam (Fanxipan Station)',
            dinner: 'Hoa Dong Tien (Salmon + redwine) 7$',
            overnightTh: 'Hotel 4 stars standard: Passion, Azure or similar',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: ['ซุปไก่ข้า วโพด', 'มันฝรั่งทอด', 'เป็ ดย่ำง', 'ไก่ทอดตะไคร้พริ ก', 'หม้อไฟปลาแซนมอน', 'ผักรวมจุ่ม', 'เห็ดจุ่ม', 'เต้ำหู ้ + หมี่', 'ข้าวผัดไข่', 'ผลไม้ + ชำ'],
          },
      {
            day: 3,
            title: 'Sapa - Ha Noi',
            titleTh: 'SAPA – HA NOI',
            notes: ['Return to Ha Noi', 'Old quarter and city highlights'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางกลับฮำนอย', 'แวะร้านเยื้อไผ่', 'สุสำนลุงโฮ (ถ่ายรูปด้ำนอนก)', 'วัดเฉิ นก๊วก', 'ถนน สาย 36', 'ทะเลสาบคืนดำบ'],
            lunch: 'Dong Mai 6$',
            dinner: 'Phuong Nguyen 6.5$',
            overnightTh: 'Hotel 4 stars standard: Western Skyline, Capital or similar',
            lunchMenuTh: ['ไก่ผดั ตะไคร้พริ ก', 'หมูเคี่ยวซอสน้ำปลาใส่ พริ ก', 'ซี่โครงหมูผดั เปรี้ ยวหวาน', 'ปลา รำดซอสเปรี้ ยวเผ็ด', 'สันในหมูผดั บรอกโคลี', 'ไข่เจียวใส่ตน้ หอม', 'เต้ำหู้ทอดรำดซอสเผ็ด', 'ผักผัดกระเทียม', 'แกงผักกำดใส่หมูสับ', 'ข้าวสวย + ผลไม้ + น้ำเปล่ำ'],
            dinnerMenuTh: ['สลัดซอสเสำวรส', 'น่องไก่ย่า งใบมะนำว', 'เปำะเปี๊ยะทะเลทอด', 'ผัดผักบุง้', 'ซี่โครงหมูซอสเปรี้ ยวหวาน', 'เต้ำหู้เสฉวน', 'ปลาทับทิมนึ่ งซี อิ้ว', 'หมูสำมชั้นทอด', 'แกงจืดผักกำดหอย', 'ข้าว + ผลไม้ + ชำ', '*ถ้าเปลี่ยนทำน Sen Buffee +14$/pax'],
          },
      {
            day: 4,
            title: 'Ninh Binh - Airport',
            titleTh: 'HA NOI – NINH BINH – AIRPORT',
            notes: ['Ninh Binh day route', 'Boat trip', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปเมืองนิงบิง (ประมำณ 2 ชั่วโมง)', 'ล่องเรือตำมก๊ก ชมนำข้าว รอดถ้ ำ', 'ร้านสิ นค้ำโอทอป', 'ไปสนามบิน ส่งคณะ จบโปรแกรม'],
            lunch: 'Anh Dzung 7$',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['เปำะเปี๊ยะทะเลทอด', 'หมูเสี ยบไม้ย่า ง', 'ทอดมันปลา', 'หมู ไข่พะโล้', 'ไข่เจียว', 'ไก่ผดั สับปะรด', 'วุน้ เส้นผัดรวม', 'ผักบุง้ ไฟแดง', 'แกงจืดใส่กงุ้', 'ข้าว + ผลไม้'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-02/05/2026', merged: '+25$ / +22$', single: '+70$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 6 มื้อ + บุฟเฟ่ 1 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว 160$', 'แยกนอนเดี่ยว 160$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน 75$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'han02',
    code: 'HAN02',
    packageType: 'GIT',
    region: 'North Vietnam',
    title: 'Ha Noi, Sa Pa, Ha Long',
    route: 'Ha Noi > Sa Pa > Ha Long',
    duration: 4,
    nights: 'Ha Noi 1N + Sa Pa 1N + Ha Long 1N',
    hotel: 'Hotel 3* or 4* standard per kit',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitNorth,
    sourcePages: 'Itinerary p4, price p5',
    surcharges: ['29/04-02/05/2026 +25/+22 USD by band', '24-25/12/2026 single +65 USD'],
    priceRows: [makePrice('Hotel 3*/4* standard - 01/04-30/12/2026', gitBands, [256, 235, 221, 207, 195, 187, 181], '+40 USD')],
    highlights: ['Sa Pa mountain stay', 'Ha Long Bay cruise route', 'Ha Noi old quarter'],
    itinerary: [
      {
            day: 1,
            title: 'Ha Noi - Sa Pa',
            titleTh: 'HA NOI – SAPA',
            notes: ['Airport pickup', 'Drive to Sa Pa', 'Town sightseeing'],
            notesTh: ['รับคณะที่สนามบิน แล้วเดินทางไปซำปำ (ประมำณ 6 ชั่วโมง)', 'หมู่บ้า นก๊ำดๆ', 'ร้านกำแฟ Moana (รวมน้ำเปล่ำท่านละ 1 ขวด)', 'โบสถ์หิน', 'ตลาดไนต์ซำปำ', 'รับประทานอาหารเย็นและพักผ่อนที่โรงแรม'],
            lunch: 'Lam Dong luxury 6$',
            dinner: 'Hotel set menu 7$',
            overnightTh: 'Hotel 4 stars standard: Passion, Azure, Sapa Green or similar',
            lunchMenuTh: ['เป็ ดต้ม', 'ปลาน้ำตกทอดใบชะพลู', 'หมูผดั เผ็ด', 'เปำะเปี๊ยะทอด', 'อกไก่ผดั ผักรวม', 'เต้ำหู้คลุกต้นหอม', 'ไข่เจียวใส่ตน้ หอม', 'ผักผัดกระเทียม', 'แกงผักรวมใส่ หมูสับ', 'ข้าว + ผลไม้ + น้ำเปล่ำ'],
            dinnerMenuTh: ['มันฝรั่งทอด', 'ไข่เจียวหมูสับ', 'ปลาทับทิมนึ่ งซีอิ้ว', 'ไก่ป่ำอบน้ำผึ้ง', 'หมูทอด', 'เต้ำหู้ซอสมะเขือเทศ', 'กะหล่ำปลีลวก + ไข่ลวก', 'แกงจืดผักกำด หมูสับ', 'ข้าว', 'ผลไม้ + ชำ'],
          },
      {
            day: 2,
            title: 'Sa Pa - Ha Noi',
            titleTh: 'SAPA – HA NOI',
            notes: ['Sa Pa morning route', 'Return toward Ha Noi', 'Evening city time'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'นัง่ รถรำงจำกเมือง ไปสถำนี กระเช้า', 'ระหว่ำงทำงชมหุบเขำเมืองฮวำ สวนดอกไม้', 'ขึ้นกระเช้า Faxipan', 'Option: รถรำงขึ้นยอดเขำ +7$/pax/one way (ยังไม่รวม)', 'ไหว้พระวัด Fanxipan', 'ลงกระเช้า', 'กลับไปฮำนอย', '36 สาย ทะเลสาบคืนดำบ'],
            lunch: 'Van Sam (Fanxipan Station)',
            dinner: 'Phuong Nguyen 6.5$',
            overnightTh: 'Hotel 4 stars standard: Western Skyline, Capital or similar',
            lunchMenuTh: ['Buffet'],
            dinnerMenuTh: ['สลัดซอสเสำวรส', 'น่องไก่ย่า งใบมะนำว', 'เปำะเปี๊ยะทะเลทอด', 'ผัดผักบุง้', 'ซี่โครงหมูซอสเปรี้ ยวหวาน', 'เต้ำหู้เสฉวน', 'ปลาทับทิมนึ่ งซีอิ้ว', 'หมูสำมชั้นทอด', 'แกงจืดผักกำดหอย', 'ข้าว + ผลไม้ + ชำ', '*ถ้าเปลี่ยนทำน Sen Buffee +14$/pax'],
          },
      {
            day: 3,
            title: 'Ha Noi - Ha Long',
            titleTh: 'HA NOI – HA LONG',
            notes: ['Transfer to Ha Long', 'Bay area attractions', 'Overnight in Ha Long'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'วัดเฉิ นก๊วก', 'เดินทางเมืองฮำลอง (ประมำณ 3 ชั่วโมง)', 'แวะถ่ายรูป Mega Grand World', 'Option: กระเช้า Queen ข้ำมทะเล 16$/pax (ยังไม่รวม)', 'ตลาดไนต์ฮำลอง'],
            lunch: 'Thang Long Ha Long 6.5$',
            dinner: 'Magnolia (seafood) 7$',
            overnightTh: 'Hotel 3 stars : City Bay Palace, The Twin, Busan or similar',
            lunchMenuTh: ['กุ้ง นึ่ งตะไคร้', 'ปลาทอดซอส5รส', 'แครี่ ไก่', 'ผัดวุน้ เส้นรวมมิตร', 'หมูพะโล้', 'ผัดทะเลรวมมิตร', 'ผัดผักกำด', 'แกงจืด', 'ข้าว', 'ผลไม้'],
            dinnerMenuTh: ['กั้งทอดเกลือ', 'กุ้ง ย่ำงตะไคร้', 'ปลาทับทิมซอสเห็ด', 'ปลาหมึกผัด', 'ไข่เจียว', 'ปำะเปี๊ ยทะเลทอด', 'หมูผดั ตะไคร้', 'ผัดผักบุง้', 'แกงจืดผักกุ้ง', 'ข้าว + ผลไม้'],
          },
      {
            day: 4,
            title: 'Ha Long - Airport',
            titleTh: 'HA LONG – AIRPORT',
            notes: ['Ha Long route by program', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ล่องเรืออ่ำวฮำลอง เกำะต่างๆ', 'ถ้ ำสวรรค์', 'ร้านเยื้อไม้ไผ่', 'ไปสนามบิน ส่ งคณะ จบโปรแกรม'],
            lunch: 'Cruise 6$',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['หอยนำงรมปิ้ ง (คนละ2ตัว)', 'กุ้ง นึ่ งมะพร้ำว', 'หอยผัดโหระพำ', 'ปลานิลทอดซฮสมะเขือเทศ', 'ปลาหมึกผัดหอม', 'เปำะเปี๊ ยทะเลทอด', 'ไข่เจียว', 'แกงจืดหอยผักปลัง', 'ผัดผักกำด', 'ข้าว + ผลไม้'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-02/05/2026', merged: '+25$ / +22$', single: '+65$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 6 มื้อ + บุฟเฟ่ 1 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +150$', 'แยกนอนเดี่ยว 150$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน 75$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'han03',
    code: 'HAN03',
    packageType: 'GIT',
    region: 'North Vietnam',
    title: 'Ha Noi, Tam Dao, Ha Long, Ninh Binh',
    route: 'Ha Noi > Tam Dao > Ha Long > Ninh Binh',
    duration: 4,
    nights: 'Ha Noi 1N + Tam Dao 1N + Ha Long 1N',
    hotel: 'Hotel 3* or 4* standard per kit',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitNorth,
    sourcePages: 'Itinerary p6, price p7',
    surcharges: ['29/04-02/05/2026 +25/+22 USD by band', '24-25/12/2026 single +75 USD'],
    priceRows: [makePrice('Hotel 3*/4* standard - 01/04-30/12/2026', gitBands, [234, 224, 216, 200, 191, 181, 174], '+50 USD')],
    highlights: ['Tam Dao mountain town', 'Ha Long Bay route', 'Ninh Binh boat and countryside'],
    itinerary: [
      {
            day: 1,
            title: 'Ha Noi - Tam Dao',
            titleTh: 'HA NOI – HA LONG',
            notes: ['Airport pickup', 'Tam Dao mountain town', 'Stone church and cafe route'],
            notesTh: ['รับคณะที่สนามบิน 08.00', 'สุสำนลุงโฮ (ถ่ายรูปด้ำนนอก)', 'ทะเลสาบคืนดำบ', 'วัดหงอกเซิน (ถ่ายรูปด้ำนนอก)', 'เดินทางเมืองฮำลอง (ประมำณ 3 ชั่วโมง)', 'แวะถ่ายรูป Mega Grand World'],
            lunch: 'Phuong Nguyen 7$',
            dinner: 'Thang Long Ha Long 7$',
            overnightTh: 'พักที่ City Bay Hotel (3 stars) or similar',
            lunchMenuTh: ['สลัดซอสเสำวรส', 'น่องไก่ย่า งใบมะนำว', 'เปำะเปี๊ยะทะเลทอด', 'ผัดผักบุง้', 'ซี่ โครงหมูซอสเปรี้ ยวหวาน', 'เต้ำหู้เสฉวน', 'ปลาทับทิมนึ่ งซีอิ้ว', 'หมูสำมชั้นทอด', 'แกงจืดผักกำดหอย', 'ข้าว + ผลไม้ + ชำ'],
            dinnerMenuTh: ['กุ้ง นึ่ งตะไคร้', 'ปลาทอดซอส5รส', 'แครี่ ไก่', 'ผัดวุน้ เส้นรวมมิตร', 'หมูพะโล้', 'ผัดทะเลรวมมิตร', 'ผัดผักกำด', 'แกงจืด', 'ข้าว', 'ผลไม้'],
          },
      {
            day: 2,
            title: 'Tam Dao - Ha Long',
            titleTh: 'HA LONG – TAM DAO',
            notes: ['Transfer to Ha Long', 'Bay-area sightseeing', 'Overnight in Ha Long'],
            notesTh: ['รับประทานอาหารเช้าที่โรงแรม', 'ล่องเรืออ่ำวฮำลอง เกำะต่างๆ', 'ถ้ ำสวรรค์', 'เดินทางไปตำมด๋ ำว', 'กำแฟ Gio (รวมเครื่ องดื่มท่านละ 1แก้ว)', 'ถ่ายรูปปรำสำทดำ'],
            lunch: 'Tau Thanh Nien 6$',
            dinner: 'Gio Nui 7$',
            overnightTh: 'พักที่ Genuss Hotel (4 stars) or similar',
            lunchMenuTh: ['หอยนำงรมปิ้ ง (คนละ2ตัว)', 'กุ้ง นึ่ งมะพร้ำว', 'หอยผัดโหระพำ', 'ปลานิลทอดซฮสมะเขือเทศ', 'ปลาหมึกผัดหอม', 'เปำะเปี๊ ยทะเลทอด', 'ไข่เจียว', 'แกงจืดหอยผักปลัง', 'ผัดผักกำด', 'ข้าว + ผลไม้'],
            dinnerMenuTh: ['หม้อไฟรวมมิตร หมูป่ำ ไก่ ปลาสเตอร์ เจียน', 'มันฝรั่งทอด', 'หมูปิ้งเสี ยบไม้', 'ผัดฟักแม้ว', 'ข้าวหลำมทอด', 'ผลไม้ + ชำเย็น'],
          },
      {
            day: 3,
            title: 'Ha Long - Ninh Binh - Ha Noi',
            titleTh: 'TAY THIEN TAM DAO - HA NOI',
            notes: ['Ha Long morning', 'Ninh Binh countryside route', 'Return to Ha Noi'],
            notesTh: ['รับประทานอาหารเช้าที่โรงแรม', 'ประตูสวรรค์', 'ถ่ายรู ที่สะพานเมฑ (Cau May)', 'นัง่ กระเช้าไปวัด Tay Thien', 'ลงกระเช้า', 'กลับฮำนอย', 'ถนน 36สาย'],
            lunch: 'Thach Ban Tay Thien 7$',
            dinner: 'Huong Rung 6$',
            overnightTh: 'พักที่ Capital Garden (4 stars) or similar',
            lunchMenuTh: ['ผักฟักแม้วผัดกระเทียม', 'ปลาดุกนึ่ งซี อิว้', 'ไก่ผดั ขิง', 'หมูทอด', 'ผัดเต้ำหู้', 'แกงจืดผัด หมู', 'ไข่เจียว', 'ข้าว+ชำเย็น'],
            dinnerMenuTh: ['เปำะเปี๊ยะทอด', 'ปลาหมึกทอด', 'ไก่ย่า ง', 'ปลาเสตอร์ เจียนนึ่ งซี อิ้ว', 'หมูทอดกรอบ', 'ซีโรงหมูซอสเปรี้ ยวหวาน', 'ผัดผัก', 'แกงจืดไข่ปู มะเขือดอง', 'ข้าว', 'ผลไม้ + ชำ', '*ถ้าเปลี่ยนมำทำน Sen buffet +15$/pax'],
          },
      {
            day: 4,
            title: 'Ha Noi - Airport',
            titleTh: 'HA NOI – NINH BINH – AIRPORT',
            notes: ['City time or shopping', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้าที่โรงแรม', 'โบสถ์ฮำนอย', 'เดินทางนิงห์บิงห์', 'ล่องเรือตำมก๊ก', 'ช้อปสิ นค้ำโอทอป ไปสนามบิน ส่งคณะ จบโปรแกรม 20.50'],
            lunch: 'Anh Dzung 7$',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: ['เปำะเปี๊ยะทะเลทอด', 'หมูเสี ยบไม้ย่า ง', 'ทอดมันปลา', 'หมู ไข่พะโล้', 'ไข่เจียว', 'ไก่ผดั สับปะรด', 'วุน้ เส้นผัดรวม', 'ผักบุง้ ไฟแดง', 'แกงจืดใส่กงุ้', 'ข้าว + ผลไม้'],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-02/05/2026', merged: '+25$ / +22$', single: '+75$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 7 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่า ยอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิม่ อีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +150$', 'แยกนอนเดี่ยว 150$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิม่ อีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน 60$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'pqc01',
    code: 'PQC01',
    packageType: 'GIT',
    region: 'Phu Quoc',
    title: 'Phu Quoc Island',
    route: 'Phu Quoc > Hon Thom > Grand World',
    duration: 3,
    nights: 'Phu Quoc 2N',
    hotel: 'Phu Quoc 4* standard hotel or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '300 THB/pax/trip',
    assets: kitAssets.gitPhuQuoc,
    sourcePages: 'Itinerary p2, price p3',
    surcharges: ['24/12/2026-02/01/2027 high-season row applies'],
    priceRows: [
      makePrice('01/04-31/10/2026', gitBands, [184, 179, 176, 169, 163, 159, 157], '+60 USD'),
      makePrice('01/11-23/12/2026', gitBands, [198, 194, 191, 184, 178, 174, 171], '+75 USD'),
      makePrice('24/12/2026-02/01/2027', gitBands, [229, 225, 222, 214, 207, 203, 200], '+100 USD'),
    ],
    highlights: ['Hon Thom cable car and Aquatopia', 'Sunset Town and Kiss Bridge', 'Grand World and Venice show area'],
    itinerary: [
      {
            day: 1,
            title: 'Phu Quoc - Hon Thom Cable Car',
            titleTh: 'PHU QUOC – HON THOM CABLE CAR',
            notes: ['Airport pickup', 'Hon Thom cable car', 'Aquatopia and beach', 'Sunset Town and Kiss Bridge'],
            notesTh: ['รับคณะที่สนามบินฟูก๊วก', 'ไปเที่ยวกระเช้าทะเล Hon Thom', 'สวนสนุก สวนน้ำ Aquatopia ชำยหำด Hon Thom', 'ถ่ายรูปโซน Sunset town', 'ถ่ายรูปสะพานจูบ แลนด์มำกใหม่ของฟูก๊วก (เริ่ ม 16/04 มีแจกเบียร์ฟรี 1 ลิตร) Option 1: The Kiss of Sea Show +26$/pax (21.00-21.35) ยกเว้นวันอังคำร Option 2: Set menu at Bavavia restaurant +23$/pax'],
            lunch: 'Bien Vang 8$',
            dinner: 'Sai Gon Domain 8$',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['ยำแมงกะพรุ น', 'ปลาหมึกผัดเปรี้ ยวหวาน', 'กุ้ง ลำยเสื อย่ำง', 'ปลาต้มเค็ม', 'หอยนึ่ง', 'ผักบุง้ ผัดกระเทียม', 'หม้อไฟมันปลา', 'ข้าว', 'ผลไม้', 'ชำ'],
            dinnerMenuTh: ['ยำทะเล', 'กุ้ง ทอดกระเทียม', 'หอยนึ่ง', 'ปลาหำงเหลืองย่ำงห่ อฟอยล์', 'ไข่เจียวหมูสับ', 'ปลาหมึกผัดเปรี้ ยวหวาน', 'หม้อไฟทะเล', 'ข้าว + ขนมจีน', 'ผลไม้', 'ชำ'],
          },
      {
            day: 2,
            title: 'VinWonders - Grand World',
            titleTh: 'VIN WONDER',
            notes: ['VinWonders and aquarium', 'Grand World Phu Quoc', 'Venice show area'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนสนุก Vin Wonder สวนน้ำ และ Aquarium', 'ไปเที่ยว Grand World Phu Quoc ที่ได้ฉำยำนำมว่ำ Venice แห่ งเวียดนำม', 'ชมบ้านไม้ไผ่', 'หมู่บ้า น Venice โชว์กลำงคืน', 'อิสระเล่นคำซีโนที่ Corona Casino', 'อิสระชมโชว์ The color of venice จักขึ้นบริ เวณแม่น้ำเวนิ ส 21.30-22.00 Option 1: ล่องเรือ Gondola +9$/pax (ยังไม่รวม) Option 2: Teddy Bear Museum +9$/pax (ยังไม่รวม)'],
            lunch: 'ไม่ รวม',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['*ถ้าจองบุฟเฟที่สวนสนุก Vin', 'Wonder+15$/pax'],
            dinnerMenuTh: ['*ถ้าเพิ่มเป็นเซตเมนู +9$/pax'],
          },
      {
            day: 3,
            title: 'Phu Quoc - Airport',
            titleTh: 'AIRPORT',
            notes: ['Hotel breakfast', 'Pearl shopping stop', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ชอปปิ้ งร้านไข่มุก', 'ส่งคณะไปสนามบิน'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '24/12/2026-02/01/2027', merged: '229', single: '' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 2 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 300bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +170$', 'แยกนอนเดี่ยว +170$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +70$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'pqc02',
    code: 'PQC02',
    packageType: 'GIT',
    region: 'Phu Quoc',
    title: 'Phu Quoc Island',
    route: 'Phu Quoc > Hon Thom > Grand World',
    duration: 4,
    nights: 'Phu Quoc 3N',
    hotel: 'Muong Thanh Luxury Phu Quoc 4* or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitPhuQuoc,
    sourcePages: 'Itinerary p4, price p5',
    surcharges: ['24/12/2026-02/01/2027 high-season row applies'],
    priceRows: [
      makePrice('01/04-30/10/2026', pqc02Bands, [242, 235, 230, 220, 213, 208, 205], '+72 USD'),
      makePrice('01/11-23/12/2026', pqc02Bands, [265, 259, 255, 244, 237, 232, 228], '+95 USD'),
      makePrice('24/12/2026-02/01/2027', pqc02Bands, [309, 305, 301, 289, 280, 275, 271], '+140 USD'),
    ],
    highlights: ['Hon Thom cable car and Mediterranean Sunset Town', 'Kiss Bridge and optional Kiss of Sea Show', 'Grand World and VinWonders'],
    itinerary: [
      {
            day: 1,
            title: 'Phu Quoc - Hon Thom Cable Car',
            titleTh: 'PHU QUOC – HON THOM CABLE CAR',
            notes: ['Airport pickup', 'Hon Thom cable car and Aquatopia', 'Sunset Town and Kiss Bridge'],
            notesTh: ['รับคณะที่สนามบินฟูก๊วก แล้วขึ้นรถ', 'ไปเที่ยวกระเช้าทะเล Hon Thom', 'สวนสนุก สวนน้ำ Aquatopia ชำยหำด Hon Thom', 'ถ่ายรูปโซนใหม่ฟกู ๊วก Mediterranean Sunset Town', 'ถ่ายรูปสะพานจูป แลนด์มำกใหม่ของฟูก๊วก (โปรโมชัน่ แจกเบียร์ฟรี 1 ลิตรจนกว่ำมีประกำศใหม่) Option 1: The Kiss of Sea Show +26$/pax (21.00-21.35) ยกเว้นวันอังคำร Option 2: Set menu at Bavavia restaurant +23$/pax'],
            lunch: 'ไม่ รวม',
            dinner: 'Bababa seafood buffet 13$',
            overnightTh: 'Hotel 4 star: Muong Thanh luxury Phu Quoc or similar',
            lunchMenuTh: ['*ถ้าเพิ่มมื้อเที่ยง +8$/pax'],
            dinnerMenuTh: ['ปิ้ งย่ำง'],
          },
      {
            day: 2,
            title: 'Grand World',
            titleTh: 'GRAND WORLD',
            notes: ['Grand World Phu Quoc', 'Venice area and evening show', 'Free time by program'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ไปวัดโฮก๊วก', 'ไปสำรเจ้ำ Dinh Cau', 'ชอปปิ้ งร้านผ้ำไหม', 'ชมบ้านไม้ไผ่', 'หมู่บ้า น Venice โชว์กลำงคืน', 'อิสระเล่นคำซีโนที่ Corona Casino', 'อิสระชมโชว์ The color of venice จักขึ้นบริ เวณแม่น้ำเวนิ ส 21.30-22.00'],
            lunch: 'Bien Vang 9$',
            dinner: 'Sai Gon Domain 8$',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['ยำแมงกระพรุ นมะละกอ', 'หอยลำยนึ่ง', 'ปลาหมึกผัดกระเทียม', 'ปลาช่อนย่ำง', 'หมูพะโล้', 'กุ้ง ย่ำงเกลือ', 'ผักบุง้ ผัดกระเทียม', 'หม้อไฟมันปลา', 'ข้าว', 'ผลไม้ + ชำ'],
            dinnerMenuTh: ['ยำทะเล', 'กุ้ง ทอดกระเทียม', 'หอยนึ่ง', 'ปลาหำงเหลืองย่ำงห่ อฟอยล์', 'ไข่เจียวหมูสับ', 'ปลาหมึกผัดเปรี้ ยวหวาน', 'หม้อไฟทะเล', 'ข้าว + ขนมจีน', 'ผลไม้', 'ชำ'],
          },
      {
            day: 3,
            title: 'VinWonders',
            titleTh: 'VIN WONDER',
            notes: ['VinWonders amusement park', 'Aquarium and water park', 'Grand World free time'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'สวนสนุก Vin Wonder', 'สวนน้ำ และ Aquarium', 'อิสระใน Grand World', 'อิสระเล่นคำซีโนที่ Corona Casino'],
            lunch: 'Vin Wonder',
            dinner: 'ไม่ รวม',
            overnightTh: 'Hotel 4 star standard: Vin Holiday Fiesta or similar',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: ['*ถ้าเพิ่มอาหารเซดโต๊ะ +9$/pax'],
          },
      {
            day: 4,
            title: 'Phu Quoc - Airport',
            titleTh: 'AIRPORT',
            notes: ['Hotel breakfast', 'Pearl shopping stop', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ชอปปิ้ งร้านไข่มุก', 'ส่งคณะไปสนามบิน'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '24/12/2026-02/01/2027', merged: '309', single: '' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 2 มื้อ + บุฟเฟ่ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +240$', 'แยกนอนเดี่ยว +240$'], right: ['ฟรี หัว หน้าทัวร์ ท่าน 1(นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +90$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '14 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'cxr01',
    code: 'CXR01',
    packageType: 'GIT',
    region: 'Southern Vietnam',
    title: 'Nha Trang City',
    route: 'Nha Trang City > Vinpearl Land',
    duration: 3,
    nights: 'Nha Trang 2N',
    hotel: 'Maris, TND Hotel 4* standard or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '300 THB/pax/trip',
    assets: kitAssets.gitSouth,
    sourcePages: 'Itinerary p2, price p3',
    surcharges: ['29/04-03/05/2026 +10 USD/pax'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [136, 128, 125, 114, 109, 106, 104], '+25 USD')],
    highlights: ['Ponagar Tower, Long Son Pagoda and Stone Church', 'Jungle Cafe photo stop', 'Vinpearl Land cable car and amusement park'],
    itinerary: [
      {
            day: 1,
            title: 'Nha Trang City',
            titleTh: 'AIRPORT',
            notes: ['Airport pickup', 'Ponagar Tower', 'Jungle Cafe, Long Son Pagoda, Stone Church, Tram Huong photo stop'],
            notesTh: ['รับคณะที่สนามบิน', 'ประสำท Ponaga', 'Jungle Café (ไม่รวมเครื่ องดื่ม)', 'วัดลองเซิ น', 'โบสถ์หิน', 'ถ่ายรูปประสำท Tram Huong'],
            lunch: 'Dong Tien Luxury 7$',
            dinner: 'Thang Loi 6$',
            overnightTh: 'Hotel 4 stars standard: Maris, TND Hotel or similar',
            lunchMenuTh: ['กุ้ง นึ่ งมะพร้ ำว', 'ปลาหมึกทอดน้ำปลา', 'ปลาดุกต้มเค็มหม้อดิน', 'ไก่ผดั ตะไคร้ พริ ก', 'หมูตม้ เค็ม', 'ผักกำดผัดกระเทียม', 'ผัดผักบุง้', 'แกงจืดซี โครงหมู', 'ผลไม้ + ข้าว + ชำเย็น'],
            dinnerMenuTh: ['ปลาทะเลนึ่งพักกำดดอง', 'ปลาหมึกทอด', 'หมูทอด', 'กุ้ง ผัดบร๊ อคโคลี', 'ไก่ผดั ขิง', 'ผักผัดกระเทียม', 'หม้อไฟทะเล', 'ข้าว', 'ผลไม้ + ชำเย็น'],
          },
      {
            day: 2,
            title: 'Nha Trang - Vinpearl Land',
            titleTh: 'NHA TRANG – VINPEARL LAND',
            notes: ['Hotel breakfast', 'Cable car to Vinpearl Land', 'Free time for attractions'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไป Vinpearl Land', 'นัง่ กระเช้าไปสวนสนุก VinPearl', 'อิสระกับเครื่ องเล่นมำกมำย', 'นัง่ กระเช้ากลับฝั่ง'],
            lunch: 'Free Style ไม่ รวม',
            dinner: 'Zalot 12$',
            overnightTh: 'Hotel 4 stars standard: Maris, TND Hotel or simil',
            lunchMenuTh: ['*ถ้าจอง Vinpearl Wonder +14$', 'Buffee'],
            dinnerMenuTh: ['Buffee Seafood', 'ฟรี เบียร์'],
          },
      {
            day: 3,
            title: 'Nha Trang - Airport',
            titleTh: 'NHA TRANG – AIRPORT',
            notes: ['Hotel breakfast', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ส่งคณะที่สนามบิน จบโปรแกรม FD647 10.25'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-03/05/2026', merged: '+10$/pax', single: '' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats (coach)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 2 มื้อ + บุฟเฟ่ 1 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 300bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +100$', 'แยกนอนเดี่ยว +100$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +60$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'cxr02',
    code: 'CXR02',
    packageType: 'GIT',
    region: 'Southern Vietnam',
    title: 'Nha Trang and Da Lat',
    route: 'Nha Trang > Da Lat > Nha Trang',
    duration: 4,
    nights: 'Nha Trang 2N + Da Lat 1N',
    hotel: 'King, Sandal, Sata, Maris 4* standard or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitSouth,
    sourcePages: 'Itinerary p4, price p5',
    surcharges: ['29/04-03/05/2026 +25 USD/pax'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [220, 202, 185, 177, 170, 165, 161], '+37 USD')],
    highlights: ['Da Lat Lam Vien Square and night market', 'Tuyen Lam cable car, Datanla waterfall and Hydrangea garden', 'Vinpearl Wonder and Nha Trang city stops'],
    itinerary: [
      {
            day: 1,
            title: 'Nha Trang - Da Lat',
            titleTh: 'NHA TRANG – DA LAT',
            notes: ['Airport pickup', 'Drive to Da Lat', 'Lam Vien Square and Da Lat night market'],
            notesTh: ['รับคณะที่สนามบิน', 'เดินทางไปดำลัด (ประมำณ 3-3.5 ชั่วโมง)', 'จุตุรัต Lam Vien', 'ตลาดไนต์ดำลัด'],
            lunch: 'Hon Giao 6$',
            dinner: 'Da Lat house 6$',
            overnightTh: 'Hotel 4 stars standard: King, Sandal or similar',
            lunchMenuTh: ['กุ้ง ทอดกระเทียม', 'ปลาทับทิมทอดน้ำปลามะม่วง', 'หมูทอด', 'ไข่เจียวหมูสับ', 'ยำสลัด', 'ผัดผักบุง้', 'แกงจืดผักกำดหมู', 'ข้าว', 'ผลไม้', 'น้ำชำ+ ผ้ำเย็น'],
            dinnerMenuTh: ['กุ้ง ซอสต้มยำ', 'ไข่เจียวหมูสับ', 'หมูผดั เปรี้ ยวหวาน', 'สลัดมะเขือเทศ', 'ผักโขมผัดกระเทียม', 'ไก่ผดั ขิง', 'ปลาสเตอร์เจียนสไตล์ตม้ เค็ม', 'หม้อไฟอำร์ติโซ๊ค', 'ข้าว', 'ผลไม้ + น้ำชำ'],
          },
      {
            day: 2,
            title: 'Da Lat - Nha Trang',
            titleTh: 'DA LAT – NHA TRANG',
            notes: ['Tuyen Lam cable car', 'Datanla waterfall alpine coaster', 'Dragon pagoda, Hydrangea garden, return to Nha Trang'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'กระเช้า Tuyen Lam (1 ขำ) วัดตุก๊ ลัม', 'น้ำตำกดำทันลำ นัง่ รถรำงไปกลับ', 'วัดมังกร', 'สวนดอกไม้ไฮเดนเยีย', 'เดินทางกลับไปไปญำจำง'],
            lunch: 'Nha Toi 7.$',
            dinner: 'Zalot',
            overnightTh: 'Hotel 4 stars standard: Sata, Maris or similar',
            lunchMenuTh: ['หมูย่า ง + มันฝรั่งทอด', 'เปำะเปี๊ยะทอด', 'ปลาดุกต้มเค็มหม้อดิน', 'ไก่ทอดน้ำปลา', 'ผักผัดรวม', 'ยำสลัดกุ้ง หมู', 'หม้อไฟซีโครงหมู', 'ข้าว + ผลไม้ + ชำ'],
            dinnerMenuTh: ['Seafood buffee'],
          },
      {
            day: 3,
            title: 'Nha Trang',
            titleTh: 'NHA TRANG',
            notes: ['Vinpearl Wonder', 'Cable car and amusement park', 'Long Son Pagoda, Stone Church, night market'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'นัง่ กระเช้าข้ำมทะเล ไปสวนสนุก VinPearl', 'อิสระกับเครื่ องเล่นมำกมำย', 'นัง่ กระเช้ากลับฝั่ง', 'วัดลองเซิน', 'โบสถ์หิน', 'ตลาดไนต์'],
            lunch: 'Vinpearl Wonder 14$',
            dinner: 'Free Style ไม่ รวม',
            overnightTh: 'Hotel 4 stars standard: Sata, Maris or similar',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: ['*ถ้ารวมอาหารเย็น +6$/pax'],
          },
      {
            day: 4,
            title: 'Airport',
            titleTh: 'AIRPORT',
            notes: ['Hotel breakfast', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ส่งสนามบิน'],
            lunch: '',
            dinner: '',
            overnightTh: '',
            lunchMenuTh: [],
            dinnerMenuTh: [],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-03/05/2026', merged: '+25$/pax', single: '' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats (coach)' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 3 มื้อ + บุฟเฟ่ 2 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +160$', 'แยกนอนเดี่ยว +160$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +80$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'sgn01',
    code: 'SGN01',
    packageType: 'GIT',
    region: 'Southern Vietnam',
    title: 'Ho Chi Minh and Mui Ne',
    route: 'Ho Chi Minh > Mui Ne > Ho Chi Minh',
    duration: 3,
    nights: 'Ho Chi Minh 1N + Mui Ne 1N',
    hotel: 'Vipol, Tien Dat, Acnoss 4* standard or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '300 THB/pax/trip',
    assets: kitAssets.gitSouth,
    sourcePages: 'Itinerary p6, price p7',
    surcharges: ['29/04-03/05/2026 +25 USD/pax'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [187, 173, 162, 149, 142, 137, 133], '+50 USD')],
    highlights: ['Mui Ne Fairy Stream and sand dunes', 'White Sand Dunes jeep route', 'Ho Chi Minh city tour and Saigon dinner cruise'],
    itinerary: [
      {
            day: 1,
            title: 'Ho Chi Minh - Mui Ne',
            titleTh: 'HO CHI MINH – MUI NE',
            notes: ['Airport pickup', 'Drive to Mui Ne', 'Fairy Stream, Red Sand Dunes and fishing village'],
            notesTh: ['รับคณะที่สนามบิน', 'เดินทางไปมุยแน่ (ประมำณ 4 ชั่วโมง)', 'เดินลำธำรสวรรค์', 'ชมทะเลทรำยแดง', 'หมู่บ้า นชำวประโมงค์'],
            lunch: 'Cao Phat 7$',
            dinner: 'Lang Chai 7$',
            overnightTh: 'Hotel 4 stars standard: Vipol, Tien Dat (4 stars) or similar',
            lunchMenuTh: ['ปลาหมึกผัดสะเต๊ะ', 'ปลาอินทรี ทอดน้ำปลา', 'หมูตม้ เค็มหม้อดิน', 'ไก่ทอด', 'ดอกฟักเขียวผัดกระเทียม', 'ไข่เจียวหมูสับ', 'แกงจืดฟักเขียวซีโครงหมู', 'ข้าวในหม้อดิน', 'ผลไม้ + ชำ'],
            dinnerMenuTh: ['หมูพะโล้', 'หอยนึ่ง', 'ปลาทับทิมต้ม+ขนมจีน', 'ผักกำดผัดกระเทียม', 'ไข่เจียว', 'ปลาหมึกทอดกรอบ', 'แกงจืดน้ำเต้ำกุ้ง', 'ข้าว', 'ผลไม้ + ชำ'],
          },
      {
            day: 2,
            title: 'Mui Ne - Ho Chi Minh',
            titleTh: 'MUI NE – HO CHI MINH',
            notes: ['White Sand Dunes with jeep', 'Walking street, Uncle Ho statue, Cafe Apartment', 'Saigon river dinner cruise'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ชมทะเลทรำยขำว (รวมค่ารถจี๊ปลุยทรำย)', 'กลับไปโฮจิมินห์', 'ถนนคนเดิน', 'อนุสำวรี ลุงโฮ', 'Cafe Apartment', 'ล่องเรือทำนข้าว แม่น้ำซ่ำยง่อน'],
            lunch: 'Canh Buom Vang 7$',
            dinner: 'Ben Nghe Cruise 22$',
            overnightTh: 'Hotel 4 stars standard: Acnoss hotel (4 stars) or similar',
            lunchMenuTh: ['ปลาหมึกนึ่งขิง', 'ซี่โครงหมูผดั เค็ม', 'สลัดน้ำใส', 'ปลายอผัดเปรี้ ยวหวาน', 'เต้ำหู้ตม้ ไข่', 'ไก่ผดั ตะไคร้', 'หม้อไฟปลาดุก + ขนมจีน', 'ข้าว', 'ผลไม้', 'น้ำชำเ'],
            dinnerMenuTh: ['เปำะเปี๊ยะกุ้ง หมูทอด', 'หมูกอ้ นซอสฮ่องกง', 'เนื้อปลาทอดซอสเปรี้ ยวหวาน', 'ไก่ผดั ขิง', 'ปลาหมึกผัดรวม', 'เต้ำหู้เสฉวน', 'ผักบุง้ ไฟแดง', 'แกงรวมมิตร', 'ข้าว', 'ผลไม้ + น้ำชำเย็น'],
          },
      {
            day: 3,
            title: 'Ho Chi Minh - Airport',
            titleTh: 'HO CHI MINH CITY TOUR – AIRPORT',
            notes: ['Independence Palace', 'Notre Dame Cathedral, Central Post Office, Ba Thien Hau temple, Ben Thanh Market', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ทำเนียบอิสระภำพ', 'โบสถ์นอเธอดัม', 'ไปรษณี ยก์ ลำง', 'วัดเจ้ำแม่ทบั ทิม', 'ตลาดเบ๋ นถัน่', 'ส่งสนามบิน'],
            lunch: 'Ganh Bong Sen',
            dinner: 'Free Style ไม่ รวม',
            overnightTh: '',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: ['*ถ้ารวมอาหารเย็น +9$/pax'],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-03/05/2026', merged: '+25$/pax', single: '' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 2 มื้อ + อาหารมื้อหลัก 4 มื้อ + บุฟเฟ่ 1 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 300bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +125$', 'แยกนอนเดี่ยว +125$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +30$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
  makeTour({
    id: 'sgn02',
    code: 'SGN02',
    packageType: 'GIT',
    region: 'Southern Vietnam',
    title: 'Ho Chi Minh, Mui Ne, Da Lat',
    route: 'Ho Chi Minh > Mui Ne > Da Lat',
    duration: 4,
    nights: 'Ho Chi Minh 1N + Mui Ne 1N + Da Lat 1N',
    hotel: 'Vipol, Unique, Da Lat and Ho Chi Minh 4* standard hotels or similar',
    groupRange: '8-42 pax',
    vehicle: '29-seat mini bus, 35-seat coach, or 45-seat bus',
    tip: '400 THB/pax/trip',
    assets: kitAssets.gitSouth,
    sourcePages: 'Itinerary p8, price p9',
    surcharges: ['29/04-03/05/2026 +30 USD/pax', '24-26/12/2026 single +98 USD'],
    priceRows: [makePrice('Hotel 4* standard - 01/04-30/12/2026', gitBands, [244, 224, 210, 194, 184, 177, 172], '+68 USD')],
    highlights: ['Mui Ne dunes and fishing village', 'Da Lat mountain city route', 'Ho Chi Minh city highlights'],
    itinerary: [
      {
            day: 1,
            title: 'Ho Chi Minh - Mui Ne',
            titleTh: 'HO CHI MINH – MUI NE',
            notes: ['Airport pickup', 'Fairy Stream', 'Red Sand Dunes with jeep and fishing village'],
            notesTh: ['รับคณะที่สนามบิน', 'เดินทางไปมุยแน่ (ประมำณ 4 ชั่วโมง)', 'เดินลำธำรสวรรค์', 'ชมทะเลทรำยแดง', 'ชมทะเลทรำยแดง (รวมรถจี๊ป)', 'หมู่บ้า นชำวประโมงค์'],
            lunch: 'Cao Phat 7$',
            dinner: 'Lang Chai 7$',
            overnightTh: 'Hotel 4 stars standard: Vipol, Unique (4 stars) or similar',
            lunchMenuTh: ['ปลาหมึกผัดสะเต๊ะ', 'ปลาอินทรี ทอดน้ำปลา', 'หมูตม้ เค็มหม้อดิน', 'ไก่ทอด', 'ดอกฟักเขียวผัดกระเทียม', 'ไข่เจียวหมูสับ', 'แกงจืดฟักเขียวซีโครงหมู', 'ข้าวในหม้อดิน', 'ผลไม้ + ชำ'],
            dinnerMenuTh: ['หมูพะโล้', 'หอยนึ่ง', 'ปลาทับทิมต้ม+ขนมจีน', 'ผักกำดผัดกระเทียม', 'ไข่เจียว', 'ปลาหมึกทอดกรอบ', 'แกงจืดน้ำเต้ำกุ้ง', 'ข้าว', 'ผลไม้ + ชำ'],
          },
      {
            day: 2,
            title: 'Mui Ne - Da Lat',
            titleTh: 'MUI NE – DA LAT',
            notes: ['White Sand Dunes', 'Drive to Da Lat', 'Da Lat night market'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปเมืองดำลัด', 'สวนดอกไม้ไฮเดนเยีย', 'กระเช้า Tuyen Lam (1 ขำ) วัดตุก๊ ลัม', 'น้ำตำกดำทันลำ นัง่ รถรำงไปกลับ', 'ตลาดไนต์ดำลัด'],
            lunch: 'Nha Toi 7$',
            dinner: 'Da Lat house 6$',
            overnightTh: 'Hotel 4 stars standard: King, TTC Golf (4 stars) or similar',
            lunchMenuTh: ['หมูย่า ง + มันฝรั่งทอด', 'เปำะเปี๊ยะทอด', 'ปลาดุกต้มเค็มหม้อดิน', 'ไก่ทอดน้ำปลา', 'ผักผัดรวม', 'ยำสลัดกุ้ง หมู', 'หม้อไฟซีโครงหมู', 'ข้าว + ผลไม้ + ชำ'],
            dinnerMenuTh: ['กุ้ง ซอสเปรี้ ยวเผ็ด', 'ไข่เจียวหมูสับ', 'หมูผดั เปรี้ ยวหวาน', 'เปำะเปี๊ยะกุ้ง หมูทอด', 'ผักโขมผัดกระเทียม', 'ไก่ผดั ขิง', 'ปลาสเตอร์เจียนสไตล์ตม้ เค็ม', 'หม้อไฟอำร์ติโซ๊ค', 'ข้าว', 'ผลไม้ + น้ำชำ'],
          },
      {
            day: 3,
            title: 'Da Lat - Ho Chi Minh',
            titleTh: 'DA LAT – HO CHI MINH',
            notes: ['Da Lat highlights', 'Return to Ho Chi Minh', 'Evening city time'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'เดินทางไปโฮจิมินห์ (ประมำณ 6-7 ชั่วโมง)', 'ถนนคนเดิน Nguyen Hue', 'อนุสำวรี ลุงโฮ', 'Café Apartment'],
            lunch: 'Song Chau 7.5$',
            dinner: 'Sai Gon 3 9$',
            overnightTh: 'Hotel 4 stars standard: Acnoss (4 stars) or similar',
            lunchMenuTh: ['สลัดไข่', 'ยำรวมมิตร + ข้าวเกรี ยบกุ้ง', 'หมูย่า ง + มันฝรั่งทอด', 'เปำะเปี๊ยะทอด', 'หมูตม้ หน่อไม้', 'เนื้อปลาดุกทอด - กิมจิ', 'บล๊อคโคลี่ผดั หมู', 'ไก่ตม้ เห็ด', 'ข้าว', 'ผลไม้ + ชำ'],
            dinnerMenuTh: ['แกงสำหร่ ำยหมูสับ', 'ไก่ผดั ซอสไทย', 'ปลาทับทิมผัดเปรี้ ยวหวาน', 'ไส้หมูต๋ นุ สไตล์ฮ่องกง', 'ทะเลผัดสะเต๊ะ', 'เปำะเปี๊ยะกุ้ง หมูทอด', 'ไข่น่ ึง3รส', 'ผักกำดผัดน้ำมันหอย', 'มะเขือยำวผัดปลาเค็มหมูสับ', 'ข้าว + ผลไม้'],
          },
      {
            day: 4,
            title: 'Ho Chi Minh - Airport',
            titleTh: 'HO CHI MINH CITY TOUR – AIRPORT',
            notes: ['City tour and market', 'Airport transfer'],
            notesTh: ['รับประทานอาหารเช้า ณ โรงแรม', 'ทำเนียบอิสระภำพ', 'โบสถ์นอเธอดัม', 'ไปรษณี กลำง', 'วัดเจ้ำแม่ทบั ทิม', 'ตลาดเบ๋ นถัน่', 'ส่งสนามบิน'],
            lunch: 'Ganh Bong Sen',
            dinner: 'Free Style ไม่ รวม',
            overnightTh: '',
            lunchMenuTh: ['Buffee'],
            dinnerMenuTh: ['*ถ้ารวมอาหารเย็น +9$/pax'],
          }
    ],
    pdfPriceLayout: true,
    priceExtraRows: [
      { label: '29/04-03/05/2026', merged: '+30$/pax', single: '+98$' }
    ],
    vehicleRows: [
      { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
    ],
    inclusionsTh: ['โรงแรมที่พกั (ห้องละ 2-3 ท่าน) ทุกคืนที่ระบุในโปรแกรม', 'อาหารเช้าที่โรงแรม 3 มื้อ + อาหารมื้อหลัก 6 มื้อ + บุฟเฟ่ 1 มื้อ', 'รถปรับอำกำศคุณภำพดี', 'ไกด์ท้องถิ่นสื่ อสำรภำษำไทย หรืออังกฤษตำมควำมต้องการ', 'บัตรเข้ำชมสถานที่เที่ยวต่างๆที่ระบุในโปรแกรม'],
    exclusionsTh: ['ยังไม่รวมค่าทิปให้ไกด์ท้องถิ่นกับคนขับรถ 400bath/pax/trip', 'ค่าใช้จ่ายอื่นๆ ที่ไม่ได้ระบุในโปรแกรม'],
    childRatesTh: ['เด็ก 0-2 ขวบ ฟรี', 'เด็ก 3-6 ขวบ คิด50% ค่าทัวร์ และเด็กต้องนอนกับผู้ใหญ่ (ถ้าใช้เตียงก็จ่ายเพิ่มค่าเตียงเท่ำกับค่าพักเดี่ยว)', 'เด็ก 7 ขวบขึ้นไป คิด100% ค่าทัวร์ และใช้สิทธิ์เหมือนกับผู้ใหญ่'],
    remarksTh: { left: ['ไม่ฟรี หัว หน้าทัวร์', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนเดี่ยว +173$', 'แยกนอนเดี่ยว +173$'], right: ['ฟรี หัว หน้าทัวร์ 1 ท่าน (นอนเดี่ยว)', '*ถ้าเพิ่มอีก 1 หัวหน้าทัวร์', 'นอนด้วยกัน +40$'] },
    paymentTermsTh: [
      ['หลังจากแจ้งคอนเฟิร์มกรุ๊ ป โอนค่ามัดจำ 30%', '30% ของยอดทั้งหมด'],
      ['โอนชำระเงินส่วนที่เหลือ', '7 วันก่อนเดินทาง']
    ],
    cancellationPolicyTh: [
      ['ก่อน 21 วันเช็คอิน', 'ไม่โดนชาร์จ'],
      ['จาก 20 วันถึง 07 วันก่อนวันเดินทาง', 'ชาร์จ 50% ราคาทัวร์'],
      ['จาก 06 วันก่อนวันเดินทาง', 'ชาร์จ 90% ราคาทัวร์']
    ]
  }),
];
