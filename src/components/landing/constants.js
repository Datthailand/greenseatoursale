export const EXCHANGE_RATE = 35; // 1 USD = 35 THB

// 100% Real-world Flight Matching for Thailand <-> Da Nang (DAD)
export const FLIGHT_SCHEDULES = {
  BKK: {
    originCityVi: 'Bangkok (Suvarnabhumi - BKK)',
    originCityTh: 'กรุงเทพฯ (สุวรรณภูมิ - BKK)',
    originCityEn: 'Bangkok (Suvarnabhumi - BKK)',
    flights: [
      {
        airline: 'VietJet Air',
        flightNo: 'VZ960',
        depTime: '10:50',
        arrTime: '12:30',
        tagVi: 'Khuyên Dùng: Lên Bà Nà Ngay',
        tagTh: 'แนะนำ: ขึ้นบานาฮิลล์ทันที',
        tagEn: 'Recommended: Direct Ba Na Hills',
        noteVi: 'Đón sân bay lúc 12:30, di chuyển thẳng lên Bà Nà Hills ăn trưa buffet và nhận phòng Mercure 4* trọn vẹn.',
        noteTh: 'รับจากสนามบิน 12:30 น. เดินทางตรงสู่บานาฮิลล์ ทานบุฟเฟ่ต์และเช็คอิน Mercure 4* เต็มวัน',
        noteEn: '12:30 airport pickup, direct transfer to Ba Na Hills for lunch buffet and full Mercure 4* stay.',
        isLate: false
      },
      {
        airline: 'Bangkok Airways',
        flightNo: 'PG947',
        depTime: '11:00',
        arrTime: '12:40',
        tagVi: 'Khuyên Dùng: Lên Bà Nà Ngay',
        tagTh: 'แนะนำ: ขึ้นบานาฮิลล์ทันที',
        tagEn: 'Recommended: Direct Ba Na Hills',
        noteVi: 'Đón sân bay lúc 12:40, xe riêng đưa thẳng lên chân núi Bà Nà, trải nghiệm trọn vẹn hoàng hôn đỉnh núi.',
        noteTh: 'รับจากสนามบิน 12:40 น. รถรับส่งส่วนตัวตรงสู่บานาฮิลล์ สัมผัสบรรยากาศยามเย็นบนยอดเขา',
        noteEn: '12:40 pickup, private transfer to Ba Na Hills, enjoy stunning sunset on the peak.',
        isLate: false
      },
      {
        airline: 'Vietnam Airlines',
        flightNo: 'VN606',
        depTime: '19:30',
        arrTime: '21:10',
        tagVi: 'Chuyến Tối: Đổi Lịch Đêm 1',
        tagTh: 'ไฟลท์ค่ำ: ปรับพักในเมืองคืนแรก',
        tagEn: 'Evening Flight: Flexible Night 1',
        noteVi: 'Chuyến tối cáp treo đóng cửa: Xe đón về nhận phòng khách sạn 4* trung tâm Đà Nẵng, chuyển lịch Bà Nà sang Ngày 2 trọn vẹn.',
        noteTh: 'กระเช้าปิดช่วงค่ำ: รถรับเช็คอินโรงแรม 4* ดานัง แล้วปรับโปรแกรมขึ้นบานาฮิลล์เต็มวันในวันที่ 2',
        noteEn: 'Cable car closes in evening: Pickup to 4* Da Nang hotel, full Ba Na Hills day moves to Day 2.',
        isLate: true
      }
    ],
    inboundFlight: {
      airline: 'VietJet / Bangkok Airways',
      flightNo: 'VZ961 / PG948',
      depTime: '13:15 / 13:35',
      arrTime: '15:00 / 15:15',
      noteVi: 'Đón tại khách sạn sau bữa trưa Ngày 3, tiễn sân bay Đà Nẵng trước 2 tiếng làm thủ tục thuận tiện.',
      noteTh: 'รับจากโรงแรมหลังมื้อเที่ยงวันที่ 3 ส่งสนามบินดานังล่วงหน้า 2 ชั่วโมงก่อนเวลาบิน',
      noteEn: 'Pickup after Day 3 lunch, transfer to DAD airport 2 hours prior to flight departure.'
    }
  },
  DMK: {
    originCityVi: 'Bangkok (Don Mueang - DMK)',
    originCityTh: 'กรุงเทพฯ (ดอนเมือง - DMK)',
    originCityEn: 'Bangkok (Don Mueang - DMK)',
    flights: [
      {
        airline: 'Thai AirAsia',
        flightNo: 'FD636',
        depTime: '10:00',
        arrTime: '11:40',
        tagVi: 'Giờ Vàng: Tối Ưu Nhất',
        tagTh: 'เวลาทอง: สมบูรณ์แบบที่สุด',
        tagEn: 'Golden Hour: Most Optimal',
        noteVi: 'Hạ cánh 11:40: Xe đưa đoàn thưởng thức bữa trưa đặc sản Ngon Thị Hoa trước khi lên cáp treo nhận phòng Bà Nà.',
        noteTh: 'ลงจอด 11:40 น. ทานอาหารพื้นเมือง Ngon Thi Hoa ก่อนขึ้นกระเช้าเช็คอิน Mercure บานาฮิลล์',
        noteEn: 'Land at 11:40: Enjoy Ngon Thi Hoa lunch before ascending Ba Na Hills to check in Mercure.',
        isLate: false
      },
      {
        airline: 'Thai AirAsia',
        flightNo: 'FD638',
        depTime: '16:45',
        arrTime: '18:25',
        tagVi: 'Chuyến Chiều: Đổi Lịch Đêm 1',
        tagTh: 'ไฟลท์เย็น: ปรับพักในเมืองคืนแรก',
        tagEn: 'Afternoon Flight: Flexible Night 1',
        noteVi: 'Hạ cánh chiều tối: Xe đón về ăn tối và nhận phòng khách sạn 4* Đà Nẵng, chuyển tham quan Bà Nà sang Ngày 2.',
        noteTh: 'ถึงช่วงเย็น: รถรับทานมื้อค่ำและพักโรงแรม 4* ดานัง ปรับเที่ยวบานาฮิลล์เต็มวันในวันที่ 2',
        noteEn: 'Arrive evening: Pickup for dinner and 4* Da Nang hotel, full Ba Na tour moves to Day 2.',
        isLate: true
      }
    ],
    inboundFlight: {
      airline: 'Thai AirAsia',
      flightNo: 'FD637 / FD639',
      depTime: '12:10 / 18:55',
      arrTime: '13:50 / 20:40',
      noteVi: 'Linh hoạt tiễn sân bay theo giờ bay khứ hồi của quý khách, bảo đảm đúng giờ và thoải mái.',
      noteTh: 'ส่งสนามบินอย่างตรงเวลาตามตารางบินขากลับ สะดวกสบายไร้กังวล',
      noteEn: 'Flexible return airport transfer matching your flight schedule.'
    }
  },
  CNX: {
    originCityVi: 'Chiang Mai (CNX)',
    originCityTh: 'เชียงใหม่ (CNX)',
    originCityEn: 'Chiang Mai (CNX)',
    flights: [
      {
        airline: 'Thai AirAsia',
        flightNo: 'FD648',
        depTime: '12:35',
        arrTime: '14:15',
        tagVi: 'Bay Thẳng Tiện Lợi',
        tagTh: 'บินตรงสะดวกสบาย',
        tagEn: 'Direct Flight Convenience',
        noteVi: 'Bay thẳng Chiang Mai - Đà Nẵng: Đón sân bay 14:15, đưa thẳng lên cáp treo Bà Nà nhận phòng và ngắm hoàng hôn.',
        noteTh: 'บินตรงเชียงใหม่-ดานัง: รับจากสนามบิน 14:15 น. ขึ้นกระเช้าบานาฮิลล์ เช็คอินและชมวิวพระอาทิตย์ตก',
        noteEn: 'Direct flight Chiang Mai - Da Nang: 14:15 pickup, direct to Ba Na Hills for sunset.',
        isLate: false
      }
    ],
    inboundFlight: {
      airline: 'Thai AirAsia',
      flightNo: 'FD649',
      depTime: '14:45',
      arrTime: '16:35',
      noteVi: 'Đón tại trung tâm Đà Nẵng lúc 12:30 sau bữa trưa Madam Lân, đưa ra sân bay quốc tế Đà Nẵng.',
      noteTh: 'รับจากในเมือง 12:30 น. หลังมื้อเที่ยง Madam Lan ส่งถึงสนามบินดานังตรงเวลา',
      noteEn: 'Pickup at 12:30 after Madam Lan lunch, transfer to Da Nang International Airport.'
    }
  }
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

export const OPTIONAL_ACTIVITIES = [
  {
    id: 'lantern-shore',
    category: 'hoian',
    nameVi: 'Thả hoa đăng trên bờ sông Hoài',
    nameTh: 'ลอยกระทงกระดาษริมแม่น้ำฮว่าย',
    nameEn: 'On-shore Lantern Floating on Hoai River',
    priceUsd: 1,
    descVi: 'Mỗi khách 1 hoa đăng truyền thống thả cầu may mắn bên bờ sông Hoài lung linh',
    descTh: 'กระทงกระดาษพื้นเมือง 1 ชิ้น/ท่าน ลอยริมแม่น้ำฮว่ายเพื่อความเป็นสิริมงคล',
    descEn: '1 traditional paper lantern per guest floated from the riverbank for good fortune'
  },
  {
    id: 'lantern-boat',
    category: 'hoian',
    nameVi: 'Thuyền gỗ du ngoạn + Thả hoa đăng dưới nước',
    nameTh: 'นั่งเรือไม้ล่องแม่น้ำฮว่าย + ลอยกระทงกลางน้ำ',
    nameEn: 'Wooden Boat Cruise + Water Lantern Floating',
    priceUsd: 5,
    descVi: 'Du ngoạn thuyền gỗ ngắm phố cổ về đêm 20 phút và thả hoa đăng trực tiếp giữa dòng sông',
    descTh: 'ล่องเรือไม้ชมเมืองโบราณยามค่ำคืน 20 นาที พร้อมลอยกระทงกลางสายน้ำ',
    descEn: '20-minute wooden boat cruise along ancient town with lantern floating on water'
  },
  {
    id: 'cyclo-tour',
    category: 'hoian',
    nameVi: 'Trải nghiệm Xích lô Phố cổ Hội An',
    nameTh: 'นั่งรถสามล้อซิโคล่ชมเมืองโบราณฮอยอัน',
    nameEn: 'Hoi An Ancient Town Vintage Cyclo Ride',
    priceUsd: 6,
    descVi: 'Hành trình 30 phút dạo quanh các góc phố đèn lồng cổ kính bằng xích lô truyền thống',
    descTh: 'สัมผัสบรรยากาศย้อนยุค 30 นาที นั่งรถซิโคล่ชมบ้านโบราณและโคมไฟหลากสี',
    descEn: '30-minute authentic cyclo tour through lantern-lit ancient streets and heritage alleys'
  },
  {
    id: 'electric-cart',
    category: 'hoian',
    nameVi: 'Xe điện dạo Phố cổ & Làng nghề Hội An',
    nameTh: 'รถรางไฟฟ้านำเที่ยวเมืองเก่าและหมู่บ้านหัตถกรรม',
    nameEn: 'Eco Electric Cart Tour in Hoi An',
    priceUsd: 4,
    descVi: 'Xe điện êm ái thoáng mát tham quan các tuyến phố di sản và khu làng nghề truyền thống',
    descTh: 'รถรางไฟฟ้าพลังงานสะอาด นั่งสบายชมรอบเขตเมืองมรดกและวิถีชีวิตท้องถิ่น',
    descEn: 'Eco-friendly electric shuttle exploring heritage perimeter and craft quarters'
  },
  {
    id: 'marble-mountains',
    category: 'danang',
    nameVi: 'Vé tham quan & Thang máy Ngũ Hành Sơn',
    nameTh: 'บัตรเข้าชมเขาหินอ่อนงูฮัญเซิน + ลิฟต์แก้ว',
    nameEn: 'Marble Mountains Sightseeing & Glass Elevator',
    priceUsd: 5,
    descVi: 'Bao gồm vé thắng cảnh Ngũ Hành Sơn, vé thang máy 2 chiều và khám phá Động Tàng Chơn, Động Huyền Không',
    descTh: 'รวมค่าเข้าชมเขาหินอ่อน ลิฟต์แก้วขึ้น-ลง 2 ขา ชมถ้ำเหวียนคงและเจดีย์ศักดิ์สิทธิ์',
    descEn: 'Includes entrance ticket, 2-way glass elevator, Huyen Khong Cave & pagodas'
  },
  {
    id: 'cham-museum',
    category: 'danang',
    nameVi: 'Vé Bảo tàng Điêu khắc Chăm Đà Nẵng',
    nameTh: 'บัตรเข้าชมพิพิธภัณฑ์ประติมากรรมจาม ดานัง',
    nameEn: 'Da Nang Museum of Cham Sculpture Ticket',
    priceUsd: 4,
    descVi: 'Chiêm ngưỡng bộ sưu tập cổ vật điêu khắc văn hóa Champa độc bản lớn nhất thế giới',
    descTh: 'ชมคอลเลกชันโบราณวัตถุประติมากรรมอาณาจักรจามปาที่ใหญ่และสมบูรณ์ที่สุดในโลก',
    descEn: 'Admission to the world\'s largest collection of Cham sandstone sculpture treasures'
  }
];

// Exact pricing matrix from PDF
export const PRICE_GRID = [
  { band: '2-3', paxLabelTh: '2-3 ท่าน', paxLabelVi: '2-3 Khách', paxLabelEn: '2-3 Pax', usd: 350, thb: 350 * 35, vehicleTh: 'รถตู้ 16 ที่นั่ง', vehicleVi: 'Xe 16 chỗ VIP', vehicleEn: '16 Seats Van' },
  { band: '4-5', paxLabelTh: '4-5 ท่าน', paxLabelVi: '4-5 Khách', paxLabelEn: '4-5 Pax', usd: 260, thb: 260 * 35, vehicleTh: 'รถตู้ 16 ที่นั่ง', vehicleVi: 'Xe 16 chỗ VIP', vehicleEn: '16 Seats Van' },
  { band: '6-7', paxLabelTh: '6-7 ท่าน', paxLabelVi: '6-7 Khách', paxLabelEn: '6-7 Pax', usd: 230, thb: 230 * 35, vehicleTh: 'รถตู้ 16 ที่นั่ง', vehicleVi: 'Xe 16 chỗ VIP', vehicleEn: '16 Seats Van' },
  { band: '8-9', paxLabelTh: '8-9 ท่าน', paxLabelVi: '8-9 Khách', paxLabelEn: '8-9 Pax', usd: 206, thb: 206 * 35, vehicleTh: 'มินิบัส 29 ที่นั่ง', vehicleVi: 'Xe 29 chỗ (Mini Bus)', vehicleEn: '29 Seats Mini Bus' },
  { band: '10-11', paxLabelTh: '10-11 ท่าน', paxLabelVi: '10-11 Khách', paxLabelEn: '10-11 Pax', usd: 198, thb: 198 * 35, vehicleTh: 'มินิบัส 29 ที่นั่ง', vehicleVi: 'Xe 29 chỗ (Mini Bus)', vehicleEn: '29 Seats Mini Bus' },
  { band: '12-14', paxLabelTh: '12-14 ท่าน', paxLabelVi: '12-14 Khách', paxLabelEn: '12-14 Pax', usd: 194, thb: 194 * 35, vehicleTh: 'มินิบัส 29 ที่นั่ง', vehicleVi: 'Xe 29 chỗ (Mini Bus)', vehicleEn: '29 Seats Mini Bus' }
];

export const SURCHARGES = [
  { period: '29/04 - 02/05/2026', noteTh: 'ช่วงวันหยุดเวียดนาม (Reunification Day)', noteVi: 'Dịp lễ 30/4 - 1/5', noteEn: 'Vietnam National Holiday', surchargeUsd: 18, singleSupplUsd: 88 },
  { period: '24 - 25/12/2026', noteTh: 'ช่วงเทศกาลคริสต์มาส (Christmas)', noteVi: 'Dịp lễ Giáng Sinh (Christmas)', noteEn: 'Christmas Season', surchargeUsd: 18, singleSupplUsd: 88 }
];

// Curated Real Destination Gallery for FITDAD01
export const GALLERY_ITEMS = [
  {
    titleVi: 'Đặc Quyền "Golden Hours" Bình Minh Cầu Vàng',
    titleTh: 'สิทธิพิเศษ "Golden Hours" สะพานมือสีทองยามเช้า',
    titleEn: 'Exclusive "Golden Hours" Sunrise at Golden Bridge',
    descVi: 'Đón chuyến cáp treo sớm chạm đỉnh Cầu Vàng trong sương mây bình minh. Với những ai yêu thích nhiếp ảnh, đây là một trong những thời điểm lý tưởng để ghi lại vẻ đẹp của Cầu Vàng.',
    descTh: 'นั่งกระเช้ารอบเช้าตรู่ สัมผัสสะพานมือสีทองยามพระอาทิตย์ขึ้น สำหรับผู้ที่รักการถ่ายภาพ นี่คือช่วงเวลาที่ยอดเยี่ยมที่สุดในการบันทึกภาพความงามอันน่าหลงใหล',
    descEn: 'Exclusive early morning cable car access to the Golden Bridge at sunrise. For photography enthusiasts, this is one of the ideal moments to capture the bridge at its most captivating.',
    img: '/assets/golden-bridge-sunrise.jpg'
  },
  {
    titleVi: 'Cầu Vàng & Đỉnh Núi Chúa Bà Nà Hills',
    titleTh: 'สะพานมือสีทอง & ยอดเขาบานาฮิลล์',
    titleEn: 'Golden Bridge & Ba Na Hills Peaks',
    descVi: 'Khám phá biểu tượng đôi bàn tay đá khổng lồ vươn giữa mây ngàn và quần thể giải trí Sun World đỉnh cao',
    descTh: 'ชมความยิ่งใหญ่ของสะพานมือสีทองท่ามกลางทิวทัศน์ธรรมชาติและสวนสนุกระดับโลก',
    img: '/assets/golden-bridge.jpg'
  },
  {
    titleVi: 'Mercure Làng Pháp Trên Đỉnh Bana Hills',
    titleTh: 'หมู่บ้านฝรั่งเศส & โรงแรม Mercure 4*',
    titleEn: 'French Village & Mercure 4*',
    descVi: 'Nghỉ đêm bồng bềnh giữa không khí se lạnh tựa châu Âu',
    descTh: 'พักผ่อนบนยอดเขา อากาศเย็นสบายตลอดทั้งปี',
    img: '/assets/mercure-french-village.jpg'
  },
  {
    titleVi: 'Thuyền Thúng Rừng Dừa Bảy Mẫu',
    titleTh: 'ล่องเรือกระด้ง หมู่บ้านกั๊มทาน',
    titleEn: 'Cam Thanh Basket Boat Ride',
    descVi: 'Xem múa thúng giăng lưới đầy sôi động trên sông nước',
    descTh: 'ชมโชว์หมุนเรือกระด้งสุดมันส์กลางป่ามะพร้าว',
    img: '/assets/coconut-basket-boat.jpg'
  },
  {
    titleVi: 'Phố Cổ Hội An Về Đêm',
    titleTh: 'เมืองโบราณฮอยอัน มรดกโลก',
    titleEn: 'Hoi An Lantern Ancient Town',
    descVi: 'Lung linh thả hoa đăng trên sông Hoài và phố đèn lồng',
    descTh: 'ชมโคมไฟหลากสี ลอยกระทงดอกไม้ริมแม่น้ำฮว่าย',
    img: '/assets/hoi-an-night.jpg'
  },
  {
    titleVi: 'Chùa Linh Ứng Bán Đảo Sơn Trà',
    titleTh: 'ไหว้พระวัดลิงอึ๋ง เจ้าแม่กวนอิม 67 ม.',
    titleEn: 'Linh Ung Pagoda & Lady Buddha',
    descVi: 'Tượng Phật Bà Quan Âm cao nhất Việt Nam ngắm biển',
    descTh: 'สักการะเจ้าแม่กวนอิมสีขาวองค์ใหญ่ริมอ่าวดานัง',
    img: '/assets/linh-ung-pagoda.jpg'
  },
  {
    titleVi: 'Đại Tiệc Buffet Hải Sản & Tôm Hùm',
    titleTh: 'บุฟเฟ่ต์ซีฟู้ดสด + กุ้งมังกร ½ ตัว',
    titleEn: 'Long Qiao Seafood Buffet + Lobster',
    descVi: 'Thưởng thức hải sản tươi sống và lẩu đặc sắc',
    descTh: 'รวมกุ้งมังกรอบเนยครึ่งตัวต่อท่านและของสดนึ่ง',
    img: '/assets/seafood-buffet-longqiao.jpg'
  }
];
