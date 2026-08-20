# 📐 TÀI LIỆU KỸ THUẬT & HƯỚNG DẪN THIẾT KẾ CHÂN TRANG LANDING PAGE (FOOTER SPECIFICATION)
**Dự án:** GreenSeaTour Sales Kit & B2B Landing Page  
**Phiên bản:** 2.0 (Paystra-Inspired Luxury Minimalist Editorial Footer)  
**Tệp nguồn:** `src/components/FITDAD01LandingPage.jsx` (dòng 1594 - 1876)  
**Ngày cập nhật:** Tháng 08/2026  

---

## 1. TỔNG QUAN THIẾT KẾ (DESIGN PHILOSOPHY)

Chân trang (Footer) của Landing Page được thiết kế theo phong cách **Luxury Minimalist Editorial** (lấy cảm hứng từ chuẩn thiết kế Fintech/Agency cao cấp như Paystra & Stripe), chuyên biệt phục vụ mô hình **B2B Tour Operator / DMC Inbound Việt Nam cho các đại lý du lịch tại Thái Lan**.

### Các nguyên tắc cốt lõi:
1. **Anti-Wrap Strict Mechanics:** Tuyệt đối không để rớt chữ xuống hàng thứ 2 ở các danh mục liên kết, thông tin liên lạc và nhãn đại lý.
2. **Instant QR Connect:** Chuyển đổi toàn bộ thao tác liên hệ phức tạp thành cụm **3 mã QR quét tức thì** (LINE OA công ty + LINE Direct của từng Sales phụ trách).
3. **Màu sắc thanh lịch & phân tầng thị giác rõ nét:** Kết hợp giữa màu xanh thương hiệu đậm `#00533d`, màu xanh lá ngọc `#059669`, chữ xám nhã nhặn `#64748b` và chữ tiêu đề đen than `#0f172a`.
4. **Ghost Watermark:** Dải chữ chìm `GREENSEA TOUR` khổng lồ tạo chiều sâu nghệ thuật và nhận diện thương hiệu cao cấp.
5. **Hỗ trợ song ngữ hoàn hảo (i18n):** Tự động thích ứng hoàn toàn giữa **Tiếng Việt** và **Tiếng Thái (Prompt font)**.

---

## 2. CẤU TRÚC LƯỚI & BỐ CỤC 4 CỘT (4-COLUMN GRID LAYOUT)

Container bao ngoài có độ rộng tối đa **`1280px`**, khoảng đệm `padding: '5rem 2rem 2.5rem'`.

Lưới 4 cột được tính toán theo tỷ lệ co giãn thông minh:
```css
grid-template-columns: minmax(280px, 1.15fr) minmax(230px, 1.1fr) minmax(200px, 0.95fr) minmax(290px, 1.35fr);
gap: 2rem;
margin-bottom: 4rem;
```

```
┌─────────────────────────┬──────────────────────┬────────────────────┬─────────────────────────┐
│ CỘT 1: THƯƠNG HIỆU & LH │ CỘT 2: TUYẾN ĐIỂM B2B│ CỘT 3: CHÍNH SÁCH  │ CỘT 4: 3 MÃ QR LINE     │
│ (Logo + Định vị DMC     │ (Đà Nẵng, Miền Bắc,  │ (Giá NET, Margin,  │ (Line OA, Ms. Kim,      │
│  + Địa chỉ + Web + Mail │  Miền Nam, Phú Quốc) │  Cọc hủy, Trẻ em)  │  Mr. Khanh)             │
│  + Hotline)             │                      │                    │                         │
└─────────────────────────┴──────────────────────┴────────────────────┴─────────────────────────┘
```

---

### Chi Tiết Từng Cột:

### 🏢 Cột 1: Thông Tin Nhận Diện & Doanh Nghiệp (Brand Identity)
* **Logo + Tên thương hiệu:**
  * Logo bo góc: `40px x 40px`, `borderRadius: '10px'`.
  * Tên: `GREEN SEA TOUR` font `Playfair Display`, `fontSize: '1.35rem'`, màu `#00533d`.
  * Slogan phụ: `DMC INBOUND LAND TOUR VIỆT NAM` (`fontSize: '0.7rem'`, `#059669`, `fontWeight: 800`).
* **Đoạn định vị thương hiệu:**
  * Nội dung: *"Your Trusted DMC Vietnam for Thailand Market - Easy to Work, Ready to Support"...*
  * Màu sắc: `#64748b`, `fontSize: '0.875rem'`, `lineHeight: 1.6`, `maxWidth: '340px'`.
* **Danh sách liên hệ chính thức (Đồng bộ màu `#64748b`):**
  * 📍 **Địa chỉ:** `516 Nguyễn Hữu Thọ, Đà Nẵng, Việt Nam`
  * 🌐 **Website:** `www.greensealandtourvietnam.com` (Link mở tab mới)
  * 📧 **Email:** `sale1@greenseatour.vn` (Mailto)
  * 📞 **Hotline:** `(+84) 987.43.43.43` (Link WhatsApp direct `https://wa.me/84987434343`)

---

### 🗺️ Cột 2: Tuyến Điểm Tour B2B (Tour Routes)
* **Tiêu đề cột:** `Tuyến Điểm Tour` / `โปรแกรมเส้นทาง` (`#0f172a`, `fontWeight: 800`, `fontSize: '0.95rem'`).
* **Danh sách menu (Khóa `whiteSpace: 'nowrap'`):**
  1. Đà Nẵng – Bà Nà – Hội An (`#pricing-terminal`)
  2. Miền Bắc (Hà Nội – Sa Pa – Ninh Bình)
  3. Miền Nam (Sài Gòn – Mũi Né – Đà Lạt)
  4. Đảo Ngọc Phú Quốc

