const VotePercentage = require('./VotePercentage');

const votePercentage = new VotePercentage(1000, 800, 150, 50);

console.log(`=> Valid votes percentage: ${votePercentage.calculateValid()}%`);
console.log(`=> Blank votes percentage: ${votePercentage.calculateBlank()}%`);
console.log(`=> Null votes percentage: ${votePercentage.calculateNull()}%`);
