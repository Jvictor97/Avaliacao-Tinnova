/* Class for BubbleSort */
class BubbleSort {
	/**
	 * Creates a BubbleSort
	 * @param {array} array - The array to be sorted
	 */
	constructor(array) {
		this.array = array;
	}
	/**
	 * Swaps two elements from the array
	 * @param {number} firstIndex - The index of the first element to be swapped
	 * @param {number} secondIndex - The index of the second element to be swapped
	 */
	swap(firstIndex, secondIndex) {
		const temporary = this.array[firstIndex];
		this.array[firstIndex] = this.array[secondIndex];
		this.array[secondIndex] = temporary;
	}
	/**
	 * Sorts the array using BubbleSort algorithm
	 * @param {number} size - The size of the array to be iterated
	 * @return {array} The sorted array
	 */
	sort(size) {
		if (size === undefined) size = this.array.length;
		if (size < 1) return this.array;

		for (let index = 0; index < size; index++) {
			if (this.array[index] > this.array[index + 1]) {
				this.swap(index, index + 1);
			}
		}

		return this.sort(size - 1);
	}
}

module.exports = BubbleSort;
