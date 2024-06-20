import express from "express";
import { createProgram } from "../controllers/program.controller.js";
const router = express.Router();

router.post("/create", createProgram);

export default router;
