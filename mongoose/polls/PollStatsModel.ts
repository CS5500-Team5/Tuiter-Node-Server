/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
import mongoose from "mongoose";
import PollStatsSchema from "./PollStatsSchema";

const PollStatsModel = mongoose.model("PollStatsModel", PollStatsSchema);
export default PollStatsModel;