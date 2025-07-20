Dựa trên product backlog, đây là danh sách các nhóm chức năng lớn và màn hình cần có cho app:

## **NHÓM CHỨC NĂNG CHÍNH**

### **1. Authentication & User Management (Xác thực & Quản lý người dùng)**
- **Màn hình đăng ký/đăng nhập**
  - Đăng ký bằng email/password
  - Đăng nhập với Google/Facebook
  - Quên mật khẩu
- **Màn hình hồ sơ cá nhân**
  - Chỉnh sửa thông tin
  - Ảnh đại diện
  - Thống kê cá nhân

### **2. Waste Reporting Core (Báo cáo rác thải cốt lõi)**
- **Màn hình báo cáo chính**
  - Tích hợp bản đồ định vị
  - Camera/chọn ảnh từ thư viện
  - Form mô tả và phân loại rác
- **Màn hình lịch sử báo cáo**
  - Danh sách báo cáo đã gửi
  - Trạng thái xử lý
  - Chi tiết từng báo cáo

### **3. Gamification & Rewards (Trò chơi hóa & Phần thưởng)**
- **Màn hình điểm thưởng**
  - Tổng điểm, cấp độ, huy hiệu
  - Lịch sử tích điểm
- **Màn hình thử thách**
  - Các nhiệm vụ "dọn dẹp"
  - Upload ảnh trước-sau
- **Màn hình bảng xếp hạng**
  - Xếp hạng tuần/tháng
  - So sánh với bạn bè
- **Màn hình cửa hàng đổi thưởng**
  - Danh sách phần thưởng
  - Đổi điểm lấy voucher/cây xanh

### **4. Community & Education (Cộng đồng & Giáo dục)**
- **Màn hình chatbot**
  - Hỏi đáp về phân loại rác
  - Tìm điểm thu gom gần nhất
- **Màn hình diễn đàn**
  - Đăng bài trao đổi
  - Tặng đồ cũ
- **Màn hình sự kiện**
  - Tạo/tham gia sự kiện dọn rác
  - Mời bạn bè

### **5. Map & Discovery (Bản đồ & Khám phá)**
- **Màn hình bản đồ tổng quan**
  - Hiển thị các điểm rác đã báo cáo
  - Bộ lọc theo loại rác/trạng thái
  - Điểm thu gom/tái chế

### **6. Settings & Support (Cài đặt & Hỗ trợ)**
- **Màn hình cài đặt**
  - Thông báo
  - Ngôn ngữ
  - Quyền riêng tư
- **Màn hình trợ giúp**
  - FAQ
  - Hướng dẫn sử dụng
  - Liên hệ hỗ trợ

## **CẤU TRÚC NAVIGATION**

### **Bottom Tab Navigation:**
1. **Home** - Màn hình chính/dashboard
2. **Report** - Báo cáo rác thải
3. **Map** - Bản đồ
4. **Community** - Cộng đồng/diễn đàn
5. **Profile** - Hồ sơ cá nhân

### **Secondary Screens:**
- Rewards & Challenges (từ Profile)
- Chatbot (từ Community)
- Events (từ Community)
- Settings (từ Profile)
- Help & Support (từ Settings)

## **ADMIN WEB PORTAL**

### **Dashboard quản trị:**
- **Login page** - Đăng nhập admin
- **Reports management** - Quản lý báo cáo
- **Analytics dashboard** - Thống kê phân tích
- **Route optimization** - Tối ưu lộ trình thu gom
- **User management** - Quản lý người dùng
- **System settings** - Cài đặt hệ thống

Cấu trúc này đảm bảo trải nghiệm người dùng mượt mà từ MVP đến các tính năng nâng cao, với khả năng mở rộng theo từng giai đoạn phát triển.