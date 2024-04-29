import type { Client } from "pg";
import q from "..";
import { Dataset, Tissue } from "../../models/types";

type Row = {
  probesetId: number;
  rma: number;
  rmaGlaucoma: number;
  transcriptId: number;
  tissue: Tissue;
  dataset: Dataset;
};

export type AlternateSplicing = Record<
  string, // This is the Transcript ID
  {
    probesetId: number;
    rma: number;
    rmaGlaucoma: number;
    tissue: Tissue;
  }[]
>;

const sql = `
SELECT DISTINCT
  d.probeset_id as "probesetId",
  d.rma,
  d.rma_glaucoma as "rmaGlaucoma",
  a.transcript_id as "transcriptId",
  d.tissue,
  d.dataset
FROM
  data_expression_probesets d
  LEFT JOIN annotations_probesets a
  ON d.transcript_id = a.transcript_id
WHERE
  a.transcript_id = ANY($1::int[])
  AND d.dataset = $2::text
ORDER BY
  d.tissue,
  d.probeset_id
`;

const transform = (r: Row[]): AlternateSplicing => {
  let ret: AlternateSplicing = {};

  r.map((_) => {
    if (Object.keys(ret).includes(_.transcriptId.toString())) {
      ret[_.transcriptId.toString()].push({
        probesetId: _.probesetId,
        rma: _.rma,
        rmaGlaucoma: _.rmaGlaucoma,
        tissue: _.tissue,
      });
    } else {
      ret[_.transcriptId.toString()] = [];
    }
  });

  return ret;
};

export default async (
  c: Client,
  transcriptIds: number[],
  dataset: Dataset = "CORE"
) => transform(await q<Row[]>(c, sql, transcriptIds, dataset));
