import type { Row } from "@libsql/client";
import type { Dataset, Tissue } from "../../definitions";
import client from "../client";

export const sql = `
SELECT DISTINCT
  d.probeset_id,
  d.rma,
  d.rma_glaucoma,
  a.transcript_id,
  d.tissue
FROM
  data_expression_probesets d
  LEFT JOIN annotations_probesets a
  ON d.transcript_id = a.transcript_id
WHERE
  a.transcript_id = ?
  AND d.dataset = ?
ORDER BY
  d.tissue,
  d.probeset_id
;
`;

interface Result extends Row {
  probeset_id: string;
  rma: number;
  rma_glaucoma: number;
  transcript_id: number;
  tissue: Tissue;
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
