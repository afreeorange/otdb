import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import packageJson from "../package.json";

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
  res.send(`
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>The OTDB API</title>
        <style>
          html,
          body {
            align-items: center;
            display: flex;
            flex-direction: row;
            font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
            height: 100%;
            justify-content: center;
            margin: 0;
            padding: 0;
          }
          p {
            display: flex;
          }
          p small:first-child {
            flex: 1;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>Hello, I am the OTDB API 👋</h1>
          <p>
            <small>v${packageJson.version}</small>
            <small><a href="https://github.com/afreeorange/otdb" title="Link to this project on Github">Github</small>
          </p>
        </div>
      </body>
    </html>

  `);
});

const server = app.listen(port, () => {
  console.log(`⚡️ OTDB Server is running at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  server.close();
});
