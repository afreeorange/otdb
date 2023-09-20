import { AnnotationMRNA } from "../../../../types";

export default {
  data: [
    {
      accession: "BC039825",
      coverage: 41,
      score: 99,
      chromosome: "chr6",
      description:
        "Homo sapiens male germ cell-associated kinase, mRNA (cDNA clone MGC:48725 IMAGE:5167621), complete cds.",
      probesDirect: 73,
      probesPossible: 74,
      source: "GenBank",
      id: 2941632,
    },
    {
      accession: "ENST00000313243",
      coverage: 50,
      score: 100,
      chromosome: "chr6",
      description: "Serine/threonine-protein kinase MAK gene:ENSG00000111837",
      probesDirect: 89,
      probesPossible: 89,
      source: "ENSEMBL",
      id: 2941632,
    },
    {
      accession: "ENST00000354489",
      coverage: 46,
      score: 100,
      chromosome: "chr6",
      description: "Serine/threonine-protein kinase MAK gene:ENSG00000111837",
      probesDirect: 83,
      probesPossible: 83,
      source: "ENSEMBL",
      id: 2941632,
    },
    {
      accession: "ENST00000474039",
      coverage: 47,
      score: 100,
      chromosome: "chr6",
      description:
        "cdna:known chromosome:GRCh37:6:10762956:10838764:-1 gene:ENSG00000111837",
      probesDirect: 84,
      probesPossible: 84,
      source: "ENSEMBL",
      id: 2941632,
    },
    {
      accession: "NM_005906",
      coverage: 46,
      score: 100,
      chromosome: "chr6",
      description: "Homo sapiens male germ cell-associated kinase (MAK), mRNA.",
      probesDirect: 83,
      probesPossible: 83,
      source: "RefSeq",
      id: 2941632,
    },
  ],
} as {
  data: AnnotationMRNA[];
};
