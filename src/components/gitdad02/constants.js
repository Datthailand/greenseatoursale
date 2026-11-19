export const EXCHANGE_RATE = 35; // 1 USD = 35 THB

export const GIT_PRICE_GRID = [
  { minPax: 8, maxPax: 9, bandLabel: '8 - 9 khách', bandLabelTh: '8 - 9 ท่าน', bandLabelEn: '8 - 9 Pax', netUsd: 186, vehicle: 'Xe 29 chỗ (Mini bus)', vehicleTh: 'รถบัส 29 ที่นั่ง (Mini bus)', vehicleEn: '29-Seat Mini Bus', focTL: 0 },
  { minPax: 10, maxPax: 14, bandLabel: '10 - 14 khách', bandLabelTh: '10 - 14 ท่าน', bandLabelEn: '10 - 14 Pax', netUsd: 179, vehicle: 'Xe 29 chỗ (Mini bus)', vehicleTh: 'รถบัส 29 ที่นั่ง (Mini bus)', vehicleEn: '29-Seat Mini Bus', focTL: 0 },
  { minPax: 15, maxPax: 19, bandLabel: '15 - 19 khách', bandLabelTh: '15 - 19 ท่าน', bandLabelEn: '15 - 19 Pax', netUsd: 177, vehicle: 'Xe 35 chỗ cao cấp', vehicleTh: 'รถบัส 35 ที่นั่ง', vehicleEn: '35-Seat Coach', focTL: 1 },
  { minPax: 20, maxPax: 24, bandLabel: '20 - 24 khách', bandLabelTh: '20 - 24 ท่าน', bandLabelEn: '20 - 24 Pax', netUsd: 171, vehicle: 'Xe 45 chỗ Universe', vehicleTh: 'รถบัส 45 ที่นั่ง Universe', vehicleEn: '45-Seat Bus Universe', focTL: 1 },
  { minPax: 25, maxPax: 29, bandLabel: '25 - 29 khách', bandLabelTh: '25 - 29 ท่าน', bandLabelEn: '25 - 29 Pax', netUsd: 166, vehicle: 'Xe 45 chỗ Universe', vehicleTh: 'รถบัส 45 ที่นั่ง Universe', vehicleEn: '45-Seat Bus Universe', focTL: 1 },
  { minPax: 30, maxPax: 34, bandLabel: '30 - 34 khách', bandLabelTh: '30 - 34 ท่าน', bandLabelEn: '30 - 34 Pax', netUsd: 163, vehicle: 'Xe 45 chỗ Universe', vehicleTh: 'รถบัส 45 ที่นั่ง Universe', vehicleEn: '45-Seat Bus Universe', focTL: 1 },
  { minPax: 35, maxPax: 42, bandLabel: '35 - 42 khách', bandLabelTh: '35 - 42 ท่าน', bandLabelEn: '35 - 42 Pax', netUsd: 160, vehicle: 'Xe 45 chỗ Universe', vehicleTh: 'รถบัส 45 ที่นั่ง Universe', vehicleEn: '45-Seat Bus Universe', focTL: 1 },
];

export const SURCHARGES = {
  singleRoomUsd: 65,
  holidaySmallGroupUsd: 28, // 8-14 pax
  holidayBigGroupUsd: 25,   // 15-42 pax
  holidaySingleRoomUsd: 90, // Holiday single surcharge
  extraTourLeaderTwinUsd: 70,   // Extra TL twin sharing (15+ pax)
  extraTourLeaderSingleUsd: 190 // Extra TL single room (or 8-14 pax TL single)
};

