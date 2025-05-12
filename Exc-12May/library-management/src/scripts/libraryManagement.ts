import { Book, User, Receipt } from '../data/interfaces';

const fs = require ('fs')

export class libraryManagement{
    private bookList: Book[] = [];
    private userList: User[] = [];
    private receiptList: Receipt[] = [];

    public saveListToFile<T> (data: T[], fileName: string) {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(fileName, jsonData);
        console.log(`Saved data to ${fileName}`);
    }

    public loadBookListFromFile(fileName: string) {
        const data = fs.readFileSync(fileName, 'utf-8');
        this.bookList = JSON.parse(data);
        console.log(`Loaded book list from ${fileName}`);
    }

    public addBook(book: Book) {
        this.bookList.push(book);
        this.saveListToFile(this.bookList, 'books.json');
    }

    public loadUserListFromFile(fileName: string) {
        const data = fs.readFileSync(fileName, 'utf-8');
        this.userList = JSON.parse(data);
        console.log(`Loaded user list from ${fileName}`);
    }

    public loadReceiptListFromFile(fileName: string) {
        const data = fs.readFileSync(fileName, 'utf-8');
        this.receiptList = JSON.parse(data);
        console.log(`Loaded receipt list from ${fileName}`);
    }

    public addUser(user: User) {
        this.userList.push(user);
        this.saveListToFile(this.userList, 'users.json');
    }

    public borrowBook(userId: number, bookId: number, dateBorrow: string, dateReturn: string){
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
            this.saveListToFile(this.receiptList, 'receipts.json');
        }
    }

    public returnBook(userId: number, bookId: number){
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
            this.saveListToFile(this.receiptList, 'receipts.json');
        }
    }
    public getBookList() {
        return this.bookList;
    }
    public getUserList() {
        return this.userList;
    }
    public getReceiptList() {
        return this.receiptList;
    }

    public getBookByName(name: string) {
        return this.bookList.filter(book => book.title.toLowerCase().includes(name.toLowerCase()));
    }

    public getUserByName(name: string){
        return this.userList.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }
}