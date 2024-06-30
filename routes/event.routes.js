import express from "express";
import { createEvent } from "../controllers/event.controller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getEvents } from "../controllers/event.controller.js";
import { getSingleEvent } from "../controllers/event.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createEvent);
router.get("/get", verifyToken, getEvents);
router.get("/get/:eventId", verifyToken, getSingleEvent);
export default router;
