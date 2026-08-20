# Thai B2B Landing Page — Audit & Blueprint

**Project:** Greensea Tour website  
**Checked URL:** `https://greenseatour.vn/?tour=fitdad01&mode=landing#pricing-terminal`  
**Recommended public URL for first-time partners:** `https://greenseatour.vn/?tour=fitdad01&mode=landing`  
**Date:** 2026-08-20  
**Purpose:** Ghi lại phần đã kiểm tra landing page hiện tại và hướng đề xuất cho landing page B2B dành cho đối tác Thái Lan.

---

## 0. Scope clarification — confirmed by Anh Đạt

Anh Đạt xác nhận trang đang kiểm tra **không phải landing page B2B tổng**.

Trang này là **lớp thứ 2: product landing / agent sales kit cho 1 sản phẩm cụ thể — FITDAD01**. Trang B2B tổng cho Green Sea Tour / Vietnam DMC chưa làm.

Vì vậy, tài liệu này cần đọc theo 2 phần:

1. **Audit & improvement cho product landing FITDAD01** — đây là phạm vi ưu tiên hiện tại.
2. **Blueprint cho landing tổng Thai B2B DMC** — chỉ là định hướng sau này, chưa phải việc đang triển khai ngay.

Mục tiêu hiện tại của Anh Đạt: làm tốt trang product landing lớp 2 trước để rút kinh nghiệm về phong cách, bố cục, ngôn ngữ Thái, CTA, pricing, LINE và lead flow; sau đó mới mở rộng thành landing tổng.

**Language default note:** hiện tại trang đang để mặc định tiếng Việt là có chủ đích để Anh Đạt test nội dung/bố cục trước. Khi live hoặc gửi cho đối tác Thái, default sẽ đổi sang tiếng Thái. Vì vậy audit không coi việc default tiếng Việt ở giai đoạn test là lỗi production; chỉ ghi là launch requirement cho bản live.

---

## 1. Kết luận nhanh

Trang hiện tại **đúng scope nếu xem là product landing / agent sales kit cho FITDAD01**. Đây là hướng nên ưu tiên chỉnh trước.

Nếu so với **Landing Page B2B DMC tổng dành cho công ty tour Thái**, trang hiện tại chưa cần gánh hết vai trò đó. Nó đang mạnh ở phần bán một chương trình cụ thể:

- Da Nang – Ba Na Hills – Hoi An
- có lịch trình
- có bảng NET
- có PDF B2B
- có LINE / WhatsApp
- có form yêu cầu báo giá

Điểm còn thiếu là lớp định vị lớn hơn:

> Green Sea Tour là Vietnam DMC / inbound operator đáng tin choบริษัททัวร์ไทย, có năng lực vận hành tại Việt Nam, hiểu khách Thái, phản hồi nhanh và dễ hợp tác.

---

## 2. Những điểm đã kiểm tra trên trang hiện tại

### 2.1 URL / điều hướng

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Trang live mở được | ✅ | URL trả về HTTP 200. |
| URL có `#pricing-terminal` | ⚠️ | Link anh gửi nhảy thẳng xuống bảng giá, không phải hero. Không nên dùng cho partner mới lần đầu. |
| URL không hash | ✅ khuyên dùng | `https://greenseatour.vn/?tour=fitdad01&mode=landing` phù hợp hơn khi gửi lần đầu. |

### 2.2 Định vị B2B

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Có nhắc DMC inbound Việt Nam cho thị trường Thái | ✅ | Header có định vị đúng hướng. |
| Có nhắc B2B / Agent / NET | ✅ | Có “B2B”, “NET”, “đại lý”. |
| Có định vị tổng thể Green Sea Tour là DMC cho công ty tour Thái | ⚠️ | Có nhưng chưa đủ mạnh, chưa thành hero/section riêng. |
| Có phân biệt rõ B2B vs B2C | ⚠️ | Nội dung đang nghiêng về product tour + giá, chưa đủ thông điệp “partner/DMC”. |

