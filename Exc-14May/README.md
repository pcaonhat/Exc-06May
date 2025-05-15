# Hệ thống quản lý Task
Hệ thống quản lý các task bao gồm quản lý task, người dùng và project.

Giao diện chính được thực hiện trên console và file chính là `index.ts`. Chạy file trên bằng lệnh
```ts
npm install tsx //Nếu chưa có thư viện
npx tsx index.ts
```
---
## Các chức năng chính trong hệ thống

### Quản lý Task
- Hiển thị danh sách task
- Thêm task mới
- Xoá task
- Thêm người phụ trách task
- Xóa người phụ trách task
- Cập nhật trạng thái cho task
- Hiển thị danh sách task chưa hoàn thành
- Hiển thị danh sách task đã hoàn thành
- Tìm kiếm task theo tên

### Quản lý Người dùng
- Hiển thị danh sách người dùng
- Thêm người dùng mới
- Xoá người dùng
- Tìm kiếm người dùng theo tên

### Quản lý Project
- Hiển thị danh sách project
- Thêm project mới
- Xóa project
- Thêm task vào project
- Xóa task khỏi project
- Tìm kiếm project theo tên

---
## Cấu trúc thư mục
- **Classes**: Chứa các đối tượng model mà ứng dụng quản lý và singleton ReadLineManager để đọc dữ liệu từ màn hình console
- **Data**: Chứa các file json để lưu trữ dữ liệu
- **Decorator**: Chứa các decorator
- **UI**: Chứa script hiển thị và xử lý giao diện
- **ultils**: Chứa các hàm tiện ích xử lý với danh sách và format dữ liệu


