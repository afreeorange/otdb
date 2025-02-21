import type { TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";
import MissingData from "../../../components/MissingData";

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } = trpc.annotations.pathways.useQuery(transcriptId);

	if (isLoading || !data) {
		return <h1>Loading</h1>;
	}

	if (data.length === 0) {
		return <MissingData message="No pathway data available" />;
	}

	return (
		<table className="table min-w-fit rounded-none border-b bg-base-100">
			<thead>
				<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
					<th className="w-1/6">Accession</th>
					<th className="w-1/6">Source</th>
					<th>Pathway</th>
				</tr>
			</thead>
			<tbody>
				{data.map((_) => (
					<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
						<td>
							<Annotation
								uri={`https://www.ncbi.nlm.nih.gov/nuccore/${_.accession}`}
								className="mr-1"
							>
								{_.accession}
							</Annotation>
						</td>
						<td>{_.source}</td>
						<td>{_.name}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Component;
