/**
 * @file Declares Vote data type representing the vote relationship between like user, poll and poll option.
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";
import PollOption from "../polls/PollOption";

/**
 * @typedef Vote Represents votes relationship between different user,
 * poll and poll option.
 * @property {Tuit} tuit Poll on which user is voting.
 * @property {User} votedBy User who is voting.
 * @property {PollOption} votedOption Option user voted on poll
 */
export default interface Vote {
    tuit: Tuit,
    votedOption: PollOption,
    votedBy: User
};