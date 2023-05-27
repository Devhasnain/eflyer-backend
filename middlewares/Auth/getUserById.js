const UserSchema = require("../../models/User");

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(401).json({
        msg: "Unautherized",
      });
    } else {
      const findUser = await UserSchema.findOne({ _id: id });
      if (findUser) {
        return res.status(200).json({
          msg: "Successful",
          status: true,
        });
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

module.exports = getUserById;
