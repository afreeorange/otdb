import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.accession,
  a.source,
  a.pfam_accession
  a.domain_description
FROM
  annotations_transcripts_protein_domains a
WHERE
  a.transcript_id = ?
  AND a.source != ''
ORDER BY
  a.pfam_accession
;
`;

interface Result extends Row {
  accession: string;
  source: string;
  pfam_accession: string;
  domain_description: string;
}

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
