class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class HashTable {
  constructor(size = 1) {
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
    const stringKey = key.toString();
    return this.hash(stringKey) % this.arr.length;
  }

  set(key, value) {
    const index = this.keyToIndex(key);
    if (!this.arr[index]) this.arr[index] = new Node(key, value);
    if (this.arr[index]) {
      let curr = this.arr[index];
      while (true) {
        if (curr.key === key) {
          curr.value = value;
          return
        }
        if (!curr.next) {
          curr.next = new Node(key, value);
          curr.next.prev = curr;
          return
        }
        curr = curr.next;
      }
    }
  }

  get(key) {
    const index = this.keyToIndex(key);
    let curr = this.arr[index];
    while (true) {
      if (curr.key === key) return curr.value;
      if (!curr.next) return "not found";
      curr = curr.next;
    }
  }

  delete(key) {
    const index = this.keyToIndex(key);
    let curr = this.arr[index];
    while (true) {
      if (curr.key === key) {
        //if curr is the head
        if (!curr.prev) {
          //if head has next
          if (!curr.next) {
            this.arr[index] = null;
            return
          } else {
            this.arr[index] = curr.next;
            return
          }
        //curr is not the head
        } else {
          //curr doesn't have next -- no need to connect between prev and next
          if (!curr.next) {
            curr.prev.next = null;
            return
          } else {
            //connect curr's next to curr's prev
            let newNext = curr.next;
            newNext.prev = curr.prev;
            curr.prev.next = newNext;
            return
          }
        }
      }
      if (curr.next) {
        curr = curr.next;
      } else {
        return
      }
    }
  }
}

/*********************** TEST CASE ***********************/
const ht = new HashTable();
ht.set("JunMo", "Korea");
ht.set("Kevin", "Canada");
ht.set("Justin", "Canada");
console.log(ht.get("Kevin"));
console.log(ht.get("Justin"));
ht.delete("Kevin");
console.log(ht.get("Kevin"));
console.log(ht.get("Justin"));
ht.delete("SiDragon");
console.log(ht.arr[0]);