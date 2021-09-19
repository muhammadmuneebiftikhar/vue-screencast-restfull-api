const jwt = require("jsonwebtoken")

module.exports = (req, res , next) => {
    try{
        const token = req.headers.authorization;
        if(jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) next();
        else throw Error;
    } catch(error) {
        return res.status(401).json({
            message: "Auth Failed"
        })
    }
}