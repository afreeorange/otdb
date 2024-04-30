import type { Row } from "@libsql/client";
import type { Strand } from "../../definitions";
import client from "../client";

export const sql = `
SELECT DISTINCT
	g.transcript_id,
	g.gene_symbol,
	g.gene_title,
	t.seqname,
	t. "start",
	t.stop,
	t.strand,
	t.total_probes,
	d.*
FROM
	annotations_transcripts_gene_assignments g
	INNER JOIN annotations_transcripts t ON g.transcript_id = t.transcript_id
	INNER JOIN data_expression_transcripts d ON d.transcript_id = g.transcript_id
WHERE
  g.gene_symbol LIKE ?
  OR g.gene_title LIKE ?
ORDER BY
	g.gene_symbol,
	g.transcript_id
;
`;

interface Result extends Row {
  transcript_id: number;
  gene_symbol: string;
  gene_title: string;
  seqname: string;
  start: number;
  stop: number;
  strand: Strand;
  total_probes: number;
}

export const query = async (term: string): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [`%${term}%`, `%${term}%`],
    })
  ).rows as Result[];
