import { Book, User, Receipt } from './interfaces';

export function formatBook(book: Book): string {
    return `[ID: ${book.id}] ${book.title} (${book.genre}) - ${book.isAvailable ? 'Có sẵn' : 'Đã mượn'} (${book.availableAmount} bản)`;
}

export function formatUser(user: User): string {
    return `[ID: ${user.id}] ${user.name} - ${user.address} (Đang mượn ${user.borrowedBooks.length} sách)`;
}

export function formatReceipt(receipt: Receipt): string {
    return `[ID: ${receipt.id}] User ${receipt.userId} mượn sách ${receipt.bookId} | ${receipt.dateBorrow} -> ${receipt.isReturned ? receipt.dateReturn : 'Chưa trả'}`;
}