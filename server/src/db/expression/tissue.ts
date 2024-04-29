import type { Row } from "@libsql/client";
import { Dataset, Tissue } from "../../definitions";
import client from "../client";

export const sql = `
SELECT DISTINCT
  d.tissue,
  a.gene_symbol,
  a.gene_title,
  d.plier,
  d.plier_glaucoma,
  d.transcript_id
FROM
  data_expression_transcripts d
INNER JOIN
  annotations_transcripts_gene_assignments a
  ON d.transcript_id = a.transcript_id
WHERE
  d.tissue = ?
  AND d.dataset = ?
  AND a.gene_symbol IS NOT NULL
ORDER BY
  d.plier DESC
LIMIT ?;
;
`;

interface Result extends Row {
  tissue: Tissue;
  gene_symbol: string;
  gene_title: string;
  plier: number;
  plier_glaucoma: number;
  transcript_id: number;
}

export const query = async (
  tissue: Tissue,
  dataset: Dataset = "CORE",
  limit: number = 100
): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [tissue, dataset, limit],
    })
  ).rows as Result[];
