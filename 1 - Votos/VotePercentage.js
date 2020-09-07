/* Class to calculate votes percentage */
class VotePercentage {
	/**
	 * Creates a VotePercentage
	 * @param {number} totalVoters - The total amount of voters
	 * @param {number} validVotes - The total amount of valid votes
	 * @param {number} blankVotes - The total amount of blank votes
	 * @param {number} nullVotes - The total amount of null votes
	 */
	constructor(totalVoters, validVotes, blankVotes, nullVotes) {
		this.totalVoters = totalVoters;
		this.validVotes = validVotes;
		this.blankVotes = blankVotes;
		this.nullVotes = nullVotes;
	}
	/**
	 * Calculates valid votes percentage in relation to total voters
	 * @return {number} The resulting percentage
	 */
	calculateValid() {
		return (this.validVotes / this.totalVoters) * 100;
	}
	/**
	 * Calculates blank votes percentage in relation to total voters
	 * @return {number} The resulting percentage
	 */
	calculateBlank() {
		return (this.blankVotes / this.totalVoters) * 100;
	}
	/**
	 * Calculates null votes percentage in relation to total voters
	 * @return {Number} The resulting percentage
	 */
	calculateNull() {
		return (this.nullVotes / this.totalVoters) * 100;
	}
}

module.exports = VotePercentage;
