const express = require("express");
const postRoute = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/User");
const Post = require("../model/Post");

const { check, validationResult } = require("express-validator");

postRoute.post(
  "/",
  auth,
  [
    check("title", "title is needed").not().isEmpty().isLength({
      min: 6,
    }),
    check("body", "put a real txt").not().isEmpty().isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { title, body, photo } = req.body;
    try {
      let user = await User.findById(req.user.payload.id).select("-password");
      let post = new Post({
        title,
        body,
        photo,
        postedby: user,
      });
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      res.status(401).json(error);
    }
  }
);

postRoute.get("/", auth, async (req, res) => {
  try {
    let posts = await Post.find();
    return res.status(400).json({
      posts,
    });
  } catch (error) {
    res.status(401).json(error);
  }
});
postRoute.get("/mypost", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.payload.id).select("-password");
    let myposts = await Post.find({postedby : user})
    return res.status(400).json({
      myposts,
    });
  } catch (error) {
    res.status(401).json(error);
  }
});
module.exports = postRoute;
