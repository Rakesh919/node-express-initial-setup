import express from "express";
import { showSample, addSample } from "../controllers";

const router = express.Router();
router.get("/", showSample);
router.get("/addSample", addSample);

export { router as sampleRouter };
