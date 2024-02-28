import mongoose from "mongoose";
import {Router} from 'express';

import auth, { RequestUser } from "../middleware/auth";
import { PostsDataTypes } from "../types";
import Post from "../models/Post";
import { imageUpload } from "../multer";
import User from "../models/User";
import {usersRouter} from "./users";


export const postsRouter = Router();

postsRouter.post('/', auth, imageUpload.single('image'), async (req: RequestUser, res, next) => {

    try {
        if (!req.body.description || req.body.description === '' && req.file?.filename) {
            return res.status(422).send({error: `Field Description is not to be an empty`});
        }

        const postData: PostsDataTypes = {
            user: req.user,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };

        const newPost = new Post(postData);
        await newPost.save();

        res.send({message: 'New post added correctly!', newPost});

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});