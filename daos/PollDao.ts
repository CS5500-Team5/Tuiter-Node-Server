/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import PollDaoI from "../interfaces/PollDaoI";
import PollOptionModel from "../mongoose/polls/PollOptionModel";
import PollOption from "../models/polls/PollOption";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
 export default class PollDao implements PollDaoI{
     private static pollDao: PollDao | null = null;
     public static getInstance = (): PollDao => {
         if(PollDao.pollDao === null) {
            PollDao.pollDao = new PollDao();
         }
         return PollDao.pollDao;
     }
     private constructor() {}
     findAllPolls = async (): Promise<Tuit[]> =>
         TuitModel.find({isPoll: true})
             .populate("postedBy")
             .populate("pollOptions")
             .exec();
     findAllPollsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid, isPoll: true})
             .sort({'postedOn': -1})
             .populate("postedBy")
             .populate("pollOptions")
             .exec();
     findPollById = async (uid: string): Promise<any> =>
    TuitModel.findById(uid)
        .populate("postedBy")
        .populate("pollOptions")
        .exec();
        
    findPollByTuit = async (tid: string): Promise<any> => 
        TuitModel.find({_id: tid})
        .populate("postedBy")
        .populate("pollOptions").exec();
    
    createPollOption = async (tid: string, option: PollOption): Promise<any> =>
    //PollOptionModel.create({...option, tuit: tid});
        PollOptionModel.create(option).then((option) => {
            console.log(option);
            return TuitModel.findOneAndUpdate(
                {
                    _id: tid
                },
                {
                    $push: {
                        pollOptions: option._id
                    }
                }
                //,{
                //    new: true
                //}
            )
        })

    createPollByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});
     updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: tid},
             {$set: tuit});
     updateLikes = async (tid: string, newStats: any): Promise<any> =>
         TuitModel.updateOne(
             {_id: tid},
             {$set: {stats: newStats}}
         );
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }