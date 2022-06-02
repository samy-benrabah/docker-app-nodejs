const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"User must have a username"],
        unique:true,
        trim:true
    },

    password:{
        type:String,
        required:[true,"User must have a password"],
        trim:true
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;