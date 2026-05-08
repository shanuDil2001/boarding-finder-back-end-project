import express from "express";
import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversity,
  updateUniversity,
} from "../controllers/universityController.js";

const universityRouter = express.Router();

universityRouter.post("/", createUniversity);
universityRouter.put("/:name", updateUniversity);
universityRouter.delete("/:name", deleteUniversity);
universityRouter.get("/", getAllUniversities);
universityRouter.get("/:name", getUniversity);

export default universityRouter;
