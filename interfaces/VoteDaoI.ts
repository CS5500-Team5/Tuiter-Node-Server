import Vote from "../models/votes/Vote";

export default interface VoteDaoI {
    findAllUsersThatVotedOnTuit (tid: string): Promise<Vote[]>;
    findVoteByUserOnTuit (tid: string, uid: string) : Promise<any>;
    createVote (uid: string, tid: string, poid: string): Promise<Vote>;
    updateVote (vid: string, vote: Vote): Promise<any>;
    deleteVote (uid: string, tid: string): Promise<any>
};