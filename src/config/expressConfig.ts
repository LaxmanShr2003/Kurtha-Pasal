import express, { Express } from "express";
import morgan from "morgan";
import * as helmet from "helmet";
import { env } from "./env.config";

export const initializeExpressServer = (app: Express) => {
  app.use(express.json({ limit: "5mb" }));
  app.use(morgan("dev"));
  app.use(
    express.urlencoded({
      limit: "10mb",
      parameterLimit: 10,
    })
  );
  app.use(helmet.xssFilter());
  app.disable("x-powered-by");
  const port = env.PORT;
  app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
  });
};
