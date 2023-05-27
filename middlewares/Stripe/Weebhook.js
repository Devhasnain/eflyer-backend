const AdminsOrdersSchema = require("../../models/AdminOrders");
const UserSchema = require("../../models/User");
const _ = require("lodash");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const WebHook = async (req, res) => {
  const event = req.body;
  const stripeWebhookSecret = process.env.STRIPE_WEB_HOOK_KEY;
  const stripeSignature = req.headers["stripe-signature"];

  const data = event.data.object;

  if (event.type === "checkout.session.completed") {
    const { line_items } = await stripe.checkout.sessions.retrieve(data.id, {
      expand: ["line_items"],
    });

    let items = [];

    for (let i = 0; i < line_items.data.length; i++) {
      let product = await stripe.products.retrieve(
        line_items.data[i].price.product
      );
      items.push(product);
    }

    let CreateOrder = await AdminsOrdersSchema.create({
      pending: true,
      delivered: false,
      deliveredAt: false,
      created: data.created,
      total: data.amount_total / 100,
      status: false,
      user: data.metadata,
      items: items,
    });

    if (CreateOrder) {
      await UserSchema.findByIdAndUpdate(
        { _id: CreateOrder.user.id },
        { $push: { orders: CreateOrder._id } }
      );
    }

    res.sendStatus(200);
  } else {
    res.sendStatus(200);
  }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(400).send("Webhook error");
  //   }
  return res.status(200);
};

module.exports = WebHook;
