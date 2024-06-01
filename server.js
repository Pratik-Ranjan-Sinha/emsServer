import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ErrorHandler from "./middleware/Errorhandler.js";
const app = express();

// error handling middleware
app.use(ErrorHandler);

app.listen(3000, () => {
   console.log("Server is running on port 3000");
   mongoose.connect(process.env.URI).then(() => {
      console.log("Connected to MongoDB");
   });
});

app.get("/", (req, res) => {
   res.send("Hello World");
});
