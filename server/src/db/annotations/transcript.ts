/**
 * Annotates a given transcript
 */

import type { Client } from "pg";
import type { Chromosome, Dataset, Strand, Tissue } from "../../models/types";
import q from "..";

type Row = {
  dabg_glaucoma: number;
  dabg: number;
  exon_id: number;
  gene_accessions: string[];
  gene_symbols: string[];
  probe_count: number;
  number_independent_probes: number;
  number_nonoverlapping_probes: number;
  plier_glaucoma: number;
  plier: number;
  probeset_id: number;
  psr_id: number;
  rma_glaucoma: number;
  rma: number;
  seqname: string;
  start: number;
  stop: number;
  strand: Strand;
  tissue: Tissue;
};

export type AnnotationTranscript = {
  dabgGlaucoma: number;
  dabg: number;
  exonId: number;
  geneAccessions: string[];
  geneSymbols: string[];
  probes: {
    count: number;
    independent: number;
    nonOverlapping: number;
  };
  plierGlaucoma: number;
  plier: number;
  probesetId: number;
  psrId: number;
  rmaGlaucoma: number;
  rma: number;
  chromosome: Chromosome;
};

const sql = `
SELECT
	d.tissue,
	p.probeset_id,
	ROUND(AVG(CAST(d.dabg AS numeric)), 4) AS dabg,
	ROUND(AVG(CAST(d.dabg_glaucoma AS numeric)), 4) AS dabg_glaucoma,
	ROUND(AVG(CAST(d.plier AS numeric)), 4) AS plier,
	ROUND(AVG(CAST(d.plier_glaucoma AS numeric)), 4) plier_glaucoma,
	ROUND(AVG(CAST(d.rma AS numeric)), 4) AS rma,
	ROUND(AVG(CAST(d.rma_glaucoma AS numeric)), 4) AS rma_glaucoma,
	p.seqname,
	p.strand,
	p.start,
	p.stop,
	p.exon_id,
	p.psr_id,
	p.probe_count,
	p.number_independent_probes,
	p.number_nonoverlapping_probes,
	ARRAY_AGG(DISTINCT a.gene_accession) AS gene_accessions,
	ARRAY_AGG(DISTINCT a.gene_symbol) AS gene_symbols
FROM
	annotations_probesets p
	INNER JOIN annotations_probesets_gene_assignments a
		ON p.probeset_id = a.probeset_id
	INNER JOIN data_expression_probesets d
		ON d.probeset_id = p.probeset_id
WHERE
	p.transcript_id = $1::int
	AND p.level = $2::text
	AND dabg >= 0
	AND dabg_glaucoma >= 0
	AND plier >= 0
	AND plier_glaucoma >= 0
	AND rma >= 0
	AND rma_glaucoma >= 0
GROUP BY
	p.probeset_id,
	d.tissue,
	dabg,
	dabg_glaucoma,
	plier,
	plier_glaucoma
ORDER BY
	d.tissue,
	p.probeset_id
`;

const transform = (results: Row[]): AnnotationTranscript[] =>
  results.map((_) => ({
    dabg: _.dabg,
    dabgGlaucoma: _.dabg_glaucoma,
    exonId: _.exon_id,
    geneAccessions: _.gene_accessions,
    geneSymbols: _.gene_symbols,
    plier: _.plier,
    plierGlaucoma: _.plier_glaucoma,
    probes: {
      count: _.probe_count,
      independent: _.number_independent_probes,
      nonOverlapping: _.number_independent_probes,
    },
    probesetId: _.probeset_id,
    psrId: _.psr_id,
    rma: _.rma,
    rmaGlaucoma: _.rma_glaucoma,
    chromosome: {
      number: parseInt(_.seqname.replace("chr", "")),
      start: _.start,
      stop: _.stop,
      strand: _.strand,
    },
  }));

export default async (
  c: Client,
  transcriptId: number,
  dataset: Dataset
): Promise<AnnotationTranscript[]> =>
  transform(await q<Row[]>(c, sql, transcriptId, dataset));
