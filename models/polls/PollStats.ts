/**
 * @file Declares PollStats data type represented by values like number of votes and number of participants.
 */
export default interface PollStats {
    votes: number[],
    numParticipated: number
};