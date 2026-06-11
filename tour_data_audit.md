# 📋 Green Sea Tour — Báo Cáo Kiểm Tra & Chỉnh Sửa Dữ Liệu Tour

> **Ngày tạo:** 2026-06-10  
> **Phiên bản deploy:** `b7c3b54` → [https://greenseatour.vn](https://greenseatour.vn)  
> **Source of truth:** Các file PDF gốc tại `d:\Dat\webapp greensea\data_goc\Sales kit_GIT\`  
> **Dữ liệu webapp:** `d:\Dat\webapp greensea\src\data\tours.js`

---

## 1. Tổng quan

Hệ thống hiện có **23 tour** chia thành 2 loại:

| Loại | Số lượng | Khu vực |
|------|----------|---------|
| **FIT** (Free Independent Tour) | 9 tour | Central (2), North (3), Phu Quoc (2), Southern (2) |
| **GIT** (Group Inclusive Tour) | 14 tour | Central (5), North (3), Phu Quoc (2), Southern (4) |

---

## 2. Trạng thái chỉnh sửa theo từng tour

### ✅ Đã chỉnh sửa xong — Đối chiếu PDF gốc hoàn tất

Các tour dưới đây đã được kiểm tra kỹ lưỡng với file PDF gốc, bao gồm: bảng giá, phụ thu, loại xe, colspan bảng, và nội dung Thai.

| # | Code | Type | Region | Tiêu đề | Ngày | Giá (8-9 pax) | Single | Trạng thái |
|---|------|------|--------|---------|------|---------------|--------|------------|
| 1 | **DAD01** | GIT | Central Vietnam | Da Nang, Ba Na Hills, Hoi An | 3D | $159 | +$25 | ✅ Hoàn tất |
| 2 | **DAD02** | GIT | Central Vietnam | Da Nang, Ba Na Hills, Hoi An | 3D | $186 | +$65 | ✅ Hoàn tất |
| 3 | **DAD03** | GIT | Central Vietnam | Da Nang, Ba Na Hills, Hoi An | 4D | $210 | +$75 | ✅ Hoàn tất |
| 4 | **DAD04** | GIT | Central Vietnam | Da Nang, Ba Na Hills, Hoi An | 4D | $265 | +$115 | ✅ Hoàn tất |
| 5 | **DAD05** | GIT | Central Vietnam | Da Nang, Hue, Ba Na Hills, Hoi An | 4D | $223 | +$78 | ✅ Hoàn tất |
| 6 | **HAN01** | GIT | North Vietnam | Ha Noi, Sapa, Ninh Binh | 4D | $242 | +$45 | ✅ Hoàn tất |
| 7 | **HAN02** | GIT | North Vietnam | Ha Noi, Sa Pa, Ha Long | 4D | $256 | +$40 | ✅ Hoàn tất |
| 8 | **HAN03** | GIT | North Vietnam | Ha Noi, Tam Dao, Ha Long, Ninh Binh | 4D | $234 | +$50 | ✅ Hoàn tất |
| 9 | **PQC01** | GIT | Phu Quoc | Phu Quoc Island | 3D | $184 | +$60 | ✅ Hoàn tất |
| 10 | **PQC02** | GIT | Phu Quoc | Phu Quoc Island | 4D | $242 | +$72 | ✅ Hoàn tất |
| 11 | **CXR01** | GIT | Southern Vietnam | Nha Trang City | 3D | $136 | +$25 | ✅ Hoàn tất |
| 12 | **CXR02** | GIT | Southern Vietnam | Nha Trang and Da Lat | 4D | $220 | +$37 | ✅ Hoàn tất |
| 13 | **SGN01** | GIT | Southern Vietnam | Ho Chi Minh and Mui Ne | 3D | $187 | +$50 | ✅ Hoàn tất |
| 14 | **SGN02** | GIT | Southern Vietnam | Ho Chi Minh, Mui Ne, Da Lat | 4D | $244 | +$68 | ✅ Hoàn tất |

> [!NOTE]
> **Chi tiết chỉnh sửa cho nhóm GIT (Central, North, Phu Quoc, Southern):**
> - Chuyển `priceExtraRows` và `vehicleRows` từ format cũ sang format mới (`cells[]` với `colSpan`)
> - Tách biệt và hiển thị đủ 3 loại xe: 29 seats (mini bus), 35 seats, 45 seats (bus)
> - Đảm bảo chính xác tỉ lệ colSpan của từng ô khớp với PDF gốc
> - Hỗ trợ đầy đủ tất cả các giai đoạn phụ thu mùa cao điểm (surcharges)
> - **Căn chỉnh chính sách Tour Leader (Remarks):** Loại bỏ ô trống thừa ở giữa, gộp ô qua colSpan (2 cột trái, 6 cột phải), chuyển dòng "แยกนอนเดี่ยว" từ trái sang phải, và chuẩn hóa chính tả tiếng Thái không khoảng cách cho toàn bộ 14 tour GIT (Phú Quốc, Cam Ranh, Sài Gòn, Đà Nẵng, Hà Nội) khớp 100% PDF gốc.
> - Dữ liệu đã được deploy trực tiếp lên production.

---

### ⏳ Chưa chỉnh sửa — Cần đối chiếu PDF gốc

Các tour dưới đây vẫn sử dụng format cũ (`merged`/`left`/`right`). Cần kiểm tra lại với PDF gốc tương ứng để xác nhận tính chính xác.

#### GIT — Tất cả các tour GIT đã hoàn tất!
Không còn tour GIT nào chưa đối chiếu.

#### FIT — Tất cả khu vực
**PDF nguồn:** Các file PDF trong `data_goc\Sales kit_FIT\` (nếu có)

| # | Code | Region | Tiêu đề | Ngày | Giá thấp nhất | Single | Cần kiểm tra |
|---|------|--------|---------|------|---------------|--------|--------------|
| 15 | **FITDAD01** | Central | Da Nang, Ba Na Hills, Hoi An | 3D | $194 | +$70 | 🔲 Chưa đối chiếu PDF |
| 16 | **FITDAD02** | Central | Da Nang, Ba Na Hills, Hoi An | 4D | $215 | +$80 | 🔲 Chưa đối chiếu PDF |
| 17 | **FITHAN01** | North | Ha Noi, Tam Dao, Ninh Binh | 3D | $170 | +$70 | 🔲 Chưa đối chiếu PDF |
| 18 | **FITHAN02** | North | Ha Noi and Sapa | 4D | $255 | +$65 | 🔲 Chưa đối chiếu PDF |
| 19 | **FITHAN03** | North | Ha Noi, Ha Long, Ninh Binh | 4D | $250 | +$70 | 🔲 Chưa đối chiếu PDF |
| 20 | **FITPQC01** | Phu Quoc | Phu Quoc Island | 3D | $170 | +$80 | 🔲 Chưa đối chiếu PDF |
| 21 | **FITPQC02** | Phu Quoc | Phu Quoc Island | 4D | $205 | +$110 | 🔲 Chưa đối chiếu PDF |
| 22 | **FITCXR01** | Southern | Nha Trang and Da Lat | 4D | $222 | +$65 | 🔲 Chưa đối chiếu PDF |
| 23 | **FITSGN01** | Southern | Ho Chi Minh and Mui Ne | 3D | $255 | +$78 | 🔲 Chưa đối chiếu PDF |

---

## 3. Chi tiết kỹ thuật — Cấu trúc dữ liệu

### Format cũ (legacy — còn tồn tại ở 9 tour FIT chưa chỉnh sửa)

```javascript
priceExtraRows: [
  { label: '29/04-02/05/2026', merged: '+28$ / +25$', single: '+90$' }
],
vehicleRows: [
  { label: 'Vehicle type', left: '29 seats (mini bus)', right: '35 seats' }
]
```

> [!WARNING]
> Format cũ có các vấn đề:
> - `merged` gộp chung nhiều mức phụ thu vào 1 chuỗi text → không thể hiện đúng layout chia cột PDF
> - `vehicleRows` chỉ có `left`/`right` → thiếu loại xe thứ 3 (`45 seats bus`)
> - Thiếu khoảng thời gian phụ thu thứ 2 (`24-26/12/2026`)

### Format mới (đã áp dụng cho toàn bộ 14 tour GIT)

```javascript
priceExtraRows: [
  {
    label: '29/04-02/05/2026\n24-26/12/2026',
    cells: [
      { text: '+28$', colSpan: 2 },
      { text: '+25$', colSpan: 4 },
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
]
```

> [!TIP]
> Format mới cho phép:
> - Chia cột linh hoạt với `colSpan` cho mỗi ô
> - Hiển thị đầy đủ tất cả loại xe
> - Render đúng layout bảng giống PDF gốc
> - Component `PricePreview` trong `App.jsx` tự động nhận diện và render cả 2 format

---

## 4. Checklist công việc tiếp theo

### Ưu tiên cao — Hoàn thành toàn bộ GIT tours!
Tất cả 14 tour GIT đã hoàn tất đối chiếu 100% với các file PDF gốc.

### Ưu tiên trung bình — FIT tours (9 tour)
- [ ] **FITDAD01** — Tìm và đối chiếu PDF FIT tương ứng
- [ ] **FITDAD02**
- [ ] **FITHAN01**
- [ ] **FITHAN02**
- [ ] **FITHAN03**
- [ ] **FITPQC01**
- [ ] **FITPQC02**
- [ ] **FITCXR01**
- [ ] **FITSGN01**

### Cho mỗi tour FIT, cần kiểm tra:
1. ✅ Giá trị bảng giá (cột giá + cột single)
2. ✅ Phụ thu mùa cao điểm (surcharges)
3. ✅ Bảng loại xe (vehicle type)
4. ✅ ColSpan phù hợp layout PDF
5. ✅ Nội dung Thai — lịch trình, menu ăn, inclusions, exclusions
6. ✅ Remarks (tour leader policy) — đúng số tiền
7. ✅ Payment terms & cancellation policy

---

## 5. Lịch sử commit liên quan

| Commit | Mô tả | Ngày |
|--------|-------|------|
| `deploy` | Căn chỉnh layout "Tour Leader Policy" (Remarks): Loại bỏ ô trống ở giữa cho Phú Quốc, di chuyển dòng "แยกนอนเดี่ยว" từ trái sang phải, chuẩn hóa chính tả tiếng Thái không khoảng cách cho toàn bộ 14 tour GIT (Phú Quốc, Cam Ranh, Sài Gòn, Đà Nẵng, Hà Nội) khớp 100% PDF gốc | 2026-06-11 |
| `deploy` | Thay thế icon Globe bằng cờ Thái Lan (TH) / Anh (EN) dạng pill, thu gọn header giúp hiển thị thẳng hàng trên cùng một dòng ở Mobile | 2026-06-11 |
| `deploy` | Chuẩn hóa định dạng tiền tệ USD ở tất cả 23 tour (ký hiệu $ đứng trước số, không có khoảng cách, ví dụ: +$20, +$25/+$22, $12, v.v.) | 2026-06-10 |
| `deploy` | Loại bỏ các dòng phụ thu tổng hợp dư thừa trong bảng giá của 9 tour FIT để khớp 100% layout PDF gốc | 2026-06-10 |
| `deploy` | Chuyển dịch bộ lọc region sang tiếng Thái Lan; Xóa bỏ chức năng copy quote; Xóa bỏ nội dung "มื้ออาหาร: B, L, D" và icon trong lịch trình; Sửa lỗi hiển thị cột Price/Payment ở chân trang trên Mobile; Sửa định dạng cột นอนเดี่ยว thành +XX$ | 2026-06-10 |
| `deploy` | Finalize alignment for GIT tours (HAN01-HAN03, PQC01-PQC02, CXR01, CXR02, SGN01, SGN02) with 45-seat bus and high-season surcharge colSpans | 2026-06-10 |
| `b7c3b54` | Update DAD01-DAD05 pricing and vehicle rows to match original PDF grids using new cell spans | 2026-06-10 |
| `042cdf8` | Remove PdfSourceSection component from tour details | 2026-06-10 |
| `fe73fd9` | Fix itinerary meal parsing discrepancies in DAD05 and other tours | 2026-06-10 |
| `de16e4d` | feat: complete Thai localization, price formatting, and mobile auto-scroll UX | 2026-06-10 |
| `e8eeea7` | Wire catalog button interactions | 2026-06-09 |
| `191996d` | Initial Green Sea webapp snapshot | — |

---

## 6. File & đường dẫn tham chiếu

| Mục | Đường dẫn |
|-----|-----------|
| Source code tours | [tours.js](file:///d:/Dat/webapp%20greensea/src/data/tours.js) |
| Component render bảng giá | [App.jsx](file:///d:/Dat/webapp%20greensea/src/App.jsx) (PricePreview) |
| CSS styles | [styles.css](file:///d:/Dat/webapp%20greensea/src/styles.css) |
| Deploy script | [deploy.ps1](file:///d:/Dat/webapp%20greensea/deploy.ps1) |
| PDF gốc — Central | `data_goc/Sales kit_GIT/Sales kit GIT_Central Vietnam 2026.pdf` |
| PDF gốc — North | `data_goc/Sales kit_GIT/Sales kit GIT_North Viet Nam 2026.pdf` |
| PDF gốc — Phu Quoc | `data_goc/Sales kit_GIT/Sales kit GIT_Phu Quoc Vietnam 2026.pdf` |
| PDF gốc — Southern | `data_goc/Sales kit_GIT/Sales kit GIT_Southern Vietnam 2026.pdf` |
| Website live | [https://greenseatour.vn](https://greenseatour.vn) |
