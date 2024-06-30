import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ErrorHandler from "./middleware/Errorhandler.js";
import auth from "./routes/auth.routes.js";
import event from "./routes/event.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import program from "./routes/program.routes.js";
const app = express();

// error handling middleware

app.use(cookieParser());
app.use(express.json());
app.use(
   cors({
      origin: "http://localhost:5173",
      path: "/",
      credentials: true,
   })
);
mongoose.set("strictPopulate", false);

app.use(ErrorHandler);
app.listen(3000, () => {
   console.log("Server is running on port 3000");
   mongoose.connect(process.env.URI).then(() => {
      console.log("Connected to MongoDB");
   });
});
app.use("/auth", auth);
app.use("/event", event);
app.use("/program", program);
app.get("/", (req, res) => {
   res.send("Hello World");
});
