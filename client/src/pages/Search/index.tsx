import { createSignal } from "solid-js";
import { HiSolidArrowRight } from "solid-icons/hi";

import Chromosome from "../../components/Chromosome";

import type { SearchResult } from "../../types";
import {
  Expression,
  GOTerms,
  GeneAssignments,
  Pathways,
  ProteinDomains,
  RNAAssignments,
  SwissProt,
  Unigene,
} from "./Panels";

/** --- Sample Shit --- */

import goData from "../../data/sample/annotations/affymetrix/go";
import rData from "../../data/sample/annotations/affymetrix/mrna";
import pData from "../../data/sample/annotations/affymetrix/pathways";
import pdData from "../../data/sample/annotations/affymetrix/protein_domains";
import uData from "../../data/sample/annotations/affymetrix/unigene";
import sData from "../../data/sample/annotations/affymetrix/swissprot";
import gaData from "../../data/sample/annotations/affymetrix/genes";
import { Header, PageFooter } from "../../components";

/** --- Sample Shit --- */

const tabs: Record<number, string> = {
  1: "Expression",
  2: "Gene Assignments",
  3: "mRNA Assignments",
  4: "GO Terms",
  5: "Pathway",
  6: "Protein Domains",
  7: "Swissprot",
  8: "Unigene",
};

const SideTabs = ({
  activeTab,
  changeHandler,
}: {
  activeTab: Function;
  changeHandler: any;
}) => {
  const inactiveClasses =
    "text-primary opacity-70 hover:cursor-pointer hover:opacity-100 transition-all";
  const activeClasses =
    "font-bold text-primary hover:cursor-not-allowed transition-all";

  // TODO: Why the fuck do I have to `parseInt` here?!
  return (
    <ul class="min-w-[10rem] max-w-[10rem] space-y-2 border-r bg-base-100 p-2 text-sm text-secondary">
      {Object.keys(tabs).map((_) => (
        <li
          class={activeTab() === parseInt(_) ? activeClasses : inactiveClasses}
          onClick={() => changeHandler(parseInt(_))}
        >
          {tabs[parseInt(_)]}
          {activeTab() === parseInt(_) && (
            <HiSolidArrowRight class="ml-1 inline-block h-4" />
          )}
        </li>
      ))}
    </ul>
  );
};

const Result = ({ result }: { result: SearchResult }) => {
  const [tab, setActiveTab] = createSignal(1);

  return (
    <div class="border-b">
      <div class="flex border-b">
        <h2 class="mt-2 place-self-center self-center p-2 text-5xl font-bold tracking-tight">
          {result.gene.symbol}
        </h2>
        <div class="space-y-1 self-center p-4">
          <div class="ml-1 font-medium">{result.gene.description}</div>
          <div class="flex gap-6 ">
            <Chromosome chr={result.chromosome} />
            <div class="self-center text-xs opacity-50">
              Transcript #<span class="font-bold">{result.transcriptId}</span>
            </div>
            <div class="self-center text-xs opacity-50">
              <span class="font-bold">{result.probeCount}</span> Probes
            </div>
          </div>
        </div>
      </div>

      <div class="bg-behind-panel flex">
        <SideTabs activeTab={tab} changeHandler={setActiveTab} />
        <div class="bg-panel relative overflow-x-auto">
          <div class="h-full border-r bg-transparent">
            <div class="w-[64rem] min-w-[64rem] max-w-[72rem]">
              {(() => {
                switch (tab()) {
                  case 1:
                    return <Expression result={result} />;
                  case 2:
                    return <GOTerms data={goData.data} />;
                  case 3:
                    return <Pathways data={pData.data} />;
                  case 4:
                    return <ProteinDomains data={pdData.data} />;
                  case 5:
                    return <Unigene data={uData.data} />;
                  case 6:
                    return <SwissProt data={sData.data} />;
                  case 7:
                    return <GeneAssignments data={gaData.data} />;
                  case 8:
                    return <RNAAssignments data={rData.data} />;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * NOTE: You can seed this with results for faster development.
 */
export default ({ results }: { results?: SearchResult[] }) => (
  <>
    <Header />
    {results && Object.values(results).map((_) => <Result result={_} />)}
    <PageFooter />
  </>
);
