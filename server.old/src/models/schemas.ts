import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import z, { ZodError } from "zod";

import { VALID_DATASETS, VALID_TISSUES } from "../constants";

const atoms = {
  transcriptId: z.coerce
    .number({
      required_error: "You need to provide an ID",
      invalid_type_error: "Transcript ID needs to be an integer",
    })
    .positive({
      message: "Transcript ID must be positive",
    }),

  dataset: z.enum(VALID_DATASETS, {
    required_error: "You must supply a dataset",
    invalid_type_error: "Invalid dataset type. Please read the API Docs.",
  }),

  tissue: z.enum(VALID_TISSUES, {
    required_error: "You must supply a tissue",
    invalid_type_error: "Invalid tissue type. Please read the API Docs.",
  }),

  searchTerm: z
    .string({
      required_error: "You must supply a search term",
    })
    .min(3, {
      message: "Search term must be at least 3 characters long",
    }),
};

export const schemas = {
  annotations: {
    affymetrix: z.object({
      params: z.object({
        transcriptId: atoms.transcriptId,
      }),
    }),
    transcript: z.object({
      params: z.object({
        transcriptId: atoms.transcriptId,
      }),
      query: z.object({
        dataset: atoms.dataset.optional(),
      }),
    }),
  },

  expression: {
    tissue: z.object({
      params: z.object({
        tissue: atoms.tissue,
      }),
      query: z.object({
        dataset: atoms.dataset.optional(),
      }),
    }),

    alternateSplicing: z.object({
      params: z.object({
        transcriptIds: z.string().refine(
          (value) =>
            value
              .split(",")
              .map((_) => parseFloat(_.trim()))
              .every((_) => !isNaN(_)),
          {
            message:
              "Invalid comma-separated list of Transcript IDs (which must be integers)",
          }
        ),
      }),
      query: z.object({
        dataset: atoms.dataset.optional(),
      }),
    }),
  },

  search: {
    term: z.object({
      params: z.object({
        term: atoms.searchTerm,
      }),
      query: z.object({
        dataset: atoms.dataset.optional(),
      }),
    }),
  },
};

export const validateWith =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          errors: e.errors.map((_) => _.message),
        });
      }

      return res.status(400).json({
        errors: e,
      });
    }
  };
