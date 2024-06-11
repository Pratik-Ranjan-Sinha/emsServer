import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
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
      default: "admin",
   },
   collegeName: {
      type: String,
      required: true,
   },
   image: {
      userImage: {
         type: String,
         default: "https://bit.ly/dan-abramov",
      },
      collegeLogo: {
         type: String,
         default: "https://bit.ly/dan-abramov",
      },
   },
   phone: {
      type: Number,
   },
});

// methods for userSchema instance

// for hashing the password
userSchema.methods.hashPassword = async function (password) {
   this.password = await bcrypt.hash(password, 10);
   return this.password;
};

// for comparing the password
userSchema.methods.comparePassword = async function (password) {
   const isValid = await bcrypt.compare(password, this.password);
   return isValid;
};

// for generating token
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
