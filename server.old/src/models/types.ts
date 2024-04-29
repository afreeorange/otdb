import { VALID_TISSUES, VALID_DATASETS } from "../constants";

export type Dataset = (typeof VALID_DATASETS)[number];
export type Tissue = (typeof VALID_TISSUES)[number];
export type Strand = "+" | "-";
export type Chromosome = {
  number: number;
  strand: Strand;
  start: number;
  stop: number;
};
