import { HiOutlineDocumentText } from "solid-icons/hi";
import { TbBulb, TbDna } from "solid-icons/tb";
import { AiOutlineApi } from "solid-icons/ai";

export const VALID_TISSUES = [
  "CHOROID",
  "CILIARY_BODY",
  "CORNEA",
  "IRIS",
  "LENS",
  "OPTIC_NERVE",
  "OPTIC_NERVE_HEAD",
  "RETINA",
  "SCLERA",
  "TRABECULAR_MESHWORK",
] as const;

export const VALID_DATASETS = ["CORE", "EXTENDED", "FULL"] as const;

export const VALID_SEARCH_TYPES = ["gene", "mrna", "transcript_id"] as const;

export const PROJECT_LINK = "https://github.com/afreeorange/otdb";

export const SITE_NAME = "The Ocular Tissue Database";

export const NAVIGATION: {
  icon: any; // TODO: Lol...
  uri: string;
  text: string;
}[] = [
  {
    icon: <TbDna class="text-primary group-hover:text-base-100" />,
    uri: "/tissues",
    text: "Genes",
  },
  {
    icon: <AiOutlineApi class="fill-primary group-hover:fill-base-100" />,
    uri: "/docs",
    text: "API",
  },
  {
    icon: (
      <HiOutlineDocumentText class="text-primary group-hover:text-base-100" />
    ),
    uri: "/paper",
    text: "Paper",
  },
  {
    icon: <TbBulb class="text-primary group-hover:text-base-100" />,
    uri: "/about",
    text: "About",
  },
];
