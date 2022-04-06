import Poll from "../models/polls/PollOption";
import Tuit from "../models/tuits/Tuit";

export default interface PollDaoI {
    findAllPolls (): Promise<Poll[]>;
    findAllPollsByUser (uid: string): Promise<Poll[]>;
    findPollById (pid: string): Promise<Poll>;
    findPollByTuit (tid: string): Promise<Tuit>;
};