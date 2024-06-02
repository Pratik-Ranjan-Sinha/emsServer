import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
export default router;
