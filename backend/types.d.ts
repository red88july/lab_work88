import { Model } from "mongoose";
import User from "./models/User";
import Post from "./models/Post";
export interface UsersDataTypes {
    username: string;
    password: string;
}

export interface UserDataExtendsSchema extends UsersDataTypes {
    token: string;
}

export interface PostsDataTypes {
    user: User;
    title: string;
    description: string;
    image: string | null
}

export interface CommentsDataTypes {
    user: User;
    post: Post;
    comment: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>