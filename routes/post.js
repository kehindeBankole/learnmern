const express = require("express");
const postRoute = express.Router();
const auth = require("../middleware/auth")
const User = require("../model/User");
const Post = require("../model/Post");
const multer = require('multer');
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './uploads/') 
    }, 
    filename: (req, file, cb) => { 
        cb(null,  file.originalname) 
    } 
});
const upload = multer({storage : storage})
const { check, validationResult } = require("express-validator");


postRoute.post('/', upload.single('photo') ,auth, [
    check("title", "title is needed").not().isEmpty().isLength({ min: 6 }),
    check("body", "put a real txt").not().isEmpty().isLength({ min: 6 }),
    // check("photo", "put a real image").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const{title , body , photo} = req.body
    try {
        let user = await User.findById(req.user.payload.id).select('-password')
        console.log(req.file)
        let post = new Post({
            title,
            body,
            // photo:req.file,
            // postedby:user
        })
        // await post.save()
        res.send(post)
    } catch (error) {
        res.send(error)
    }
})

module.exports = postRoute