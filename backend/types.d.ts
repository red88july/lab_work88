import { Model } from "mongoose";
import User from "./models/User";
export interface UserData {
    username: string;
    password: string;
}

export interface UserDataExtendsSchema extends UserData {
    token: string;
}

export interface PostDataTypes {
    user: User;
    title: string;
    description: string;
    image: string | null
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>