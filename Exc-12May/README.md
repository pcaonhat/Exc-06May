# Hệ thống quản lý thư viện
Hệ thống quản lý các thành phần trong thư viện bao gồm sách, người dùng và phiếu mượn trả sách.

Dữ liệu được lưu trong file `/src/data`

Giao diện chính được thực hiện trên console và file chính là `index.ts`. Chạy file trên bằng lệnh
```ts
npm install tsx //Nếu chưa có thư viện
npx tsx index.ts
```
---
## Các chức năng chính trong hệ thống

Quản lý sách
- Hiển thị danh sách sách của thư viện
- Thêm sách mới
- Xoá sách
- Tìm kiếm sách theo tên

Quản lý người dùng
- Hiển thị danh sách thông tin người dùng trong hệ thống
- Thêm người dùng mới 
- Xoá người dùng
- Tìm người dùng theo tên

Quản lý phiếu mượn trả sách
- Hiển thị danh sách phiếu mượn trả sách
- Tạo phiếu mượn sách
- Ghi nhận trả sách
- Tìm kiếm phiếu mượn trả sách theo tên người dùng
- Tìm kiếm phiếu mượn trả sách theo tên sách.


