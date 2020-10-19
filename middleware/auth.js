const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: "not authorised",
        });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "secret", (err, payload) => {
        if (err) {
            return res.status(401).json({ err: "must log in" });
        }
        //console.log(payload);
        req.user = payload;
    });
    next();
}