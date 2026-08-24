# Green Sea Tour Web Application — Kiến Trúc Hệ Thống & Landing Page FITDAD01

Tài liệu hướng dẫn phát triển và quy chuẩn kiến trúc mã nguồn dành cho lập trình viên và AI Agent.

---

## 1. Cấu Trúc Tổng Thể Dự Án

- **Framework**: React 19 + Vite 7 (Single Page Application, không dùng router bên thứ 3).
- **Core Styles**: `src/styles.css` (hơn 1.700 dòng CSS tùy chỉnh hiệu ứng, glassmorphism, animations, QR hover glow).
- **Routing**: Dựa trên URL search params (`?tour=fitdad01&mode=landing`, `?admin=true`, `?agent=1`).

---

## 2. Kiến Trúc Modular Landing Page FITDAD01 (`src/components/landing/`)

Toàn bộ trang Landing Page FITDAD01 được phân tách triệt để theo mô hình **Orchestrator + Micro Modules**:

```text
src/components/
├── FITDAD01LandingPage.jsx              ← Orchestrator (~300 dòng: State, handlers, composition)
├── FITDAD01LandingPage.backup.jsx       ← Bản sao gốc 4.218 dòng để đối chiếu/rollback
│
└── landing/
    ├── constants.js                     ← Dữ liệu tĩnh: FLIGHT_SCHEDULES, PRICE_GRID, SURCHARGES,
    │                                       OPTIONAL_ACTIVITIES, GALLERY_ITEMS, THAI_PARTNERS
    │
    ├── ui/                              ← Micro-UI components dùng chung
    │   ├── Flags.jsx                    ← VietnamFlag, ThailandFlag, UKFlag SVG
    │   ├── AnimatedCountUp.jsx          ← Bộ đếm số tài chính nhảy mượt (easing expo)
    │   ├── SpotlightCard.jsx            ← Card có hiệu ứng rọi sáng theo chuột (Radial cursor)
    │   └── Magnet.jsx                   ← Nút bấm nam châm hút chuột (Elastic cursor pull)
    │
    ├── sections/                        ← Mỗi Section nội dung là 1 file riêng biệt
    │   ├── NavbarSection.jsx            ← Thanh điều hướng sticky glass + 3 cờ ngôn ngữ + Agent mode
    │   ├── HeroSection.jsx              ← Banner hero cinematic + 4 feature cards + giá NET khởi điểm
    │   ├── DestinationAccordion.jsx     ← Accordion tương tác 7 điểm đến độc quyền
    │   ├── ItinerarySection.jsx         ← Lịch trình 3 ngày 2 đêm + showcase ẩm thực đặc sắc
    │   ├── FlightScheduleSection.jsx    ← Tra cứu lịch bay Thái Lan <-> DAD (BKK, DMK, CNX)
    │   ├── PricingTerminalSection.jsx   ← Bảng tính giá NET B2B, số khách, phòng đơn & margin slider
    │   ├── TermsSection.jsx             ← Điều khoản dịch vụ B2B, Inclusions & Exclusions
    │   ├── FaqSection.jsx               ← Câu hỏi thường gặp B2B (FAQ accordion)
    │   ├── PartnersMarquee.jsx          ← Dải marquee logo đối tác lữ hành Thái Lan
    │   └── FooterSection.jsx            ← Footer chính, 3 mã QR liên hệ & Watermark chữ chìm
    │
    ├── modals/                          ← Mỗi Modal / Drawer popup là 1 file riêng biệt
    │   ├── AddonsModal.jsx              ← Modal chọn dịch vụ tham quan mở rộng (Option tour)
    │   ├── AgentWhiteLabelModal.jsx     ← Modal cấu hình đại lý White-Label & sinh link gửi khách
    │   └── QuoteDrawer.jsx              ← Slide-over Drawer gửi yêu cầu báo giá B2B
    │
    └── features/
        └── posterGenerator.js           ← Logic Canvas HTML5 xuất ảnh Poster Retina 1080x1920
```

---

## 3. Quy Tắc Phát Triển Bắt Buộc Dành Cho AI Agent (Rules for AI Pair Programming)

### ⚠️ Nguyên Tắc Vàng: "Sai Đâu Sửa Đó — Không Đụng Chéo File"
1. **Khi được yêu cầu sửa một tính năng:**
   - **Chỉnh sửa Footer / Mã QR:** $\rightarrow$ Mở [FooterSection.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/sections/FooterSection.jsx)
   - **Chỉnh sửa Bảng tính giá / Margin:** $\rightarrow$ Mở [PricingTerminalSection.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/sections/PricingTerminalSection.jsx)
   - **Chỉnh sửa Form báo giá:** $\rightarrow$ Mở [QuoteDrawer.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/modals/QuoteDrawer.jsx)
   - **Chỉnh sửa Cài đặt Đại lý / Link:** $\rightarrow$ Mở [AgentWhiteLabelModal.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/modals/AgentWhiteLabelModal.jsx)
   - **Chỉnh sửa Lịch bay:** $\rightarrow$ Mở [FlightScheduleSection.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/sections/FlightScheduleSection.jsx)
   - **Chỉnh sửa Lịch trình:** $\rightarrow$ Mở [ItinerarySection.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/sections/ItinerarySection.jsx)
   - **Chỉnh sửa FAQ:** $\rightarrow$ Mở [FaqSection.jsx](file:///d:/Dat/webapp%20greensea/src/components/landing/sections/FaqSection.jsx)
   - **Chỉnh sửa Dữ liệu tour (giá gốc, chuyến bay...):** $\rightarrow$ Mở [constants.js](file:///d:/Dat/webapp%20greensea/src/components/landing/constants.js)

2. **Khi thêm Modal mới:**
   - Tạo file tại `src/components/landing/modals/<TenModal>.jsx`.
   - Nhận `onClose` và các props cần thiết.
   - Thêm state `[showTenModal, setShowTenModal] = useState(false)` trong [FITDAD01LandingPage.jsx](file:///d:/Dat/webapp%20greensea/src/components/FITDAD01LandingPage.jsx).

3. **Khi thêm Section mới:**
   - Tạo file tại `src/components/landing/sections/<TenSection>.jsx`.
   - Tuân thủ cấu trúc khung chuẩn: `maxWidth: '1240px'`, `margin: '0 auto 4rem'`, `padding: '0 2rem'`.
   - Tiêu đề `<h2>` dùng font: `fontFamily: isTh ? "'Prompt', sans-serif" : "'Playfair Display', serif"`.

4. **Kiểm tra Import & Props:**
   - Luôn destructure đầy đủ props ở hàm con, cung cấp default value an toàn: `agentConfig = {}`.
   - Luôn kiểm tra import đầy đủ 100% các icon dùng trong JSX từ `lucide-react`.

5. **Quy trình kiểm thử bắt buộc:**
   - Chạy `npx vite build` (phải đạt exit code 0).
   - Kiểm tra giao diện qua Dev server hoặc Chrome headless.
