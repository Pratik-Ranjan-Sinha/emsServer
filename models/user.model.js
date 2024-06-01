import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      default: "user",
   },
   collegeName: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      default: "",
   },
   phone: {
      type: Number,
      required: true,
   },
});

const User = mongoose.model("User", userSchema);
export default User;
