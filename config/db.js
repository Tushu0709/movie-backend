// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on("connected", () =>
//       console.log("Database Connected")
//     );
//     await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default connectDB;
// connectDB.js (example)
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGO_URI or MONGODB_URI is not defined in .env");
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Allow server to start without DB
  }
};

export default connectDB;
