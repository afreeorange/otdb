import { HiOutlineArrowDownCircle, HiOutlineArrowRight } from "solid-icons/hi";
import { Accessor } from "solid-js";
import { Tissue } from "../../types";

export const tabs: Record<Tissue, string> = {
  CHOROID: "Choroid",
  CILIARY_BODY: "Ciliary Body",
  CORNEA: "Cornea",
  IRIS: "Iris",
  LENS: "Lens",
  OPTIC_NERVE: "Optic Nerve",
  OPTIC_NERVE_HEAD: "Optic Nerve Head",
  RETINA: "Retina",
  SCLERA: "Sclera",
  TRABECULAR_MESHWORK: "Trabecular Meshwork",
};

const inactiveClasses =
  "text-primary opacity-50 hover:cursor-pointer hover:opacity-100 transition-all";
const activeClasses =
  "font-bold text-primary hover:cursor-not-allowed transition-all";

export default ({
  currentTissue,
  changeHandler,
}: {
  currentTissue: Accessor<Tissue>;
  changeHandler: Function;
}) => (
  <ul class="min-w-[12rem] max-w-[12rem] space-y-2 border-r p-2 pl-0 text-sm text-secondary">
    {(Object.keys(tabs) as Tissue[]).map((_) => (
      <li class="flex" onClick={() => changeHandler(_)}>
        <div
          classList={{
            "flex-1": true,
            [activeClasses]: currentTissue() === _,
            [inactiveClasses]: currentTissue() !== _,
          }}
        >
          {tabs[_]}
          {currentTissue() === _ && (
            <HiOutlineArrowRight class="ml-1 inline-block h-4" />
          )}
        </div>
        <div class="tooltip" data-tip={`Download all ${tabs[_]} data`}>
          <a href={`/tissues/otdb-${_}.json.gz`}>
            <HiOutlineArrowDownCircle class="h-5 w-5 cursor-pointer text-primary hover:fill-primary hover:text-white" />
          </a>
        </div>
      </li>
    ))}
    <li class="border-t">
      <a
        href="/tissues/otdb-ALL.json.gz"
        class="my-2 flex rounded-lg  border-primary px-0 py-1 text-primary opacity-50 hover:opacity-100 [&>svg]:hover:fill-primary [&>svg]:hover:text-white"
      >
        <span class="flex-1">All Tissues</span>
        <HiOutlineArrowDownCircle class="h-5 w-5 cursor-pointer text-primary " />
      </a>
    </li>
  </ul>
);
