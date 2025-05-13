export interface Book {
    id: number;
    title: string;
    genre: string;
    isAvailable: boolean;
    availableAmount: number;

}

export interface User {
    id: number;
    name: string;
    address: string;
    borrowedBooks: Book [];
}

export interface Receipt {
    id: number;
    userId: number;
    bookId: number;
    dateBorrow: string;
    dateReturn: string;
    isReturned: boolean;
} 
