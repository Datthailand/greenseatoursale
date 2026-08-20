# FITDAD01 Product Landing — Option 2 B2B Positioning Fix Plan

**Project:** Greensea Tour website  
**Page scope:** Lớp 2 — product landing / agent sales kit cho 1 sản phẩm cụ thể  
**Target page:** `/?tour=fitdad01&mode=landing`  
**Date:** 2026-08-20  
**Plan owner:** OpenClaw / Em Cún  
**Status:** Draft plan for Anh Đạt review — chưa sửa code

---

## 1. Mục tiêu của phương án 2

Phương án 2 không biến FITDAD01 thành landing page tổng của công ty. Trang này vẫn là **product landing / agent sales kit** cho chương trình:

> Đà Nẵng – Bà Nà Hills – Hội An

Nhưng cần fix 2 điểm đang bị cảnh báo trong audit:

1. **Có định vị tổng thể Green Sea Tour là DMC cho công ty tour Thái**  
   → Sau khi sửa, người xem phải hiểu chương trình này được vận hành bởi Green Sea Tour — Vietnam Inbound DMC / local operator cho thị trường Thái.

2. **Có phân biệt rõ B2B vs B2C**  
   → Sau khi sửa, người xem phải hiểu đây là sales kit / B2B quotation page cho travel agency, không phải trang bán tour lẻ cho khách retail.

---

## 2. Nguyên tắc sửa

- Không nhồi quá nhiều nội dung công ty tổng vào trang sản phẩm.
- Không làm trang bị nặng như corporate landing page.
- Thêm **2 block ngắn nhưng rõ** sau hero:
  1. `Operated by Green Sea Tour — Vietnam Inbound DMC`
  2. `B2B Agent Sales Kit`
- Chỉnh CTA theo hướng LINE / Request B2B Quotation.
- Thêm note B2B ngay trước hoặc trong phần bảng NET.
- Giữ bảng giá NET và calculator vì đây là trang lớp 2 / sales kit sản phẩm.
- Giai đoạn test nội bộ vẫn có thể default tiếng Việt; bản live/gửi partner Thái sẽ default tiếng Thái.

---

## 3. Vị trí sửa trên trang hiện tại

Dựa trên file:

`src/components/FITDAD01LandingPage.jsx`

Các vùng liên quan:

| Vùng | Vị trí hiện tại | Hướng xử lý |
|---|---|---|
| Header / language / LINE | Gần phần header trước hero | Giữ, chỉ cân nhắc ưu tiên LINE visual nếu cần. |
| Hero | Sau comment `MAJESTIC CINEMATIC HERO SECTION` | Thêm badge/copy nhẹ để nói rõ DMC + B2B agency. |
| Sau hero, trước gallery | Hiện đang vào section gallery/highlights | Chèn 2 block mới ở đây. Đây là vị trí chính của phương án 2. |
| Pricing terminal | Section `id="pricing-terminal"` | Thêm B2B note để phân biệt agent/retail và xác nhận giá qua LINE. |
| Form/contact | Cuối trang | Đổi wording nút/form về `Request B2B Quotation` / `ขอใบเสนอราคา B2B` nếu chưa đủ rõ. |

---

## 4. Block 1 — Operated by Green Sea Tour

### 4.1 Mục tiêu

Fix mục:

> Có định vị tổng thể Green Sea Tour là DMC cho công ty tour Thái

Block này cần trả lời nhanh:

- Ai vận hành chương trình này?
- Green Sea Tour là ai?
- Tại sao công ty tour Thái có thể gửi khách cho mình?
- Mình có operation thật tại Việt Nam không?

### 4.2 Vị trí đề xuất

Ngay sau hero, trước section gallery/hình ảnh.

Lý do:

- Hero đã giới thiệu sản phẩm.
- Trước khi vào hình/lịch trình, cần gài credibility B2B.
- Người xem không bị cảm giác đây là trang tour retail.

### 4.3 Layout đề xuất

Một card lớn nền trắng hoặc xanh rất nhạt, chia 2 cột:

