import { useState } from "react";
import { Helmet } from "react-helmet";
import { HiOutlineArrowDownCircle } from "react-icons/hi2";

import { TISSUE_NAMES, type Tissue } from "definitions";

import Tabs from "./Tabs";
import Shell from "../../components/Shell";
import { SITE_NAME } from "../../constants";

import TissueData from "./Content";

export default () => {
  const [tissue, setTissue] = useState<Tissue>("CHOROID");

  return (
    <>
      <Helmet>
        <title>Gene Expression by Tissue &ndash; {SITE_NAME}</title>
      </Helmet>

      <h1 className="text-3xl font-bold">
        Gene Expression by Tissue &ndash;{" "}
        <span className="font-normal">{TISSUE_NAMES[tissue]}</span>
      </h1>
      <p className="pb-6 pt-4">
        The tables below list the top 100 most expressed genes in a given
        tissue, sorted by PLIER values. You can download all &asymp;50,000 data
        points for a given tissue by clicking the{" "}
        <HiOutlineArrowDownCircle className="mb-0.5 inline h-5 w-5 " /> next to
        its name. You can also download all &asymp;500,000 expression values
        across all tissues. All downloads are gzipped JSON.
      </p>

      <div className="flex">
        <Tabs currentTissue={tissue} changeHandler={setTissue} />
        <TissueData tissue={tissue} />
      </div>
    </>
  );
};
