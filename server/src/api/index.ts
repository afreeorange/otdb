import { serve } from "@hono/node-server";

import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { Hono } from "hono";
import { logger } from "hono/logger";

import packageJson from "../../package.json";
import q from "../db/queries";
import {
  DEFAULT_PORT,
  Dataset,
  Tissue,
  dataset as datasetSchema,
  transcriptId as transcriptIdSchema,
  tissue as tissueSchema,
  searchTerm as searchTermSchema,
  searchLimit as searchLimitSchema,
} from "../definitions";
import { validateParam, validateQuery } from "../helpers";

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
  annotationsRoutes.get(
    `/${_}/:transcriptId`,
    validateParam(transcriptIdSchema, "transcriptId"),
    async (c) =>
      c.json({
        result: await q.annotations[_](parseInt(c.req.param("transcriptId"))),
      })
  );
});

/** ------------------------------ Expression ------------------------------ */

const expressionRoutes = new Hono();

expressionRoutes.get(
  "/alternateSplicing/:transcriptId",
  validateParam(transcriptIdSchema, "transcriptId"),
  validateQuery(datasetSchema, "dataset"),
  async (c) =>
    c.json({
      result: await q.expression.alternateSplicing(
        parseInt(c.req.param("transcriptId")),
        c.req.query("dataset") as Dataset
      ),
    })
);

expressionRoutes.get(
  `/tissue/:tissue`,
  validateParam(tissueSchema, "tissue"),
  validateQuery(datasetSchema, "dataset"),
  validateQuery(searchLimitSchema, "limit"),
  async (c) =>
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

searchRoutes.get(
  "/gene/:term",
  validateParam(searchTermSchema, "term"),
  async (c) =>
    c.json({
      result: await q.search.gene(c.req.param("term")),
    })
);

searchRoutes.get(
  "/mrna/:term",
  validateParam(searchTermSchema, "term"),
  async (c) =>
    c.json({
      result: await q.search.mrna(c.req.param("term")),
    })
);

searchRoutes.get(
  "/transcript/:transcriptId",
  validateParam(transcriptIdSchema, "transcriptId"),
  async (c) =>
    c.json({
      result: await q.search.transcript(parseInt(c.req.param("transcriptId"))),
    })
);

/** -------------------------------- Server -------------------------------- */

const app = new Hono();

// Set up Middleware
!process.env.CI && app.use(logger());
app.use(cors());
app.use(etag());

app.get("/api", (c) =>
  c.text(`Welcome to the OTDB API!\rv${packageJson.version}`)
);

app.route("/api/annotations", annotationsRoutes);
app.route("/api/expression", expressionRoutes);
app.route("/api/search", searchRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;
console.log(`⚡️ OTDB Server is running at http://localhost:${port}/api`);

serve({
  fetch: app.fetch,
  port,
});
