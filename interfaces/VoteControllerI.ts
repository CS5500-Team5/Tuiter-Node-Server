import {Request, Response} from "express";

export default interface VoteControllerI {
    findAllUsersThatVotedOnTuit (req: Request, res: Response): void;
    findVoteByUserOnTuit (req: Request, res: Response): void;
    createVote (req: Request, res: Response): void;
    updateVote (req: Request, res: Response): void;
    deleteVote (req: Request, res: Response): void;
};