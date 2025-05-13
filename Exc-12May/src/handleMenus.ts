import { libraryManagement } from './libraryManagement';
import { formatBook, formatUser, formatReceipt } from './ultils';
import { Book, User, Receipt } from './interfaces';
import { ReadlineManager } from './readlineManager';
import { Readline } from 'readline/promises';


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
            const bookInfo: string = await ReadlineManager.question('> ');
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
            const bookIdToDelete: string = await ReadlineManager.question('> ');
            const bookId: number = parseInt(bookIdToDelete);
            library.removeBook(bookId);
            return 'book';

        case '4':
            console.log('\n=== TÌM KIẾM SÁCH ===');
            console.log ('Nhập tên sách cần tìm:');
            const bookTitleToSearch: string = await ReadlineManager.question('> ');
            const foundBooks: Book[] = library.getBookByName(bookTitleToSearch);
            if (foundBooks.length > 0) {
                console.log('Kết quả tìm kiếm:');
                foundBooks.forEach(book => console.log(formatBook(book)));
            } else {
                console.log('Không tìm thấy sách nào.');
            }
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

            const userInfo: string = await ReadlineManager.question('> ');
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

        case '3':
            console.log('\n=== XOÁ NGƯỜI DÙNG ===');
            console.log ('Nhập ID người dùng cần xoá:');
            const userIdToDelete: string = await ReadlineManager.question('> ');
            const userId: number = parseInt(userIdToDelete);
            library.removeUser(userId);
            return 'user'

        case '4':
            console.log('\n=== TÌM KIẾM NGƯỜI DÙNG ===');
            console.log ('Nhập tên người dùng cần tìm:');
            const userNameToSearch: string = await ReadlineManager.question('> ');
            const foundUsers: User[] = library.getUserByName(userNameToSearch);
            if (foundUsers.length > 0) {
                console.log('Kết quả tìm kiếm:');
                foundUsers.forEach(user => console.log(formatUser(user)));
            } else {
                console.log('Không tìm thấy người dùng nào.');
            }
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

        case '2':
            console.log('\n=== TẠO PHIẾU MƯỢN SÁCH ===');
            console.log ('Nhập thông tin phiếu mượn (Id người mượn, Id sách, Ngày mượn, Ngày trả):');
            const receiptInfo : string = await ReadlineManager.question('> ');
            const [userId, bookId, dateBorrow, dateReturn] = receiptInfo.split(',').map(item => item.trim());
            const receiptId: number = library.getReceiptList().length + 1;
            library.borrowBook(parseInt(userId), parseInt(bookId), dateBorrow, dateReturn);
            return 'receipt';

        case '3':
            console.log('\n=== GHI NHẬN TRẢ SÁCH ===');
            console.log ('Nhập thông tin trả sách (Id người mượn, Id sách):');
            const userIdAndBookID : string = await ReadlineManager.question('> ');
            const [userIdReceipt, bookIdReceipt] = userIdAndBookID.split(',').map(item => item.trim());
            library.returnBook(parseInt(userIdReceipt), parseInt(bookIdReceipt));
            return 'receipt';

        case '4':
            console.log('\n=== TÌM KIẾM PHIẾU THEO ID NGƯỜI DÙNG ===');
            console.log ('Nhập Id người dùng cần tìm:');
            const userIdToSearch: string = await ReadlineManager.question('> ');
            const foundReceiptByUserId: Receipt[] = library.getReceiptByUserId(parseInt(userIdToSearch));
            if (foundReceiptByUserId.length > 0) {
                console.log('Kết quả tìm kiếm:');
                foundReceiptByUserId.forEach(receipt => console.log(formatReceipt(receipt)));
            } else {
                console.log('Không tìm thấy phiếu nào.');
            }
            return 'receipt'

        case '5':
            console.log('\n=== TÌM KIẾM PHIẾU THEO ID SÁCH ===');
            console.log ('Nhập Id sách cần tìm:');
            const bookIdToSearch: string = await ReadlineManager.question('> ');
            const foundReceipstByBookId: Receipt[] = library.getReceiptByBookId(parseInt(bookIdToSearch));
            if (foundReceipstByBookId.length > 0) {
                console.log('Kết quả tìm kiếm:');
                foundReceipstByBookId.forEach(receipt => console.log(formatReceipt(receipt)));
            } else {
                console.log('Không tìm thấy phiếu nào.');
            }
            return 'receipt'
            
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'receipt';
    }
}

