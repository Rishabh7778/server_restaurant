import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./database/db";


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/bookings", async (req, res) => {
    const { date, time, guests, name, contact } = req.body;
  
    const existingBooking = await db.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({ message: "Time slot already booked." });
    }  
    try {
      const booking = new db({ date, time, guests, name, contact });
      await booking.save();
      res.status(201).json({ message: "Booking created successfully!", booking });
    } catch (err) {
      res.status(500).json({ message: "Error creating booking.", error: err });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await db.find();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: "Error fetching bookings.", error: err });
    }
  });
  
  app.delete("/api/bookings/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await db.findByIdAndDelete(id);
      res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting booking.", error: err });
    }
  });
  
  app.get("/", (req, res) => {
    res.send("Welcome Booking Restaurants");
  });
  

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  