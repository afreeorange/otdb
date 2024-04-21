import {
  VALID_TISSUES,
  VALID_DATASETS,
  VALID_SEARCH_TYPES,
} from "./constants";

export type Dataset = (typeof VALID_DATASETS)[number];
export type Tissue = (typeof VALID_TISSUES)[number];
export type SearchType = (typeof VALID_SEARCH_TYPES)[number];
export type Strand = "+" | "-";
export type Chromosome = {
  number: number;
  strand: Strand;
  start: number;
  stop: number;
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

export type TissueAnnotation = {
  dabg: number;
  dabgGlaucoma: number;
  exonId: number;
  geneAccessions: string[];
  geneSymbols: string[];
  plier: number;
  plierGlaucoma: number;
  probes: {
    count: number;
    independent: number;
    nonOverlapping: number;
  };
  probesetId: number;
  psrId: number;
  rma: number;
  rmaGlaucoma: number;
  chromosome: {
    number: number;
    start: number;
    stop: number;
    strand: Strand;
  };
};

export type AnnotationSwissprot = {
  id: number;
  accessions: string[];
  swissprots: string[];
};

export type AnnotationUnigene = {
  id: string;
  expression: string[];
  accessions: string[];
};

export type AnnotationMRNA = {
  accession: string;
  coverage: number;
  score: number;
  chromosome: string;
  description: string;
  probesDirect: number;
  probesPossible: number;
  source: string;
  id: number;
};

export type AnnotationProteinDomain = {
  accession: string;
  description: string;
  pfamAccession: string;
  source: string;
};

type GOAnnotationType =
  | "BIOLOGICAL_PROCESS"
  | "CELLULAR_COMPONENT"
  | "MOLECULAR_FUNCTION";

export type AnnotationGO = Record<
  GOAnnotationType,
  {
    id: string;
    term: string;
    evidence: string;
  }[]
>;

export type AnnotationPathway = {
  accession: string;
  name: string;
  source: string;
};

export type AnnotationGene = {
  id: number;
  accession: string;
  symbol: string;
  title: string;
  cytoband: string;
  entrez: string;
};

export type TissueExpression = {
  gene: string;
  geneDescription: string;
  plier: number;
  plierGlaucoma: number;
  transcriptId: number;
};
