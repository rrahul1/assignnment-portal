import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.log("Error connecting to MongoDB:", err));

// Server
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
