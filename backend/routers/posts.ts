import mongoose, {Types} from "mongoose";
import {Router} from 'express';

import auth, {RequestUser} from "../middleware/auth";
import {PostsDataTypes} from "../types";
import Post from "../models/Post";
import {imageUpload} from "../multer";
import User from "../models/User";
import {usersRouter} from "./users";


export const postsRouter = Router();

postsRouter.post('/', auth, imageUpload.single('image'), async (req: RequestUser, res, next) => {

    try {
        if (!req.body.description || req.body.description === '' && req.file?.filename) {
            return res.status(422).send({message: `Field Description is not to be an empty`});
        }

        const postData: PostsDataTypes = {
            user: req.user,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };

        const newPost = new Post(postData);
        await newPost.save();

        res.send(newPost);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});

postsRouter.get('/', async (req, res, next) => {

    try {

        const getPosts = await Post.find().populate({path: 'user', select: 'username'}).sort({datetime: -1});
        return res.send(getPosts);

    } catch (e) {
        next(e);
    }

});

postsRouter.get('/:id', async (req, res, next) => {

    try {

        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({error: 'Wrong ObjectId'});
        }

        const getPostById = await Post.findById(_id)
            .populate({path: 'user', select: 'username'});


        return res.send(getPostById);

    } catch (e) {
        next(e);
    }

});