export const OPTIONAL_ACTIVITIES = [
  {
    id: 'opt_lobster_whole',
    nameVi: 'Nâng cấp Tôm Hùm nguyên con tại Long Qiao Buffet',
    nameTh: 'อัปเกรดกุ้งมังกร 1 ตัวเต็ม ที่ Long Qiao Buffet',
    nameEn: 'Upgrade to Full Whole Lobster at Long Qiao Buffet',
    priceUsd: 7,
    unitVi: '/ khách',
    unitTh: '/ ท่าน',
    unitEn: '/ pax',
    descVi: 'Mỗi khách được nâng cấp từ nửa con tôm hùm nướng bơ lên 1 con nguyên con tươi ngon.',
    descTh: 'อัปเกรดจากกุ้งมังกรครึ่งตัวเป็นกุ้งมังกร 1 ตัวเต็มอบเนย เสิร์ฟร้อนๆ ริมสะพานมังกร',
    descEn: 'Upgrade complimentary half lobster to a full whole baked butter lobster per guest.'
  },
  {
    id: 'opt_day3_setmenu',
    nameVi: 'Nâng cấp bữa trưa Ngày 3 thành Set Menu đặc sản',
    nameTh: 'อัปเกรดมื้อเที่ยงวันที่ 3 เป็นเซตเมนูอาหารเวียดนาม',
    nameEn: 'Upgrade Day 3 Lunch to Full Vietnamese Set Menu',
    priceUsd: 6,
    unitVi: '/ khách',
    unitTh: '/ ท่าน',
    unitEn: '/ pax',
    descVi: 'Đổi từ Bánh mì đặc sản sang bữa trưa Set menu 8 món Việt Nam tại nhà hàng máy lạnh.',
    descTh: 'เปลี่ยนจากขนมปังบั๋นหมี่เป็นมื้ออาหารเซตโต๊ะ 8 อย่าง ณ ภัตตาคารปรับอากาศ',
    descEn: 'Upgrade standard Banh Mi lunch to an 8-dish Vietnamese dining set menu.'
  },
  {
    id: 'opt_lantern_boat',
    nameVi: 'Thuyền gỗ du ngoạn sông Hoài + Thả hoa đăng dưới nước',
    nameTh: 'นั่งเรือไม้ล่องแม่น้ำฮว่าย + ลอยกระทงกลางน้ำ',
    nameEn: 'Hoai River Wooden Boat Cruise + Water Lantern Floating',
    priceUsd: 5,
    unitVi: '/ khách',
    unitTh: '/ ท่าน',
    unitEn: '/ pax',
    descVi: 'Du thuyền gỗ truyền thống 20 phút trên sông Hoài và tự tay thả hoa đăng lung linh.',
    descTh: 'ล่องเรือไม้โบราณ 20 นาที และลอยกระทงกระดาษกลางแม่น้ำฮว่ายยามค่ำคืน',
    descEn: '20-min scenic wooden boat ride with floating paper lanterns on Hoai River.'
  },
  {
    id: 'opt_cyclo_hoian',
    nameVi: 'Xích lô tham quan Phố cổ Hội An',
    nameTh: 'นั่งรถสามล้อซิโคล่ชมเมืองโบราณฮอยอัน',
    nameEn: 'Vintage Cyclo Tour in Hoi An Ancient Town',
    priceUsd: 6,
    unitVi: '/ khách',
    unitTh: '/ ท่าน',
    unitEn: '/ pax',
    descVi: 'Trải nghiệm xích lô thong dong qua các góc phố cổ và chụp ảnh lưu niệm.',
    descTh: 'นั่งรถสามล้อซิโคล่ชมบรรยากาศเมืองโบราณฮอยอันอย่างเพลิดเพลิน',
    descEn: 'Relaxing 30-min vintage cyclo ride through the charming lantern streets.'
  },
  {
    id: 'opt_marble_mountains',
    nameVi: 'Danh thắng Núi Ngũ Hành Sơn & Thang máy',
    nameTh: 'เขาหินอ่อนงูฮัญเซิน รวมลิฟต์แก้ว',
    nameEn: 'Marble Mountains & Glass Elevator Entrance',
    priceUsd: 5,
    unitVi: '/ khách',
    unitTh: '/ ท่าน',
    unitEn: '/ pax',
    descVi: 'Vé tham quan danh thắng Ngũ Hành Sơn, Động Huyền Không và vé thang máy 2 chiều.',
    descTh: 'ตั๋วเข้าชมเขาหินอ่อน ถ้ำฮวาเงียม และตั๋วลิฟต์แก้วขึ้นลงสะดวกสบาย',
    descEn: 'Full entry tickets to Marble Mountains caves and round-trip glass elevator.'
  },
  {
    id: 'opt_cham_museum',
    nameVi: 'Bảo tàng Điêu khắc Chăm Đà Nẵng',
    nameTh: 'พิพิธภัณฑ์ประติมากรรมจาม ดานัง',
    nameEn: 'Da Nang Museum of Cham Sculpture',
    priceUsd: 4,
    unitVi: '/ khách',
    unitTh: '/ ท่าน',
    unitEn: '/ pax',
    descVi: 'Vé vào cổng bảo tàng lưu giữ hiện vật văn hóa Chăm Pa quy mô nhất thế giới.',
    descTh: 'ตั๋วเข้าชมพิพิธภัณฑ์โบราณวัตถุวัฒนธรรมจามปาที่ใหญ่ที่สุดในโลก',
    descEn: 'Admission ticket to the world largest collection of ancient Cham artifacts.'
  }
];

