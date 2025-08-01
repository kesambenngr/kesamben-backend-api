const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");

// Set up the server and connect to MongoDB

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/desa-app";
/*
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  */

//connect ke databse
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
