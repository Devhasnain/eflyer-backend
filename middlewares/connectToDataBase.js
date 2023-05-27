const mongoose = require("mongoose");

const MongoDBUrl = process.env.MONGODB_URI;

const ConnectDataBase = async () => {
    try {
        if (mongoose.connections[0].readyState) {
          return;
        }
        await mongoose
          .connect(MongoDBUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => {
            console.log("Connected to MongoDB");
          })
          .catch((error) => {
            console.log("Error connecting to MongoDB:", error);
          });
    } catch (error) {
        return {msg:"Cannot connect to mongodb"}
    }
};

module.exports=ConnectDataBase