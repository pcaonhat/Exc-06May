import { Book, User, Receipt } from '../interfaces';
const fs = require('fs');
const { faker } = require('@faker-js/faker');

export function generateBooks(numBooks: number, fileName: string) {
    const books: Book[] = [];

    for (let i = 0; i < numBooks; i++) {
        const book: Book = {
            id: i + 1,
            title: faker.book.title(),
            genre: faker.book.genre(),
            isAvailable: true,
            availableAmount: faker.number.int({ min: 1, max: 10 })
        };
        books.push(book);
    }
    const jsonData = JSON.stringify(books, null, 2);

    fs.writeFileSync(fileName, jsonData);
    console.log(`Generated ${numBooks} books and saved to ${fileName}`);
}

export function generateUsers(numUsers: number, fileName: string){
    const users: User[] = [];

    for(let i = 0; i < numUsers; i++){
        const user: User = {
            id: i + 1,
            name: faker.person.fullName(),
            address: faker.location.streetAddress(),
            borrowedBooks: []
        }
        users.push(user);
    }   

    const jsonData = JSON.stringify(users, null, 2);

    fs.writeFileSync(fileName, jsonData);
}

generateBooks(100, 'books.json');
generateUsers(100, 'users.json');

