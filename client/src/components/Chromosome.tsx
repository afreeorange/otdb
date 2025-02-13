import numeral from "numeral";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import type { Strand } from "../../../definitions";

const Component = ({
	chromosome,
	strand,
	start,
	stop,
}: {
	chromosome: string;
	strand: Strand;
	start: number;
	stop: number;
}) => (
	<div className="join">
		<div className="badge join-item badge-outline badge-sm whitespace-nowrap border">
			Chromosome {chromosome}
		</div>
		<div className="badge join-item badge-outline badge-sm font-bold">
			{strand === "+" ? <AiOutlinePlus /> : <AiOutlineMinus />}
		</div>
		<div className="badge join-item badge-outline badge-sm border">
			{numeral(start).format("0,00")}
			<IoEllipsisHorizontalSharp className="mx-1 h-4" />
			{numeral(stop).format("0,00")}
		</div>
	</div>
);

export default Component;
