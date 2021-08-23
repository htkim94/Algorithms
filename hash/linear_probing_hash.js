class HashTable {
  constructor(size = 1000) {
    this.arr = new Array(size);
  }

  hash(s) {
    let hash = 0;
    for (let c of s) {
      let code = c.charCodeAt();
      hash = (Math.abs(hash << 5) - hash) + code;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  keyToIndex(key) {
    const stringKey = key.toString()
    return this.hash(stringKey) % this.arr.length;
  }

  has(key) {
    const initialIndex = this.keyToIndex(key);
    if (this.arr[initialIndex] == null) return -1;
    if (this.arr[initialIndex][0] === key.toString()) return initialIndex;
    let runningIndex = initialIndex + 1;
    while (
      this.arr[runningIndex] != null &&
      this.arr[runningIndex][0] !== key.toString() &&
      runningIndex !== initialIndex
    ) {
      runningIndex = (runningIndex + 1) % this.arr.length;
    }
    if (runningIndex === initialIndex) return -1;
    return this.arr[runningIndex] == null ? -1 : runningIndex;
  }

  set(key, value) {
    const hasIndex = this.has(key);
    if (hasIndex !== -1) {
      this.arr[hasIndex][1] = value;
    } else {
      const initialIndex = this.keyToIndex(key);
      let runningIndex = initialIndex;
      let bool = false;
      while (!bool) {
        if (!this.arr[runningIndex] || this.arr[runningIndex] === "deleted") {
          this.arr[runningIndex] = [key.toString(), value];
          bool = true;
        }
       runningIndex = (runningIndex + 1) % this.arr.length;
       if (runningIndex === initialIndex) {
         console.log("Table is full");
         bool = true;
       }
      }
    }
  }

  get(key) {
    const index = this.has(key);
    return index !== -1 ? this.arr[index][1] : "not found";
  }

  delete(key) {
    const index = this.has(key);
    if (index !== -1) this.arr[index] = "deleted";
  }
}

/*********************** TEST CASE ***********************/
let tmp = 0;
let tmp2 = 0;

const ht = new HashTable();
for (let i = 0; i < 1000; i++) {
  ht.set(i, i);
  tmp += i;
}

for (let i of ht.arr) {
  if (i && typeof i === "object") tmp2 += i[1];
}

console.log(tmp, tmp2)

for (let i = 0; i < 1000; i++) {
  if (i % 2 === 0) ht.delete(i);
}

let deletedCount = 0;

for (let a of ht.arr) {
  if (a === "deleted") deletedCount++;
}

console.log(deletedCount);

let getCount = 0;

for (let i = 1; i < 1000; i+=2) {
  let value = ht.get(i);
  if (value === "not found") throw new Error("fix your code");
}

for (let i = 0; i < 1000; i+=2) {
  let value = ht.get(i);
  if (value !== "not found") throw new Error("fuk you");
}

