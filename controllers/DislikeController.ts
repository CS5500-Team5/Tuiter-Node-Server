/**
 * @file Controller RESTful Web service API for dislikes resource
 */
 import {Express, Request, Response} from "express";
 import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
 import DislikeControllerI from "../interfaces/DislikeControllerI";
 
 /**
  * @class DislikeController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits liked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that liked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/dislikes/:tid to record that a user likes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/undo/:tid to record that a user
  *     no londer likes a tuit</li>
  *     <li>PUT /api/users/:uid/dislikes/:tid to change toggle status of a tuit
  *     disliked by a user</li>
  * </ul>
  * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
  * @property {DislikeController} DislikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class DislikeController implements DislikeControllerI {
     private static dislikeDao: DislikeDao = DislikeDao.getInstance();
     private static tuitDao: TuitDao = TuitDao.getInstance();
     private static dislikeController: DislikeController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): DislikeController => {
         if(DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
             app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
             app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
             app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
             app.delete("/api/users/:uid/undo/:tid", DislikeController.dislikeController.userUndoDislikes);
             app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
         }
         return DislikeController.dislikeController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that disliked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the disliked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
      findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
             .then(likes => res.json(likes));
 
     /**
      * Retrieves all tuits disliked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user who disliked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
      findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        //console.log(profile);
        const userId = uid === "me" && profile ?
            profile._id : uid;
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
             .then(likes => {
                const dislikesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromDislikes = dislikesNonNullTuits.map(like => like.tuit);
                 res.json(tuitsFromDislikes);
             });
      }
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is disliking the tuit
      * and the tuit being disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new dislikes that was inserted in the
      * database
      */
      userDislikesTuit = (req: Request, res: Response) =>
      DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
             .then(likes => res.json(likes));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is undoing a dislike
      * and the disliked tuit
      * @param {Response} res Represents response to client, including status
      * on whether deleting the dislike was successful or not
      */
      userUndoDislikes = (req: Request, res: Response) =>
         DislikeController.dislikeDao.userUndoDislikes(req.params.uid, req.params.tid)
             .then(status => res.send(status));

    /**
     * Toogles dislike status of a tuit
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is disliking
      * the tuit and the tuit being disliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the dislike was successful or not
      */
    userTogglesTuitDislikes = async (req: any, res: Response) => {
    const uid = req.params.uid;
    const tid = req.params.tid;
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
            profile._id : uid;
    try {
        const userAlreadyDislikedTuit = await DislikeController.dislikeDao
            .findUserDislikesTuit(userId, tid);
        //console.log("already:" + userAlreadyDislikedTuit);
        const howManyDislikedTuit = await DislikeController.dislikeDao
            .countHowManyDislikedTuit(tid);
        //console.log("count:" + howManyDislikedTuit);
        var tuit = await DislikeController.tuitDao.findTuitById(tid);
        if (userAlreadyDislikedTuit) {
        await DislikeController.dislikeDao.userUndoDislikes(userId, tid);
        tuit.stats.dislikes = howManyDislikedTuit - 1;
        } else {
        await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDislikedTuit + 1;
        };
        await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
    }
              
 };