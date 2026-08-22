# Đề xuất chỉnh ngôn từ UI Green Sea Tour

Ngày rà soát: 2026-08-21  
Phạm vi: trang Green Sea Tour FITDAD01 / B2B pricing / form yêu cầu báo giá  
Nguồn kiểm tra: site live `https://greenseatour.vn/?tour=fitdad01&mode=landing#pricing-terminal`, ảnh Anh Đạt gửi, và bundle frontend live `/assets/index-CW3JiWdY.js`.

---

## 1. Kết luận nhanh

Có khá nhiều cụm tiếng Việt đang nghe giống dịch máy hoặc thuật ngữ nội bộ của dev, nhất là các cụm liên quan đến:

- `drawer`, `engine`, `matrix`, `simulator`, `white-label`, `margin`.
- Tiêu đề viết hoa quá nhiều.
- Câu CTA dài và kỹ thuật.
- Cụm “đại lý / quý khách / khách lẻ” đang bị trộn, dễ làm người đọc không rõ đang nói với ai.

Nên chỉnh theo hướng: **ngắn hơn, rõ hơn, giống người tư vấn du lịch hơn, bớt thuật ngữ phần mềm**.

Ưu tiên sửa trước các cụm đang hiện trực tiếp với khách/đại lý:

1. `Đóng Ngăn Kéo`
2. `Mở ngăn kéo yêu cầu báo giá →`
3. `Biểu Phí NET Đại Lý & Hệ Thống Tính Toán Lợi Nhuận`
4. `Bộ Công Cụ Bán Hàng Đại Lý`
5. `Mô Phỏng Báo Giá & Biên Lợi Nhuận`
6. `Cài Đặt Thương Hiệu Đại Lý (White-Label)`
7. Các nút/form đang viết hoa toàn bộ.

---

## 2. Sửa ngay — lỗi rõ, dễ gây khó hiểu

| Vị trí / cụm hiện tại | Vấn đề | Đề xuất chính | Phương án khác |
|---|---|---|---|
| `Đóng Ngăn Kéo` | Dịch thẳng từ UI term `drawer`; người dùng bình thường không hiểu. | `Hoàn tất` | `Đóng`, `Đóng thông báo` |
| `Mở ngăn kéo yêu cầu báo giá →` | Rất technical, lộ thuật ngữ dev. | `Gửi yêu cầu báo giá →` | `Yêu cầu báo giá ngay →`, `Nhận báo giá B2B →` |
| `Biểu Phí NET Đại Lý & Hệ Thống Tính Toán Lợi Nhuận` | Nghe như dashboard nội bộ/kế toán; quá dài. | `Bảng giá NET dành cho đại lý` | `Bảng giá NET & gợi ý lợi nhuận`, `Bảng giá đại lý và gợi ý lợi nhuận` |
| `Bộ Công Cụ Bán Hàng Đại Lý` | Cứng, giống tên module phần mềm. | `Công cụ hỗ trợ bán tour cho đại lý` | `Bộ tài liệu bán tour cho đại lý` |
| `Trang bị bảng giá NET minh bạch...` | “Trang bị” nghe như mô tả sản phẩm SaaS; hơi máy móc. | `Đại lý có sẵn bảng giá NET theo nhóm 2–14 khách, PDF lịch trình song ngữ và poster báo giá để gửi khách nhanh.` | `Có bảng giá NET, PDF lịch trình và poster báo giá sẵn để đại lý gửi khách.` |
| `Xem biểu phí NET gốc ↓` | “Biểu phí” không tự nhiên trong tour; “gốc” hơi nội bộ. | `Xem bảng giá NET ↓` | `Xem giá NET B2B ↓` |
| `Công Cụ Tính Giá Tour Theo Số Lượng Khách` | Viết hoa nhiều, nghe như tên hệ thống. | `Tính giá tour theo số khách` | `Bảng tính giá theo số khách` |
| `BẢNG GIÁ NET B2B & BỘ CÔNG CỤ BÁO GIÁ ĐẠI LÝ` | Quá dài, nhiều chữ in hoa. | `Bảng giá NET B2B và công cụ báo giá` | `Bảng giá NET dành cho đại lý` |
| `B2B Net Matrix & Profit Engine` | Bản EN cũng rất tech: matrix/engine. | `B2B Net Rates & Profit Guide` | `B2B Pricing & Quotation Tool` |
| `Mô Phỏng Báo Giá & Biên Lợi Nhuận` | “Mô phỏng”, “biên lợi nhuận” nghe tài chính/kỹ thuật. | `Tính giá bán và lợi nhuận dự kiến` | `Gợi ý giá bán cho đại lý` |
| `5. Mức lợi nhuận mong muốn (% Margin):` | Trộn tiếng Việt + tiếng Anh; hơi nội bộ. | `5. Lợi nhuận mong muốn:` | `5. Tỷ lệ lời mong muốn:` |
| `Đóng Ngăn Kéo` sau khi gửi form | Sai ngữ cảnh: người dùng vừa gửi yêu cầu thành công. | `Hoàn tất` | `Gửi yêu cầu khác` nếu muốn mở lại form |