**Cột trái:** định vị DMC  
**Cột phải:** 4 proof/capability cards nhỏ

Tone:

- premium
- gọn
- corporate
- không flash sale

Màu:

- deep green `#00533d`
- navy `#0f172a`
- gold accent `#fbbf24`
- background `#f8fafc` / `#ecfdf5`

### 4.4 Copy đề xuất — Vietnamese test mode

**Eyebrow**

> Vận hành bởi Green Sea Tour

**Title**

> Vietnam Inbound DMC cho đối tác lữ hành Thái Lan

**Subtitle**

> Chương trình FITDAD01 được vận hành bởi Green Sea Tour — đơn vị land operator tại Việt Nam, hỗ trợ công ty tour Thái từ sân bay, khách sạn, xe, hướng dẫn viên, nhà hàng, vé tham quan đến chăm sóc đoàn trong suốt hành trình.

**Proof bullets**

1. **Local Vietnam Operation**  
   Đội ngũ vận hành tại Việt Nam, xử lý trực tiếp với nhà xe, khách sạn, nhà hàng và điểm tham quan.

2. **Thai Market Support**  
   Hỗ trợ itinerary, báo giá và trao đổi phù hợp với công ty tour Thái.

3. **LINE-first Communication**  
   Sales và operation phản hồi nhanh qua LINE / WhatsApp.

4. **Flexible Group Handling**  
   Có thể điều chỉnh xe, bữa ăn, khách sạn, thứ tự tham quan theo nhu cầu đoàn.

### 4.5 Copy đề xuất — Thai live mode

**Eyebrow**

> ดำเนินงานโดย Green Sea Tour

**Title**

> Vietnam Inbound DMC สำหรับบริษัททัวร์ไทย

**Subtitle**

> โปรแกรมนี้ดำเนินงานโดย Green Sea Tour ทีมแลนด์โอเปอเรเตอร์ในเวียดนาม ดูแลครบตั้งแต่รับสนามบิน โรงแรม รถ ไกด์ ร้านอาหาร ตั๋วเข้าชม และการดูแลกรุ๊ประหว่างเดินทาง

**Proof bullets**

1. **Local Vietnam Operation**  
   ทีมงานอยู่ที่เวียดนาม ประสานงานจริงกับรถ โรงแรม ร้านอาหาร และสถานที่ท่องเที่ยว

2. **Thai Market Support**  
   รองรับบริษัททัวร์ไทย พร้อมข้อมูลโปรแกรมและใบเสนอราคาสำหรับทีมขาย

3. **LINE-first Communication**  
   ติดต่อและปรับโปรแกรมได้รวดเร็วผ่าน LINE / WhatsApp

4. **Flexible Group Handling**  
   ปรับรถ อาหาร โรงแรม และลำดับการเดินทางตามความเหมาะสมของกรุ๊ป

### 4.6 Copy đề xuất — English fallback

**Eyebrow**

> Operated by Green Sea Tour

**Title**

> Vietnam Inbound DMC for Thai Travel Agencies

**Subtitle**

> This FITDAD01 program is operated by Green Sea Tour, a Vietnam-based inbound land operator supporting Thai travel partners with airport transfers, hotels, transportation, guides, restaurants, attraction tickets and on-trip support.

---

## 5. Block 2 — B2B Agent Sales Kit

### 5.1 Mục tiêu

Fix mục:

> Có phân biệt rõ B2B vs B2C

Block này cần nói thẳng:

- Trang này dành cho công ty tour / đại lý / sales team.
- Giá là NET/B2B để làm báo giá.
- CTA là gửi inquiry / request quotation, không phải book now kiểu khách lẻ.
- Có thể dùng trang này làm sales kit gửi nội bộ/partner.

### 5.2 Vị trí đề xuất

Ngay dưới Block 1, vẫn trước gallery/lịch trình.

Có thể gom Block 1 + Block 2 trong cùng một section `B2B Partner Overview` để trang không bị dài.

### 5.3 Layout đề xuất

4 cards nhỏ dạng horizontal/compact:

