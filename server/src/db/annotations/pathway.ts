import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.accession,
  a.name,
  a.source
FROM
  annotations_transcripts_pathway a
WHERE
  a.transcript_id = ?
  AND a.source != ''
ORDER BY
  a.accession
;
`;

interface Result extends Row {
  accession: string;
  name: string;
  source: string;
}

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
