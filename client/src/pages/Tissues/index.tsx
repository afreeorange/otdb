import { createSignal } from "solid-js";
import { HiOutlineArrowDownCircle } from "solid-icons/hi";

import { Header, PageBody } from "../../components";
import SideTabs, { tabs } from "./SideTabs";
import { Tissue } from "../../types";
import TissueData from "./TissueData";

export default () => {
  const [tissue, setTissue] = createSignal<Tissue>("CHOROID");

  return (
    <>
      <Header />
      <PageBody>
        <h1 class="text-3xl font-bold">
          Gene Expression by Tissue &ndash;{" "}
          <span class="font-normal">{tabs[tissue()]}</span>
        </h1>
        <p class="pb-6 pt-4">
          The tables below list the top 100 most expressed genes in a given
          tissue, sorted by PLIER values. You can download all &approx;50,000
          data points for a given tissue by clicking the{" "}
          <HiOutlineArrowDownCircle class="mb-0.5 inline h-5 w-5 text-primary" />{" "}
          next to its name. You can also download all &approx;500,000 expression
          values across all tissues. All downloads are gzipped JSON.
        </p>

        <div class="flex">
          <SideTabs currentTissue={tissue} changeHandler={setTissue} />
          <TissueData tissue={tissue} />
        </div>
      </PageBody>
    </>
  );
};
