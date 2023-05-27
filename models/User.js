const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id:mongoose.Types.ObjectId,
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart:[],
  orders:[],
  registeredAt: {type:Number, value:Date.now()}
});
const UserSchema = mongoose.model("User", userSchema);

module.exports = UserSchema;
