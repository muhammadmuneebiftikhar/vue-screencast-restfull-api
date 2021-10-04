const jwt = require("jsonwebtoken");

const User = require("../Modules/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decode) {
      console.log(decode);
      const user = await User.findOne({ _id: decode.userId });
      console.log(user);
      if (user.admin) next();
    }
    // if (decode && )
    else throw new Error("Auth Failed");
    // if(jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) next();
    // else throw Error;
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
