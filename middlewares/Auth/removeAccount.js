const JWT = require("jsonwebtoken");
const UserSchema = require("../../models/User");

const RemoveAccount = async (req, res) => {
    const { secret } = req.headers;
  try {
    if (!secret) {
      return res.status(401).json({
        msg: "Bad request tryagain letter!",
      });
    } else {
      const { id } = await JWT.verify(secret, process.env.JWT_SECRET);
      const deleteAccount = await UserSchema.findOneAndRemove({ _id: id });
      if (deleteAccount) {
        return res.status(200).json({
          msg: "Your account has been deleted!",
        });
      } else {
        return res.status(500).json({
          msg: "An error occured on the server while deleting your account please tryagain or contact support!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server please tryagain or contact support!",
    });
  }
};

module.exports=RemoveAccount;