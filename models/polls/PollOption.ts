/**
 * @file Declares PollOPtion data type represented by values like option text and number of votes.
 */
import Tuit from "../tuits/Tuit";

export default interface PollOption {
    optionText: string,
    numVoted: number,
    tuit: Tuit
};