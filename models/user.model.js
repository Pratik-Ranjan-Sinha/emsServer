import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
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

// for hashing the password

userSchema.methods.hashPassword = async function (password) {
   this.password = await bcrypt.hash(password, 10);
   return this.password;
};

userSchema.methods.comparePassword = async function (password) {
   const isValid = await bcrypt.compare(password, this.password);
   return isValid;
};

userSchema.methods.generateToken = async function () {
   // generate token
   const payload = {
      sub: this._id,
      role: this.role,
      iat: Date.now(),
      exp: Date.now() + 86400000,
   };
   const token = jwt.sign(payload, process.env.SECRET);
   return token;
};

const User = mongoose.model("User", userSchema);
export default User;
