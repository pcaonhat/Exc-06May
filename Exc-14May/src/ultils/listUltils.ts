const fs = require('fs');

export function getAvailableId<T extends { getId(): number }>(list: T[]): number {
    const ids: number[] = list.map(item => item.getId());
    let newId: number = 1;
    while (ids.includes(newId)) {
        newId++;
    }
    return newId;
}

export function saveListToFile<T> (data: T[], fileName: string) : void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, jsonData);
    console.log(`Lưu data vào ${fileName}`);
}