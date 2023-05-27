require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDataBase = require("./middlewares/connectToDataBase");
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

const app = express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

ConnectDataBase();

const AuthRoute = require("./routes/auth/auth");
const StripeRoute = require("./routes/stripe/stripe");
const OrdersRoute = require("./routes/orders/index");
const AdminRoute = require("./routes/admin/index");


app.use("/api", AuthRoute);
app.use('/api/stripe',StripeRoute);
app.use('/api/orders',OrdersRoute);
app.use('/api/admin',AdminRoute);


app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Welcome eflyer backend",
  });
});

const port = process.env.PORT | 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
