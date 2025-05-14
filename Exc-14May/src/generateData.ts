// const fs = require('fs');
// const { faker } = require('@faker-js/faker');

// export function generateUsers(numUsers: number, fileName: string){
//     const users: User[] = [];

//     for(let i = 0; i < numUsers; i++){
//         const user: User = {
//             id: i + 1,
//             name: faker.person.fullName(),
//             address: faker.location.streetAddress(),
//             borrowedBooks: []
//         }
//         users.push(user);
//     }   

//     const jsonData = JSON.stringify(users, null, 2);

//     fs.writeFileSync(fileName, jsonData);
// }