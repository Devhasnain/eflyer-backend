const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  id:mongoose.Types.ObjectId,
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String,required:true}
});
const AdminsSchema = mongoose.model("Admin", AdminSchema);

module.exports = AdminsSchema;
