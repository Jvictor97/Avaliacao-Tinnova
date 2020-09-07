/**
 * Calculates factorial recursively
 * @param {number} number - The number for which factorial will be calculated
 * @return {number} The factorial result
 */
function calculateFactorial(number) {
	if (number === 0) return 1;

	return number * calculateFactorial(number - 1);
}

// Demonstrating
console.log('0! =', calculateFactorial(0));
console.log('1! =', calculateFactorial(1));
console.log('2! =', calculateFactorial(2));
console.log('3! =', calculateFactorial(3));
console.log('4! =', calculateFactorial(4));
console.log('5! =', calculateFactorial(5));
console.log('6! =', calculateFactorial(6));
