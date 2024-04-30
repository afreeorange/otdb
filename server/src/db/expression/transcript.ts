import type { Row } from "@libsql/client";
import { Dataset, Tissue } from "../../definitions";
import client from "../client";

export const sql = `
SELECT
  d.transcript_id,
  d.tissue,
  d.rma,
  d.rma_glaucoma,
  d.plier,
  d.plier_glaucoma
FROM
  data_expression_transcripts d
WHERE
  d.transcript_id = ?
  AND d.dataset = ?
ORDER BY
  d.transcript_id,
  d.tissue
;
`;

interface Result extends Row {
  dataset: Dataset;
  transcript_id: number;
  tissue: Tissue;
  rma: number;
  rma_glaucoma: number;
  plier: number;
  plier_glaucoma: number;
}

export const query = async (
  transcript_id: number,
  dataset: Dataset = "CORE"
): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id, dataset],
    })
  ).rows as Result[];
