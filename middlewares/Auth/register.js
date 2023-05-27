const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const UserSchema = require("../../models/User");

const RegisterUser = async (req, res) => {
  const { email, password, name, number } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    if (hashPassword) {
      const CreateUser = await UserSchema.create({
        name,
        email,
        password: hashPassword,
        number,
      });
      await CreateUser.save()
        .then((result) => {
          const secret = JWT.sign({id:result._id}, process.env.JWT_SECRET);
          return res.status(200).json({
            secret,
            msg: "Sign up successful",
            status: true,
          });
        })
        .catch((error) => {
            console.log(error)
          return res.status(500).json({
            msg: "An error occured on the server while signup please tryagain or contact support!",
          });
        });
    } else {
      return res.status(500).json({
        msg: "An error occured on the server while signup please tryagain or contact support!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server while signup please tryagain or contact support!",
    });
  }
};

module.exports = RegisterUser;
