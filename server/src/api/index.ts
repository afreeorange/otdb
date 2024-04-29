import { serve } from "@hono/node-server";
import { Hono } from "hono";

import packageJson from "../../package.json";
import q from "../db/queries";
import { DEFAULT_PORT, Dataset, Tissue } from "../definitions";

const app = new Hono();

/** ----------------------------- Annotations ----------------------------- */

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
  app.get(`/annotations/${_}/:transcriptId`, async (c) =>
    c.json({
      result: await q.annotations[_](parseInt(c.req.param("transcriptId"))),
    })
  );
});

/** ------------------------------ Expression ------------------------------ */

app.get(`/expression/alternateSplicing/:transcriptId`, async (c) =>
  c.json({
    result: await q.expression.alternateSplicing(
      parseInt(c.req.param("transcriptId")),
      c.req.query("dataset") as Dataset
    ),
  })
);

app.get(`/expression/tissue/:tissue`, async (c) =>
  c.json({
    result: await q.expression.tissue(
      c.req.param("tissue") as Tissue,
      c.req.query("dataset") as Dataset,
      c.req.query("limit") ? parseInt(c.req.query("limit")!) : undefined
    ),
  })
);

/** -------------------------------- Search -------------------------------- */

app.get(`/search/gene/:term`, async (c) =>
  c.json({
    result: await q.search.gene(c.req.param("term")),
  })
);

app.get(`/search/mrna/:term`, async (c) =>
  c.json({
    result: await q.search.mrna(c.req.param("term")),
  })
);

app.get(`/search/transcript/:transcriptId`, async (c) =>
  c.json({
    result: await q.search.transcript(parseInt(c.req.param("transcriptId"))),
  })
);

/** -------------------------------- Server -------------------------------- */

app.get(`/api`, async (c) =>
  c.text(`Welcome to the OTDB API!\rv${packageJson.version}`)
);

const port = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;
console.log(`⚡️ OTDB Server is running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
