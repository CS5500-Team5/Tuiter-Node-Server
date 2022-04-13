import mongoose, {Schema} from "mongoose";
import PollStats from "../../models/polls/PollStats";

const PollStatsSchema = new mongoose.Schema<PollStats>({
    votes: [{type: Number, required: true}],
    numParticipated: Number,
}, {collection: "pollStats"});
export default PollStatsSchema;