const express = require("express");
const authRoute = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth")
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

authRoute.post('/', [
    check("email", "please put valid email").isEmail(),
    check("password", "must be up to 6").isLength({
        min: 6,
    }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "user doesnt exist",
            });
        }
        let ispword = bcrypt.compareSync(password, user.password);
        if (!ispword) {
            return res.status(400).json({
              error: "invalid details",
            });
          }
          let payload = {
            id: user.id,
        };
        let token = jwt.sign(
          {
            payload,
          },
          "secret",
          { expiresIn: 360000 }
        );
        return res.status(200).json({
          msg: "log in successfull",
          token,
        });
    } catch (error) {

    }
})

authRoute.get('/' , auth , async (req , res)=>{

try {
    let user = await User.findById(req.user.payload.id)
    res.send(user)
} catch (error) {
    return res.status(401).json({ error});
}
})
module.exports = authRoute