---

## 3. Tin nhắn sau khi gửi yêu cầu

### Hiện tại

```text
Đã gửi yêu cầu thành công!
Bộ phận kinh doanh Green Sea Tour sẽ liên hệ lại quý đối tác ngay qua LINE / WhatsApp.
Đóng Ngăn Kéo
```

### Vấn đề

- Câu đầu ổn nhưng hơi máy.
- `Bộ phận kinh doanh... quý đối tác... ngay qua LINE / WhatsApp` hơi cứng.
- `Đóng Ngăn Kéo` cần bỏ ngay.

### Đề xuất

```text
Đã nhận yêu cầu của quý đối tác!
Green Sea Tour sẽ liên hệ lại qua LINE/WhatsApp trong thời gian sớm nhất.
Hoàn tất
```

Nếu muốn cam kết 15 phút:

```text
Đã nhận yêu cầu của quý đối tác!
Green Sea Tour sẽ liên hệ lại qua LINE/WhatsApp trong khoảng 15 phút.
Hoàn tất
```

---

## 4. CTA / nút bấm nên chỉnh

| Hiện tại | Đề xuất | Lý do |
|---|---|---|
| `Xem Báo Giá Tour Trọn Gói` | `Xem giá tour trọn gói` | Tự nhiên hơn, không cần viết hoa từng chữ. |
| `Xem Bảng Giá & Tính Báo Giá` | `Xem bảng giá và tính thử giá bán` | Rõ hành động hơn. |
| `Tải PDF B2B` | `Tải chương trình PDF` | Người ngoài không phải ai cũng hiểu B2B. Nếu chỉ đại lý xem thì có thể giữ `PDF B2B`. |
| `Sao chép báo giá` | Giữ được | Rõ, ngắn. |
| `ĐANG TẠO...` | `Đang tạo...` | Không nên viết hoa toàn bộ. |
| `XUẤT POSTER ẢNH` | `Xuất poster báo giá` | Tự nhiên hơn, đúng mục đích. |
| `GỬI YÊU CẦU TƯ VẤN` | `Gửi yêu cầu tư vấn` | Không cần all caps. |
| `GỬI YÊU CẦU BÁO GIÁ B2B` | `Gửi yêu cầu báo giá B2B` | Giữ B2B nếu đối tượng là đại lý. |
| `Tạo link White-Label riêng →` | `Tạo link gửi khách →` | “White-label” là thuật ngữ nội bộ, không nên hiện nếu không cần. |
| `Sao chép Link gửi khách` | `Sao chép link gửi khách` | Chỉ viết hoa đầu câu. |
| `Mở thử link` | Giữ được | Tự nhiên. |
| `Áp Dụng Ngay` | `Áp dụng ngay` | Không viết hoa từng chữ. |
| `✕ Xóa cài đặt đại lý (về mặc định)` | `Xóa thông tin đại lý` | Gọn hơn, tránh “về mặc định” nếu người dùng không cần biết logic hệ thống. |

