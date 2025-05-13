import { libraryManagement } from './libraryManagement';
import { formatBook, formatUser, formatReceipt } from './ultils';
import { Book, User, Receipt } from './data/interfaces';

export async function handleMainMenu(choice: string): Promise<string> {
    switch (choice) {
        case '1': return 'book';
        case '2': return 'user';
        case '3': return 'receipt';
        case '4': return 'stats';
        case '0':
            console.log('Cảm ơn đã sử dụng hệ thống!');
            return 'exit';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'main';
    }
}

export async function handleBookMenu(choice: string, library: libraryManagement): Promise<string> {
    switch (choice) {
        case '1':
            console.log('\n=== DANH SÁCH SÁCH ===');
            library.getBookList().forEach(book => console.log(formatBook(book)));
            return 'book';
        case '2':
            console.log('\n=== THÊM SÁCH MỚI ===');
            console.log ('Nhập thông tin sách (Tên, Thể loại, Số lượng):');
            const bookInfo = await new Promise<string>(resolve => {
                process.stdin.once('data', data => resolve(data.toString().trim()));
            });
            const [title, genre, availableAmount] = bookInfo.split(',').map(item => item.trim());
            const id: number = library.getAvailableID(library.getBookList());
            const newBook: Book = {
                id: id,
                title: title,
                genre: genre,
                availableAmount: parseInt(availableAmount),
                isAvailable: parseInt(availableAmount) > 0
            };
            library.addBook(newBook);
            return 'book';
        case '3':
            console.log('\n=== XOÁ SÁCH ===');
            console.log ('Nhập ID sách cần xoá:');
            const bookIdToDelete = await new Promise<string>(resolve => {
                process.stdin.once('data', data => resolve(data.toString().trim()));
            }
            );
            const bookId = parseInt(bookIdToDelete);
            library.removeBook(bookId);
            return 'book';
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'book';
    }
}

export async function handleUserMenu(choice: string, library: libraryManagement): Promise<string> {
    switch (choice) {
        case '1':
            console.log('\n=== DANH SÁCH NGƯỜI DÙNG ===');
            library.getUserList().forEach(user => console.log(formatUser(user)));
            return 'user';
        case '2':
            console.log('\n=== THÊM NGƯỜI DÙNG MỚI ===');
            console.log ('Nhập thông tin người dùng (Tên, Địa chỉ):');
            const userInfo = await new Promise<string>(resolve => {
                process.stdin.once('data', data => resolve(data.toString().trim()));
            });
            const [name, address] = userInfo.split(',').map(item => item.trim());
            const id: number = library.getAvailableID(library.getUserList());
            const newUser: User = {
                id: id,
                name: name,
                address: address,
                borrowedBooks: []
            };
            library.addUser(newUser);
            return 'user';
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'user';
    }
}

export async function handleReceiptMenu(choice: string, library: libraryManagement): Promise<string> {
    switch (choice) {
        case '1':
            console.log('\n=== DANH SÁCH PHIẾU MƯỢN/TRẢ ===');
            library.getReceiptList().forEach(receipt => console.log(formatReceipt(receipt)));
            return 'receipt';
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'receipt';
    }
}

