import { HiOutlineArrowRight } from "react-icons/hi";
import { HiOutlineArrowDownCircle } from "react-icons/hi2";
import clsx from "clsx";
import { TISSUE_NAMES, type Tissue } from "definitions";

const inactiveClasses = "hover:cursor-pointer transition-all";
const activeClasses = "font-bold hover:cursor-not-allowed transition-all";

const Tabs: React.FC<{
	currentTissue: Tissue;
	changeHandler: (tissue: Tissue) => void;
}> = ({ currentTissue, changeHandler }) => (
	<ul className="min-w-[13rem] max-w-[13rem] space-y-2 border-r p-2 pl-0">
		{(Object.keys(TISSUE_NAMES) as Tissue[]).map((_) => (
			// biome-ignore lint/a11y/useKeyWithClickEvents: Don't really care.
			<li
				key={`tissue-tab-${_}`}
				className="flex"
				onClick={() => changeHandler(_)}
			>
				<div
					className={clsx({
						"flex-1": true,
						[activeClasses]: currentTissue === _,
						[inactiveClasses]: currentTissue !== _,
					})}
				>
					{TISSUE_NAMES[_]}
					{currentTissue === _ && (
						<HiOutlineArrowRight className="ml-1 inline-block h-4" />
					)}
				</div>
				<div
					className="tooltip"
					data-tip={`Download all ${TISSUE_NAMES[_]} data`}
				>
					<a href={`/tissues/otdb-${_}.json`}>
						<HiOutlineArrowDownCircle className="h-5 w-5 cursor-pointer" />
					</a>
				</div>
			</li>
		))}
		<li className="border-t">
			<a
				href="/tissues/otdb-ALL.json"
				className="my-2 flex rounded-lg px-0 py-1"
			>
				<span className="flex-1">All Tissues</span>
				<HiOutlineArrowDownCircle className="h-5 w-5 cursor-pointer" />
			</a>
		</li>
	</ul>
);

export default Tabs;
