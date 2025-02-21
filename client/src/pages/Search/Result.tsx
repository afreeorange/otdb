/**
 * A single search result.
 */

import { useState } from "react";
import type {
	SymbolSearchResult,
	ExpressionSearchResult,
	ExpressionByTissue,
} from "definitions";
import Chromosome from "../../components/Chromosome";
import GeneAssignments from "./Annotations/GeneAssignments";
import GOTerms from "./Annotations/GOTerms";
import Pathways from "./Annotations/Pathways";
import ProteinDomains from "./Annotations/ProteinDomains";
import RNAAssignments from "./Annotations/RNAAssignments";
import SwissProt from "./Annotations/SwissProt";
import Unigene from "./Annotations/Unigene";
import Expression from "./Expression/Transcript";
import { HiOutlineArrowRight } from "react-icons/hi2";

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

const inactiveClasses = "hover:cursor-pointer transition-all";
const activeClasses = "font-bold hover:cursor-not-allowed transition-all";

const Component = ({
	searchResult,
	expressionResults,
	tissueResults,
}: {
	searchResult: SymbolSearchResult;
	expressionResults: ExpressionSearchResult;
	tissueResults: ExpressionByTissue;
}) => {
	const [activeTab, setActiveTab] = useState(1);

	return (
		<div className="border-b">
			<div className="flex border-b">
				<h2 className=" mt-2 place-self-center self-center p-2 text-6xl font-bold tracking-tight">
					{searchResult.symbol}
				</h2>
				<div className="self-center p-4">
					<div className="ml-1 font-medium">{searchResult.description}</div>
					<div className="flex gap-6">
						<Chromosome
							chromosome={searchResult.chromosome}
							start={searchResult.start}
							stop={searchResult.stop}
							strand={searchResult.strand}
						/>
					</div>
				</div>
				<div className="flex flex-col self-center gap-y-0.5 mt-1">
					<div className="text-sm">
						Transcript #
						<span
							data-transcript-id={searchResult.transcript_id}
							className="font-bold"
						>
							{searchResult.transcript_id}
						</span>
					</div>
					<div className="text-sm">
						<span className="font-bold">{searchResult.total_probes}</span>{" "}
						Probes
					</div>
				</div>
			</div>

			<div className="bg-behind-panel flex">
				<ul className="min-w-[10rem] max-w-[10rem] space-y-2 border-r bg-base-100 p-2 text-sm">
					{Object.keys(tabs).map((t) => {
						const _t = Number.parseInt(t); // TODO: Why?

						return (
							// biome-ignore lint/a11y/useKeyWithClickEvents: I don't care
							<li
								className={activeTab === _t ? activeClasses : inactiveClasses}
								onClick={() => setActiveTab(_t)}
								key={`tab-${_t}`}
							>
								{tabs[_t]}
								{activeTab === _t && (
									<HiOutlineArrowRight className="ml-1 inline-block h-4" />
								)}
							</li>
						);
					})}
				</ul>
				<div className="bg-panel relative overflow-x-auto">
					<div className="h-full border-r bg-transparent">
						<div className="w-6xl min-w-6xl h-full">
							{activeTab === 1 && (
								<Expression
									transcriptId={searchResult.transcript_id}
									expression={expressionResults[searchResult.transcript_id]}
									tissueResults={tissueResults}
								/>
							)}
							{activeTab === 2 && (
								<GeneAssignments transcriptId={searchResult.transcript_id} />
							)}
							{activeTab === 3 && (
								<RNAAssignments transcriptId={searchResult.transcript_id} />
							)}
							{activeTab === 4 && (
								<GOTerms transcriptId={searchResult.transcript_id} />
							)}
							{activeTab === 5 && (
								<Pathways transcriptId={searchResult.transcript_id} />
							)}
							{activeTab === 6 && (
								<ProteinDomains transcriptId={searchResult.transcript_id} />
							)}
							{activeTab === 7 && (
								<SwissProt transcriptId={searchResult.transcript_id} />
							)}
							{activeTab === 8 && (
								<Unigene transcriptId={searchResult.transcript_id} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Component;
