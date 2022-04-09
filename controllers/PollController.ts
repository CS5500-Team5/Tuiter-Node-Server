/**
 * @file Controller RESTful Web service API for tuits resource
 */
 import TuitDao from "../daos/TuitDao";
 import Tuit from "../models/tuits/Tuit";
 import {Express, Request, Response} from "express";
 import TuitControllerI from "../interfaces/TuitControllerI";
import PollControllerI from "../interfaces/PollControllerI";
import PollDao from "../daos/PollDao";
 
 /**
  * @class TuitController Implements RESTful Web service API for tuits resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/tuits to create a new tuit instance for
  *     a given user</li>
  *     <li>GET /api/tuits to retrieve all the tuit instances</li>
  *     <li>GET /api/tuits/:tid to retrieve a particular tuit instances</li>
  *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
  *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
  *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
  * </ul>
  * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
  * @property {TuitController} tuitController Singleton controller implementing
  * RESTful Web service API
  */
 export default class PollController implements PollControllerI {
     private static pollDao: PollDao = PollDao.getInstance();
     private static pollController: PollController | null = null;
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): PollController => {
         if(PollController.pollController === null) {
            PollController.pollController = new PollController();
             app.get("/api/polls", PollController.pollController.findAllPolls);
             app.get("/api/users/:uid/polls", PollController.pollController.findAllPollsByUser);
             app.get("/api/poll/:uid", PollController.pollController.findPollById);
             app.post("/api/users/:uid/poll", PollController.pollController.createPoll);
             app.post("/api/users/:uid/polls/:tid/option", PollController.pollController.createPollOption);
             app.put("/api/polls/:uid", PollController.pollController.updatePoll);
             app.delete("/api/polls/:uid", PollController.pollController.deletePoll);
         }
         return PollController.pollController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all tuits from the database and returns an array of tuits.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects
      */
     findAllPolls = (req: Request, res: Response) =>
         PollController.pollDao.findAllPolls()
             .then((tuits: Tuit[]) => res.json(tuits));
     
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the tuit to be retrieved
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the tuit that matches the user ID
      */
     findPollById = (req: Request, res: Response) =>
         PollController.pollDao.findPollById(req.params.uid)
             .then((tuit: Tuit) => res.json(tuit));
 
     /**
      * Retrieves all tuits from the database for a particular user and returns
      * an array of tuits.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects
      */
     findAllPollsByUser = (req: Request, res: Response) => {
         // @ts-ignore
         let userId = req.params.uid === "my" && req.session['profile'] ?
             // @ts-ignore
             req.session['profile']._id : req.params.uid;
         if (userId === "my") {
             res.sendStatus(503);
             return;
         }
         PollController.pollDao.findAllPollsByUser(userId)
             .then((tuits: Tuit[]) => res.json(tuits));
     }

     createPollOption =(req: Request, res: Response) => {
         PollController.pollDao.createPollOption(req.params.tid, req.body)
         .then((poll) => res.json(poll));
     }
 
     /**
      * @param {Request} req Represents request from client, including body
      * containing the JSON object for the new tuit to be inserted in the
      * database
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new tuit that was inserted in the
      * database
      */
     createPoll = (req: Request, res: Response) => {
         // @ts-ignore
         let userId = req.params.uid === "my" && req.session['profile'] ?
             // @ts-ignore
             req.session['profile']._id : req.params.uid;
         if (userId === "my") {
             res.sendStatus(503);
             return;
         }
 
         PollController.pollDao.createPollByUser(userId, req.body)
             .then((tuit: Tuit) => res.json(tuit));
     }
 
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the tuit to be modified
      * @param {Response} res Represents response to client, including status
      * on whether updating a tuit was successful or not
      */
     updatePoll = (req: Request, res: Response) =>
         PollController.pollDao.updateTuit(req.params.uid, req.body)
             .then((status) => res.send(status));
 
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the tuit to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a user was successful or not
      */
     deletePoll = (req: Request, res: Response) =>
         PollController.pollDao.deleteTuit(req.params.uid)
             .then((status) => res.send(status));
 };
 