export const FLIGHT_SCHEDULES = {
  BKK: [
    {
      airline: 'Thai Vietjet Air',
      code: 'VZ960 / VZ961',
      outbound: '10:50 - 12:30',
      inbound: '13:15 - 14:55',
      banaMatch: 'Khớp hoàn hảo cáp treo Bà Nà Ngày 1',
      banaMatchTh: 'ขึ้นกระเช้าบานาฮิลล์วันแรกได้ทันเวลา',
      banaMatchEn: 'Perfect match for Day 1 Ba Na cable car',
      status: 'recommended'
    },
    {
      airline: 'Bangkok Airways',
      code: 'PG947 / PG948',
      outbound: '11:00 - 12:50',
      inbound: '13:40 - 15:30',
      banaMatch: 'Khớp giờ cáp treo & nhận phòng Mercure',
      banaMatchTh: 'ทันเวลาขึ้นกระเช้าและเช็คอิน Mercure',
      banaMatchEn: 'Matches cable car & Mercure check-in',
      status: 'recommended'
    },
    {
      airline: 'Vietnam Airlines',
      code: 'VN626 / VN627',
      outbound: '18:05 - 19:45',
      inbound: '15:25 - 17:15',
      banaMatch: 'Chuyến tối: Ngủ Đà Nẵng Đêm 1, lên Bà Nà Ngày 2',
      banaMatchTh: 'เที่ยวบินค่ำ: พักดานังคืนแรก ขึ้นบานาฮิลล์วันที่ 2',
      banaMatchEn: 'Evening flight: Night 1 Da Nang, Ba Na on Day 2',
      status: 'evening'
    }
  ],
  DMK: [
    {
      airline: 'Thai AirAsia',
      code: 'FD636 / FD637',
      outbound: '10:15 - 12:00',
      inbound: '12:30 - 14:15',
      banaMatch: 'Khớp hoàn hảo cáp treo Bà Nà Ngày 1',
      banaMatchTh: 'ขึ้นกระเช้าบานาฮิลล์วันแรกได้ทันเวลา',
      banaMatchEn: 'Perfect match for Day 1 Ba Na cable car',
      status: 'recommended'
    },
    {
      airline: 'Thai AirAsia',
      code: 'FD638 / FD639',
      outbound: '15:45 - 17:30',
      inbound: '18:00 - 19:45',
      banaMatch: 'Chuyến chiều: Ngủ Đà Nẵng Đêm 1, lên Bà Nà Ngày 2',
      banaMatchTh: 'เที่ยวบินบ่าย: พักดานังคืนแรก ขึ้นบานาฮิลล์วันที่ 2',
      banaMatchEn: 'Afternoon flight: Night 1 Da Nang, Ba Na on Day 2',
      status: 'evening'
    }
  ],
  CNX: [
    {
      airline: 'Thai AirAsia',
      code: 'FD648 / FD649',
      outbound: '08:00 - 09:45',
      inbound: '10:15 - 12:00',
      banaMatch: 'Hạ cánh sớm, trọn vẹn lịch trình Bà Nà Ngày 1',
      banaMatchTh: 'ถึงเช้า เที่ยวบานาฮิลล์วันแรกได้เต็มวัน',
      banaMatchEn: 'Early arrival, full Ba Na Hills Day 1',
      status: 'recommended'
    }
  ]
};

