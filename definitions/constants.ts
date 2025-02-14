export const UPSTREAM_API = {
	local: "http://localhost:3000",
	development: "https://dev.example.com",
	production: "https://dev.example.com",
};

export const TISSUE_NAMES: Record<string, string> = {
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

export const VALID_TISSUES = Object.keys(TISSUE_NAMES);
export const VALID_DATASETS = ["CORE", "EXTENDED", "FULL"];
export const VALID_SEARCH_TYPES = ["gene", "mrna", "transcript_id"];
