import type { Row } from "@libsql/client";
import { groupBy } from "lodash-es";
import client from "../client";

export const sql = `
SELECT DISTINCT
  a.annotation,
  a.id,
  a.term,
  a.evidence
FROM
  annotations_transcripts_go_terms a
WHERE
  a.transcript_id = ?
ORDER BY
  a.annotation,
  a.id
;
`;

type GOAnnotation =
  | "BIOLOGICAL_PROCESS"
  | "CELLULAR_COMPONENT"
  | "MOLECULAR_FUNCTION";

interface Result extends Row {
  term: string;
  annotation: string;
  id: string;
  evidence: string;
}

type TransformedResult = Record<
  GOAnnotation,
  {
    term: string;
    id: string;
    evidence: string;
  }
>;

export const query = async (transcript_id: number): Promise<Result[]> =>
  (
    await client.execute({
      sql,
      args: [transcript_id],
    })
  ).rows as Result[];
