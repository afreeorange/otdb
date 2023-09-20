import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";

import apiRouter from "./api";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(
  compression({
    level: 9,
  })
);

app.use("/api", apiRouter);

app.get(["/api", "/"], (_: Request, res: Response) => {
  res.send("Welcome to the OTDB API");
});

const server = app.listen(port, () => {
  console.log(`⚡️ OTDB Server is running at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  server.close();
});
