const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const UserSchema = require("../../models/User");

const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const findUser = await UserSchema.findOne({ email: email });
      if (findUser) {
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (checkPassword) {
          const token = JWT.sign({ id: findUser._id }, process.env.JWT_SECRET);
          return res.status(200).json({
            login: "successful",
            status: true,
            secret: token,
          });
        } else {
          return res.status(401).json({
            msg: "Bad request",
          });
        }
      }else{
        return res.status(401).json({
          msg: "Bad request",
        });  
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

module.exports = Signin;
