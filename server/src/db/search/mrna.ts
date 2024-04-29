import type { Row } from "@libsql/client";
import type { Strand } from "../../definitions";
import client from "../client";

export const sql = `
SELECT DISTINCT
  r.transcript_id,
  r.accession,
  r.description,
  t.seqname,
  t.start,
  t.stop,
  t.strand,
  t.total_probes
FROM
  annotations_transcripts_mrna_assignments r
INNER JOIN
  annotations_transcripts t
  ON r.transcript_id = t.transcript_id
WHERE
  r.accession LIKE ?
  OR r.description LIKE ?
ORDER BY
  r.accession,
  r.transcript_id
;
`;

interface Result extends Row {
  transcript_id: number;
  accession: string;
  description: string;
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
