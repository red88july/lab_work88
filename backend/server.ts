import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

import connectToDB from "./connectToDB";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

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