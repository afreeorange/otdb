import type { Client } from "pg";
import q from "../..";

export type AnnotationPathway = {
  accession: string;
  name: string;
  source: string;
};

const sql = `
SELECT DISTINCT
  accession,
  name,
  source
FROM
  annotations_transcripts_pathway
WHERE
  transcript_id = $1::int
  AND source != ''
`;

export default async (c: Client, transcriptId: number) =>
  q<AnnotationPathway[]>(c, sql, transcriptId);
