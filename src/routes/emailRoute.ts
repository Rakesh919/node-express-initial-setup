import { Router } from "express";
import { sendEmailController } from "@src/controllers";

const emailRouter = Router();
emailRouter.post("/", sendEmailController);

export { emailRouter };