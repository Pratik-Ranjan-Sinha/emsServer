import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ErrorHandler from "./middleware/Errorhandler.js";
import auth from "./routes/auth.routes.js";
const app = express();
app.use(express.json());
// error handling middleware
app.use(ErrorHandler);

app.listen(3000, () => {
   console.log("Server is running on port 3000");
   mongoose.connect(process.env.URI).then(() => {
      console.log("Connected to MongoDB");
   });
});
app.use("/auth", auth);
app.get("/", (req, res) => {
   res.send("Hello World");
});
