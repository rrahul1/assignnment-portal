import mongoose from "mongoose";

const { Schema } = mongoose;

const assignmentSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   task: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
   },
   admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

export default mongoose.model("Assignment", assignmentSchema);
