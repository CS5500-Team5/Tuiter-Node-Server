/**
 * @file Implements DAO managing data storage of polls. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import VoteModel from "../mongoose/votes/VoteModel";
import VoteDaoI from "../interfaces/VoteDaoI";
import Vote from "../models/votes/Vote";

/**
 * @class PollDao Implements Data Access Object managing data storage
 * of Users
 * @property {PollDao} pollDao Private single instance of PollDao
 */
export default class VoteDao implements VoteDaoI{
    private static voteDao: VoteDao | null = null;
    public static getInstance = (): VoteDao => {
        if(VoteDao.voteDao === null) {
            VoteDao.voteDao = new VoteDao();
        }
        return VoteDao.voteDao;
    }
    private constructor() {}
    findAllUsersThatVotedOnTuit = async (tid: string): Promise<Vote[]> =>
        VoteModel.find({tuit: tid})
            .populate("votedBy")
            .exec();

    findVoteByUserOnTuit = async  (tid: string, uid: string): Promise<any> =>
        VoteModel.find({tuit: tid, votedBy: uid})
            .populate("votedOption")
            .exec();

    createVote = async (uid: string, tid: string, poid: string): Promise<any> =>
        VoteModel.create({tuit: tid, votedBy: uid, votedOption: poid});

    updateVote = async (vid: string, vote: Vote): Promise<any> =>
        VoteModel.updateOne(
            {_id: vid},
            {$set: vote});

    deleteVote = async (uid: string, tid: string): Promise<any> =>
        VoteModel.deleteOne({tuit: tid, votedBy: uid});
}