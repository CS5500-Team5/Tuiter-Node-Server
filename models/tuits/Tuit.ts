/**
 * @file Declares Tuit data type represented by values like tuit, poll related values, postedOn, postedBy, etc.
 */
import User from "../users/User";
import Stats from "./Stats";
import PollStats from "../polls/PollStats";
import PollOption from "../polls/PollOption";

/**
 * @typedef Tuit Represents tuits by values like tuit, postedOn, postedBy, topics, tags, polls, etc.
 * @property {string} tuit Tuit being posted.
 * @property {Date} postedOn Date the tuit was posted on.
 * @property {string} postedBy Name of the user posting the tuit.
 * @property {string} image Image used in the tuit.
 * @property {string} youtube Youtube link in the tuit.
 * @property {string} avatarLogo Logos used in the tuit.
 * @property {string} imageOverlay Overlay images in the tuit.
 * @property {Stats} stats Stats related to the tuit.
 * @property {Boolean} isPoll If tuit is a poll.
 * @property {Boolean} isPollOpen If poll is open.
 * @property {PollStats} pollStats Stats related to the Poll.
 * @property {[PollOption]} PollOption Options in the poll.
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats,
    isPoll?: Boolean,
    isPollOpen?: Boolean,
    pollStats?: PollStats,
    pollOptions: [PollOption]
};