const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yogue97:x9zj7EjqUrRJJYTg@reskom.mkmp5yx.mongodb.net/Reskom?retryWrites=true&w=majority&appName=Reskom', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas Connected ✅");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
