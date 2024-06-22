import express from "express";
import { createProgram } from "../controllers/program.controller.js";
import { getPrograms } from "../controllers/program.controller.js";
const router = express.Router();

router.post("/create", createProgram);
router.get("/get", getPrograms);
export default router;
