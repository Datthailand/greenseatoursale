# FITDAD01 Product Landing — Next Steps After Option 2 B2B Positioning

**Project:** Greensea Tour website  
**Page:** `/?tour=fitdad01&mode=landing`  
**Tour code:** `FITDAD01`  
**Date:** 2026-08-20  
**Prepared for:** Anh Đạt / Green Sea Tour  
**Prepared by:** OpenClaw / Em Cún  
**Purpose:** Đề xuất các bước tiếp theo sau khi Anh Đạt đã tự implement Option 2 — B2B positioning fix cho trang product landing FITDAD01.

---

## 1. Current status

Sau lần kiểm tra gần nhất, trang đã đạt phần lớn yêu cầu của **Option 2 — fix B2B positioning trên product landing lớp 2**.

### What passed

- Có block **Operated by Green Sea Tour — Vietnam Inbound DMC**.
- Có block **B2B Agent Sales Kit**.
- Trang đã thể hiện rõ hơn đây là sales kit / landing cho đối tác lữ hành, không phải trang bán lẻ B2C.
- CTA chính đã chuyển về hướng B2B quotation.
- Không thấy wording kiểu `Book Now` / `จองเลย`.
- Build local đã pass với `npm run build`.
- Block B2B/DMC được ẩn trong white-label / client mode, hướng này hợp lý để không lộ sales kit nội bộ khi gửi link cho khách cuối.

### What is still not fully closed

- Pricing section nên có thêm một note xác nhận giá B2B trước khi partner dùng báo giá cuối cho khách.
- Cần kiểm tra UI thật trên mobile/tablet sau khi thêm 2 block mới.
- Cần kiểm tra tiếng Thái tự nhiên hơn trước khi live/gửi partner thật.
- Cần test đầy đủ các mode: internal B2B view, agent/white-label view, hide NET view, PDF, poster, copy LINE quote.

---

## 2. Recommended next steps — priority order

Em đề xuất đi theo 5 phase, không làm quá rộng ngay. Mục tiêu là biến trang FITDAD01 thành một **B2B product sales kit chuẩn mẫu**, sau đó dùng kinh nghiệm này nhân sang tour khác hoặc dựng Thai B2B DMC landing tổng.

---

## Phase 1 — Close V1 positioning polish

**Priority:** High  
**Goal:** Chốt lại bản V1 để 2 mục audit cũ có thể đổi từ ⚠️ sang ✅.

### 1.1 Add pricing confirmation note

Hiện pricing section đã có NET pricing và calculator, nhưng cần thêm một câu bảo vệ nghiệp vụ để partner hiểu đây là giá B2B tham khảo/công cụ báo giá, trước khi chốt khách phải confirm lại với Green Sea Tour.

**Recommended position:** ngay dưới đoạn mô tả pricing period trong section `id="pricing-terminal"`.

Current nearby text:

```jsx
ช่วงเวลาเดินทาง: 01/04 - 30/12/2026 ...
```

Add a small note block below it.

**Vietnamese copy:**

> Bảng giá NET B2B dành cho công ty tour/đại lý. Vui lòng liên hệ Green Sea Tour qua LINE để xác nhận phòng, ngày đi, điều kiện và giá mới nhất trước khi báo giá cuối cho khách.

**Thai copy:**

> ตารางราคา NET B2B สำหรับบริษัททัวร์และเอเจนซี่ กรุณาติดต่อทีมงาน Green Sea Tour ผ่าน LINE เพื่อยืนยันห้องพัก ช่วงวันเดินทาง เงื่อนไข และราคาล่าสุดก่อนเสนอราคาสุดท้ายให้ลูกค้า

**English copy:**

> B2B NET rates for travel agencies. Please contact Green Sea Tour via LINE to reconfirm room availability, travel date, conditions and latest rates before sending the final quotation to your client.

### 1.2 Keep B2B/DMC blocks short

Không nên nhồi thêm quá nhiều nội dung công ty vào trang sản phẩm. Hai block hiện tại đã đủ vai trò:

1. Green Sea Tour là Vietnam Inbound DMC / land operator.
2. Trang này là B2B Agent Sales Kit.

Nếu thêm nữa, trang dễ bị lệch thành corporate landing tổng.

### 1.3 Acceptance criteria for Phase 1

