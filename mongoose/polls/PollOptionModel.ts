/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
 import mongoose from "mongoose";
 import PollOptionSchema from "./PollOptionSchema";
 const PollOptionModel = mongoose.model("PollOptionModel", PollOptionSchema);
 export default PollOptionModel;