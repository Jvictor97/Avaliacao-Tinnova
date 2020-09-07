const BubbleSort = require('./BubbleSort');

const array = [5, 3, 2, 4, 7, 1, 0, 6];
const bubbleSort = new BubbleSort(array);

console.log('=> BubbleSort: ', bubbleSort.sort());