- Partner nhìn trong 10 giây đầu hiểu đây là tour do Green Sea Tour vận hành.
- Partner hiểu đây là B2B sales kit cho công ty tour/agency.
- Pricing section có cảnh báo confirm giá/điều kiện trước khi chốt khách.
- Không dùng ngôn ngữ B2C retail kiểu `Book Now`, `จองเลย`, `flash sale`, `discount countdown`.

---

## Phase 2 — UI/UX QA after adding B2B blocks

**Priority:** High  
**Goal:** Đảm bảo trang không chỉ đúng nội dung mà còn nhìn gọn, dễ dùng, không vỡ layout.

### 2.1 Required viewport checks

Test các kích thước sau:

- Mobile: 390px × 844px
- Mobile lớn: 430px × 932px
- Tablet: 768px × 1024px
- Laptop: 1366px × 768px
- Desktop: 1440px × 900px

### 2.2 Sections to inspect visually

- Hero section
- B2B/DMC positioning blocks
- Gallery section sau 2 block mới
- Pricing terminal
- Form request quotation
- Footer/contact
- White-label agent modal / generated client link

### 2.3 UI risks to watch

- Hai block mới có bị quá dày chữ trên mobile không.
- Grid `minmax(460px, 1fr)` có gây overflow ngang trên mobile không.
- Khoảng cách âm `margin: -2.5rem` giữa hero và block mới có gây chồng lấn ở mobile không.
- Button text tiếng Thái dài có bị xuống dòng xấu không.
- Pricing/action buttons có bị quá chật sau khi đổi copy B2B không.

### 2.4 Acceptance criteria for Phase 2

- Không có horizontal scroll không mong muốn trên mobile.
- Hai block B2B/DMC đọc được, không che ảnh/hero.
- CTA chính vẫn nổi bật: pricing, LINE/copy quote, request B2B quotation.
- Agent/client mode không lộ block nội bộ nếu mục tiêu là gửi khách cuối.

---

## Phase 3 — Thai copy QA

**Priority:** High before live  
**Goal:** Thai copy nghe tự nhiên theo ngôn ngữ B2B travel trade, không giống dịch máy.

### 3.1 Copy that should be reviewed by Thai speaker / sales person

- Hero badge / tagline
- DMC positioning block
- B2B Agent Sales Kit block
- Pricing confirmation note
- Form labels
- CTA buttons
- LINE quote text copied from the tool
- Poster export text if gửi cho partner Thái
- PDF naming / download wording

### 3.2 Thai terminology direction

Preferred tone:

- professional
- travel trade friendly
- easy to cooperate
- responsive by LINE
- local Vietnam operator / land operator

Recommended terms:

- `บริษัททัวร์ไทย`
- `เอเจนซี่`
- `ราคา NET B2B`
- `ใบเสนอราคา B2B`
- `ทีมแลนด์โอเปอเรเตอร์ในเวียดนาม`
- `ติดต่อผ่าน LINE`
- `ยืนยันห้องพัก / วันที่เดินทาง / เงื่อนไข`

Avoid:

- `จองเลย`
- `ลดราคาพิเศษวันนี้เท่านั้น`
- `flash sale`
- wording quá B2C hoặc quá quảng cáo đại trà

### 3.3 Default language rule

Trong giai đoạn test nội bộ, default tiếng Việt là hợp lý để Anh Đạt kiểm nội dung/bố cục.

Khi live hoặc gửi partner Thái thật:

- default page language should become Thai
- Vietnamese can remain as internal/admin/testing language
- English should be secondary support language

### 3.4 Acceptance criteria for Phase 3

- Thai reader hiểu đây là land tour B2B cho công ty tour Thái.
- Không có câu Thai cứng/dịch máy làm mất uy tín.
- CTA LINE và quotation rõ, không gây hiểu nhầm là B2C direct booking.

---

## Phase 4 — Functional QA for sales tools

**Priority:** Medium-high  
**Goal:** Đảm bảo các công cụ bán hàng chạy đúng khi partner/sales dùng thật.

### 4.1 Test matrix

Test tối thiểu các luồng sau:

1. Open page default internal view.
2. Switch VI / TH / EN.
3. Click `pricing-terminal` anchor from hero.
4. Change pax count and margin.
5. Copy LINE quote.
6. Export poster image.
7. Download PDF.
8. Open LINE Official link.
9. Submit/request B2B quotation form, or verify payload if form chưa có backend.
10. Create white-label client share link.
11. Open generated client link and confirm NET hidden.
12. Confirm B2B/DMC internal blocks are hidden when expected.

