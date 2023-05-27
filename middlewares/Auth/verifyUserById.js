const UserSchema = require("../../models/User");

const verifyUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(401).json({
        msg: "Unautherized",
      });
    } else {
      const findUser = await UserSchema.findOne({ _id: id });
      if (findUser) {
        next();
      } else {
        return res.status(401).json({
          msg: "Unautherized",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
};

module.exports = verifyUserById;
