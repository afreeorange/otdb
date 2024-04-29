import genes from "./affymetrix/genes";
import go from "./affymetrix/go";
import mrna from "./affymetrix/mrna";
import pathways from "./affymetrix/pathways";
import proteinDomains from "./affymetrix/proteinDomains";
import swissprot from "./affymetrix/swissprot";
import unigene from "./affymetrix/unigene";

import transcript from "./transcript";

export default {
  affymetrix: {
    genes,
    go,
    mrna,
    pathways,
    proteinDomains,
    swissprot,
    unigene,
  },
  transcript,
};