### 2.3 CTA / liên hệ

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| LINE Official | ✅ | Có CTA LINE, link mở được. |
| WhatsApp / hotline | ✅ | Có link WhatsApp/hotline. |
| Email | ✅ | Có email sale. |
| CTA “Request B2B Quotation” | ⚠️ | Có hướng báo giá, nhưng nên đổi ngôn ngữ mạnh hơn theo kiểu B2B Thái: `ขอใบเสนอราคา B2B`, `ส่งรายละเอียดกรุ๊ป`, `ติดต่อผ่าน LINE`. |
| LINE là CTA chính | ⚠️ | Có LINE nhưng cần ưu tiên visual/hierarchy cao hơn form/email. |

### 2.4 Pricing / bảo vệ giá

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Có bảng giá NET | ✅ | Tốt cho agent view / sales kit. |
| Có calculator / mô phỏng báo giá | ✅ | Hữu ích cho đại lý và sales. |
| Bảo vệ pricing public | ❌ | Public landing không nên show full NET mặc định. |
| Câu bảo vệ giá cần dùng | ✅ đề xuất | `สำหรับบริษัททัวร์ ราคาพิเศษ กรุณาติดต่อทีมงาน` |

**Decision:**

- Public B2B Landing: không show hết bảng NET.
- Partner / Agent View: được show NET, calculator, PDF, terms chi tiết.

### 2.5 Nội dung sản phẩm

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Có lịch trình chi tiết | ✅ | Rất tốt cho product landing. |
| Có hình ảnh điểm đến | ✅ | Có gallery/hình thực tế. |
| Có PDF B2B | ✅ | Link PDF mở được. |
| Có sample program | ✅ một phần | FITDAD01 là một sample mạnh, nhưng landing tổng cần nhiều nhóm sản phẩm. |
| Có product families toàn Việt Nam | ❌ | Cần thêm Central / North / South / Phu Quoc / MICE / Golf / Luxury. |

### 2.6 Nội dung “Why Partner With Us”

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Thai Market Expertise | ❌/⚠️ | Có ngầm trong nội dung, nhưng chưa có section rõ. |
| Fast Response | ❌ | Chưa thấy thành cam kết rõ. |
| Competitive B2B Rate | ⚠️ | Có NET nhưng nên diễn đạt B2B partner hơn. |
| Local Vietnam Operation | ⚠️ | Có địa chỉ/operation nhưng chưa đóng thành USP. |
| Flexible Itinerary | ❌/⚠️ | Cần nói rõ khả năng tùy chỉnh chương trình cho đại lý. |
| One-stop Service | ❌/⚠️ | Cần section riêng về hotel, car, guide, restaurant, ticket, MICE, golf… |

### 2.7 Nội dung “We Understand Thai Customers”

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Thai-speaking support | ✅/⚠️ | Có HDV tiếng Thái, nhưng cần nâng thành USP công ty. |
| Thai-language itinerary | ✅ | Trang có tiếng Thái. |
| Fast communication via LINE | ✅/⚠️ | Có LINE, nhưng cần nói rõ LINE là workflow chính. |
| Thai food / meal preferences | ⚠️ | Có menu nhưng chưa đóng thành insight về khách Thái. |
| Hotels suitable for Thai groups | ⚠️ | Có hotel trong tour, nhưng chưa thành capability. |
| Shopping arrangements | ⚠️ | Có Chợ Hàn trong lịch trình, nhưng chưa thành USP. |
| Halal / Muslim-friendly | Chưa xác minh | Chỉ đưa nếu công ty thật sự cung cấp được. Không bịa. |
| Thai staff / Thai-speaking team | Chưa xác minh | Nếu có đội nói tiếng Thái thật, nên đưa rất rõ. |

### 2.8 Form B2B

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Có form gửi yêu cầu | ✅ | Có form đại lý. |
| Form đúng kiểu B2B lead qualification | ⚠️ | Nên bổ sung/chuẩn hóa field cho CRM. |
| Không bắt điền quá nhiều | ✅/⚠️ | Form hiện không quá nặng, nhưng cần tối ưu theo B2B. |

Field nên có:

- Company Name
- Contact Person
- LINE ID / LINE OA
- Email
- Country
- Travel Date
- Number of Travelers
- Travel Type: FIT / GIT / MICE / Golf
- Destination
- Message

