import {
	type SearchType,
	type Dataset,
	VALID_SEARCH_TYPES,
	VALID_DATASETS,
} from "definitions";
import { useQueryStates, parseAsStringEnum } from "nuqs";

export const useSearchParams = () => {
	return useQueryStates(
		{
			type: parseAsStringEnum<SearchType>(VALID_SEARCH_TYPES).withDefault(
				"gene",
			),
			dataset: parseAsStringEnum<Dataset>(VALID_DATASETS).withDefault("CORE"),
		},
		{
			clearOnDefault: false,
			history: "push",
		},
	);
};
