import express from "express";
import {
  createBoardingHouse,
  deleteBoardingHouse,
  getAllBoardingHouses,
  getBoardingHouse,
  updateBoardingHouse,
} from "../controllers/boardingController.js";

const BoardingRouter = express.Router();

BoardingRouter.post("/", createBoardingHouse);
BoardingRouter.put("/:id", updateBoardingHouse);
BoardingRouter.delete("/:id", deleteBoardingHouse);
BoardingRouter.get("/", getAllBoardingHouses);
BoardingRouter.get("/:id", getBoardingHouse);

export default BoardingRouter;
