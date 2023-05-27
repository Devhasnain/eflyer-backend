const JWT = require("jsonwebtoken");
const AdminsSchema = require("../../models/Admin");
const UsersSchema=require('../../models/User');
const ordersSchema=require('../../models/AdminOrders');

const SignInMiddleware = async (req, res, next) => {
  const { accesstoken } = req.headers;
  const { email, password } = req.body;

  try {
    if (accesstoken) {
      const { id } = await JWT.verify(accesstoken, process.env.JWT_SECRET);
      if (!id) {
        return res.status(401).json({
          msg: "Bad request",
        });
      }

      const findUser = await AdminsSchema.findOne({ _id: id }).select(
        "-password"
      );

      if (!findUser) {
        return res.status(401).json({
          msg: "Bad request",
        });
      }

      const admins = await AdminsSchema.find().select("-password");
      const users = await UsersSchema.find().select("-password");
      const orders = await ordersSchema.find();

      return res.status(200).json({
        accesstoken,
        msg: "Sign in successful",
        status: true,
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
    } else if (email && password) {
      if(email !== '' && password !==''){
        next();
      }
    } else {
      return res.status(401).json({
        msg: "Bad request",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server",
    });
  }
};

module.exports = SignInMiddleware;
