import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
   username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
   },
   password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
   },
   role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

export default mongoose.model("User", userSchema);
