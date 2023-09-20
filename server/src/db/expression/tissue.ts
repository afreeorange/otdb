/**
 * Shows Gene Expression by Tissue and by Dataset
 */

import type { Client } from "pg";
import q from "..";
import { Dataset, Tissue } from "../../models/types";

type Row = {
  geneSymbol: string;
  geneTitle: string;
  plier: number;
  plierGlaucoma: number;
  transcriptId: number;
};

export type ExpressionByTissue = {
  gene: {
    name: string;
    description: string;
  };
  plier: number;
  plierGlaucoma: number;
  transcriptId: number;
};

const sql = `
SELECT DISTINCT
  a.gene_symbol AS "geneName",
  a.gene_title AS "geneDescription",
  d.plier as "plier",
  d.plier_glaucoma as "plierGlaucoma",
  d.transcript_id as "transcriptId"
FROM
  data_expression_transcripts d
INNER JOIN
  annotations_transcripts_gene_assignments a
  ON d.transcript_id = a.transcript_id
WHERE
  d.tissue = $1::text
  AND d.dataset = $2::text
  AND a.gene_symbol IS NOT NULL
ORDER BY
  d.plier DESC
`;

export default async (
  c: Client,
  tissue: Tissue = "CHOROID",
  dataset: Dataset = "CORE"
) => await q<Row[]>(c, sql, tissue, dataset);
