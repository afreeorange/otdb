import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import {
  TISSUE_NAMES,
  type BaseExpressionByTissue,
  type BaseExpressionSearchResult,
  type BaseGoTermsAnnotation,
  type BaseUnigeneAnnotation,
  type Dataset,
  type ExpressionByTissue,
  type ExpressionSearchResult,
  type GeneAnnotation,
  type GoTermsAnnotation,
  type MRNAAnnotation,
  type PathwayAnnotation,
  type ProteinDomainAnnotation,
  type SearchType,
  type SwissprotAnnotation,
  type SymbolSearchResult,
  type TranscriptID,
  type UnigeneAnnotation,
} from "definitions";
import { uniq } from "lodash-es";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATABASE_PATH = `${__dirname}/../data/otdb.sqlite`;

const db = new Database(
  DATABASE_PATH,
  process.env.DEBUG ? { verbose: console.log } : {}
);

export const search = async (
  type: SearchType,
  term: string
): Promise<SymbolSearchResult[]> => {
  console.log(type);

  const sql = `
SELECT DISTINCT
    g.transcript_id,
    g.gene_symbol AS symbol,
    g.gene_title AS description,
    t.seqname AS chromosome,
    t."start",
    t.stop,
    t.strand,
    t.total_probes
FROM
    annotations_transcripts_gene_assignments g
    INNER JOIN annotations_transcripts t ON g.transcript_id = t.transcript_id
WHERE
    COALESCE(g.gene_symbol LIKE '%' || ? || '%', 1)
    OR
    COALESCE(g.gene_title LIKE '%' || ? || '%', 1)
ORDER BY
    t.total_probes DESC,
    g.gene_symbol,
    g.transcript_id
LIMIT 50;
`;

  const query = db.prepare(sql);

  return (await query.all(term, term)) as SymbolSearchResult[];
};

const transformExpressionResults = (
  res: BaseExpressionSearchResult[]
): ExpressionSearchResult =>
  res.reduce((acc, item) => {
    const { transcript_id, tissue, ...rest } = item;

    if (!acc[transcript_id]) {
      acc[transcript_id] = {};
    }

    acc[transcript_id][tissue] = rest;

    return acc;
  }, {});

/**
 *  Note that you are not allowed to bind an array to a single parameter
 *  placeholder.
 */
export const expression = async (
  dataset: Dataset,
  transcriptIds: TranscriptID[]
): Promise<ExpressionSearchResult> => {
  const sql = `
SELECT
    d.*
FROM
    data_expression_transcripts d
WHERE
    d.transcript_id IN (${transcriptIds.map(() => "?").join(",")})
    AND d.dataset = ?
ORDER BY
    d.transcript_id,
    d.tissue;
`;

  const query = db.prepare(sql);

  const res = (await query.all(
    ...transcriptIds,
    dataset
  )) as BaseExpressionSearchResult[];

  return transformExpressionResults(res) as ExpressionSearchResult;
};

/** ------ Annotations ------ */

export const geneAnnotation = async (
  transcriptId: TranscriptID
): Promise<GeneAnnotation[]> => {
  const sql = `
SELECT DISTINCT
    transcript_id,
    gene_accession,
    gene_symbol,
    gene_title,
    cytoband,
    entrez_gene_id
FROM
    annotations_transcripts_gene_assignments
WHERE
    transcript_id = ?
ORDER BY
    gene_accession;
  `;

  const query = db.prepare(sql);

  return (await query.all(transcriptId)) as GeneAnnotation[];
};

export const mRNAAnnotation = async (
  transcriptId: TranscriptID
): Promise<MRNAAnnotation[]> => {
  const sql = `
SELECT DISTINCT
    accession,
    assignment_coverage,
    assignment_score,
    assignment_seqname,
    description,
    direct_probes,
    possible_probes,
    source_name,
    transcript_id
FROM
    annotations_transcripts_mrna_assignments
WHERE
    transcript_id = ?
ORDER BY
    accession;
  `;

  const query = db.prepare(sql);

  return (await query.all(transcriptId)) as MRNAAnnotation[];
};

const transformGoTerms = (data: BaseGoTermsAnnotation[]): GoTermsAnnotation => {
  const ret: GoTermsAnnotation = {
    BIOLOGICAL_PROCESS: [],
    CELLULAR_COMPONENT: [],
    MOLECULAR_FUNCTION: [],
  };

  data.map((_) => {
    if (_.annotation === "BIOLOGICAL_PROCESS") {
      ret.BIOLOGICAL_PROCESS.push(_);
    }
    if (_.annotation === "CELLULAR_COMPONENT") {
      ret.CELLULAR_COMPONENT.push(_);
    }
    if (_.annotation === "MOLECULAR_FUNCTION") {
      ret.MOLECULAR_FUNCTION.push(_);
    }
  });

  return ret;
};

