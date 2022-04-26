/**
 * @file Declares User data type represented by values defining a user like username, password, etc.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents users by values like username, password, etc.
 * @property {string} username username of the user.
 * @property {string} password password of the user.
 * @property {string} firstName  first name of the user.
 * @property {string} lastName last name of the user.
 * @property {string} email email of the user.
 * @property {string} profilePhoto profile photo of the user.
 * @property {string} headerImage header image of the user.
 * @property {AccountType} accountType type of account of the user.
 * @property {MaritalStatus} maritalStatus marital status of the user.
 * @property {string} biography biography of the user.
 * @property {Date} dateOfBirth birth date of the user.
 * @property {Date} joined joined date of the user.
 * @property {Location} location location of the user.
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};