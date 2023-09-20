import type { Client } from "pg";
import { AlternateSplicing } from "../expression/alternateSplicing";
import { Dataset, Strand, Tissue, Chromosome } from "../../models/types";
import expression from "../expression";
import q from "..";
import queries from "./queries";

type Row = {
  dataset: Dataset;
  gene_symbol: string;
  gene_title: string;
  plier_glaucoma: number;
  plier: number;
  rma_glaucoma: number;
  rma: number;
  seqname: string;
  start: number;
  stop: number;
  strand: Strand;
  tissue: Tissue;
  total_probes: number;
  transcript_id: number;
};

type ExpressionMetrics = {
  rma: number;
  rmaGlaucoma: number;
  plier: number;
  plierGlaucoma: number;
  alternateSplicing: {
    probesetId: number;
    rma: number;
    rmaGlaucoma: number;
  }[];
};

export type SearchResult = {
  dataset: Dataset;
  gene: {
    symbol: string;
    description: string;
  };
  chromosome: Chromosome;
  probeCount: number;
  transcriptId: number;
  expression: Record<Tissue, ExpressionMetrics>;
};

const transform = (
  partialResults: Row[],
  alternateSplicing: AlternateSplicing
): SearchResult[] => {
  const ret = partialResults.reduce(
    (a, c) => ({
      ...a,
      [c.transcript_id]: {
        ...a[c.transcript_id],
        dataset: c.dataset,
        transcriptId: c.transcript_id,
        probeCount: c.total_probes,
        chromosome: {
          number: parseInt(c.seqname.replace("chr", "")),
          start: c.start,
          stop: c.stop,
          strand: c.strand,
        },
        gene: {
          description: c.gene_title,
          symbol: c.gene_symbol,
        },
        expression: {
          ...(a[c.transcript_id] &&
          Object.keys(a[c.transcript_id]).includes("expression")
            ? a[c.transcript_id].expression
            : {}),
          [c.tissue]: {
            rma: c.rma,
            plier: c.plier,
            rmaGlaucoma: c.rma_glaucoma,
            plierGlaucoma: c.plier_glaucoma,
            alternateSplicing: [],
          } as ExpressionMetrics,
        },
      } as SearchResult,
    }),
    {} as Record<string, SearchResult>
  );

  Object.keys(alternateSplicing).map((transcriptId) => {
    alternateSplicing[transcriptId].map((_) => {
      try {
        ret[transcriptId].expression[_.tissue].alternateSplicing.push({
          probesetId: _.probesetId,
          rma: _.rma,
          rmaGlaucoma: _.rmaGlaucoma,
        });
      } catch (e) {
        console.error("Error adding annotations", e);
      }
    });
  });

  return Object.values(ret);
};

type SearchType = "gene" | "mrna" | "transcriptId";

const search = async (type: SearchType) => {
  const ret = async (c: Client, term: string, dataset: Dataset = "CORE") => {
    const results = await q<Row[]>(c, queries[type], term, dataset);
    const alternateSplicings = await expression.alternateSplicing(
      c,
      results.map((_) => _.transcript_id),
      dataset
    );

    return transform(results, alternateSplicings);
  };

  return ret;
};

export default {
  gene: await search("gene"),
  mrna: await search("mrna"),
  transcriptId: await search("transcriptId"),
};
