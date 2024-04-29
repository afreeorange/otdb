import { serve } from "@hono/node-server";
import { Hono } from "hono";

import packageJson from "../../package.json";
import q from "../db/queries";
import { DEFAULT_PORT, Dataset, Tissue } from "../definitions";

/** ----------------------------- Annotations ----------------------------- */

const annotationsRoutes = new Hono();

(
  [
    "gene",
    "go",
    "mrna",
    "pathway",
    "proteinDomains",
    "swissprot",
    "unigene",
  ] as (keyof typeof q.annotations)[]
).forEach((_) => {
  annotationsRoutes.get(`/${_}/:transcriptId`, async (c) =>
    c.json({
      result: await q.annotations[_](parseInt(c.req.param("transcriptId"))),
    })
  );
});

/** ------------------------------ Expression ------------------------------ */

const expressionRoutes = new Hono();

expressionRoutes.get(`/alternateSplicing/:transcriptId`, async (c) =>
  c.json({
    result: await q.expression.alternateSplicing(
      parseInt(c.req.param("transcriptId")),
      c.req.query("dataset") as Dataset
    ),
  })
);

expressionRoutes.get(`/tissue/:tissue`, async (c) =>
  c.json({
    result: await q.expression.tissue(
      c.req.param("tissue") as Tissue,
      c.req.query("dataset") as Dataset,
      c.req.query("limit") ? parseInt(c.req.query("limit")!) : undefined
    ),
  })
);

/** -------------------------------- Search -------------------------------- */

const searchRoutes = new Hono();

searchRoutes.get(`/gene/:term`, async (c) =>
  c.json({
    result: await q.search.gene(c.req.param("term")),
  })
);

searchRoutes.get(`/mrna/:term`, async (c) =>
  c.json({
    result: await q.search.mrna(c.req.param("term")),
  })
);

searchRoutes.get(`/transcript/:transcriptId`, async (c) =>
  c.json({
    result: await q.search.transcript(parseInt(c.req.param("transcriptId"))),
  })
);

/** -------------------------------- Server -------------------------------- */

const app = new Hono();

app.get("/api", async (c) =>
  c.text(`Welcome to the OTDB API!\rv${packageJson.version}`)
);

app.route("/annotations", annotationsRoutes);
app.route("/expressions", expressionRoutes);
app.route("/search", searchRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;
console.log(`⚡️ OTDB Server is running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
