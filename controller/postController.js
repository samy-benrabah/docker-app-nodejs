const Post = require("../models/postModels");

exports.getAllPosts = async (req,res,next )=>{

    try {
        const posts = await Post.find();
        res.status(200).json({
            status:'succes',
            results: posts.length,
            posts:{
                posts
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            
        })
    }

}

exports.getOnePost = async (req,res,next)=>{

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status:'succes',
            data: {
                post,
            },
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            
        })
    }
}



exports.createPost = async (req,res,next)=>{

    try {
        const post = await Post.create(req.body);
       return res.status(200).json({
            status:'Post created',
            data: {
                post,
            },
        })
    } catch (error) {
       return res.status(400).json({
            status:'fail',
            
        })
    }
}

exports.updatePost = async (req,res,next)=>{

    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        res.status(200).json({
            status:'succes',
            data: {
                post,
            },
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
           
            
        })
    }
}

exports.deletePost = async (req,res,next)=>{

    try {
        const post = await Post.findByIdAndDelete(req.params.id,req.body);
        res.status(200).json({
            status:'succes',
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            
        })
    }
}