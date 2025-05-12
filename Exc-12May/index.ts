let obj : any

obj = {
    name: "John",
    age: 30,
};

if(obj && obj.address === undefined) {
    console.log("Address is undefined");
}
else if(obj.address === null) {
    console.log("Address is null");
}

console.log("End");