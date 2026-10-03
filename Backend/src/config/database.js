const mongoose = require("mongoose");

let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not configured");
  }

  if (mongoose.connection.readyState !== 2) {
    connectionPromise = null;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongooseInstance) => {
        console.log("Connected to Database");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        connectionPromise = null;
        console.error("Database connection failed:", error.message);
        throw error;
      });
  }

  return connectionPromise;
}

module.exports = connectDB
