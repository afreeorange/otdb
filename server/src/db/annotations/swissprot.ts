import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.transcript_id,
  a.accession,
  a.swissprot_accession
FROM
  annotations_transcripts_swissprot a
WHERE
  a.transcript_id = ?
  AND a.swissprot_accession != ''
GROUP BY
  a.transcript_id
;
`;

interface Result extends Row {
  transcript_id: number;
  accession: string;
  swissprot_accession: string;
}

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
