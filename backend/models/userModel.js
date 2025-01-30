const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      require: [true, "Please add a userName"],
      type: String,
    },
    email: {
      require: [true, "Please add a emailId"],
      type: String,
    },
    password: {
      require: [true, "Please add a password"],
      type: String,
    },
    phone: {
        require: [true, "Please add a phone number"],
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
