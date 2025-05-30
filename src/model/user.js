import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email required!"]
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  about: {
    type: String,
    default: ""
  },
  ProfileURL: {
    type: String,
    default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
  }
});

// Check if model already exists to prevent OverwriteModelError
const UserData = mongoose.models.UserData || mongoose.model('UserData', userSchema);

export { UserData };