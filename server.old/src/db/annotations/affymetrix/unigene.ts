import type { Client } from "pg";
import q from "../..";

export type AnnotationUnigene = {
  id: string;
  expression: string[];
  accessions: string[];
};

const sql = `
SELECT DISTINCT
  u.unigene_id as id,
  ARRAY_AGG(DISTINCT e.unigene_expr) as expression,
  ARRAY_AGG(DISTINCT u.accession) AS accessions
FROM
  annotations_transcripts_unigene u
  INNER JOIN annotations_transcripts_unigene_expression e
  ON u.unigene_id = e.unigene_id
WHERE
  u.transcript_id = $1::int
GROUP BY
  u.unigene_id
ORDER BY
  u.unigene_id
`;

export default async (c: Client, transcriptId: number) =>
  await q<AnnotationUnigene[]>(c, sql, transcriptId);
