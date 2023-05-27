const UserSchema = require("../../models/User");
const _ = require("lodash");

const UpdateProfile = async (req, res) => {
  const { user } = req;
  const data = req.body;
  try {
    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    if (!data.name || !data.email) {
      return res.status(400).json({
        msg: "invalid data",
      });
    }
    const updateProfileData = await UserSchema.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name: data.name,
          email: data.email,
          number: data.number,
        },
      },
      { new: true }
    );
    if (updateProfileData) {
      const data = _.pick(updateProfileData, [
        "name",
        "_id",
        "email",
        "number",
        "cart",
        "orders",
      ]);
      return res.status(200).json({
        msg: "Profile updated successfuly",
        data: data,
        status: true,
      });
    } else {
      return res.status(500).json({
        msg: "An error occured on the server while updating profile!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server!",
    });
  }
};

module.exports = UpdateProfile;
