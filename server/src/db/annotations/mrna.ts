import type { Row } from "@libsql/client";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.accession,
  a.assignment_coverage,
  a.assignment_score,
  a.assignment_seqname,
  a.description,
  a.direct_probes,
  a.possible_probes,
  a.source_name,
  a.transcript_id
FROM
  annotations_transcripts_mrna_assignments a
WHERE
  a.transcript_id = ?
ORDER BY
  a.accession
;
`;

interface Result extends Row {
  accession: string;
  assignment_coverage: number;
  assignment_score: number;
  assignment_seqname: string;
  assignment_xhyb: number;
  description: string;
  direct_probes: number;
  possible_probes: number;
  source_name: string;
  transcript_id: number;
}

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