---

## 5. Form yêu cầu báo giá

| Hiện tại | Đề xuất | Ghi chú |
|---|---|---|
| `Yêu Cầu Báo Giá & Đặt Đoàn B2B` | `Yêu cầu báo giá B2B` | Ngắn hơn; “đặt đoàn” có thể để trong bước sau. |
| `Họ và Tên Quý Khách` | `Họ và tên` | Nếu đây là form cho đại lý/khách tự điền. |
| `Tên Công Ty / Đại Lý` | `Tên công ty / đại lý` | Chỉ viết hoa đầu câu. |
| `Người liên hệ` | Giữ được | Rõ. |
| `Tên người liên hệ` | Giữ được | Rõ. |
| `Số điện thoại / LINE` | `Số điện thoại / LINE / WhatsApp` | Đồng bộ với đoạn liên hệ sau form. |
| `Ngày dự kiến khởi hành` | Giữ được | Rõ. |
| `Yêu cầu đặc biệt (Nâng cấp xe, phòng Family, ăn kiêng...)` | `Yêu cầu thêm (nâng cấp xe, phòng family, ăn kiêng...)` | Tự nhiên hơn, bớt trịnh trọng. |
| `Nhập ghi chú yêu cầu thêm nếu có...` | `Nhập ghi chú nếu có...` | Gọn. |
| `Phụ trách thị trường Thái Lan:` | `Phụ trách thị trường Thái Lan` | Bỏ dấu `:` nếu đứng như label/headline. |

Lưu ý: không nên trộn `quý khách`, `đại lý`, `khách lẻ` trong cùng một màn hình. Nếu màn này dành cho đại lý, nên dùng thống nhất `quý đối tác` hoặc `đại lý`. Nếu là link gửi khách cuối, dùng `khách hàng`.

---

## 6. Khu bảng giá / tính lợi nhuận

| Hiện tại | Đề xuất | Lý do |
|---|---|---|
| `Bảng Giá Tour Trọn Gói Theo Số Lượng Khách` | `Bảng giá tour trọn gói theo số khách` | Tự nhiên, bỏ viết hoa từng chữ. |
| `Biểu Phí NET Gốc Theo Đoàn` | `Bảng giá NET theo quy mô đoàn` | “Biểu phí” và “gốc” nghe cứng. |
| `Quy định phụ thu & tùy chọn xe:` | `Phụ thu và tùy chọn xe` | Gọn hơn. |
| `Phụ thu phòng đơn (Single Supplement):` | `Phụ thu phòng đơn` | Nếu đang ở bản tiếng Việt, không cần tiếng Anh. |
| `Limousine VIP 7–9 chỗ (+89$/trọn tour):` | `Nâng cấp Limousine VIP 7–9 chỗ: +89 USD/tour` | Dễ đọc hơn. |
| `Limousine VIP 14–15 chỗ (+168$/trọn tour):` | `Nâng cấp Limousine VIP 14–15 chỗ: +168 USD/tour` | Dễ đọc hơn. |
| `Tùy Chỉnh Lựa Chọn Cho Đoàn Của Bạn` | `Tùy chỉnh dịch vụ cho đoàn` | Bớt máy móc. |
| `1. Chọn nhóm & số khách đoàn:` | `1. Chọn số khách:` | Gọn hơn. |
| `2. Phòng đơn (+70$):` | `2. Số phòng đơn:` | Rõ thao tác hơn. |
| `3. Nâng cấp Limousine:` | Giữ được | Rõ. |
| `Xe tiêu chuẩn theo đoàn` | `Xe tiêu chuẩn đã bao gồm` | Rõ hơn. |
| `Đi vào giai đoạn Lễ...` | `Khởi hành giai đoạn lễ...` | Tự nhiên hơn. |
| `4. Tỷ giá quy đổi (USD ➔ THB):` | `4. Tỷ giá USD/THB:` | Gọn. |
| `Nhập tỷ giá USD / THB` | `Nhập tỷ giá USD/THB` | Gọn. |
| `Tổng tiền NET trả Green Sea:` | `Tổng NET trả Green Sea:` | Gọn hơn. |
| `Giá BÁN đề xuất khách lẻ:` | `Giá bán đề xuất/khách:` | Không viết hoa giữa câu, tránh “khách lẻ” nếu đang là đoàn. |
| `💰 LỢI NHUẬN ĐẠI LÝ THU VỀ:` | `Lợi nhuận dự kiến của đại lý:` | Tự nhiên hơn, bớt quảng cáo. |

