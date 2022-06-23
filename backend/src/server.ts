import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  await postgresDataSource.initialize();

  app.use("/", (_, res) => {
    res.json("hello world");
  });

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));
