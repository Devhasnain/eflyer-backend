const mongoose = require("mongoose");
const AdminOrdersSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  pending: { type: Boolean, require: true },
  delivered: { type: Boolean, require: true },
  deliveredAt: { type: Number||Boolean, require: true },
  created: { type: Number, require: true },
  total: { type: Number, require: true },
  status: { type: Boolean, require: true },
  user:{
    email:{type:String,required:true},
    name:{type:String,required:true},
    id:{type:String,required:true}
  },
  items: [],
});
const AdminsOrdersSchema = mongoose.model("AdminOrdersSchema", AdminOrdersSchema);

module.exports = AdminsOrdersSchema;
