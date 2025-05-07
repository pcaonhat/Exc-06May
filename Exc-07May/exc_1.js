
const EXCELLENT_GRADE = 8;
const GOOD_GRADE = 6.5;

//Constructor function for student
function student (id, name, grade, age) {
    this.id = id;
    this.name = name;
    this.grade = grade;
    this.age = age;
}

//Hiển thị danh sách sinh viên
function displayStudentList(studentList) {
    for(let i = 0; i < studentList.length; i++) {
        console.log(`ID: ${studentList[i].id}, Name: ${studentList[i].name}, Grade: ${studentList[i].grade}, Age: ${studentList[i].age}`);
    }
}

//Thêm sinh viên vào danh sách
function addStudent(studentList, name, grade, age) {
    let id = studentList.length + 1;

    let newStudent = new student(id, name, grade, age);
    studentList.push(newStudent);
}

//Tìm kiếm sinh viên theo tên
function searchStudentByName(studentList, name) {
    let result = studentList.filter(student => student.name.toLowerCase().includes(name.toLowerCase()));
    return result;
}

//Tính điểm trung bình
function calculateAverageGrade(studentList) {
    let totalGrade = 0;
    for(let i = 0; i < studentList.length; i++) {
        totalGrade += studentList[i].grade;
    }
    return totalGrade / studentList.length;
}

//Hiển thị thông tin thống kê
function displayStatistics(studentList) {
    let totalStudents = studentList.length;

    let averageGrade = calculateAverageGrade(studentList);
    
    let excellentStudents = 0;
    let goodStudents = 0;
    let averageStudents = 0;

    for(let i = 0; i < studentList.length; i++) {
        if(studentList[i].grade >= EXCELLENT_GRADE) {
            excellentStudents++;
        } else 
        if(studentList[i].grade >= GOOD_GRADE) {
            goodStudents++;
        } else {
            averageStudents++;
        }
    }

    console.log(`Total Students: ${totalStudents}`);
    console.log(`Average Grade: ${averageGrade}`);
    console.log(`Excellent Students: ${excellentStudents}`);
    console.log(`Good Students: ${goodStudents}`);
    console.log(`Average Students: ${averageStudents}`);
}

function saveStudentToJSON(studentList, fileName) {
    const fs = require('fs');
    fs.writeFileSync(fileName, JSON.stringify(studentList, null, 2)); //JSON.stringify(value, replacer, space)
}

function loadStudentFromJSON(fileName) {
    const fs = require('fs');

    if (!fs.existsSync(fileName)) {
        console.log("File not found. Returning empty array.");
        return [];
    }
    else{
        let data = fs.readFileSync(fileName);
        let studentList = JSON.parse(data);
        return studentList;
    }
}

const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });


async function handleMenu() {

    let studentList = loadStudentFromJSON("students.json");
    let isRunning = true;

    console.log("\n1. Add Student");
    console.log("2. Search Student by Name");
    console.log("3. Display Student List");
    console.log("4. Display Statistics");
    console.log("5. Save to JSON");
    console.log("6. Load from JSON");
    console.log("7. Exit");

    while (isRunning) {

        const choice = await rl.question('Enter your choice: ');

        switch (choice.trim()) {
            case '1':
                const name = await rl.question('Enter name: ');
                const grade = parseFloat(await rl.question('Enter grade: '));
                const age = parseInt(await rl.question('Enter age: '), 10);
                addStudent(studentList, name, grade, age);
                console.log("Student added successfully!");
                break;
            case '2':
                const searchName = await rl.question('Enter name to search: ');
                const result = searchStudentByName(studentList, searchName);
                displayStudentList(result);
                break;
            case '3':
                displayStudentList(studentList);
                break;
            case '4':
                displayStatistics(studentList);
                break;
            case '5':
                saveStudentToJSON(studentList, "students.json");
                console.log("Data saved successfully!");
                break;
            case '6':
                studentList = loadStudentFromJSON("students.json");
                console.log("Data loaded successfully!");
                break;
            case '7':
                console.log("Exiting...");
                isRunning = false;
                break;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }

    rl.close();
}


handleMenu();