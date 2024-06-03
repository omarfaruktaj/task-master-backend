const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
