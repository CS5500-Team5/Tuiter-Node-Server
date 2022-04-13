/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
import mongoose from "mongoose";
import VoteSchema from "./VoteSchema";

const VoteModel = mongoose.model("VoteModel", VoteSchema);
export default VoteModel;