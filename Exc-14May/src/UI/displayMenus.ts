function displayMainMenu() {
    console.log('\n=== HỆ THỐNG QUẢN LÝ TASK===');
    console.log('1. Quản lý task');
    console.log('2. Quản lý người dùng');
    console.log('3. Quản lý project');
    console.log('0. Thoát');
}

function displaTaskMenu() {
    console.log('\n=== QUẢN LÝ TASK ===');
    console.log('1. Hiển thị danh sách task');
    console.log('2. Thêm task mới');
    console.log('3. Xoá task');
    console.log('4. Thêm người phụ trách task');
    console.log('5. Xóa người phụ trách task');
    console.log('6. Cập nhật trạng thái cho task');
    console.log('7. Hiển thị task chưa hoàn thành');
    console.log('8. Hiển thị task đã hoàn thành')
    console.log('9. Tìm kiếm task');
    console.log('0. Quay lại');
}

function displayUserMenu() {
    console.log('\n=== QUẢN LÝ NGƯỜI DÙNG ===');
    console.log('1. Hiển thị danh sách người dùng');
    console.log('2. Thêm người dùng mới');
    console.log('3. Xoá người dùng');
    console.log('4. Tìm kiếm người dùng');
    console.log('0. Quay lại');
}

function displayProjectMenu() {
    console.log('\n=== QUẢN LÝ PROJECT ===');
    console.log('1. Hiển thị danh sách project');
    console.log('2. Thêm project mới');
    console.log('3. Xóa project');
    console.log('4. Thêm task vào project ');
    console.log('5. Xóa task khỏi project');
    console.log('6. Tìm kiếm project');
    console.log('0. Quay lại');
}

export function displayMenu(menuType: string) {
    switch (menuType) {
        case 'main': displayMainMenu(); break;
        case 'task': displaTaskMenu(); break;
        case 'user': displayUserMenu(); break;
        case 'project': displayProjectMenu(); break;
    }
}