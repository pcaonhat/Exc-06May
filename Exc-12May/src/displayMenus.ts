function displayMainMenu() {
    console.log('\n=== HỆ THỐNG QUẢN LÝ THƯ VIỆN ===');
    console.log('1. Quản lý sách');
    console.log('2. Quản lý người dùng');
    console.log('3. Quản lý phiếu mượn/trả');
    console.log('0. Thoát');
}

function displayBookMenu() {
    console.log('\n=== QUẢN LÝ SÁCH ===');
    console.log('1. Hiển thị danh sách sách');
    console.log('2. Thêm sách mới');
    console.log('3. Xoá sách');
    console.log('4. Tìm kiếm sách');
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

function displayReceiptMenu() {
    console.log('\n=== QUẢN LÝ PHIẾU MƯỢN/TRẢ ===');
    console.log('1. Hiển thị danh sách phiếu');
    console.log('2. Tạo phiếu mượn sách');
    console.log('3. Ghi nhận trả sách');
    console.log('4. Tìm kiếm phiếu theo id người mượn');
    console.log('5. Tìm kiếm phiếu theo id sách');
    console.log('0. Quay lại');
}

export function displayMenu(menuType: string) {
    switch (menuType) {
        case 'main': displayMainMenu(); break;
        case 'book': displayBookMenu(); break;
        case 'user': displayUserMenu(); break;
        case 'receipt': displayReceiptMenu(); break;
    }
}