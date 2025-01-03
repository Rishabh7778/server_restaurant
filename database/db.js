import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;

if (!url) {
  console.error("Error: MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  contact: {
    type: String,
    required: true,
  },
});

const db = mongoose.model("Booking", bookingSchema);

export default db;
