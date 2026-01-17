import mongoose from "mongoose";

enum Status {
  pending = "pending",
  in_progress = "in_progress",
  completed = "completed",
}

enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

interface ITask extends Document {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  due_date?: Date;
  user: Types.ObjectId;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.pending,
    },
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.low,
    },
    due_date: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;