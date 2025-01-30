const mongoose = require("mongoose");
const todoTaskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    title: {
      type: String,
      require: [true, "Please add a title"],
    },
    task: {
      type: String,
      require: [true, "Please add a task"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("todoTask", todoTaskSchema);
