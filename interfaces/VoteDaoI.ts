import Tuit from "../models/tuits/Tuit";
import Vote from "../models/votes/Vote";

export default interface VoteDaoI {
    findAllVotes (): Promise<Vote[]>;
    createVote (uid: string, tid: string, vote:Vote): Promise<Tuit>;
    updateVote (vid: string, vote: Vote): Promise<any>;
    deleteVote (vid: string): Promise<any>
    // displayStats
};