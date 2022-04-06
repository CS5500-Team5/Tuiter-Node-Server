import User from "../users/User";
import Stats from "./Stats";
import PollStats from "../polls/PollStats";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats,
    isPoll: Boolean,
    pollStats?: PollStats
};