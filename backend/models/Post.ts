import { Schema, model, Types } from "mongoose";
import User from "./User";

const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            }
        }
    },

    title: {
        type: String,
        required: true,
    },

    description: String,

    image: String,

    datetime: {
        type: Date,
        required: true,
        default: () => new Date(),
    }

}, { versionKey: false });

const Post = model('Post', PostSchema);

export default Post;