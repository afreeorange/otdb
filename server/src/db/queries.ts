import { query as a_g } from "./annotations/gene";
import { query as a_g_o } from "./annotations/go";
import { query as a_m } from "./annotations/mrna";
import { query as a_p } from "./annotations/pathway";
import { query as a_p_d } from "./annotations/proteinDomains";
import { query as a_s } from "./annotations/swissprot";
import { query as a_u } from "./annotations/unigene";

import { query as e_a } from "./expression/alternateSplicing";
import { query as e_t } from "./expression/tissue";

import { query as s_g } from "./search/gene";
import { query as s_m } from "./search/mrna";
import { query as s_t } from "./search/transcript";

export default {
  annotations: {
    gene: a_g,
    go: a_g_o,
    mrna: a_m,
    pathway: a_p,
    proteinDomains: a_p_d,
    swissprot: a_s,
    unigene: a_u,
  },
  expression: {
    alternateSplicing: e_a,
    tissue: e_t,
  },
  search: {
    gene: s_g,
    mrna: s_m,
    transcript: s_t,
  },
};