export const THAI_PARTNERS = [
  { name: 'Top Hit Tour', logo: '/images/partners/tophit.png' },
  { name: 'Jacky Tour', logo: '/images/partners/jacky.png' },
  { name: 'CDC Travel', logo: '/images/partners/cdc.png' },
  { name: 'THINEE VIP', logo: '/images/partners/thinee.png' },
  { name: 'P.L.U Tour', logo: '/images/partners/plu.png' },
  { name: 'Triple Tree Tour', logo: '/images/partners/tripletree.png' },
  { name: 'Spa Tour DD', logo: '/images/partners/spatour.png' },
  { name: 'Virgo Center Tour', logo: '/images/partners/virgo.png' },
  { name: 'D.O.I. Tour', logo: '/images/partners/doi.png' },
  { name: 'Clinic Tour', logo: '/images/partners/clinictour.png' },
  { name: 'GCGO', logo: '/images/partners/gcgo.png' },
  { name: 'Sat & Sun Tour', logo: '/images/partners/satandsun.png' },
  { name: 'TTN Plus World', logo: '/images/partners/ttn-plus.png' },
  { name: '2U Center Tour', logo: '/images/partners/2u-center.png' },
  { name: 'Check-in Group', logo: '/images/partners/checkin-group-large.png' },
  { name: 'Formosa Travel Group', logo: '/images/partners/formosa-group.png' },
  { name: 'Go Holiday', logo: '/images/partners/go-holiday-icon.png' },
  { name: 'GS25 Travel', logo: '/images/partners/gs25.png' },
  { name: 'Pearl Outbound', logo: '/images/partners/pearl.png' }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    titleVi: 'Đặc Quyền "Golden Hours" Bình Minh Cầu Vàng',
    titleTh: 'สิทธิพิเศษ "Golden Hours" สะพานมือสีทองยามเช้า',
    titleEn: 'Exclusive "Golden Hours" Sunrise at Golden Bridge',
    descVi: 'Đón chuyến cáp treo sớm chạm đỉnh Cầu Vàng trong sương mây bình minh tĩnh lặng trước khi mở cửa cho khách công cộng.',
    descTh: 'นั่งกระเช้ารอบเช้าตรู่ สัมผัสสะพานมือสีทองยามพระอาทิตย์ขึ้น ไร้ผู้คนแออัด บันทึกภาพความงามอันน่าหลงใหล',
    descEn: 'Exclusive early morning cable car access to the Golden Bridge at sunrise with serene, uncrowded views.',
    img: '/assets/golden-bridge-sunrise.jpg'
  },
  {
    id: 2,
    titleVi: 'Cầu Vàng & Đỉnh Núi Chúa Bà Nà Hills',
    titleTh: 'สะพานมือสีทอง & ยอดเขาบานาฮิลล์',
    titleEn: 'Golden Bridge & Ba Na Hills Peaks',
    descVi: 'Khám phá biểu tượng đôi bàn tay đá khổng lồ vươn giữa mây ngàn và quần thể giải trí Sun World đỉnh cao.',
    descTh: 'ชมความยิ่งใหญ่ของสะพานมือสีทองท่ามกลางทิวทัศน์ธรรมชาติและสวนสนุกระดับโลก',
    descEn: 'Explore the iconic giant stone hands bridge amid breathtaking mountain peaks and Sun World complex.',
    img: '/assets/golden-bridge.jpg'
  },
  {
    id: 3,
    titleVi: 'Mercure Làng Pháp Trên Đỉnh Bana Hills 4*',
    titleTh: 'หมู่บ้านฝรั่งเศส & โรงแรม Mercure 4*',
    titleEn: 'French Village & Mercure 4* Stay',
    descVi: 'Nghỉ đêm 4 sao bồng bềnh giữa không khí se lạnh tựa châu Âu, ngắm Làng Pháp lung linh về đêm.',
    descTh: 'พักผ่อนบนยอดเขา อากาศเย็นสบายตลอดทั้งปี และสัมผัสความโรแมนติกของหมู่บ้านฝรั่งเศส',
    descEn: '4-star overnight stay atop the mist-shrouded peak, embracing cool European mountain air.',
    img: '/assets/mercure-french-village.jpg'
  },
  {
    id: 4,
    titleVi: 'Thuyền Thúng Rừng Dừa Bảy Mẫu Cẩm Thanh',
    titleTh: 'ล่องเรือกระด้ง หมู่บ้านกั๊มทาน',
    titleEn: 'Cam Thanh Coconut Basket Boat Show',
    descVi: 'Trải nghiệm chèo thuyền thúng len lỏi rừng dừa nước và xem nghệ nhân biểu diễn múa thúng giăng lưới sôi động.',
    descTh: 'สัมผัสวิถีชีวิตชาวประมง ชมโชว์หมุนเรือกระด้งสุดมันส์ตามจังหวะดนตรีกลางป่ามะพร้าว',
    descEn: 'Spinning basket boat adventures and traditional net throwing performances in the waterways.',
    img: '/assets/coconut-basket-boat.jpg'
  },
  {
    id: 5,
    titleVi: 'Phố Cổ Hội An Lung Linh Về Đêm',
    titleTh: 'เมืองโบราณฮอยอัน มรดกโลก',
    titleEn: 'Hoi An Lantern Heritage Town',
    descVi: 'Dạo bước phố cổ ngập tràn đèn lồng rực rỡ, thả hoa đăng lung linh cầu an trên dòng sông Hoài thơ mộng.',
    descTh: 'ชมโคมไฟหลากสีสัน ลอยกระทงดอกไม้ริมแม่น้ำฮว่าย และชมสถาปัตยกรรมมรดกโลก',
    descEn: 'Lantern-lit ancient streets, river paper flower floating and rich UNESCO heritage culture.',
    img: '/assets/hoi-an-night.jpg'
  },
  {
    id: 6,
    titleVi: 'Chùa Linh Ứng Bán Đảo Sơn Trà',
    titleTh: 'ไหว้พระวัดลิงอื๋ง เจ้าแม่กวนอิม 67 ม.',
    titleEn: 'Linh Ung Pagoda & Lady Buddha',
    descVi: 'Chiêm bái Tượng Phật Bà Quan Âm cao 67m ngắm biển Đông thanh bình và toàn cảnh bờ vịnh Đà Nẵng.',
    descTh: 'สักการะเจ้าแม่กวนอิมสีขาวองค์ใหญ่ที่สุดริมอ่าวดานัง ชมทิวทัศน์ท้องทะเลกว้างไกล',
    descEn: 'Visit the majestic 67m Lady Buddha with panoramic coastal views of Da Nang bay.',
    img: '/assets/linh-ung-pagoda.jpg'
  },
  {
    id: 7,
    titleVi: 'Đại Tiệc Buffet Hải Sản & Tặng Tôm Hùm Nướng',
    titleTh: 'บุฟเฟต์ซีฟู้ด Long Qiao + แถมกุ้งมังกร',
    titleEn: 'Long Qiao Seafood Buffet + Lobster Gift',
    descVi: 'Buffet hải sản nướng lẩu thả ga cạnh Cầu Rồng, đặc biệt tặng nửa con tôm hùm nướng bơ tỏi thơm lừng cho từng khách.',
    descTh: 'บุฟเฟต์ปิ้งย่างชาบูซีฟู้ดไม่อั้นริมสะพานมังกร แถมฟรีกุ้งมังกรอบเนยคนละครึ่งตัว',
    descEn: 'All-you-can-eat seafood feast with complimentary baked garlic butter lobster half per guest.',
    img: '/assets/seafood-buffet-longqiao.jpg'
  }
];
