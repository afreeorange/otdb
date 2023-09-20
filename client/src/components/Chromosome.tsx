import { HiSolidEllipsisHorizontal } from "solid-icons/hi";
import { AiOutlinePlus, AiOutlineMinus } from "solid-icons/ai";
import numeral from "numeral";
import { Chromosome } from "../types";

const Component = ({ chr }: { chr: Chromosome }) => (
  <div class="join">
    <div class="badge join-item badge-outline badge-sm whitespace-nowrap border border-gray-300">
      Chromosome {chr.number}
    </div>
    <div class="badge join-item  badge-ghost badge-sm border border-gray-300 font-bold">
      {chr.strand === "+" ? <AiOutlinePlus /> : <AiOutlineMinus />}
    </div>
    <div class="badge join-item badge-outline badge-sm border border-gray-300">
      {numeral(chr.start).format("0,00")}
      <HiSolidEllipsisHorizontal class="mx-1 h-4 opacity-30" />
      {numeral(chr.stop).format("0,00")}
    </div>
  </div>
);

export default Component;