---

### 📋 Cột 3: Chính Sách Đại Lý (Agent Policies)
* **Tiêu đề cột:** `Chính Sách Đại Lý` / `นโยบายตัวแทน` (`#0f172a`, `fontWeight: 800`, `fontSize: '0.95rem'`).
* **Danh sách menu (Khóa `whiteSpace: 'nowrap'`):**
  1. Bảng Giá NET 2 - 14 Pax
  2. Công Cụ Tính Lợi Nhuận (Margin Calculator)
  3. Quy Định Đặt Cọc & Hủy Phạt
  4. Chính Sách Giá Trẻ Em
  5. Tùy Chọn Limousine VIP

---

### 📲 Cột 4: Hỗ Trợ Đối Tác Thái Lan (3 Mã QR Quét Tức Thì)
* **Tiêu đề cột:** `Hỗ Trợ Đại Lý Thái Lan` / `ฝ่ายขายตลาดไทย (24/7)` (`#0f172a`, `fontWeight: 800`).
* **Lưới 3 thẻ QR ngang (`gridTemplateColumns: '1fr 1fr 1fr'`, `gap: '0.45rem'`):**

| Thẻ QR | File Ảnh Asset | Đường Dẫn Quét / Click | Màu Nền Card | Viền Thẻ |
| :--- | :--- | :--- | :--- | :--- |
| **LINE OA** | `/assets/qr-line-oa.png` | `https://lin.ee/Pwro79k` | `#f0fdf4` | `#bbf7d0` |
| **Ms. Kim** | `/assets/qr-kim.png` | `https://line.me/ti/p/BSLZR5dyBa` | `#f8fafc` | `#e2e8f0` |
| **Mr. Khanh** | `/assets/qr-khanh.png` | `https://line.me/ti/p/U1vOdylKTL` | `#f8fafc` | `#e2e8f0` |

* Mỗi mã QR có kích thước chuẩn **`64px x 64px`**, nền trắng `padding: 2px`, bo góc `0.4rem`, có tên đại diện và nút điều hướng `Direct →` màu xanh LINE `#00b900`.

---

## 3. GHOST WATERMARK TYPOGRAPHY (CHỮ CHÌM NHẬN DIỆN THƯƠNG HIỆU)

Nằm ở giữa phần nội dung lưới và thanh bản quyền đáy, tạo điểm nhấn đồ họa nghệ thuật:

```jsx
<div style={{
  userSelect: 'none',
  pointerEvents: 'none',
  textAlign: 'center',
  margin: '2rem 0 -1rem',
  overflow: 'hidden',
  position: 'relative'
}}>
  <div style={{
    fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
    fontWeight: 900,
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '-2px',
    lineHeight: 0.9,
    color: '#f1f5f9',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  }}>
    GREENSEA TOUR
  </div>
</div>
```

---

## 4. THANH BẢN QUYỀN ĐÁY (BOTTOM LEGAL BAR)

* Viền ngăn cách: `borderTop: '1px solid #f1f5f9'`, `paddingTop: '2rem'`.
* **Trái:** `© 2026 Green Sea Tour Co., Ltd. Bảo lưu mọi quyền.` (hoặc tiếng Thái `สงวนลิขสิทธิ์ทั้งหมด`).
* **Phải:**
  * Chính Sách Bảo Mật Giá B2B (`#64748b`)
  * Điều Khoản Dịch Vụ (`#64748b`)
  * Tag định vị: `DMC Đối Tác Thái Lan` (`#00533d`, `fontWeight: 800`).

---

## 5. BẢNG MÃ MÀU CHUẨN (COLOR DESIGN TOKENS)

| Token / Mục Đích | Mã Màu HEX | Ứng Dụng |
| :--- | :--- | :--- |
| **Primary Brand Green** | `#00533d` | Tên thương hiệu, tiêu đề chính, badge DMC |
| **Accent Emerald** | `#059669` | Icon địa chỉ/web/mail/phone, slogan phụ |
| **LINE Brand Color** | `#00b900` | Nút liên kết LINE, thẻ LINE OA |
| **Neutral Headings** | `#0f172a` | Tiêu đề các cột Menu, tên nhân sự Sales |
| **Neutral Muted Gray** | `#64748b` | Toàn bộ chữ mô tả, link liên hệ, menu footer |
| **Ghost Watermark** | `#f1f5f9` | Màu chữ chìm khổng lồ `GREENSEA TOUR` |
| **Border Gray** | `#e2e8f0` | Viền ngăn cách container và viền card QR |

---

## 6. HƯỚNG DẪN TÁI SỬ DỤNG CHO CÁC TOUR KHÁC

Khi triển khai cho các mã tour khác (`FITDAD02`, `FITHAN01`, `FITPQC01`...):
1. Giữ nguyên cấu trúc thẻ `<footer ...>` và CSS inline chuẩn hóa.
2. Dùng biến ngôn ngữ `isVi`, `isTh` để tự động render đúng ngữ cảnh khách hàng.
3. Không sửa kích thước `width: 64px` của các thẻ QR để bảo toàn bố cục 3 cột đồng đều.