---

## 7. Tiêu đề / headline đang quá “AI marketing”

Một số tiêu đề không sai nghĩa nhưng hơi phô, nhiều chữ hoa và nghe giống landing page AI:

| Hiện tại | Đề xuất mềm hơn |
|---|---|
| `Hệ Sinh Thái B2B DMC Việt Nam • Chuẩn Đối Tác Thái Lan` | `DMC Việt Nam dành cho đối tác Thái Lan` |
| `3 Trụ Cột Năng Lực Vận Hành & Công Cụ Bán Hàng` | `3 điểm mạnh khi hợp tác với Green Sea Tour` |
| `Vận Hành Trực Tiếp Tại Việt Nam` | `Điều hành trực tiếp tại Việt Nam` |
| `Báo Giá Nhanh & Đội Ngũ Riêng` | `Báo giá nhanh, có đội ngũ hỗ trợ riêng` |
| `Đặc Quyền "Golden Hours" Bình Minh Cầu Vàng` | `Trải nghiệm Cầu Vàng lúc sáng sớm` |
| `Khám Phá 7 Trải Nghiệm Độc Quyền Trong Hành Trình` | `7 trải nghiệm nổi bật trong hành trình` |
| `Lịch Trình Độc Quyền & Trải Nghiệm Ẩm Thực` | `Lịch trình và trải nghiệm ẩm thực` |
| `Hoạt động & Lịch trình chi tiết trong ngày:` | `Lịch trình trong ngày:` |
| `Đại Tiệc Buffet Hải Sản & Tôm Hùm` | `Buffet hải sản và tôm hùm` |
| `DMC Inbound Land Tour Việt Nam` | `DMC land tour tại Việt Nam` |
| `Đơn vị cung cấp tour du lịch chất lượng cao...` | `Green Sea Tour cung cấp land tour trọn gói tại Việt Nam, tập trung vào dịch vụ ổn định và hỗ trợ đại lý nhanh.` |

Không cần bỏ hết màu sắc marketing, nhưng nên giảm các chữ như `độc quyền`, `đặc quyền`, `đỉnh cao`, `thượng hạng` nếu không có bằng chứng rõ. Dùng quá nhiều sẽ làm trang giống AI viết.

---

## 8. Chính sách / điều khoản

| Hiện tại | Đề xuất |
|---|---|
| `ĐIỀU KHOẢN & DỊCH VỤ TOUR TRỌN GÓI` | `Dịch vụ bao gồm và điều khoản tour` |
| `ĐIỀU KHOẢN DỊCH VỤ & QUY ĐỊNH B2B` | `Điều khoản dịch vụ B2B` |
| `Giá Tour Bao Gồm (Inclusions)` | `Giá tour bao gồm` |
| `Giá Tour Không Bao Gồm (Exclusions)` | `Giá tour không bao gồm` |
| `Tiền Tip cho Hướng dẫn viên và Lái xe:` | `Tip cho hướng dẫn viên và lái xe:` |
| `Hủy trước 21 ngày: Không phạt phí (Miễn phí 100%).` | `Hủy trước 21 ngày: miễn phí hủy.` |
| `Hủy trong vòng 06 ngày trước ngày đi:` | `Hủy trong vòng 6 ngày trước ngày đi:` |

