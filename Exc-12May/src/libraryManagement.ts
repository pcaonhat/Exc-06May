import { Book, User, Receipt } from './interfaces';
const fs = require('fs');
export class libraryManagement{
    private bookList: Book[] = [];
    private userList: User[] = [];
    private receiptList: Receipt[] = [];

    public saveListToFile<T> (data: T[], fileName: string) : void {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(fileName, jsonData);
        console.log(`Saved data to ${fileName}`);
    }

    public loadBookListFromFile(fileName: string) : void{
        const data = fs.readFileSync(fileName, 'utf-8');
        this.bookList = JSON.parse(data);
        console.log(`Loaded book list from ${fileName}`);
    }

    public addBook(book: Book) : void {
        this.bookList.push(book);
        this.saveListToFile(this.bookList, 'data/books.json');
    }

    public removeBook(bookId: number) : void{
        const bookIndex = this.bookList.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            this.bookList.splice(bookIndex, 1);
            this.saveListToFile(this.bookList, 'data/books.json');
            console.log(`Removed book with ID ${bookId}`);
        } else {
            console.log(`Book with ID ${bookId} not found`);
        }
        this.saveListToFile(this.bookList, 'data/books.json');
    }


    public loadUserListFromFile(fileName: string) : void{
        const data = fs.readFileSync(fileName, 'utf-8');
        this.userList = JSON.parse(data);
        console.log(`Loaded user list from ${fileName}`);
    }

    public loadReceiptListFromFile(fileName: string) : void{
        const data = fs.readFileSync(fileName, 'utf-8');
        this.receiptList = JSON.parse(data);
        console.log(`Loaded receipt list from ${fileName}`);
    }

    public addUser(user: User) : void {
        this.userList.push(user);
        this.saveListToFile(this.userList, 'data/users.json');
    }

    public removeUser(userId: number) : void {
        const userIndex = this.userList.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.userList.splice(userIndex, 1);
            this.saveListToFile(this.userList, 'data/users.json');
            console.log(`Removed user with ID ${userId}`);
        } else {
            console.log(`User with ID ${userId} not found`);
        }
        this.saveListToFile(this.userList, 'data/users.json');
    }

    public borrowBook(userId: number, bookId: number, dateBorrow: string, dateReturn: string) : void {
        const user = this.userList.find(user => user.id === userId);
        const book = this.bookList.find(book => book.id === bookId);

        if(user && book && book.isAvailable){
            user.borrowedBooks.push(book);
            book.availableAmount -= 1;
            if(book.availableAmount === 0){
                book.isAvailable = false;
            }
            const receipt: Receipt = {
                id: this.receiptList.length + 1,
                userId: user.id,
                bookId: book.id,
                dateBorrow: dateBorrow,
                dateReturn: dateReturn,
                isReturned: false
            }
            this.receiptList.push(receipt);
            this.saveListToFile(this.receiptList, 'data/receipts.json');
            this.saveListToFile(this.userList, 'data/users.json');
            this.saveListToFile(this.bookList, 'data/books.json');
            console.log(`Đã cho người dùng ${userId} mượn sách ${bookId}`)
        }

    }

    public returnBook(userId: number, bookId: number) : void {
        const user = this.userList.find(user => user.id === userId);
        const book = this.bookList.find(book => book.id === bookId);
        const receipt = this.receiptList.find(receipt => receipt.userId === userId && receipt.bookId === bookId && !receipt.isReturned);

        if(user && book && receipt){
            user.borrowedBooks = user.borrowedBooks.filter(book => book.id !== bookId);
            book.availableAmount += 1;
            if(book.availableAmount > 0){
                book.isAvailable = true;
            }
            receipt.isReturned = true;
            this.saveListToFile(this.receiptList, 'data/receipts.json');
            this.saveListToFile(this.userList, 'data/users.json');
            this.saveListToFile(this.bookList, 'data/books.json');
            console.log(`người dùng ${userId} đã trả sách ${bookId}`)
        }
    }
    public getBookList() : Book[] {
        return this.bookList;
    }
    public getUserList() : User[] {
        return this.userList;
    }
    public getReceiptList() : Receipt[] {
        return this.receiptList;
    }

    public getBookByName(name: string): Book[] {
        return this.bookList.filter(book => book.title.toLowerCase().includes(name.toLowerCase()));
    }

    public getUserByName(name: string) : User[] {
        return this.userList.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    public getReceiptByUserId(userId: number): Receipt[] {
        return this.receiptList.filter(receipt => receipt.userId === userId);
    }
    
    public getReceiptByBookId(bookId: number): Receipt[]{
        return this.receiptList.filter(receipt => receipt.bookId === bookId);
    }
    

    public getAvailableID (list: Book[] | User[]): number {
        const ids = list.map(item => item.id);
        let newId = 1;
        while (ids.includes(newId)) {
            newId++;
        }
        return newId;
    }
}