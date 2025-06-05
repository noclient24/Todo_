import mongoose, { Schema } from "mongoose";

const Taskschema = new Schema({
  tittle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "pending",
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const Task = mongoose.models.tasks || mongoose.model("tasks", Taskschema);

export { Task };
