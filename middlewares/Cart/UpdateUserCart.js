const UserSchema = require("../../models/User");
const _ = require('lodash');

const UpdateUsersCart = async (req, res) => {
  const { user } = req;
  const { items } = req.body;
  try {
    if(!items){
      return res.status(400).json({
        msg:"Bad request"
      })
    }
    const updatedItems = await [...items];
    const UpdateUserCart = await UserSchema.findByIdAndUpdate(
      { _id: user._id },
      { $set: { cart: updatedItems } },
      { new: true, runValidators: true }
    );
    if (UpdateUserCart) {
      const {cart} = _.pick(UpdateUserCart,['cart']);
      return res.status(200).json(cart);
    } else {
      return res.status(500).json({
        msg: "An error occured while updating cartitems please tryagain letter!",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Some error occured" });
  }
};
module.exports = UpdateUsersCart;