---

## 9. Quy tắc ngôn ngữ nên áp dụng cho toàn trang

1. **Không lộ thuật ngữ UI/dev**  
   Tránh: `ngăn kéo`, `engine`, `matrix`, `simulator`, `white-label`, `margin` nếu người dùng không cần biết.

2. **Không viết hoa từng chữ trong tiếng Việt**  
   Sai cảm giác: `Công Cụ Tính Giá Tour Theo Số Lượng Khách`.  
   Nên viết: `Công cụ tính giá tour theo số khách`.

3. **CTA phải nói đúng hành động người dùng muốn làm**  
   Ví dụ: `Gửi yêu cầu báo giá`, `Xem bảng giá`, `Tải chương trình PDF`, `Tạo link gửi khách`.

4. **Tách rõ 2 chế độ ngôn ngữ**
   - Màn cho đại lý: dùng `đại lý`, `quý đối tác`, `B2B`, `NET`.
   - Màn gửi cho khách cuối: dùng `khách hàng`, `giá tour`, `chương trình`, không lộ `NET`, `margin`, `lợi nhuận đại lý`.

5. **Bớt chữ quảng cáo quá đà**  
   Các cụm như `độc quyền`, `đặc quyền`, `thượng hạng`, `đỉnh cao` chỉ nên dùng khi thật sự cần. Nếu dùng dày quá, trang sẽ nghe giống AI/robot.

6. **Giữ tiếng Anh khi đó là thuật ngữ ngành thật sự cần**  
   Có thể giữ: `B2B`, `NET`, `FIT`, `GIT`, `DMC`, `LINE`, `WhatsApp`.  
   Nên Việt hóa hoặc ẩn: `drawer`, `engine`, `matrix`, `simulator`, `white-label`, `margin`.

---

## 10. Bộ câu thay thế khuyến nghị để dev sửa nhanh

```text
Đóng Ngăn Kéo
→ Hoàn tất

Mở ngăn kéo yêu cầu báo giá →
→ Gửi yêu cầu báo giá →

Biểu Phí NET Đại Lý & Hệ Thống Tính Toán Lợi Nhuận
→ Bảng giá NET dành cho đại lý

Bộ Công Cụ Bán Hàng Đại Lý
→ Công cụ hỗ trợ bán tour cho đại lý

Trang bị bảng giá NET minh bạch cho từng nhóm 2-14 khách, PDF lịch trình song ngữ và xuất poster báo giá 1 chạm.
→ Đại lý có sẵn bảng giá NET theo nhóm 2–14 khách, PDF lịch trình song ngữ và poster báo giá để gửi khách nhanh.

Xem biểu phí NET gốc ↓
→ Xem bảng giá NET ↓

Công Cụ Tính Giá Tour Theo Số Lượng Khách
→ Tính giá tour theo số khách

BẢNG GIÁ NET B2B & BỘ CÔNG CỤ BÁO GIÁ ĐẠI LÝ
→ Bảng giá NET B2B và công cụ báo giá

Mô Phỏng Báo Giá & Biên Lợi Nhuận
→ Tính giá bán và lợi nhuận dự kiến

5. Mức lợi nhuận mong muốn (% Margin):
→ 5. Lợi nhuận mong muốn:

Cài Đặt Thương Hiệu Đại Lý (White-Label)
→ Tạo link gửi khách theo thông tin đại lý

Tùy chỉnh thông tin để gửi link hoặc xuất poster cho khách lẻ
→ Nhập thông tin đại lý để tạo link hoặc poster gửi khách

🔒 Ẩn Cột Giá Gốc (Hide B2B Net Rates)
→ Ẩn giá NET khi gửi khách

Chỉ hiển thị giá bán cuối cùng kèm mức lời Margin cho khách xem
→ Chỉ hiển thị giá bán cuối cùng cho khách

ĐƯỜNG LINK GỬI KHÁCH HÀNG (ĐÃ GẮN THƯƠNG HIỆU):
→ Link gửi khách:
```

