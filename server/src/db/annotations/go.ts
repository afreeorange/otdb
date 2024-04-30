import type { Row } from "@libsql/client";
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
  annotation: GOAnnotation;
  evidence: string;
  id: string;
  term: string;
}

type TransformedResult = Record<
  GOAnnotation,
  {
    evidence: string;
    id: string;
    term: string;
  }[]
>;

const transform = (result: Result[]): TransformedResult => {
  const ret: TransformedResult = {
    BIOLOGICAL_PROCESS: [],
    CELLULAR_COMPONENT: [],
    MOLECULAR_FUNCTION: [],
  };

  result.forEach((_) => {
    ret[_.annotation].push({
      evidence: _.evidence,
      id: _.id,
      term: _.term,
    });
  });

  return ret;
};

export const query = async (
  transcript_id: number
): Promise<TransformedResult> => {
  const { rows } = await client.execute({
    sql,
    args: [transcript_id],
  });

  return transform(rows as Result[]) as TransformedResult;
};
