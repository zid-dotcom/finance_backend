require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/raynott';

mongoose.connect(MONGO_URI, { })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on " + PORT));
  })
  .catch(err => console.error("MongoDB connection error:", err));
