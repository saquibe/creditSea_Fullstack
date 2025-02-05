const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://saquibe:742422.era@mern-blog.2h93byb.mongodb.net/creditsea?retryWrites=true&w=majority&appName=mern-blog";
    await mongoose.connect(mongoURI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
