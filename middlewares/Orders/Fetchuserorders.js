const AdminOrdersSchema = require("../../models/AdminOrders");
const Fetchuserorders = async (req, res) => {
  const { user } = req;
  try {
    if (!user) {
      return res.status(401).json({
        msg: "Bad request",
        status: false,
      });
    }

    if (user.orders.length === 0) {
      return res.status(200).json({
        msg: "You did't have created any orders",
      });
    }

    let items = [];

    for (let i = 0; i < user.orders.length; i++) {
      const getOrderedItems = await AdminOrdersSchema.findOne({
        _id: user.orders[i],
        "user.id": user._id,
        "user.email": user.email,
      });

      items.push(getOrderedItems);
    }

    if (items.length > 0) {
      return res.status(200).json({ orders: items,status:true });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "An error occured while fetching orders",
    });
  }

  // return res.status(200).json(user)

};

module.exports = Fetchuserorders;
