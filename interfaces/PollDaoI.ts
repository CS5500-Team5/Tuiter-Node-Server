import PollOption from "../models/polls/PollOption";
import Poll from "../models/polls/PollOption";
import Tuit from "../models/tuits/Tuit";

export default interface PollDaoI {
    createPollByUser(uid: String, poll: Tuit): Promise<any>;
    createPollOption(tid: string, option: PollOption): Promise<any>;
    findAllPolls (): Promise<Tuit[]>;
    findAllPollsByUser (uid: string): Promise<Tuit[]>;
    findPollById (pid: string): Promise<Tuit>;
    findPollByTuit (tid: string): Promise<Tuit>;
};