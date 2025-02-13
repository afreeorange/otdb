import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { publicProcedure, router } from "./trpc";
import {
  expression,
  expressionByTissue,
  geneAnnotation,
  goTermsAnnotation,
  mRNAAnnotation,
  pathwaysAnnotation,
  proteinDomainsAnnotation,
  search,
  swissProtAnnotation,
  unigeneAnnotation,
} from "./db";
import type { Dataset, SearchType, TranscriptID } from "definitions";

const appRouter = router({
  search: publicProcedure
    .input((val: unknown) => {
      if (
        typeof val === "object" &&
        val !== null &&
        "type" in val &&
        "term" in val
      ) {
        return val as { type: SearchType; term: string };
      }

      throw new Error("Invalid input");
    })
    .query(async ({ input }) => await search(input.type, input.term)),

  expression: {
    transcripts: publicProcedure
      .input((val: unknown) => {
        if (
          typeof val === "object" &&
          val !== null &&
          "dataset" in val &&
          "transcriptIds" in val
        ) {
          return val as { dataset: Dataset; transcriptIds: TranscriptID[] };
        }

        throw new Error("Invalid input");
      })
      .query(
        async ({ input }) =>
          await expression(input.dataset, input.transcriptIds)
      ),
    tissues: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "transcriptIds" in val) {
          return val as { dataset: Dataset; transcriptIds: TranscriptID[] };
        }

        throw new Error("Invalid input");
      })
      .query(
        async ({ input }) =>
          await expressionByTissue(input.dataset, input.transcriptIds)
      ),
  },

  annotations: {
    gene: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await geneAnnotation(input);
      }),
    mrna: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await mRNAAnnotation(input);
      }),
    go: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await goTermsAnnotation(input);
      }),
    pathways: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await pathwaysAnnotation(input);
      }),
    proteinDomains: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await proteinDomainsAnnotation(input);
      }),
    swissprot: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await swissProtAnnotation(input);
      }),
    unigene: publicProcedure
      .input((val: unknown) => {
        if (!val) {
          throw new Error("Invalid ID");
        }

        return val as TranscriptID;
      })
      .query(async ({ input }) => {
        return await unigeneAnnotation(input);
      }),
  },
});

export type AppRouter = typeof appRouter; // Export type router type signature, NOT the router itself.

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

if (!process.env.CI) {
  server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}
