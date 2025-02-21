import type { TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";
import MissingData from "../../../components/MissingData";

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } = trpc.annotations.swissprot.useQuery(transcriptId);

	if (isLoading || !data) {
		return <h1>Loading</h1>;
	}

	if (!data || data?.length === 0) {
		return <MissingData message="No SwissProt annotations found" />;
	}

	return (
		<div className="p-2">
			{data.map((_) => (
				<Annotation
					key={`swissprot-${transcriptId}-${_.accession}-${_.swissprot_accession}`}
					uri={`https://www.genome.ucsc.edu/cgi-bin/hgGene?hgg_gene=${_.accession}`}
				>
					{_.swissprot_accession} | {_.accession}
				</Annotation>
			))}
		</div>
	);
};

export default Component;
