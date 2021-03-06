import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userUndoDislikes (req: Request, res: Response): void;
};