import type { Row } from "@libsql/client";
import type { Strand } from "../../definitions";
import client from "../client";

export const sql = `
SELECT DISTINCT
  g.transcript_id,
  g.gene_symbol,
  g.gene_title,
  t.seqname,
  t.start,
  t.stop,
  t.strand,
  t.total_probes
FROM
  annotations_transcripts_gene_assignments g
INNER JOIN
  annotations_transcripts t
  ON g.transcript_id = t.transcript_id
WHERE
  g.transcript_id = ?
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

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
