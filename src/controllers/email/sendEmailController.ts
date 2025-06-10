import { logger } from "@src/logger"
import { Request, Response, NextFunction } from "express";
import { EmailUtil } from "@src/utils";



export const sendEmailController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    logger.info("send Email controller method started", { __filename })
    const { email, name, message } = req.body;
    if (!email || !name || !message) {
      logger.error("Missing required fields in request body", { __filename });
      return res.status(400).json({ code: 'BAD-400', message: "All Fields are required" });
    }

    const emailUtil = new EmailUtil();
    await emailUtil.sendContactEmail(email, name, message);

    return res.status(200).json({ code: 'SUC-200', message: "Email sent successfully" });

  } catch (error) {
    logger.error(`Exception Occurred at sendEmailController : ${JSON.stringify(error)}`, { __filename });
    next(error);
  }
}