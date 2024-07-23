import express from "express";
import { showTest, addTest } from "../controllers";

const router = express.Router();
router.get("/", showTest);
router.get("/addTest", addTest);

export { router as testRouter };
