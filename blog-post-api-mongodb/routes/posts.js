import express from "express";
import Post from "../models/Post.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/", async (req, res) => {
    const allPosts = await Post.find();
    allPosts.length ? res.status(200).json(allPosts) : res.status(404).json({ message: "No posts found" });
})

router.get("/post/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findPost = await Post.findById(id);
        return res.status(200).json(findPost);
    } catch (error) {
        return res.status(404).json({
            Message: "Post Not found"
        });
    }
});

router.post("/", async (req, res) => {
    const { content } = req.body
    const post = req.body
    const findPost = await Post.findOne({ content: content })

    if (findPost) return res.status(404).json({
        Message: "Post Already Exits"
    })

    const newPost = await new Post(post);
    const savedPost = newPost.save();
    if (savedPost) {
        return res.status(200).json({
            isSaved: true
        })
    }
    res.status(500).json({
        isSaved: false,
        Error: "Something happend with server"
    })
})



export { router as postRouter }