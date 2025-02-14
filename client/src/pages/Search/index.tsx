import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router";
import Shell from "../../components/Shell";
import { trpc } from "../../services";
import {
  type Dataset,
  type SearchType,
  VALID_DATASETS,
  VALID_SEARCH_TYPES,
} from "definitions";
import SearchResult from "./Result";

export default () => {
  /**
   * Gather URI params and set some defaults in case we get junk.
   *
   * - The search term cannot be fewer than 3 characters.
   * - The `type` must be valid.
   * - The `dataset` must be valid.
   */
  const uriParams = useParams();
  const [uriSearchParams, setUriSearchParams] = useSearchParams();

  const loc = useLocation();

  let ret: React.ReactNode;

  const term = uriParams.term;
  if (!term || term.length < 3) {
    return (
      <Shell>
        <h1>Search term must be at least three characters</h1>
      </Shell>
    );
  }

  const type = (uriSearchParams.get("type") || "gene") as SearchType;
  if (!VALID_SEARCH_TYPES.includes(type)) {
    return (
      <Shell>
        <h1>Invalid Search Type</h1>
      </Shell>
    );
  }

  const dataset = (uriSearchParams.get("dataset") || "CORE") as Dataset;
  if (!VALID_DATASETS.includes(dataset)) {
    return (
      <Shell>
        <h1>Invalid Dataset Type</h1>
      </Shell>
    );
  }

  return (
    <Shell>
      {term} {type} {dataset}
      <pre>{JSON.stringify(loc, null, 2)}</pre>
    </Shell>
  );

  // /**
  //  * Update the search params with (now) valid values.
  //  */
  // useEffect(() => {
  // 	setUriSearchParams({ type, dataset });
  // }, [type, dataset, setUriSearchParams]);

  // /**
  //  * Fetch the base search results. This is the set of all transcripts
  //  * that match the search term.
  //  */
  // const searchQuery = trpc.search.useQuery(
  // 	{
  // 		type,
  // 		term,
  // 	},
  // 	{
  // 		enabled: !!term,
  // 	},
  // );

  // /**
  //  * Fetch the expression data for the transcripts from the base search.
  //  */
  // const transcriptExpressionQuery = trpc.expression.transcripts.useQuery(
  // 	{
  // 		dataset,
  // 		transcriptIds: searchQuery.data?.map((_) => _.transcript_id)!,
  // 	},
  // 	{
  // 		enabled: !!searchQuery.data,
  // 	},
  // );

  // /**
  //  * Fetch the expression data for the probesets corresponding to the
  //  * transcripts from the base search.
  //  */
  // const probesetExpressionQuery = trpc.expression.tissues.useQuery(
  // 	{
  // 		dataset,
  // 		transcriptIds: searchQuery.data?.map((_) => _.transcript_id)!,
  // 	},
  // 	{
  // 		enabled: !!searchQuery.data,
  // 	},
  // );

  // if (
  // 	searchQuery.isLoading ||
  // 	transcriptExpressionQuery.isLoading ||
  // 	probesetExpressionQuery.isLoading
  // ) {
  // 	ret = <div>Loading...</div>;
  // }

  // if (
  // 	searchQuery.data &&
  // 	transcriptExpressionQuery.data &&
  // 	probesetExpressionQuery.data
  // ) {
  // 	ret = searchQuery.data.map((_) => (
  // 		<SearchResult
  // 			key={`result-${_.transcript_id}-${_.symbol}`}
  // 			searchResult={_}
  // 			expressionResults={transcriptExpressionQuery.data}
  // 			tissueResults={probesetExpressionQuery.data}
  // 		/>
  // 	));
  // }

  // return <Shell padContent={false}>{ret}</Shell>;
};
