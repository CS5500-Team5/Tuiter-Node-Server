import User from "../users/User";
import Tuit from "../tuits/Tuit";
import PollOption from "../polls/PollOption";

export default interface Vote {
    tuit: Tuit,
    votedOption: PollOption,
    votedBy: User
};