const bcrypt = require("bcrypt");
const AdminsSchema = require("../../models/Admin");
const UserSchema = require("../../models/User");
const CreateUser = async (req, res) => {
  const { email, password, number, role,name } = req.body;
  const { user } = req;
  try {
    if (!email && !password) {
      return res.status(400).json({
        msg: "Bad request",
      });
    }

    if (!number && !role) {
      return res.status(400).json({
        msg: "Bad request",
      });
    }

    if (user.role !== "super_admin") {
      return res.status(401).json({
        msg: "Bad request",
      });
    }

    const checkUniqueEmail = await AdminsSchema.findOne({ email: email });
    const checkUniqueEmailinUsers = await UserSchema.findOne({ email: email });

    if (checkUniqueEmail && checkUniqueEmail.email === email) {
      return res.status(400).json({
        msg: "Admin already exists with this email.",
        status: false,
      });
    }

    if (checkUniqueEmailinUsers && checkUniqueEmailinUsers.email === email) {
      return res.status(400).json({
        msg: "User already exists with this email.",
        status: false,
      });
    }

    const hashpass = await bcrypt.hash(password, 12);

    if (!hashpass) {
      return res.status(500).json({
        msg: "An error occured on the server",
      });
    }

    const createUser = await AdminsSchema.create({
      name,
      email,
      number,
      password: hashpass,
      role,
    });

    if (!createUser) {
      return res.status(500).json({
        msg: "An error occured on the server",
      });
    }

    const saveuser = await createUser.save();

    if (!saveuser) {
      return res.status(500).json({
        msg: "An error occured on the server",
      });
    }

    return res.status(200).json({
      msg: "User created successfuly",
      status: true,
    });

  } catch (error) {
    return res.status(500).json({
      msg: "An error occured on the server",
    });
  }
};

module.exports = CreateUser;
