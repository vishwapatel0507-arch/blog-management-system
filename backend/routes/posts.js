const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id
    });

    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Update post
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Add comment
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      text: req.body.text,
      user: req.user.name
    });

    await post.save();

    res.json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;