### 4.2 Data points that must be checked

- Tour code: `FITDAD01`
- Base NET price: matches current data source
- Travel period: `01/04 - 30/12/2026`
- Hotel/service inclusions
- Contact phone
- LINE Official link
- PDF path: `/tours/FITDAD01.pdf`
- QR/contact assets if used

### 4.3 Acceptance criteria for Phase 4

- Copy LINE quote contains correct tour/code/price/contact.
- Poster export does not crop important text.
- PDF opens correctly.
- White-label mode hides NET and internal B2B details.
- Form CTA is B2B quotation, not retail booking.

---

## Phase 5 — Tracking, CRM and lead flow

**Priority:** Medium  
**Goal:** Biến trang từ đẹp/nội dung tốt thành công cụ lấy lead và đo hiệu quả.

### 5.1 Recommended lead flow

```text
Thai agency / sales partner
  -> FITDAD01 product landing
  -> LINE / Request B2B Quotation / Copy quote / PDF
  -> CRM or lead sheet
  -> sales follow-up
  -> official quotation
  -> booking / operation
```

### 5.2 Events to track

If analytics exists, track these actions:

- view product landing
- language switch to Thai
- click pricing terminal
- change pax/margin
- copy LINE quote
- export poster
- download PDF
- click LINE Official
- submit B2B quotation form
- create white-label link

### 5.3 CRM payload proposal

For quotation form, minimum payload should include:

- tour code
- page URL
- language selected
- company/agency name
- contact person
- LINE / WhatsApp
- travel date
- pax count
- hotel preference
- requested service changes
- source/UTM if available
- timestamp

### 5.4 Acceptance criteria for Phase 5

- Sales team can know which tour the lead came from.
- Sales team has enough info to reply fast on LINE.
- No need to ask partner to repeat all basic details.

---

## 6. Recommended V2 after FITDAD01 is stable

Only start V2 after V1 passes content + UI + functional QA.

### V2.1 Create a reusable B2B positioning component

If this style works, extract the two blocks into reusable components:

- `OperatedByDmcBlock`
- `B2BAgentSalesKitBlock`
- `PricingB2BNote`

So later tours can reuse the same pattern.

### V2.2 Apply to 2–3 more sample products

Recommended next sample groups:

- Đà Nẵng / Hội An product khác
- Hà Nội / Sapa / Ninh Bình product
- Phú Quốc product

Reason: test whether the sales-kit style works across Central / North / Island products.

### V2.3 Build Thai B2B DMC landing tổng

Sau khi product landing style ổn, mới dựng trang tổng:

- `/thai-b2b`
- or `/?page=thai-b2b`

Trang tổng không nên show full NET. Nó nên là public lead-generation page cho Thai agencies, còn product pages là sales kit chi tiết.

---

## 7. Immediate implementation checklist

Recommended next immediate tasks:

- [ ] Add pricing confirmation note under pricing section header.
- [ ] Run `npm run build`.
- [ ] Check mobile layout for the two new B2B/DMC blocks.
- [ ] Check Thai copy with a Thai speaker or trusted sales contact before live.
- [ ] Test copy LINE quote and poster export.
- [ ] Test white-label/client link does not expose internal NET/sales-kit content.
- [ ] Decide live default language switch: Vietnamese for internal test, Thai for partner/live.
- [ ] If all pass, update audit status rows 3 and 4 from ⚠️ to ✅.

---

## 8. Suggested acceptance label

Until pricing note + mobile QA + function QA are verified:

**Current label:** `CONTENT POSITIONING PASS — FUNCTIONAL QA PENDING`

After the checklist passes:

**Final V1 label:** `FITDAD01 B2B PRODUCT SALES KIT V1 PASS`

---

## 9. Em Cún's recommendation

Không nên nhảy ngay sang trang tổng Thai B2B DMC trước khi FITDAD01 ổn hoàn toàn.

Bước tốt nhất là:

1. Chốt note pricing.
2. QA mobile + Thai copy.
3. Test full sales tool flow.
4. Dùng FITDAD01 làm mẫu chuẩn.
5. Sau đó mới nhân style sang tour khác hoặc dựng `/thai-b2b`.

Lý do: FITDAD01 đang là case học phong cách. Nếu case đầu tiên chưa khóa chuẩn, nhân rộng sẽ kéo theo lỗi tone/copy/UI sang toàn bộ hệ thống.
