import type { Client } from "pg";
import q from "../..";

export type AnnotationSwissprot = {
  id: number;
  accessions: string[];
  swissprots: string[];
};

const sql = `
SELECT DISTINCT
  s.transcript_id as id,
  ARRAY_AGG(s.accession) AS accessions,
  ARRAY_AGG(s.swissprot_accession) AS swissprots
FROM
  annotations_transcripts_swissprot s
WHERE
  transcript_id = $1::int
  AND swissprot_accession != ''
GROUP BY
  s.transcript_id
`;

export default async (c: Client, transcriptId: number) =>
  await q<AnnotationSwissprot[]>(c, sql, transcriptId);
