const UserSchema = require("../../models/User");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const ChangePassword = async (req, res) => {
  const { user } = req;
  const { password, currentpassword } = req.body;
  try {
    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    } else {
      if (!password && !currentpassword) {
        return res.status(400).json({
          msg: "invalid data",
        });
      } else {
        const getPassword = await UserSchema.findOne({ _id: user._id });

        const comparePassword = await bcrypt.compare(
          currentpassword,
          getPassword.password
        );

        if (!comparePassword) {
          return res.status(400).json({
            msg: "Password did't matched",
          });
        } else {
          const changePass = await bcrypt.hash(password, 12);

          if (!changePass) {
            return res.status(500).json({
              msg: "Error occured while changing password",
            });
          } else {
            const updatePassword = await UserSchema.findOneAndUpdate(
              { _id: user._id },
              {
                $set: {
                  password: changePass,
                },
              },
              { new: true }
            );

            if (updatePassword) {
              return res.status(200).json({
                msg: "Password changed successfuly successfuly!",
                status: true,
              });
            } else {
              return res.status(500).json({
                msg: "An error occured on the server while updating profile!",
              });
            }
          }
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server!",
    });
  }
};

module.exports = ChangePassword;
