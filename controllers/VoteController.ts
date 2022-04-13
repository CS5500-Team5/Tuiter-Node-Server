/**
 * @file Controller RESTful Web service API for votes resource
 */
import {Express, Request, Response} from "express";
import VoteControllerI from "../interfaces/VoteControllerI";
import VoteDao from "../daos/VoteDao";
import Vote from "../models/votes/Vote";

/**
 * @class VoteController Implements RESTful Web service API for vote resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/votes/:tid/:poid to create a new vote instance for
 *     a given user on a poll</li>
 *     <li>GET /api/votes/:tid to retrieve all the vote instances for a poll</li>
 *     <li>GET /api/votes/:tid/users/:uid to retrieve a particular vote instances
 *     for a given user on poll</li>
 *     <li>PUT /api/votes/:vid to modify an individual vote instance </li>
 *     <li>DELETE /api/votes/:uid/:tid to remove a particular vote instance</li>
 * </ul>
 * @property {VoteDao} voteDao Singleton DAO implementing vote CRUD operations
 * @property {VoteController} voteController Singleton controller implementing
 * RESTful Web service API
 */
export default class VoteController implements VoteControllerI {
    private static voteDao: VoteDao = VoteDao.getInstance();
    private static voteController: VoteController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return VoteController
     */
    public static getInstance = (app: Express): VoteController => {
        if(VoteController.voteController === null) {
            VoteController.voteController = new VoteController();
            app.get("/api/votes/:tid", VoteController.voteController.findAllUsersThatVotedOnTuit);
            app.get("/api/votes/:tid/users/:uid", VoteController.voteController.findVoteByUserOnTuit);
            app.post("/api/users/:uid/votes/:tid/:poid", VoteController.voteController.createVote);
            app.put("/api/votes/:vid", VoteController.voteController.updateVote);
            app.delete("/api/votes/:uid/:tid", VoteController.voteController.deleteVote);
        }
        return VoteController.voteController;
    }

    private constructor() {}

    /**
     * Retrieves all votes on a poll from the database and returns an array of votes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the vote objects
     */
    findAllUsersThatVotedOnTuit = (req: Request, res: Response) =>
        VoteController.voteDao.findAllUsersThatVotedOnTuit(req.params.tid)
            .then((votes: Vote[]) => res.json(votes));

    /**
     * @param {Request} req Represents request from client, including path
     * parameters tid, uid identifying the primary keys of the vote to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the vote that matches the user ID and tuit id
     */
    findVoteByUserOnTuit = (req: Request, res: Response) =>
        VoteController.voteDao.findVoteByUserOnTuit(req.params.tid, req.params.uid)
            .then((vote: Vote) => res.json(vote));

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new vote to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new vote that was inserted in the
     * database
     */
    createVote = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;
        if (userId === "my") {
            res.sendStatus(503);
            return;
        }

        VoteController.voteDao.createVote(userId, req.params.tid, req.params.poid)
            .then((vote: Vote) => res.json(vote));
    }

    /**
     * @param {Request} req Represents request from client, including vote
     * body and path parameter tid identifying the primary key of the vote
     * to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a vote was successful or not
     */
    updateVote = (req: Request, res: Response) =>
        VoteController.voteDao.updateVote(req.params.vid, req.body)
            .then((status) => res.send(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameters tid, uid identifying the primary keys of the vote to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a vote was successful or not
     */
    deleteVote = (req: Request, res: Response) =>
        VoteController.voteDao.deleteVote(req.params.uid, req.params.tid)
            .then((status) => res.send(status));
};