1. NET Rate for Agents
2. Ready-to-Send Program
3. LINE Quotation Support
4. Flexible Operation

Dưới 4 cards có 1 CTA row:

- `ขอใบเสนอราคา B2B`
- `ติดต่อผ่าน LINE`
- `ดาวน์โหลด PDF (B2B)`

### 5.4 Copy đề xuất — Vietnamese test mode

**Title**

> Sales kit B2B cho đại lý và công ty tour

**Subtitle**

> Trang này được thiết kế để đội sales và đối tác lữ hành sử dụng khi tư vấn khách FIT / nhóm nhỏ / gia đình / incentive. Giá NET và thông tin dịch vụ dùng cho mục đích báo giá B2B.

**Cards**

1. **NET Rate for Agents**  
   Bảng giá NET theo số lượng khách, hỗ trợ đại lý tự tính markup.

2. **Ready-to-Send Program**  
   Lịch trình, điểm nổi bật, khách sạn, bữa ăn và dịch vụ đã trình bày sẵn.

3. **LINE Quotation Support**  
   Copy nội dung báo giá và gửi nhanh qua LINE / WhatsApp.

4. **Flexible Operation**  
   Điều chỉnh chương trình, xe, bữa ăn, phòng và dịch vụ theo từng đoàn.

### 5.5 Copy đề xuất — Thai live mode

**Title**

> Sales Kit สำหรับบริษัททัวร์และเอเจนซี่

**Subtitle**

> หน้านี้ออกแบบสำหรับทีมขายและพาร์ทเนอร์ทัวร์ ใช้เสนอโปรแกรมให้ลูกค้า FIT / กรุ๊ปเล็ก / ครอบครัว / Incentive พร้อมข้อมูลราคา NET และรายละเอียดบริการสำหรับการทำใบเสนอราคา B2B

**Cards**

1. **NET Rate for Agents**  
   ราคา NET ตามจำนวนลูกค้า ช่วยให้เอเจนซี่คำนวณราคาขายได้ง่าย

2. **Ready-to-Send Program**  
   โปรแกรม ไฮไลท์ โรงแรม อาหาร และบริการจัดเตรียมไว้พร้อมสำหรับทีมขาย

3. **LINE Quotation Support**  
   คัดลอกข้อความเสนอราคาและส่งต่อผ่าน LINE / WhatsApp ได้รวดเร็ว

4. **Flexible Operation**  
   ปรับรถ อาหาร โรงแรม ห้องพัก และบริการตามความต้องการของแต่ละกรุ๊ป

### 5.6 English fallback

**Title**

> B2B Agent Sales Kit

**Subtitle**

> This page is designed for travel agencies and sales teams to present the FITDAD01 program to FIT, small group, family and incentive clients with B2B NET rates and ready-to-send service details.

---

## 6. Hero refinement

### 6.1 Mục tiêu

Hero vẫn tập trung vào sản phẩm, nhưng thêm một lớp B2B/DMC credibility.

### 6.2 Thay đổi nhẹ đề xuất

Thêm badge nhỏ gần trên H1 hoặc dưới route:

**VI**

> Product Sales Kit • B2B NET • Operated by Vietnam DMC

**TH**

> Sales Kit สำหรับเอเจนซี่ • ราคา NET B2B • ดำเนินงานโดย DMC เวียดนาม

**EN**

> Agent Sales Kit • B2B NET Rates • Operated by Vietnam DMC

### 6.3 CTA trong hero

CTA hiện tại:

- Xem bảng giá & tính báo giá
- Tải PDF B2B
- Sao chép báo giá

Đề xuất label rõ B2B hơn:

| Current intent | VI test | Thai live | English |
|---|---|---|---|
| Pricing/calculator | Xem giá NET & tạo báo giá B2B | ขอใบเสนอราคา B2B / คำนวณราคา NET | Request B2B Quotation |
| PDF | Tải PDF B2B | ดาวน์โหลด PDF B2B | Download B2B PDF |
| Copy quote | Sao chép nội dung gửi LINE | คัดลอกข้อความสำหรับ LINE | Copy LINE Quote |