---

## 11. Gợi ý sửa đoạn khu tính giá hoàn chỉnh

### Bản hiện tại có cảm giác kỹ thuật

```text
BẢNG GIÁ NET B2B & BỘ CÔNG CỤ BÁO GIÁ ĐẠI LÝ
Biểu Phí NET Đại Lý & Hệ Thống Tính Toán Lợi Nhuận
Áp dụng từ 01/04 - 30/12/2026 • Đã bao gồm khách sạn 4 sao, ăn uống trọn gói, xe VIP, HDV, cáp treo Bà Nà & toàn bộ vé tham quan
```

### Bản đề xuất

```text
Bảng giá NET B2B và công cụ báo giá
Bảng giá NET dành cho đại lý
Áp dụng cho giai đoạn 01/04–30/12/2026. Giá đã bao gồm khách sạn 4 sao, các bữa ăn trong chương trình, xe riêng, HDV, cáp treo Bà Nà và vé tham quan theo lịch trình.
```

Nếu muốn nhấn mạnh phần tính lời:

```text
Bảng giá NET và gợi ý giá bán cho đại lý
Chọn số khách, phụ thu và tỷ giá để xem giá bán đề xuất cùng lợi nhuận dự kiến.
```


---

## 12. Rà soát font chữ / typography

### Kết luận

Font chữ hiện tại **chưa nhất quán hoàn toàn**. Không phải lỗi nghiêm trọng, nhưng đang có dấu hiệu dùng quá nhiều font/fallback khác nhau giữa các khu:

- Trang chính / landing tiếng Việt: dùng `Be Vietnam Pro`, `Plus Jakarta Sans`, và nhiều heading dùng `Playfair Display`.
- Một số component khác / landing cũ / admin: dùng `Inter` hoặc `system-ui`.
- Bản tiếng Thái: dùng `Prompt`, `Sarabun`.
- PDF/text block tiếng Thái: có `Noto Sans Thai`, `Tahoma`, `Arial`, `monospace`.
- Khu editor/admin và textarea dùng `monospace`.
- Poster/canvas xuất ảnh dùng `system-ui` và `Playfair Display`.

Việc có font riêng cho tiếng Thái là hợp lý. Vấn đề chính là **bản tiếng Việt/English đang trộn nhiều font sans khác nhau** (`Be Vietnam Pro`, `Plus Jakarta Sans`, `Inter`, `system-ui`) cộng thêm `Playfair Display` cho headline, khiến cảm giác thương hiệu chưa gọn.

### Font đang import trên site live

```text
Be Vietnam Pro
Playfair Display
Plus Jakarta Sans
Prompt
Sarabun
```

Ngoài ra bundle/CSS còn có tham chiếu:

```text
Inter
Noto Sans Thai
Tahoma
Arial
system-ui
monospace
```

File kiểm tra chi tiết:

```text
artifacts/greensea-language-audit/font-audit-2026-08-21.md
```

### Đánh giá theo nhóm

