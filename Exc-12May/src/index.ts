import { libraryManagement } from './libraryManagement';
import { handleMainMenu, handleBookMenu, handleReceiptMenu, handleUserMenu } from './handleMenus';
import { displayMenu } from './displayMenus';
import { ReadlineManager } from './readlineManager';


async function main() {
    const library = new libraryManagement();
    
    try {
        await Promise.all([
            library.loadBookListFromFile('data/books.json'),
            library.loadUserListFromFile('data/users.json'),
            library.loadReceiptListFromFile('data/receipts.json')
        ]);
        console.log('Đã tải dữ liệu thành công!');
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        return;
    }


    let currentMenu = 'main';
    let running = true;

    while (running) {
        displayMenu(currentMenu);
        
        const answer = await ReadlineManager.question('Nhập lựa chọn của bạn: ');

        switch (currentMenu) {
            case 'main': 
                currentMenu = await handleMainMenu(answer);
                if (currentMenu === 'exit') running = false;
                break;
            case 'book': 
                currentMenu = await handleBookMenu(answer, library);
                break;
            case 'user':
                currentMenu = await handleUserMenu(answer, library);
                break;
            case 'receipt':
                currentMenu = await handleReceiptMenu(answer, library);
                break;
        }
    }

    ReadlineManager.close();
}

// Run the application
main().catch(console.error);