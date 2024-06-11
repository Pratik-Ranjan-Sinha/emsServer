import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ErrorHandler from "./middleware/Errorhandler.js";
import auth from "./routes/auth.routes.js";
import event from "./routes/event.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
// error handling middleware
app.use(ErrorHandler);
app.use(cors());
app.use(cookieParser());
app.listen(3000, () => {
   console.log("Server is running on port 3000");
   mongoose.connect(process.env.URI).then(() => {
      console.log("Connected to MongoDB");
   });
});
app.use("/auth", auth);
app.use("/event", event);
app.get("/", (req, res) => {
   res.send("Hello World");
});
