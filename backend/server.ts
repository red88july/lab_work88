import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

import connectToDB from "./connectToDB";
import { usersRouter } from "./routers/users";
import { postsRouter } from "./routers/posts";
import { commentsRouter } from "./routers/comments";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {

    await mongoose.connect(connectToDB.db);

    app.listen(port, () => {
        console.log(`Server is running on ${port}!`);
    })

    process.on('exit', ()=> {
        mongoose.disconnect();
    });

}

void run();