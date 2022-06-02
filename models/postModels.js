const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Post must have a title "],
    },
    body:{
        type:String,
        required:[true,"Post must have a content"],
    },
});

const Post = mongoose.model("Post",postSchema);
module.exports=Post;