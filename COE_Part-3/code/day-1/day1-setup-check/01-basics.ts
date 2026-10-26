const name1: string = "Renuka";
console.log('hello ' + name1);

let name2: string = "Renuka";
console.log('hello ' + name2);

name2 = "Renuka Porje";
console.log('hello ' + name2);

let age: number = 25;
console.log('age: ' + age);

// age = "Twenty Five"; // This will give an error because age is of type number
age = 26; // This is valid because age is of type number

//Inference
let city = "Bangalore"; // TypeScript infers the type as string
//city = 37; // This will give an error because city is of type 

