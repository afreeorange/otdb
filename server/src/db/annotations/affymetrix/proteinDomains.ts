import type { Client } from "pg";
import q from "../..";

export type AnnotationProteinDomain = {
  accession: string;
  description: string;
  pfamAccession: string;
  source: string;
};

const sql = `
SELECT DISTINCT
  accession,
  source,
  pfam_accession as "pfamAccession",
  domain_description as description
FROM
  annotations_transcripts_protein_domains
WHERE
  transcript_id = $1::int
  AND source != ''
`;

export default async (c: Client, transcriptId: number) =>
  await q<AnnotationProteinDomain[]>(c, sql, transcriptId);
