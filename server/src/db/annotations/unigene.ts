import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  u.unigene_id,
  e.unigene_expr,
  u.accession
FROM
  annotations_transcripts_unigene u
INNER JOIN annotations_transcripts_unigene_expression e
  ON u.unigene_id = e.unigene_id
WHERE
  u.transcript_id = ?
GROUP BY
  u.unigene_id
ORDER BY
  u.unigene_id
;
`;

interface Result extends Row {
  unigene_id: string;
  accessions: string;
  expressions: string;
}

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