Nút nên dùng:

- `Request B2B Quotation`
- `ขอใบเสนอราคา B2B`
- `Request B2B Rate`

### 2.9 Partner Trust / Testimonials

| Hạng mục | Trạng thái | Ghi chú |
|---|---:|---|
| Partner logos | Chưa có / chưa xác minh | Chỉ dùng nếu được phép. |
| Real company numbers | Chưa có / chưa xác minh | Chỉ dùng số thật. |
| B2B testimonials | Chưa có / chưa xác minh | Không dùng review B2C kiểu “Amazing trip”. |

Nếu chưa có dữ liệu thật, nên dùng block thay thế:

- Why agencies work with us
- Trusted local operation in Vietnam
- Partner feedback coming soon

Tuyệt đối không bịa số liệu/testimonial/logo.

---

## 3. Đề xuất kiến trúc trang

### 3.1 Hai lớp landing — nhưng ưu tiên hiện tại là lớp 2

#### Lớp 1 — Thai B2B DMC Landing tổng

Trạng thái: **chưa làm**.

URL có thể dùng sau này:

- `/thai-b2b`
- hoặc `/?page=thai-b2b`

Mục tiêu sau này:

- lấy lead đối tác Thái
- giới thiệu Green Sea Tour như một Vietnam DMC
- ưu tiên LINE + request quotation
- không show public full NET

#### Lớp 2 — Product Landing / Agent Sales Kit

Trạng thái: **đang làm trước**. Đây là scope chính hiện tại.

URL hiện tại:

- `/?tour=fitdad01&mode=landing`

Mục tiêu:

- trình bày 1 chương trình cụ thể
- dùng làm sales kit cho sale / agent / partner
- rút kinh nghiệm phong cách thiết kế B2B Thái trước khi nhân rộng
- kiểm tra cách dùng tiếng Thái, CTA LINE, form, PDF, bảng NET, calculator và flow lead
- có thể show lịch trình, hình, PDF, NET, calculator nếu đây là link partner/agent hoặc sales gửi có chủ đích

---

## 4. Blueprint Thai B2B Landing tổng

```text
HERO
│
├── Vietnam DMC for Thai Travel Partners
├── CTA: ขอราคา B2B
├── CTA phụ: ติดต่อผ่าน LINE
│
▼
TRUST / COMPANY
│
├── Who We Are
├── Experience
├── Licenses / Certifications nếu có thật
│
▼
WHY PARTNER WITH US
│
├── Thai Market Expertise
├── Fast Response
├── Competitive B2B Rate
├── Local Vietnam Operation
├── Flexible Itinerary
└── One-stop Service
│
▼
OUR SERVICES
│
├── FIT
├── GIT
├── MICE
├── Golf
├── Airport Services
├── Hotel
├── Transportation
├── Restaurant
├── Guide
└── Attraction Tickets
│
▼
DESTINATIONS
│
├── Central Vietnam
├── Northern Vietnam
├── Southern Vietnam
├── Phu Quoc
├── Luxury Vietnam
└── MICE / Golf
│
▼
B2B SAMPLE PROGRAMS
│
├── 4D3N
├── 5D4N
├── 6D5N
└── Custom Programs
│
▼
WHY THAI CUSTOMERS LOVE VIETNAM
│
├── Food
├── Shopping
├── Culture
├── Family
├── Nature
└── Value for Money
│
▼
PARTNER / TESTIMONIAL
│
├── Real partner proof only
└── No fake logos / fake numbers
│
▼
HOW TO WORK WITH US
│
1. Send Inquiry
2. Get Quotation
3. Adjust Itinerary
4. Confirm Booking
5. We Operate in Vietnam
6. Settlement
│
▼
GET B2B RATE FORM
│
├── Destination
├── Travel Type
├── Pax
├── Travel Date
├── Company
├── Contact
├── LINE ID
└── Message
│
▼
CONTACT
│
├── LINE Official
├── WhatsApp
└── Email
│
▼
FOOTER
```

---

## 5. Hero section đề xuất

