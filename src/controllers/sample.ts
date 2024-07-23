import { RequestHandler } from "express";

const showSample: RequestHandler = (_req, res, _next) => {
  return res.status(200).json({ message: "This is show sample route" });
};

const addSample: RequestHandler = (_req, res, _next) => {
  return res.status(200).json({ message: "This is add sample route" });
};

export { showSample, addSample };
