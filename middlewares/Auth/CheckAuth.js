const JWT = require("jsonwebtoken");
const UserSchema = require("../../models/User");
const _ = require('lodash');

const CheckAuth = async (req, res,next) => {
  const { secret } = req.headers;
  try {
    if (secret) {
      const Token = await JWT.verify(secret, process.env.JWT_SECRET);
      if (!Token) {
        return res.status(409).json({
          msg: "Bad request",
        });
      } else {
        const findUser = await UserSchema.findOne({ _id: Token.id });
        const data = _.pick(findUser,['name','email','number','orders','cart','_id'])
        if (findUser) {
            req.user=data
            next()
        } else {
          return res.status(500).json({
            msg: "An error occured on the server while logining in tryagain letter or contact support!",
          });
        }
      }
    } else {
      return res.status(401).json({
        msg: "Bad request",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server while logining in tryagain letter or contact support!",
    });
  }
};

module.exports = CheckAuth;
