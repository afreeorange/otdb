import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.transcript_id as transcriptId,
  a.accession,
  a.swissprot_accession as swissprotAccession
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
  transcriptId: number;
  accession: string;
  swissprotAccession: string;
}

export const query = async (transcriptId: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcriptId],
    })
  ).rows as Result[];
