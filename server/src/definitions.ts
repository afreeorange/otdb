/**
 * A collection of constants, schemas, and types. Quite a few interdependencies
 * between things here.
 */

import z from "zod";

export const VALID_TISSUES = [
  "CHOROID",
  "CILIARY_BODY",
  "CORNEA",
  "IRIS",
  "LENS",
  "OPTIC_NERVE",
  "OPTIC_NERVE_HEAD",
  "RETINA",
  "SCLERA",
  "TRABECULAR_MESHWORK",
] as const;
export type Tissue = z.infer<typeof tissue>;

export const VALID_DATASETS = ["CORE", "EXTENDED"] as const;
export type Dataset = z.infer<typeof dataset>;

export const transcriptId = z.coerce
  .number({
    required_error: "You need to provide a Transcript ID",
    invalid_type_error: "Transcript ID needs to be an integer",
  })
  .positive({
    message: "Transcript ID must be positive",
  });
export type TranscriptId = z.infer<typeof transcriptId>;

export const dataset = z
  .enum(VALID_DATASETS, {
    required_error: "You must supply a dataset",
    invalid_type_error: "Invalid dataset type. Please read the API Docs.",
  })
  .optional()
  .default("CORE");

export const tissue = z.enum(VALID_TISSUES, {
  required_error: "You must supply a tissue",
  invalid_type_error: "Invalid tissue type. Please read the API Docs.",
});

export const searchTerm = z
  .string({
    required_error: "You must supply a search term",
  })
  .min(3, {
    message: "Search term must be at least 3 characters long",
  });

export const searchLimit = z.coerce.number().min(10).optional().default(100);

export type Strand = "+" | "-";

export type SearchResult = Record<
  string,
  {
    description: string;
    transcriptId: number;
    probes: number;

    dataset: Dataset;

    chromosome: {
      number: number;
      strand: Strand;
      start: number;
      stop: number;
    };
    expression: Record<
      Tissue,
      {
        rma: number;
        rmaGlaucoma: number;
        plier: number;
        plierGlaucoma: number;
      }
    >;
  }
>;

/** ------------------------------------------------------------------------ */

export const DEFAULT_PORT = 3000;
