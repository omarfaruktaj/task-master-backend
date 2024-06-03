const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Mongodb successfully connected");
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDatabase;
