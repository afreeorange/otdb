import type {
	VALID_TISSUES,
	VALID_DATASETS,
	VALID_SEARCH_TYPES,
} from "./constants";

export type Dataset = (typeof VALID_DATASETS)[number];
export type SearchType = (typeof VALID_SEARCH_TYPES)[number];
export type Strand = "+" | "-";
export type Tissue = (typeof VALID_TISSUES)[number];
export type TranscriptID = number; // For readability more than anything.

export type SymbolSearchResult = {
	chromosome: string;
	description: string;
	start: number;
	stop: number;
	strand: Strand;
	symbol: string; // This is either a Gene _or_ an mRNA accession.
	total_probes: number;
	transcript_id: TranscriptID;
};

export type BaseExpressionSearchResult = {
	dataset: Dataset; // We won't use this when transforming to `ExpressionSearchResult`.
	plier_glaucoma: number;
	plier: number;
	rma_glaucoma: number;
	rma: number;
	tissue: Tissue;
	transcript_id: TranscriptID;
};

export type Expression = Record<
	Tissue,
	{
		plier_glaucoma: number;
		plier: number;
		rma_glaucoma: number;
		rma: number;
	}
>;

export type ExpressionSearchResult = Record<TranscriptID, Expression>;

export type GeneAnnotation = {
	transcript_id: TranscriptID;
	gene_accession: string;
	gene_symbol: string;
	gene_title: string;
	cytoband: string;
	entrez_gene_id: string;
};

export type MRNAAnnotation = {
	accession: string;
	assignment_coverage: number;
	assignment_score: number;
	description: string;
	direct_probes: number;
	possible_probes: number;
	source_name: string;
};

type GOAnnotationType =
	| "BIOLOGICAL_PROCESS"
	| "CELLULAR_COMPONENT"
	| "MOLECULAR_FUNCTION";

export type BaseGoTermsAnnotation = {
	annotation: GOAnnotationType;
	id: string;
	term: string;
	evidence: string;
};

export type GoTermsAnnotation = Record<
	GOAnnotationType,
	{
		id: string;
		term: string;
		evidence: string;
	}[]
>;

export type PathwayAnnotation = {
	accession: string;
	source: string;
	name: string;
};

export type ProteinDomainAnnotation = {
	accession: string;
	source: string;
	domain_description: string;
};

export type SwissprotAnnotation = {
	accession: string;
	swissprot_accession: string;
};

export type BaseUnigeneAnnotation = {
	unigene_id: string;
	unigene_expr: string; // This is the tissue.
	accession: string;
};

export type UnigeneAnnotation = Record<
	string,
	{
		tissues: string[];
		accessions: string[];
	}
>;

/** -------------------------------------------------- */

export type BaseExpressionByTissue = {
	transcript_id: TranscriptID;
	tissue: Tissue;
	rma: number;
	rma_glaucoma: number;
	plier: number;
	plier_glaucoma: number;
	dabg: number;
	dabg_glaucoma: number;
	exon_id: number;
	psr_id: number;
	probeset_id: number;
	seqname: string;
	strand: Strand;
	start: number;
	stop: number;
	probe_count: number;
	number_independent_probes: number;
	number_cross_hyb_probes: number;
	number_nonoverlapping_probes: number;
	gene_accessions: string;
	gene_symbols: string;
};

export type ProbesetExpressionData = {
	dabg_glaucoma: number;
	dabg: number;
	exon_id: number;
	gene_accessions: string[];
	gene_symbols: string[];
	number_cross_hyb_probes: number;
	number_independent_probes: number;
	number_nonoverlapping_probes: number;
	plier_glaucoma: number;
	plier: number;
	probe_count: number;
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

export type ExpressionByTissue = Record<
	TranscriptID, // Transcript ID
	Record<Tissue, ProbesetExpressionData[]>
>;

export type TissueExpression = {
	gene: string;
	geneDescription: string;
	plier: number;
	plierGlaucoma: number;
	transcriptId: number;
};