### 6.4 Không nên dùng

- Book Now
- จองเลย
- Flash sale
- ลดราคา
- Countdown

---

## 7. Pricing section refinement

### 7.1 Mục tiêu

Giữ bảng NET/calculator, nhưng thêm ngữ cảnh rõ:

- Đây là NET B2B cho agency.
- Giá cần xác nhận lại qua LINE trước khi chốt booking.
- Trang không phải giá retail cho khách lẻ.

### 7.2 Note đề xuất trên pricing terminal

Đặt dưới title hoặc trên bảng NET.

**VI**

> Bảng giá NET B2B dành cho công ty tour và đại lý lữ hành. Vui lòng liên hệ Green Sea Tour qua LINE để xác nhận tình trạng phòng, phụ thu mùa cao điểm và điều kiện mới nhất trước khi gửi báo giá cuối cho khách.

**TH**

> ตารางราคา NET B2B สำหรับบริษัททัวร์และเอเจนซี่ กรุณาติดต่อทีมงาน Green Sea Tour ผ่าน LINE เพื่อยืนยันห้องพัก ช่วงวันเดินทาง เงื่อนไข และราคาล่าสุดก่อนเสนอราคาสุดท้ายให้ลูกค้า

**EN**

> B2B NET rates for travel agencies and tour operators. Please contact Green Sea Tour via LINE to confirm room availability, seasonal surcharges, conditions and the latest rate before sending the final quotation to your client.

### 7.3 Nếu muốn bảo vệ giá hơn trong tương lai

Có thể thêm logic sau này:

- Public mode: hiện câu `สำหรับบริษัททัวร์ ราคาพิเศษ กรุณาติดต่อทีมงาน`.
- Agent mode: show full NET + calculator.

Nhưng giai đoạn hiện tại chưa bắt buộc vì scope là product/agent sales kit.

---

## 8. Form / inquiry refinement

### 8.1 Mục tiêu

Form phải giống B2B inquiry, không giống booking form B2C.

### 8.2 Field nên giữ hoặc chỉnh

- Company Name / Agency Name
- Contact Person
- LINE ID / WhatsApp
- Travel Date
- Number of Travelers
- Travel Type nếu có: FIT / GIT / Family / Incentive
- Special Request

### 8.3 Button wording

**VI**

> Gửi yêu cầu báo giá B2B

**TH**

> ขอใบเสนอราคา B2B

**EN**

> Request B2B Quotation

### 8.4 Success message

**VI**

> Green Sea Tour đã nhận yêu cầu. Team sales sẽ liên hệ lại qua LINE / WhatsApp để xác nhận báo giá B2B.

**TH**

> ทีมงาน Green Sea Tour ได้รับคำขอแล้ว และจะติดต่อกลับผ่าน LINE / WhatsApp เพื่อยืนยันใบเสนอราคา B2B

---

## 9. Proposed implementation steps

### Step 1 — Add copy/content constants

Trong `FITDAD01LandingPage.jsx`, tạo object copy cho 2 block mới:

- `dmcPositioningCopy`
- `agentSalesKitCopy`
- `pricingB2BNoteCopy`

Mục tiêu: tránh nhồi ternary quá dài trong JSX.

### Step 2 — Add `OperatedByDmcBlock`

Có thể tạo inline component nhỏ trong cùng file.

Props:

- `isVi`
- `isTh`
- `copy`

Output:

- eyebrow
- title
- subtitle
- 4 proof cards

### Step 3 — Add `B2BAgentSalesKitBlock`

Component nhỏ trong cùng file.

Output:

- title
- subtitle
- 4 cards
- CTA row

CTA row link:

- pricing/calculator → `#pricing-terminal`
- LINE → `https://lin.ee/Pwro79k` hoặc agentConfig line nếu có
- PDF → `/tours/FITDAD01.pdf`

### Step 4 — Insert blocks after hero

Chèn sau closing `</section>` của hero, trước section gallery hiện tại.

