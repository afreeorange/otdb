import type { Client } from "pg";
import q from "../..";

export type AnnotationGene = {
  id: number;
  accession: string;
  symbol: string;
  title: string;
  cytoband: string;
  entrez: string;
};

const sql = `
SELECT DISTINCT
  a.transcript_id as id,
  a.gene_accession as accession,
  a.gene_symbol as symbol,
  a.gene_title as title,
  a.cytoband,
  a.entrez_gene_id as entrez
FROM
  annotations_transcripts_gene_assignments a
WHERE
  transcript_id = $1::int
`;

export default async (c: Client, transcriptId: number) =>
  await q<AnnotationGene[]>(c, sql, transcriptId);
