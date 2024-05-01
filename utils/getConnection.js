const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("db is connected");
    }
  } catch (error) {
    console.log("Failed to connect to the database:");
   
  }
};

module.exports = getConnection;
