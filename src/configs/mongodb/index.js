const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(

      "mongodb+srv://" +
        process.env.DB_USER +
        ":" +
        process.env.DB_PASS +
        "@" +
        process.env.DB_HOST +
        "/" 
    );
    console.log("Database - Connect successfully !!!");
  } catch (error) {
    console.log("Database - Connect failure!!!");
  }
}

module.exports = { connect };
