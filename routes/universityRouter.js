import express from "express";
import {
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "../controllers/universityController.js";

const universityRouter = express.Router();

universityRouter.post("/", createUniversity);
universityRouter.put("/:name", updateUniversity);
universityRouter.delete("/", deleteUniversity);

export default universityRouter;
