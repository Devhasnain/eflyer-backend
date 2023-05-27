const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

let fakeDescription="A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering"

const CheckOut = async (req, res) => {
  const { items,success_url,cancel_url } = req.body;
  const { user } = req;

  try {
    if (items && items.length > 0) {
      const line_items = await Promise.all(
        items.map(async (item) => {

          const product = await stripe.products.create({
            name: item.name,
            images: [item.image],
            description:fakeDescription,
            metadata: {
              price: item.price,
            },
          });

          const price = await stripe.prices.create({
            currency: "usd",
            unit_amount: item.price * 100,
            product: product.id,
          });

          return {
            price: price.id,
            quantity: item.qty ? item.qty : 1,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: success_url,
        cancel_url: cancel_url,
        metadata: {id:user._id.toString(),name:user.name,email:user.email },
      });

      //   console.log(user, items, session);

      res.status(200).json({ id: session.id });
    }
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
module.exports = CheckOut;
