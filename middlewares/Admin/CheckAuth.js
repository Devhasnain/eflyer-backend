const JWT = require("jsonwebtoken");
const AdminsSchema = require("../../models/Admin");

const CheckAuth = async (req, res, next) => {
  const { accesstoken } = req.headers;

  try {
    if (!accesstoken) {
      return res.status(400).json({
        msg: "Bad request",
      });
    }

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

    req.user = findUser;
    next();
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server",
    });
  }
};

module.exports = CheckAuth;
