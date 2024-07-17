import express from "express";
import { createProgram } from "../controllers/program.controller.js";
import { getPrograms,editProgram } from "../controllers/program.controller.js";
import { createTeam } from "../controllers/team.controller.js";
const router = express.Router();

router.post("/create", createProgram);
router.post("/create/team", createTeam);
router.get("/get", getPrograms);
router.post("/edit", editProgram);
export default router;
