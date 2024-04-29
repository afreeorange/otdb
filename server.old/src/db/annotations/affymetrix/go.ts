import type { Client } from "pg";
import q from "../..";

type GOAnnotationType =
  | "BIOLOGICAL_PROCESS"
  | "CELLULAR_COMPONENT"
  | "MOLECULAR_FUNCTION";

type Row = {
  annotation: GOAnnotationType;
  id: string | null;
  term: string | null;
  evidence: string | null;
};

export type AnnotationGO = Record<
  GOAnnotationType,
  {
    id: string;
    term: string;
    evidence: string;
  }[]
>;

const sql = `
SELECT
  DISTINCT annotation, id, term, evidence
FROM
  annotations_transcripts_go_terms
WHERE
  transcript_id = $1::int
ORDER BY
  annotation,
  id
`;

const transform = (r: Row[]): AnnotationGO => {
  const ret: AnnotationGO = {
    BIOLOGICAL_PROCESS: [],
    CELLULAR_COMPONENT: [],
    MOLECULAR_FUNCTION: [],
  };

  r.map((_) => {
    if (_.id && _.term && _.evidence) {
      ret[_.annotation]?.push({
        evidence: _.evidence,
        id: _.id,
        term: _.term,
      });
    }
  });

  return ret;
};

export default async (c: Client, transcriptId: number): Promise<AnnotationGO> =>
  transform(await q<Row[]>(c, sql, transcriptId));
