# QUY TẮC CHÍ MẠNG (SURGICAL CODING RULE)

> **"Tách module riêng biệt, chỉ sửa đúng file liên quan, không viết dồn vào 1 file."**

---

### 1. NGUYÊN TẮC BẤT BIẾN:
- **THÊM MỚI**: Tạo file Module/Component riêng biệt trong `src/components/landing/` (hoặc thư mục tương ứng), rồi mới `import` vào giao diện chính.
- **SỬA LỖI**: Xác định chính xác 1 file liên quan đến lỗi để sửa (phẫu thuật đúng chỗ đau). Tuyệt đối không viết lại, không gom gộp, không làm thay đổi logic các file khác.
- **FILE CHÍNH (Orchestrator)**: Chỉ đóng vai trò điều phối state và gắn kết các module (~300 dòng), cấm viết code UI tràn lan vào file chính.

### 2. THỦ TỤC TRƯỚC KHI THỰC HIỆN:
Trước khi chỉnh sửa bất kỳ dòng code nào, AI bắt buộc phải thông báo rõ ràng cho người dùng:
1. **File sẽ chỉnh sửa / tạo mới:** (Đường dẫn chính xác)
2. **Mức độ ảnh hưởng:** (Có ảnh hưởng chéo đến file nào khác không? Cam kết độc lập)

---

### 3. QUY CHUẨN LOGO ĐỐI TÁC THÁI LAN (THAI OUTBOUND TRAVEL PARTNERS):
- **Định dạng file:** PNG nền trong suốt (`.png`), lưu tại `public/images/partners/<ten_doi_tac>.png`.
- **Xử lý ảnh gốc (Trim Whitespace):** Phải cắt sạch 100% khoảng trắng vô hình xung quanh mép logo (padding viền $\le$ 4px) để biểu tượng và chữ hiển thị to rõ tối đa.
- **Kích thước hiển thị CSS trong thẻ:**
  - `height: 48px` (Cố định chiều cao đồng bộ trục ngang).
  - `maxWidth: 130px` (Giới hạn bề ngang, chống tràn thẻ).
  - `objectFit: contain` (Giữ nguyên tỉ lệ gốc của logo, chống méo hình).
  - `display: block`
- **Quy cách Thẻ đối tác (Partner Card):**
  - `padding: 0.85rem 1.45rem`, `borderRadius: 16px`, `minHeight: 64px`.
  - Tên đối tác: `fontWeight: 800`, `fontSize: 0.85rem`, `color: #1e293b`.
- **Tốc độ Marquee:** `65s linear infinite`, tự động `paused` khi hover.

