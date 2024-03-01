import mongoose, {Types} from "mongoose";
import {Router} from 'express';

import Comment from "../models/Comment";
import auth, {RequestUser} from "../middleware/auth";

import {CommentsDataTypes} from "../types";

export const commentsRouter = Router();

commentsRouter.post('/', auth, async (req: RequestUser, res, next) => {

    try {

        if (!req.body.comment || req.body.comment === '') {
            return res.status(422).send({error: 'Comment field is not to be an empty!'})
        }

        const commentsData: CommentsDataTypes = {
            user: req.user,
            post: req.body.post,
            comment: req.body.comment,
        };

        const newComment = new Comment(commentsData);
        await newComment.save();

        res.send({message: 'New comment added correctly!', newComment});

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});

commentsRouter.get('/', async (req, res, next) => {

    try {

        const queryParam = await Comment.findOne({post: req.query.post});
        let query: { post?: string } = {};

        if (queryParam) {
            query.post = req.query.post as string;
        }

        const getCommentById = await Comment.find(query).populate(
            {path: 'user', select: 'username'}).sort({date: -1});

        res.send(getCommentById);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }

});