import mongoose,{Schema} from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videofile: {
        type: String, //clodinary url
        required: true
    },
    thumbnail: {
        type: String, //clodinary url
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    ispublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

videoSchema.plugin(mongooseaggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