### English

**Vietnam DMC for Thai Travel Partners**  
Your trusted local partner in Vietnam for FIT, GIT, MICE and private groups.

**CTA:** Request B2B Quotation  
**CTA phụ:** Contact via LINE

### Thai draft

**พันธมิตรท่องเที่ยวเวียดนามสำหรับบริษัททัวร์ไทย**  
ดูแลครบตั้งแต่รับสนามบิน โรงแรม รถ ร้านอาหาร ไกด์ โปรแกรมทัวร์ และบริการสำหรับกรุ๊ป FIT / GIT / MICE

**CTA:** ขอใบเสนอราคา B2B  
**CTA phụ:** ติดต่อทีมงานผ่าน LINE

Service strip bên dưới:

```text
Hotels · Transportation · Restaurants · Tours · MICE · Golf · Visa · Airport Services
```

---

## 6. Pricing rule

Public B2B landing không nên public toàn bộ NET.

Dùng copy:

```text
สำหรับบริษัททัวร์ ราคาพิเศษ กรุณาติดต่อทีมงาน
```

Ý nghĩa:

- có sản phẩm
- có giá B2B
- nhưng bảo vệ pricing public
- đẩy hành vi về LINE / inquiry / CRM

Agent view mới show:

- NET grid
- calculator
- PDF sales kit
- payment/cancellation terms

---

## 7. CRM lead flow

Landing Page không nên là website độc lập. Nên là cổng lấy lead B2B.

```text
Thai Travel Agency
 │
 ▼
Thai B2B Landing Page
 │
 ├── LINE Official
 ├── B2B Form
 └── Email / WhatsApp
 │
 ▼
CRM
 │
 ├── Company
 ├── Contact
 ├── LINE ID
 ├── Country
 ├── Destination
 ├── Travel Date
 ├── Pax
 ├── FIT / GIT / MICE / Golf
 ├── Budget nếu có
 └── Request Note
 │
 ▼
Sales
 │
 ▼
Quotation
 │
 ▼
Booking
 │
 ▼
Operation
 │
 ▼
Settlement
```

### Suggested CRM payload

```json
{
  "source": "thai_b2b_landing",
  "company_name": "",
  "contact_person": "",
  "line_id": "",
  "email": "",
  "country": "Thailand",
  "destination": "",
  "travel_type": "FIT|GIT|MICE|Golf",
  "travel_date": "",
  "pax_band": "1-5|6-15|16-30|31+",
  "budget": "",
  "request_note": ""
}
```

---

## 8. Get B2B Rate module

Thay vì chỉ “Contact Us”, tạo module lead qualification:

### Fields

- Destination
  - Da Nang
  - Hoi An
  - Hanoi
  - Halong
  - Ho Chi Minh
  - Phu Quoc
  - Custom
- Travel Type
  - FIT
  - GIT
  - MICE
  - Golf
- Pax
  - 1–5
  - 6–15
  - 16–30
  - 31+
- Travel Date
- Company Name
- Contact Person
- LINE ID
- Message

### Button

```text
Request B2B Rate
ขอใบเสนอราคา B2B
```

### Success message

```text
Thank you. Our Vietnam DMC team will contact you via LINE shortly.
ขอบคุณค่ะ ทีมงานเวียดนามจะติดต่อกลับผ่าน LINE โดยเร็วที่สุด
```

---

## 9. Design direction

Không dùng kiểu B2C:

- quá nhiều banner
- quá nhiều màu
- countdown
- flash sale
- `ลด 50%`
- `จองเลย`
- popup liên tục

Nên dùng hướng:

- Premium
- Corporate
- Local Expertise
- Deep Green
- Navy
- White
- Gold accent
- font tiếng Thái dễ đọc, tự nhiên

Thai là primary language. English secondary. Vietnamese chỉ dùng cho internal/admin nếu cần.

---

## 10. V1 implementation checklist

### Must-have

