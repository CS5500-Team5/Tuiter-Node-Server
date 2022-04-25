import mongoose, {Schema} from "mongoose";
import PollOption from "../../models/polls/PollOption";

const PollOptionSchema = new mongoose.Schema<PollOption>({
    optionText: {type: String, required: true},
    numVoted: {type: Number, default: 0},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true}
}, {collection: "pollOptions"});
export default PollOptionSchema;