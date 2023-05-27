const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const AdminsSchema = require("../../models/Admin");
const UsersSchema = require("../../models/User");
const ordersSchema = require("../../models/AdminOrders");

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(400).json({
        msg: "Bad Request",
      });
    }

    const findUser = await AdminsSchema.findOne({ email: email });
    if (!findUser) {
      return res.status(401).json({
        msg: "User not found",
      });
    }

    const checkpassword = await bcrypt.compare(password, findUser.password);
    if (!checkpassword) {
      return res.status(401).json({
        msg: "User not found",
      });
    }

    const accesstoken = await JWT.sign(
      { id: findUser._id },
      process.env.JWT_SECRET
    );

    if (!accesstoken) {
      return res.status(500).json({
        msg: "An error occured on the server",
      });
    }

    const admins = await AdminsSchema.find().select("-password");
    const users = await UsersSchema.find().select("-password");
    const orders = await ordersSchema.find();

    return res.status(200).json({
      msg: "Sign in successful",
      status: true,
      accesstoken,
      data: {
        role:findUser.role,
        name: findUser.name,
        _id: findUser._id,
        email: findUser.email,
        number: findUser.number,
        admins,
        users,
        orders,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server",
    });
  }
};

module.exports = SignIn;