export const goTermsAnnotation = async (
  transcriptId: TranscriptID
): Promise<GoTermsAnnotation> => {
  const sql = `
SELECT DISTINCT
    annotation,
    id,
    term,
    evidence
FROM
    annotations_transcripts_go_terms
WHERE
    transcript_id = ?
ORDER BY
    annotation,
    id;
  `;

  const query = db.prepare(sql);

  return transformGoTerms(
    (await query.all(transcriptId)) as BaseGoTermsAnnotation[]
  ) as GoTermsAnnotation;
};

export const pathwaysAnnotation = async (
  transcriptId: TranscriptID
): Promise<PathwayAnnotation[]> => {
  const sql = `
SELECT DISTINCT
    *
FROM
    annotations_transcripts_pathway
WHERE
    transcript_id = ?
    AND source != ''
ORDER BY
    accession;
  `;

  const query = db.prepare(sql);

  // Transcript ID with a lot of this: 2316245
  return (await query.all(transcriptId)) as PathwayAnnotation[];
};

export const proteinDomainsAnnotation = async (
  transcriptId: TranscriptID
): Promise<ProteinDomainAnnotation[]> => {
  const sql = `
SELECT DISTINCT
    accession,
    source,
    domain_description
FROM
    annotations_transcripts_protein_domains
WHERE
    transcript_id = ?
    AND source != ''
ORDER BY
    pfam_accession;
  `;

  const query = db.prepare(sql);

  // Transcript ID with a lot of this: 2316245
  return (await query.all(transcriptId)) as ProteinDomainAnnotation[];
};

export const swissProtAnnotation = async (
  transcriptId: TranscriptID
): Promise<SwissprotAnnotation[]> => {
  const sql = `
SELECT DISTINCT
    transcript_id,
    accession,
    swissprot_accession
FROM
    annotations_transcripts_swissprot
WHERE
    transcript_id = ?
    AND swissprot_accession != ''
;
  `;

  const query = db.prepare(sql);

  // Transcript ID with a lot of this: 2318086
  return (await query.all(transcriptId)) as SwissprotAnnotation[];
};

const transformUnigene = (
  result: BaseUnigeneAnnotation[]
): UnigeneAnnotation => {
  const ret = {} as UnigeneAnnotation;

  result.map((_) => {
    if (!ret[_.unigene_id]) {
      ret[_.unigene_id] = {
        tissues: [],
        accessions: [],
      };
    }

    ret[_.unigene_id].tissues.push(_.unigene_expr);
    ret[_.unigene_id].accessions.push(_.accession);
  });

  Object.keys(ret).map((__) => {
    ret[__].tissues = uniq(ret[__].tissues);
    ret[__].accessions = uniq(ret[__].accessions);
  });

  return ret;
};

export const unigeneAnnotation = async (
  transcriptId: TranscriptID
): Promise<UnigeneAnnotation> => {
  const sql = `
SELECT DISTINCT
    u.unigene_id,
    e.unigene_expr,
    u.accession
FROM
    annotations_transcripts_unigene u
    INNER JOIN annotations_transcripts_unigene_expression e ON u.unigene_id = e.unigene_id
WHERE
    u.transcript_id = ?
ORDER BY
    u.unigene_id;
  `;

  const query = db.prepare(sql);

  // Transcript ID with a lot of this: 2941632
  return transformUnigene(
    (await query.all(transcriptId)) as BaseUnigeneAnnotation[]
  ) as UnigeneAnnotation;
};

export const transformExpressionByTissue = (
  result: BaseExpressionByTissue[]
): ExpressionByTissue => {
  const ret = {} as ExpressionByTissue;

  result.map((_) => {
    if (!ret[_.transcript_id]) {
      ret[_.transcript_id] = Object.fromEntries(
        Object.keys(TISSUE_NAMES).map((_) => [_, []])
      );
    }

    ret[_.transcript_id][_.tissue].push({
      dabg_glaucoma: _.dabg_glaucoma,
      dabg: _.dabg,
      exon_id: _.exon_id,
      gene_accessions: _.gene_accessions.split(","),
      gene_symbols: _.gene_symbols.split(","),
      number_cross_hyb_probes: _.number_cross_hyb_probes,
      number_independent_probes: _.number_independent_probes,
      number_nonoverlapping_probes: _.number_nonoverlapping_probes,
      plier_glaucoma: _.plier_glaucoma,
      plier: _.plier,
      probe_count: _.probe_count,
      probeset_id: _.probeset_id,
      psr_id: _.psr_id,
      rma_glaucoma: _.rma_glaucoma,
      rma: _.rma,
      seqname: _.seqname,
      start: _.start,
      stop: _.stop,
      strand: _.strand,
      tissue: _.tissue,
    });
  });

  return ret;
};

