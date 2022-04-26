import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    userDislikesTuit (tid: string, uid: string): Promise<any>;
    userUndoDislikes (tid: string, uid: string): Promise<Dislike>;
};