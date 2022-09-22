import { estimate, estimateDate, interval } from "./index";

// Test estimate() function
console.log(
  "World population when we landed on the moon:",
  estimate(new Date(1969, 6, 20))
);

// Test estimateDate() function.
console.log(
  "World population reached 8 billion at:",
  estimateDate(8_000_000_000)
);
console.log(
  "World population will reach 9 billion at:",
  estimateDate(9_000_000_000)
);

// Test the interval function.
console.log("Another human is born every", interval(), "milliseconds.");

// Create a basic counter
console.log(
  "The numbers below show the increase in the world's population over the next 10 seconds:"
);

const intervalId = setInterval(() => {
  console.log(estimate());
}, interval());

setTimeout(() => {
  clearInterval(intervalId);
}, 10_000);
