import { RequestHandler } from "express";

const showTest: RequestHandler = (req, res, next) => {
  return res.status(200).json({ message: "This is show test route" });
};

const addTest: RequestHandler = (req, res, next) => {
  return res.status(200).json({ message: "This is add test route" });
};

export { showTest, addTest };