- [ ] Tạo trang `/thai-b2b` hoặc `?page=thai-b2b`.
- [ ] Hero định vị rõ: Vietnam DMC for Thai Travel Partners.
- [ ] CTA chính: LINE + `ขอใบเสนอราคา B2B`.
- [ ] Public pricing protection text: `สำหรับบริษัททัวร์ ราคาพิเศษ กรุณาติดต่อทีมงาน`.
- [ ] Section “Why Partner With Us”.
- [ ] Section “We Understand Thai Customers”.
- [ ] Section “Our B2B Services”.
- [ ] Section “Destinations”.
- [ ] Section “Sample B2B Programs”.
- [ ] Section “How To Work With Us”.
- [ ] Get B2B Rate form.
- [ ] LINE contact block cuối trang.

### Should-have

- [ ] CRM payload chuẩn cho lead.
- [ ] Source tracking: `source=thai_b2b_landing`.
- [ ] Partner/Agent view riêng cho full NET.
- [ ] Toggle hoặc route riêng để show NET/calculator cho partner.
- [ ] Thai-first copywriting, không dịch máy từ tiếng Anh.

### Do-not-do

- [ ] Không bịa số liệu kinh nghiệm, số lượng khách, số partner.
- [ ] Không bịa testimonial.
- [ ] Không dùng logo partner nếu chưa được phép.
- [ ] Không biến trang thành landing B2C bán tour.
- [ ] Không public full NET trên trang tổng nếu chưa có chủ đích.

---

## 11. 5 ưu tiên quan trọng nhất

1. **B2B positioning rõ ràng**
2. **Thai language tự nhiên**
3. **LINE + Request Quotation**
4. **Why Partner With Us**
5. **B2B services + sample programs**

Điều quan trọng nhất:

> Đừng làm landing page chỉ để khoe Việt Nam đẹp.  
> Hãy làm landing page để mộtบริษัททัวร์ไทย nhìn vào và nghĩ:  
> **บริษัทนี้น่าจะเป็น Partner ที่ทำงานด้วยง่าย และส่งลูกค้าให้ได้**

---

## 12. Recommended next step — revised after scope clarification

Không dựng landing tổng ngay.

Ưu tiên hiện tại: **hoàn thiện product landing FITDAD01 trước** để rút kinh nghiệm phong cách.

### Product landing FITDAD01 nên chỉnh trước

1. Giữ vai trò là trang lớp 2 / sales kit sản phẩm.
2. Giai đoạn test nội bộ có thể mặc định tiếng Việt để Anh Đạt kiểm nội dung/bố cục; khi live/gửi partner Thái thì đổi default sang tiếng Thái.
3. Hero phải nói rõ đây là chương trình cụ thể, nhưng vẫn có credibility của Green Sea Tour / Vietnam DMC.
4. CTA chính vẫn nên là LINE + `ขอใบเสนอราคา B2B` / `ส่งรายละเอียดกรุ๊ป`.
5. Bảng NET và calculator có thể giữ, vì đây là product/agent landing; nếu sau này public rộng thì thêm chế độ ẩn giá.
6. Thêm nhẹ các block mang tính B2B vào chính trang sản phẩm:
   - Why this program works for Thai travelers
   - Why book this program with Green Sea Tour
   - Thai-speaking support / LINE response
   - Suitable for FIT / family / small group / incentive nếu đúng
7. Test phong cách: premium, gọn, không quá B2C, không flash sale.

### Sau khi FITDAD01 ổn

1. Chuẩn hóa style/component.
2. Nhân ra các product landing khác.
3. Cuối cùng mới dựng Thai B2B DMC landing tổng `/thai-b2b`.
4. Kết nối form/LINE vào CRM khi flow sales đã rõ.
---

## 13. Detailed implementation plan for Option 2

Anh Đạt requested a detailed plan for **Option 2 — fix B2B positioning on the FITDAD01 product landing**.

Detailed plan file:

`docs/fitdad01-option-2-b2b-positioning-fix-plan-2026-08-20.md`

This plan covers:

- block `Operated by Green Sea Tour — Vietnam Inbound DMC`
- block `B2B Agent Sales Kit`
- hero badge / CTA refinement
- pricing B2B note
- form wording
- implementation steps
- acceptance criteria for changing audit rows 3 and 4 from ⚠️ to ✅

