const AdminsSchema = require("../../models/Admin");

const DeleteAdmin = async (req, res) => {
  const { email, _id, role } = req.body;
  const { user } = req;
  try {
    if (!user) {
      return res.status(500).json({
        msg: `We have got some errors while deleting this user ${email}, tryagain letter!`,
      });
    }
    if (!email && !_id) {
      return res.status(400).json({
        msg: "Please provide valid data to complete this action!",
      });
    }

    if (user.role !== "super_admin") {
      return res.status(401).json({
        msg: "You don't have permissions to perfom this action",
      });
    }

    const deleteUser = await AdminsSchema.findByIdAndDelete({
      _id: _id,
      email: email,
      role: role,
    });

    if (!deleteUser) {
      return res.status(500).json({
        msg: `We have got some errors while deleting this user ${email}, tryagain letter!`,
      });
    }

    return res.status(200).json({
      msg: "User delete successfuly",
      status:true
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Some Error occured on the server tryagain!",
    });
  }
};

module.exports = DeleteAdmin;