export const expressionByTissue = async (
  dataset: Dataset,
  transcriptIds: TranscriptID[]
): Promise<ExpressionByTissue> => {
  const sql = `
SELECT DISTINCT
    p.transcript_id,
    p.tissue,
    p.rma,
    p.rma_glaucoma,
    p.plier,
    p.plier_glaucoma,
    p.dabg,
    p.dabg_glaucoma,
    a.exon_id,
    a.psr_id,
    a.probeset_id,
    a.seqname,
    a.strand,
    a.start,
    a.stop,
    a.probe_count,
    a.number_independent_probes,
    a.number_cross_hyb_probes,
    a.number_nonoverlapping_probes,
    group_concat(g.gene_accession, ',') AS gene_accessions,
    group_concat(g.gene_symbol, ',') AS gene_symbols
FROM
    data_expression_probesets p
    INNER JOIN annotations_probesets a ON p.probeset_id = a.probeset_id
    INNER JOIN annotations_probesets_gene_assignments g ON p.probeset_id = g.probeset_id
WHERE
    p.transcript_id IN (${transcriptIds.map(() => "?").join(",")})
    AND p.dataset = ?
GROUP BY
    p.transcript_id,
    p.tissue,
    p.rma,
    p.rma_glaucoma,
    p.plier,
    p.plier_glaucoma,
    p.dabg,
    p.dabg_glaucoma,
    a.exon_id,
    a.psr_id,
    a.probeset_id,
    a.seqname,
    a.strand,
    a.start,
    a.stop,
    a.probe_count,
    a.number_independent_probes,
    a.number_cross_hyb_probes,
    a.number_nonoverlapping_probes
ORDER BY
    p.tissue;
  `;

  const query = db.prepare(sql);

  /**
   * This is a list of a 175 of them as a 'stress test'. Locally, takes about
   * half a second.
   *
   * (
   * 3728097, 3749086, 3487218, 3487220, 2931569, 3606304, 3989006, 3966597,
   * 4028229, 3184408, 3441280, 4008170, 3540068, 3540074, 3540076, 3540079,
   * 3531553, 2925724, 3853299, 3853345, 3012381, 2519893, 2591906, 2989485,
   * 2456849, 3910785, 2391514, 4041961, 2456849, 2764478, 2897635, 3379326,
   * 3205659, 3490655, 2571457, 3469687, 3371719, 2322226, 2322264, 3417075,
   * 3212189, 3184218, 3219547, 2605674, 3590460, 3538324, 2898441, 2945440,
   * 3998766, 4030268, 4030310, 2639552, 2639734, 2639857, 3159483, 3850676,
   * 3848907, 2415837, 3756709, 3756723, 3699757, 3757630, 2613441, 3335517,
   * 3377826, 2978957, 3507956, 3507960, 3507962, 3787187, 3787243, 3662924,
   * 2321466, 2321607, 2321637, 2321639, 2397519, 2397571, 2397598, 2397600,
   * 3261009, 3225456, 2376922, 2622912, 3432138, 2590736, 3416577, 2577028,
   * 2577106, 2577198, 2577207, 2577213, 3454092, 3454109, 3454113, 3454115,
   * 3454121, 3454141, 2404344, 2404371, 2924081, 3100690, 3913737, 2549092,
   * 4019611, 2900397, 2900399, 2900405, 2900407, 2900409, 4019768, 3184408,
   * 2422342, 4012299, 4001556, 3953267, 3953701, 3953724, 3954086, 3953267,
   * 3953724, 3954086, 3953267, 3953343, 3953347, 3953351, 3953724, 3953822,
   * 3954086, 2854737, 2337716, 2337740, 2337742, 3434142, 2433209, 3852529,
   * 2344393, 3208640, 3453556, 3079803, 2599580, 3732885, 4048971, 4049106,
   * 4049465, 4049502, 2621815, 2673730, 3018375, 2326561, 2984655, 2984935,
   * 4002173, 3334571, 3576284, 4014025, 4014027, 4014029, 3788049, 3188245,
   * 3188247, 3188249, 3764738, 3188245, 3188247, 3188249, 3764738, 3480681,
   * 3504617, 3761164, 3761231, 3042610, 3042716, 2602493
   * )
   */
  return transformExpressionByTissue(
    (await query.all(...transcriptIds, dataset)) as BaseExpressionByTissue[]
  ) as ExpressionByTissue;
};
