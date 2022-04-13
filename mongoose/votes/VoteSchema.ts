import mongoose, {Schema} from "mongoose";
import PollOption from "../../models/polls/PollOption";
import Vote from "../../models/votes/Vote";

const VoteSchema = new mongoose.Schema<Vote>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    votedOption: {type: Schema.Types.ObjectId, ref: "PollOptionModel"},
    votedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "Votes"});
export default VoteSchema;