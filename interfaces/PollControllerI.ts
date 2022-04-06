import {Request, Response} from "express";

export default interface PollControllerI {
    findAllPolls (req: Request, res: Response): void;
    findAllPollsByUser (req: Request, res: Response): void;
    findPollById (req: Request, res: Response): void;
    findTuitByPoll (req: Request, res: Response): void;
    createPoll (req: Request, res: Response): void;
    updatePoll (req: Request, res: Response): void;
    deletePoll (req: Request, res: Response): void;
};