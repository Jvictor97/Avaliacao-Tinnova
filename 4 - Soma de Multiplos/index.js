/**
 * Calculates the sum of multiples of 3 or 5 from 1 to "value" exclusive, i.e.: [1, value[
 * @param {number} value - The number for which sum will be calculated
 * @return {number} The sum of multiples
 */
function sumMultiples(value) {
	let sum = 0;

	for (let number = value - 1; number > 0; number--) {
		if (number % 3 === 0 || number % 5 === 0) sum += number;
	}

	return sum;
}

// Demonstrating
console.log('=> Sum multiples [1,10[ =', sumMultiples(10));
