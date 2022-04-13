/**
 * @file Controller RESTful Web service API for polls resource
 */
 import TuitDao from "../daos/TuitDao";
 import Tuit from "../models/tuits/Tuit";
 import {Express, Request, Response} from "express";
 import TuitControllerI from "../interfaces/TuitControllerI";
import PollControllerI from "../interfaces/PollControllerI";
import PollDao from "../daos/PollDao";
 
 /**
  * @class PollController Implements RESTful Web service API for poll resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/polls to create a new poll instance for
  *     a given user</li>
  *     <li>POST /api/users/:uid/polls/:tid/option to create a new poll option for
  *     a previously created poll by a given user</li>
  *     <li>GET /api/polls to retrieve all the poll instances</li>
  *     <li>GET /api/polls/:tid to retrieve a particular poll instances</li>
  *     <li>GET /api/users/:uid/polls to retrieve polls for a given user </li>
  *     <li>PUT /api/polls/:tid to modify an individual poll instance </li>
  *     <li>DELETE /api/polls/:tid to remove a particular tuit instance</li>
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
      * @return PollController
      */
     public static getInstance = (app: Express): PollController => {
         if(PollController.pollController === null) {
            PollController.pollController = new PollController();
             app.get("/api/polls", PollController.pollController.findAllPolls);
             app.get("/api/users/:uid/polls", PollController.pollController.findAllPollsByUser);
             app.get("/api/polls/:uid", PollController.pollController.findPollById);
             app.post("/api/users/:uid/polls", PollController.pollController.createPoll);
             app.post("/api/users/:uid/polls/:tid/option", PollController.pollController.createPollOption);
             app.put("/api/polls/:uid", PollController.pollController.updatePoll);
             app.delete("/api/polls/:uid", PollController.pollController.deletePoll);
         }
         return PollController.pollController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all polls from the database and returns an array of polls.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the poll objects
      */
     findAllPolls = (req: Request, res: Response) =>
         PollController.pollDao.findAllPolls()
             .then((tuits: Tuit[]) => res.json(tuits));
     
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the poll to be retrieved
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the poll that matches the user ID
      */
     findPollById = (req: Request, res: Response) =>
         PollController.pollDao.findPollById(req.params.uid)
             .then((tuit: Tuit) => res.json(tuit));
 
     /**
      * Retrieves all poll from the database for a particular user and returns
      * an array of poll.
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
      * containing the JSON object for the new poll to be inserted in the
      * database
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new poll that was inserted in the
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
      * parameter tid identifying the primary key of the poll to be modified
      * @param {Response} res Represents response to client, including status
      * on whether updating a poll was successful or not
      */
     updatePoll = (req: Request, res: Response) =>
         PollController.pollDao.updatePoll(req.params.uid, req.body)
             .then((status) => res.send(status));
 
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the poll to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a poll was successful or not
      */
     deletePoll = (req: Request, res: Response) =>
         PollController.pollDao.deletePoll(req.params.uid)
             .then((status) => res.send(status));
 };
 