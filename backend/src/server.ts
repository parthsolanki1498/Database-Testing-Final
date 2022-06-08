import cors from "cors";
import express, { json } from "express";

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  app.use("/", (_, res) => {
    res.json("hello world");
  });

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));
