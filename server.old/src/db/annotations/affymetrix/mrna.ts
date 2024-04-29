import type { Client } from "pg";
import q from "../..";

export type AnnotationMRNA = {
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
};

const sql = `
SELECT DISTINCT
  accession,
  assignment_coverage as coverage,
  assignment_score as score,
  assignment_seqname as chromosome,
  description,
  direct_probes as "probesDirect",
  possible_probes as "probesPossible",
  source_name as source,
  transcript_id as id
FROM
  annotations_transcripts_mrna_assignments
WHERE
  transcript_id = $1::int
ORDER BY
  accession
`;

export default async (c: Client, transcriptId: number) =>
  await q<AnnotationMRNA[]>(c, sql, transcriptId);
