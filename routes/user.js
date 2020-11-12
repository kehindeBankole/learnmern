const express = require("express");
const userRoute = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { check, body, validationResult } = require("express-validator");
userRoute.post(
  "/",
  [
    check("name", "name is needed").not().isEmpty(),
    check("email", "please put valid email").isEmail(),
    check("password", "must be up to 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "please check well",
      });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          error: "user already exsits",
        });
      }
      user = new User({
        name,
        email,
        password,
      });
      let salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
      await user.save();
      let payload = {
        id: user.id,
      };
      let token = jwt.sign(
        {
          payload,
        },
        "secret",
        {
          expiresIn: 360000,
        }
      );
      return res.status(200).json({
        msg: "user saved successfully",
        token,
        user
      });
    } catch (error) {
      return res.status(401).json({
        error,
      });
    }
  }
);
module.exports = userRoute;
