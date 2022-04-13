import Tuit from "../tuits/Tuit";

export default interface PollOption {
    optionText: string,
    numVoted: number,
    tuit: Tuit
};