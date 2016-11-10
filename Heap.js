export default class Heap {
  constructor(comparator) {
    this.items = [];
    this.comparator = comparator;
  }

  push(item) {
    this.items.unshift(item);
    siftDown(this.items, 0, this.items.length - 1, this.comparator);
  }

  shift() {
    return this.items.shift();
  }

  splice(start, count) {
    // FIXME: should work with priority
    return this.items.splice(start, count);
  }

  [Symbol.iterator]() {
    // TODO: implement iterator
  }

  get length() {
    return this.items.length;
  }
}

function siftDown(array, start, end, comparator) {
	let root = start;

	while (root * 2 + 1 <= end) {
		const lChild = root * 2 + 1;
		const rChild = lChild + 1;
		let swap = root;

		if (comparator(array[swap], array[lChild]) < 0) {
			swap = lChild;
		}

		if (rChild <= end && comparator(array[swap], array[rChild]) < 0) {
			swap = rChild;
		}

		if (swap === root) {
			return;
		}

		swapElems(array, root, swap);
		root = swap;
	}
}

function swapElems(array, a, b) {
	const tmp = array[a];
	array[a] = array[b];
	array[b] = tmp;
}
