const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/desa-app";
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully pada port ${PORT}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
