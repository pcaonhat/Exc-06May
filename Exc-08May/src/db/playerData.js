const fs = require('fs');
const { faker } = require('@faker-js/faker');

let sql = `CREATE TABLE IF NOT EXISTS player (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  elo INT NOT NULL DEFAULT 1200
);\n\n`;

sql += 'INSERT INTO player (name, elo) VALUES\n';

for (let i = 1; i <= 100; i++) {
  const name = faker.person.fullName().replace("'", ""); 
  const elo = 1200;
  sql += `('${name}', ${elo})${i < 100 ? ',' : ';'}\n`;
}

fs.writeFileSync('init.sql', sql);
console.log('Đã tạo init.sql có sẵn dữ liệu.');
