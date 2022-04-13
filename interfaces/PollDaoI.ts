import PollOption from "../models/polls/PollOption";
import Poll from "../models/polls/PollOption";
import Tuit from "../models/tuits/Tuit";

/**
 * @file Declares API for Poll related data access object methods
 */
export default interface PollDaoI {
    createPollByUser(uid: String, poll: Tuit): Promise<any>;
    createPollOption(tid: string, option: PollOption): Promise<any>;
    findAllPolls (): Promise<Tuit[]>;
    findAllPollsByUser (uid: string): Promise<Tuit[]>;
    findPollById (pid: string): Promise<Tuit>;
    findPollByTuit (tid: string): Promise<Tuit>;
    updatePoll(tid: String, poll: Tuit): Promise<any>;
    deletePoll(tid: String): Promise<any>;
};