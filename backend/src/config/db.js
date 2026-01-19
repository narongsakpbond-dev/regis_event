const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing in .env");

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  console.log("✅ MongoDB connected:", mongoose.connection.name);
}

module.exports = connectDB;
