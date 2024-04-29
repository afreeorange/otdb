import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.transcript_id,
  a.gene_accession,
  a.gene_symbol,
  a.gene_title,
  a.cytoband,
  a.entrez_gene_id
FROM
  annotations_transcripts_gene_assignments a
WHERE
  a.transcript_id = ?
ORDER BY
  a.gene_accession
;
`;

interface Result extends Row {
  transcript_id: number;
  gene_accession: string;
  gene_symbol: string;
  gene_title: string;
  cytoband: string;
  entrez_gene_id: string;
}

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
