import fs from 'fs';
import path from 'path';

// Load base tour data
const toursFile = path.resolve('src/data/tours.js');
const pdfExtractsFile = path.resolve('src/data/pdfExtracts.js');

// Destination photo mapping for landmarks
const landmarkPhotos = {
  // Central Vietnam
  bana_hills: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Golden bridge
  golden_bridge: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
  hoi_an: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Hoi an ancient town
  danang_dragon_bridge: 'https://images.unsplash.com/photo-1559592413-097c5553e1a0?auto=format&fit=crop&w=1200&q=80',
  hue_imperial: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80', // Hue citadel
  my_khe_beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  
  // North Vietnam
  hanoi_old_quarter: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
  tam_dao: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  ninh_binh_trang_an: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
  sapa_fansipan: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
  ha_long_bay: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
  
  // Southern Vietnam
  nha_trang_bay: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  da_lat_valley: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  mui_ne_sand_dunes: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  ho_chi_minh_city: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
  
  // Phu Quoc
  phu_quoc_beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  phu_quoc_sunset_town: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
};

// Region default cover photos
const regionHeroCovers = {
  'Central Vietnam': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=85',
  'North Vietnam': 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=85',
  'Southern Vietnam': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
  'Phu Quoc': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
};

async function enrich() {
  console.log('Generating enriched landing page data for 23 tours...');
  
  // Import tours
  const { tours } = await import('../src/data/tours.js');
  
  const landingTours = tours.map(tour => {
    const isFIT = tour.packageType === 'FIT';
    const code = tour.code;
    const region = tour.region;
    
    // Choose hero photo based on destination
    let heroPhoto = regionHeroCovers[region] || regionHeroCovers['Central Vietnam'];
    if (tour.title.includes('Ba Na') || tour.title.includes('Da Nang')) heroPhoto = landmarkPhotos.bana_hills;
    else if (tour.title.includes('Ha Long')) heroPhoto = landmarkPhotos.ha_long_bay;
    else if (tour.title.includes('Sapa') || tour.title.includes('Sa Pa')) heroPhoto = landmarkPhotos.sapa_fansipan;
    else if (tour.title.includes('Phu Quoc')) heroPhoto = landmarkPhotos.phu_quoc_beach;
    else if (tour.title.includes('Mui Ne')) heroPhoto = landmarkPhotos.mui_ne_sand_dunes;
    else if (tour.title.includes('Nha Trang')) heroPhoto = landmarkPhotos.nha_trang_bay;
    else if (tour.title.includes('Tam Dao')) heroPhoto = landmarkPhotos.tam_dao;

    // Generate USPs
    const usps = [
      {
        icon: 'Hotel',
        titleVi: 'Khách sạn 4 sao chuẩn quốc tế',
        titleEn: '4-Star Standard Hotels',
        titleTh: 'โรงแรมมาตรฐาน 4 ดาว',
        descVi: tour.hotel || 'Khách sạn tiện nghi sang trọng tại trung tâm',
        descEn: tour.hotel || 'Comfortable hotel in prime central locations',
        descTh: tour.hotel || 'โรงแรมสะดวกสบายใจกลางเมือง'
      },
      {
        icon: 'Utensils',
        titleVi: 'Ẩm thực phong phú & Đặc sản địa phương',
        titleEn: 'Full Meals & Local Delicacies',
        titleTh: 'อาหารครบทุกมื้อและอาหารพื้นเมือง',
        descVi: 'Bao gồm bữa sáng buffet tại khách sạn và thực đơn tuyển chọn Michelin/đặc sản',
        descEn: 'Breakfast buffet included along with curated lunch & dinner menus',
        descTh: 'รวมอาหารเช้าบุฟเฟ่ต์และอาหารมื้อหลักคัดสรรพิเศษ'
      },
      {
        icon: 'Car',
        titleVi: 'Xe du lịch đời mới & Đưa đón riêng',
        titleEn: 'Modern Air-Conditioned Vehicle',
        titleTh: 'รถนำเที่ยวปรับอากาศคุณภาพดี',
        descVi: tour.vehicle || 'Xe du lịch phục vụ suốt hành trình theo số lượng khách',
        descEn: tour.vehicle || 'Dedicated air-conditioned transportation throughout the trip',
        descTh: tour.vehicle || 'รถปรับอากาศนำเที่ยวตลอดการเดินทาง'
      },
      {
        icon: 'Users',
        titleVi: 'Hướng dẫn viên chuyên nghiệp',
        titleEn: 'Professional Local Guide',
        titleTh: 'มัคคุเทศก์ท้องถิ่นมืออาชีพ',
        descVi: 'Hướng dẫn viên tiếng Thái / tiếng Anh nhiệt tình, chu đáo suốt tuyến',
        descEn: 'Licensed local tour guide speaking Thai or English upon request',
        descTh: 'ไกด์ท้องถิ่นสื่อสารภาษาไทยหรือภาษาอังกฤษดูแลตลอดทริป'
      }
    ];

    // Enrich itinerary days with relevant landmark photos
    const enrichedItinerary = (tour.itinerary || []).map((day, idx) => {
      let dayPhoto = heroPhoto;
      const titleLower = `${day.title || ''} ${day.titleTh || ''} ${(day.notes || []).join(' ')}`.toLowerCase();
      
      if (titleLower.includes('ba na') || titleLower.includes('bà nà') || titleLower.includes('cầu vàng')) {
        dayPhoto = landmarkPhotos.golden_bridge;
      } else if (titleLower.includes('hội an') || titleLower.includes('hoi an')) {
        dayPhoto = landmarkPhotos.hoi_an;
      } else if (titleLower.includes('huế') || titleLower.includes('hue')) {
        dayPhoto = landmarkPhotos.hue_imperial;
      } else if (titleLower.includes('hạ long') || titleLower.includes('ha long')) {
        dayPhoto = landmarkPhotos.ha_long_bay;
      } else if (titleLower.includes('sapa') || titleLower.includes('fansipan')) {
        dayPhoto = landmarkPhotos.sapa_fansipan;
      } else if (titleLower.includes('ninh bình') || titleLower.includes('tràng an') || titleLower.includes('bái đính')) {
        dayPhoto = landmarkPhotos.ninh_binh_trang_an;
      } else if (titleLower.includes('tam đảo') || titleLower.includes('tam dao')) {
        dayPhoto = landmarkPhotos.tam_dao;
      } else if (titleLower.includes('hòn thơm') || titleLower.includes('phú quốc') || titleLower.includes('phu quoc')) {
        dayPhoto = landmarkPhotos.phu_quoc_sunset_town;
      } else if (titleLower.includes('mũi né') || titleLower.includes('mui ne') || titleLower.includes('đồi cát')) {
        dayPhoto = landmarkPhotos.mui_ne_sand_dunes;
      } else if (titleLower.includes('đà lạt') || titleLower.includes('da lat') || titleLower.includes('datanla')) {
        dayPhoto = landmarkPhotos.da_lat_valley;
      } else if (titleLower.includes('nha trang') || titleLower.includes('vinwonders')) {
        dayPhoto = landmarkPhotos.nha_trang_bay;
      } else if (titleLower.includes('hồ chí minh') || titleLower.includes('sài gòn') || titleLower.includes('bến thành')) {
        dayPhoto = landmarkPhotos.ho_chi_minh_city;
      } else if (titleLower.includes('hà nội') || titleLower.includes('ha noi')) {
        dayPhoto = landmarkPhotos.hanoi_old_quarter;
      }

      return {
        ...day,
        photo: dayPhoto
      };
    });

    // FAQs
    const faqs = [
      {
        qVi: 'Tour có bao gồm vé máy bay không?',
        qEn: 'Does the tour package include international flight tickets?',
        qTh: 'แพ็กเกจทัวร์รวมตั๋วเครื่องบินหรือไม่?',
        aVi: 'Chương trình là land tour trọn gói đón tiễn tại sân bay điểm đến tại Việt Nam, chưa bao gồm vé máy bay khứ hồi quốc tế để quý khách linh hoạt chọn chuyến bay phù hợp nhất.',
        aEn: 'This is a ground land tour starting and ending at the destination airport in Vietnam. International flights are excluded to give you flexibility.',
        aTh: 'โปรแกรมนี้เป็นแลนด์ทัวร์รวมทุกอย่างตั้งแต่รับที่สนามบินในเวียดนาม ไม่รวมตั๋วเครื่องบินระหว่างประเทศเพื่อให้ท่านเลือกเที่ยวบินที่สะดวกที่สุด'
      },
      {
        qVi: 'Chính sách trẻ em và phụ thu phòng đơn thế nào?',
        qEn: 'What is the child policy and single room supplement?',
        qTh: 'นโยบายเด็กและค่าพักเดี่ยวเป็นอย่างไร?',
        aVi: 'Trẻ em 0-2 tuổi miễn phí; 3-6 tuổi tính 50% ngủ cùng người lớn; từ 7 tuổi tính như người lớn. Phụ thu phòng đơn áp dụng theo chi tiết trong bảng giá tour.',
        aEn: 'Infants 0-2 free; Children 3-6 pay 50% sharing bed with adults; Children 7+ count as adults. Single supplement is detailed in the pricing table.',
        aTh: 'เด็ก 0-2 ขวบฟรี, 3-6 ขวบคิด 50% พักกับผู้ใหญ่, 7 ขวบขึ้นไปคิดเต็มราคาผู้ใหญ่ ค่าพักเดี่ยวระบุในตารางราคา'
      },
      {
        qVi: 'Quy trình đặt tour và phương thức thanh toán?',
        qEn: 'How to book and what are the payment terms?',
        qTh: 'ขั้นตอนการจองและการชำระเงินเป็นอย่างไร?',
        aVi: 'Đặt cọc 30% khi xác nhận dịch vụ, số tiền còn lại thanh toán trước ngày khởi hành 7 - 14 ngày qua chuyển khoản ngân hàng.',
        aEn: '30% deposit upon booking confirmation, and the remaining balance is paid 7-14 days before departure via bank transfer.',
        aTh: 'มัดจำ 30% เมื่อยืนยันการจอง และชำระส่วนที่เหลือก่อนเดินทาง 7-14 วันผ่านการโอนเงินธนาคาร'
      }
    ];

    return {
      ...tour,
      heroPhoto,
      usps,
      faqs,
      itinerary: enrichedItinerary,
      slug: `${tour.id}-${tour.route.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    };
  });

  const outputJs = `// THIS FILE IS AUTOMATICALLY GENERATED BY scripts/research-and-enrich-tours.js
export const landingTours = ${JSON.stringify(landingTours, null, 2)};
`;

  fs.writeFileSync(path.resolve('src/data/landingTours.js'), outputJs, 'utf-8');
  console.log(`Successfully generated rich landing data for ${landingTours.length} tours at src/data/landingTours.js!`);
}

enrich();
