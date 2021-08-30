// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

// Use set
const isUnique = (s) => {
  const characterSet = new Set();

  for (let c of s) {
    if (characterSet.has(c)) return false;
    characterSet.add(c);
  }

  return true;
}

// Nested Loop
const isUniqueTwo = s => {
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) return false;
    }
  }
  return true;
}

// Quick sort algorithm for sorting string
const quickSort = (s) => {
  if (!s) return "";
  if (s.length === 1) return s;

  const arr = s.split("");
  const pivot = arr.splice(arr.length - 1, 1);
  const left = [], right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > pivot) right.push(arr[i]);
    if (arr[i] <= pivot) left.push(arr[i]);
  }

  return quickSort(left.join("")) + pivot[0] + quickSort(right.join(""));
}

// Sort then check
const isUniqueSort = s => {
  const sortedString = quickSort(s);

  for (let i = 0; i < sortedString.length; i++) {
    if ((i + 1) !== sortedString.length) {
      if (sortedString[i] === sortedString[i+1]) return false;
    }
  }

  return true;
}

// Test cases:
console.log(isUnique("alphabet")); // false
console.log(isUnique("kevin")) // true

console.log(isUniqueTwo("alphabet")); // false
console.log(isUniqueTwo("kevin")) // true

console.log(isUniqueSort("alphabet")); // false
console.log(isUniqueSort("kevin")); // true