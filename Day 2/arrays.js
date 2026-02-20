console.log("===== PRACTICE PROGRAM: map, filter, reduce =====");

// Problem 1
console.log("\n--- Problem 1: map (multiply by 3) ---");
let p1_numbers = [3, 6, 9, 12];
let p1_result = p1_numbers.map(function (n) {
  return n * 3;
});
console.log("Input:", p1_numbers);
console.log("Output:", p1_result);

// Problem 2
console.log("\n--- Problem 2: filter (numbers > 10) ---");
let p2_numbers = [5, 12, 18, 7, 3];
let p2_result = p2_numbers.filter(function (n) {
  return n > 10;
});
console.log("Input:", p2_numbers);
console.log("Output:", p2_result);

// Problem 3
console.log("\n--- Problem 3: reduce (sum of numbers) ---");
let p3_numbers = [10, 20, 30, 40];
let p3_result = p3_numbers.reduce(function (sum, n) {
  return sum + n;
}, 0);
console.log("Input:", p3_numbers);
console.log("Output (Sum):", p3_result);

// Problem 4
console.log("\n--- Problem 4: map (capitalize names) ---");
let p4_names = ["john", "doe", "alex", "sara"];
let p4_result = p4_names.map(function (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
});
console.log("Input:", p4_names);
console.log("Output:", p4_result);

// Problem 5
console.log("\n--- Problem 5: filter (products with price > 1000) ---");
let products = [
  { name: "Laptop", price: 50000 },
  { name: "Mouse", price: 500 },
  { name: "Keyboard", price: 1500 },
  { name: "Monitor", price: 12000 }
];

let p5_result = products.filter(function (product) {
  return product.price > 1000;
});
console.log("Input:", products);
console.log("Output:", p5_result);

// Extra Challenge
console.log("\n--- Extra: map (get product names only) ---");
let productNames = products.map(function (product) {
  return product.name;
});
console.log("Output:", productNames);

console.log("\n===== END OF PROGRAM =====");