| Nhóm | Hiện tại | Đánh giá | Đề xuất |
|---|---|---|---|
| Body tiếng Việt / English | `Be Vietnam Pro`, `Plus Jakarta Sans`, có chỗ `Inter/system-ui` | Hơi loạn; nhìn mỗi khu có thể khác nhau nhẹ. | Chọn **1 font body chính**. Đề xuất: `Be Vietnam Pro`. |
| Heading tiếng Việt / English | `Playfair Display` + `Plus Jakarta Sans` + đôi chỗ `Inter` | Có chất premium nhưng đang dùng hơi rộng. | Chỉ dùng `Playfair Display` cho hero/brand headline; còn section heading dùng `Be Vietnam Pro` hoặc `Plus Jakarta Sans`. |
| Tiếng Thái | `Prompt`, `Sarabun`, `Noto Sans Thai` | Hợp lý vì tiếng Thái cần font riêng. | Dùng `Prompt` cho UI, `Sarabun` fallback; `Noto Sans Thai` chỉ giữ cho PDF nếu cần. |
| Admin/editor | `Inter`, `monospace` | Chấp nhận được nếu admin không public. | Nếu muốn đồng bộ brand, đổi admin sang cùng body font; giữ `monospace` chỉ cho textarea/code. |
| Poster/canvas | `system-ui`, `Playfair Display` | Có thể lệch so với web khi xuất poster. | Đồng bộ canvas: body `Be Vietnam Pro`, headline `Playfair Display` hoặc `Be Vietnam Pro 900`. |

### Bộ font khuyến nghị

Phương án gọn và an toàn nhất:

```css
/* Vietnamese / English */
--font-body: 'Be Vietnam Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Be Vietnam Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Playfair Display', Georgia, serif;

/* Thai */
--font-thai: 'Prompt', 'Sarabun', 'Noto Sans Thai', Tahoma, sans-serif;

/* Technical/admin only */
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

Cách dùng:

- Toàn bộ body tiếng Việt/English: `--font-body`.
- Section title, card title, form label, button: `--font-heading`.
- `Playfair Display` chỉ dùng ở hero title, logo wordmark, hoặc 1–2 headline cần cảm giác premium. Không dùng cho quá nhiều heading nhỏ.
- Tiếng Thái: `--font-thai`.
- Admin textarea/code/link debug: `--font-mono`.

### Việc nên sửa trong code

1. **Bỏ `Inter` khỏi UI public** nếu không có lý do riêng. Hiện `Inter` còn nằm ở root CSS/admin/landing cũ; dễ làm UI public lệch font.
2. **Không trộn `Be Vietnam Pro` và `Plus Jakarta Sans` cho cùng một vai trò**. Nếu đã chọn `Be Vietnam Pro` làm body thì `Plus Jakarta Sans` chỉ nên bỏ hoặc dùng rất hạn chế.
3. **Giảm dùng `Playfair Display`** ở các heading nhỏ. Font serif này đẹp nhưng dùng nhiều sẽ làm giao diện hơi “poster” và thiếu nhất quán.
4. **Định nghĩa typography token ở một chỗ** thay vì inline `fontFamily` rải trong component.
5. **Poster/canvas xuất ảnh cần dùng cùng font brand** để ảnh tải xuống nhìn giống web.

### Quy tắc đề xuất cho dev

```text
Public UI tiếng Việt/English:
- Body: Be Vietnam Pro
- Heading: Be Vietnam Pro 700/800/900
- Display/hero đặc biệt: Playfair Display, dùng tiết chế

Public UI tiếng Thái:
- Prompt
- Fallback: Sarabun / Noto Sans Thai

Admin/editor:
- Có thể dùng Be Vietnam Pro cho đồng bộ
- Monospace chỉ dùng cho ô nhập cấu trúc, code, debug text
```

### Mức ưu tiên

- **Ưu tiên cao:** bỏ cụm font `Inter/system-ui` khỏi các màn public nếu đang hiện với khách/đại lý.
- **Ưu tiên trung bình:** gom `Be Vietnam Pro` / `Plus Jakarta Sans` về một font body chính.
- **Ưu tiên thấp:** admin/editor có thể xử lý sau nếu không ảnh hưởng khách.

---

## 13. Ghi chú kỹ thuật cho dev

Các chuỗi tiếng Việt này đang nằm trong bundle frontend live:

```text
/assets/index-CW3JiWdY.js
```

Em đã trích xuất danh sách chuỗi tiếng Việt ra file:

```text
artifacts/greensea-language-audit/vietnamese-strings.txt
```

Nếu có source repo gốc, nên sửa trong source React/component thay vì sửa trực tiếp bundle minified.

