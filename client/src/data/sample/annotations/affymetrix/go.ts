import { AnnotationGO } from "../../../../types";

export default {
  data: {
    BIOLOGICAL_PROCESS: [
      {
        evidence: "non-traceable author statement",
        id: "GO:0006468",
        term: "protein phosphorylation",
      },
      {
        evidence: "inferred from electronic annotation",
        id: "GO:0007275",
        term: "multicellular organismal development",
      },
      {
        evidence: "non-traceable author statement",
        id: "GO:0007283",
        term: "spermatogenesis",
      },
      {
        evidence: "inferred from electronic annotation",
        id: "GO:0030154",
        term: "cell differentiation",
      },
    ],
    CELLULAR_COMPONENT: [],
    MOLECULAR_FUNCTION: [
      {
        evidence: "inferred from electronic annotation",
        id: "GO:0000166",
        term: "nucleotide binding",
      },
      {
        evidence: "non-traceable author statement",
        id: "GO:0004672",
        term: "protein kinase activity",
      },
      {
        evidence: "inferred from electronic annotation",
        id: "GO:0004693",
        term: "cyclin-dependent protein kinase activity",
      },
      {
        evidence: "non-traceable author statement",
        id: "GO:0005524",
        term: "ATP binding",
      },
      {
        evidence: "inferred from electronic annotation",
        id: "GO:0016740",
        term: "transferase activity",
      },
    ],
  },
} as {
  data: AnnotationGO;
};
