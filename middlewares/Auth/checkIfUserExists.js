const UserSchema = require("../../models/User");

const CheckIfUserAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        msg: "Bad request",
      });
    } else {
      const checkUser = await UserSchema.findOne({ email: email });
      if (!checkUser) {
        next();
      }else{
          return res.status(409).json({
            msg: "User already exists with this email tryagain letter!",
          });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server while logining in tryagain letter or contact support!",
    });
  }
};

module.exports = CheckIfUserAlreadyExists