Hiện gallery section bắt đầu bằng comment:

```jsx
{/* 3. INTERACTIVE EXPANDING DESTINATION HIGHLIGHTS ACCORDION */}
```

Nên đổi thứ tự comment sau khi chèn:

```jsx
{/* 3. B2B DMC POSITIONING + AGENT SALES KIT */}
{/* 4. INTERACTIVE EXPANDING DESTINATION HIGHLIGHTS ACCORDION */}
```

### Step 5 — Refine hero badge / CTA labels

Thêm badge nhỏ ở hero:

- Agent Sales Kit
- B2B NET
- Operated by Vietnam DMC

Chỉnh CTA label nếu cần:

- `Xem giá NET & tạo báo giá B2B`
- `ขอใบเสนอราคา B2B / คำนวณราคา NET`
- `Copy LINE Quote`

### Step 6 — Add pricing B2B note

Trong `section id="pricing-terminal"`, thêm callout dưới paragraph travel period.

Style:

- light green background
- border green
- icon check/shield/user-check
- text concise

### Step 7 — Adjust form button wording

Kiểm tra phần reservation/contact form cuối trang.

Đổi wording sang:

- VI: `Gửi yêu cầu báo giá B2B`
- TH: `ขอใบเสนอราคา B2B`
- EN: `Request B2B Quotation`

### Step 8 — Test visual + content

Run local build/dev check:

- `npm run build` hoặc command hiện có của project
- mở landing local/live
- check 3 ngôn ngữ VI / TH / EN
- check mobile width
- check links: LINE, PDF, pricing anchor

---

## 10. Acceptance criteria

Sau khi sửa, mục 2.2 trong audit có thể đổi từ ⚠️ sang ✅ nếu đạt:

### Fix mục 3 — DMC positioning

- [ ] Trong 10 giây đầu, người xem thấy Green Sea Tour là Vietnam DMC / inbound operator.
- [ ] Có câu rõ dành cho Thai travel agencies / บริษัททัวร์ไทย.
- [ ] Có proof/capability: local operation, Thai market support, LINE response, flexible handling.
- [ ] Không cần mở footer mới biết công ty là ai.

### Fix mục 4 — B2B vs B2C

- [ ] Hero hoặc block đầu có badge/sentence cho biết đây là B2B/Agent Sales Kit.
- [ ] CTA dùng Request B2B Quotation / LINE, không dùng Book Now.
- [ ] Pricing section có note rằng đây là B2B NET for agencies.
- [ ] Form là inquiry/quotation form, không phải retail booking form.
- [ ] Visual không có flash sale / countdown / discount retail style.

---

## 11. Risks / things to avoid

- Không làm trang quá dài trước khi vào nội dung tour.
- Không đưa số liệu partner/experience nếu chưa có dữ liệu thật.
- Không dùng testimonial giả.
- Không nói `Thai-speaking team` nếu thực tế chỉ có guide tiếng Thái theo tour; cần dùng wording chính xác.
- Không ẩn bảng NET ở giai đoạn này nếu Anh Đạt đang muốn test product/agent sales kit.
- Không biến block DMC thành corporate brochure quá chung chung.

---

## 12. Recommended V1 scope

V1 nên làm vừa đủ:

1. Hero badge B2B/DMC.
2. Block `Operated by Green Sea Tour — Vietnam Inbound DMC`.
3. Block `B2B Agent Sales Kit`.
4. Pricing B2B note.
5. CTA/form wording B2B.

Chưa làm trong V1:

- Public/Agent view split.
- CRM integration thật.
- Partner logos/testimonials.
- Trang Thai B2B tổng.

---

## 13. Final proposed outcome

Sau V1, trang FITDAD01 phải tạo cảm giác:

> Đây là một chương trình cụ thể có thể gửi cho đối tác Thái, do Green Sea Tour — Vietnam DMC vận hành, có giá NET B2B, có hỗ trợ LINE, có thể dùng để xin báo giá và chốt đoàn; không phải trang bán tour lẻ B2C.
