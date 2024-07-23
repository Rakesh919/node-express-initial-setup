import "module-alias/register";
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from 'cors'
import { configureRoutes, corsOptions } from "./config";
import { errorLogger, errorResponder, notFound, requestIpMiddleware, requestLogger } from "./middlewares";
import { Server, connectDatabase } from "./providers";


dotenv.config();
connectDatabase();
const PORT = process.env.PORT || 8000;
const app: Express = express();
app.use(helmet());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    '*'
  )

  res.header('Access-Control-Allow-Credentials', 'true')
  next();
})

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestIpMiddleware);
app.use(requestLogger)


configureRoutes(app);


app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the TypeScript world!</h1>");
});

app.use(errorLogger);
app.use(errorResponder);
app.use(notFound);

Server(app, PORT);