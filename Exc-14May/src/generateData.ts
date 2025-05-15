import { User } from "./classes/User";

const fs = require('fs');
const { faker } = require('@faker-js/faker');

export function generateUsers(numUsers: number, fileName: string): void{
    const users: User[] = [];

    for(let i = 0; i < numUsers; i++){
        const user = new User(i, faker.person.fullName(),faker.location.streetAddress())
        users.push(user);
    }   

    const jsonData = JSON.stringify(users, null, 2);

    fs.writeFileSync(fileName, jsonData);
}

generateUsers(20, 'data/users.json');