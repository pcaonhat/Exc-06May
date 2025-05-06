// Exercise 2.1
//Tính tổ hợp chập k của n phần tử
function combination(k,n)
{
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n)
{
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log("Excercise 2.1");
console.log(combination(3, 5)); // Output: 10s

// Exercise 2.2
function random (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log("Excercise 2.2");
console.log(random(1, 10)); // Output: a random number between 1 and 10s

// Exercise 2.3
function randomArray(arr)
{
    let index = random(0, arr.length - 1);
    return arr[index];
}

console.log("Excercise 2.3");
let a = [1, 2, 3, 4, 5];
console.log(randomArray(a)); // Output: a random element from array a

// Exercise 2.4
function checkArray(arr1, arr2)
{
    let result = []
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) {
            result.push(arr1[i]);
        }
    }
    return result;
}

console.log("Excercise 2.4");
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [4, 5, 6, 7, 8];
console.log(checkArray(arr1, arr2)); // Output: [1, 2, 3]