import type { TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";
import MissingData from "../../../components/MissingData";

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } = trpc.annotations.mrna.useQuery(transcriptId);

	if (isLoading || !data) {
		return <h1>Loading</h1>;
	}

	if (data.length === 0) {
		return <MissingData message="No mRNA assignments found" />;
	}

	return (
		<table className="table min-w-fit rounded-none bg-base-100">
			<thead>
				<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
					<th>Accession</th>
					<th>Source</th>
					<th>Description</th>
					<th className="text-right">Score</th>
					<th className="text-right">Coverage</th>
					<th className="text-center" colSpan={2}>
						Direct / Possible Probes
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((_) => (
					<tr
						key={`mrna-${transcriptId}-${_.accession}`}
						className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top"
					>
						<td>
							<Annotation uri="https://nikhil.io">{_.accession}</Annotation>
						</td>
						<td>{_.source_name}</td>
						<td>{_.description}</td>
						<td className="text-right">{_.assignment_score}</td>
						<td className="text-right">{_.assignment_coverage}</td>
						<td className="text-right">{_.direct_probes}</td>
						<td className="text-right">{_.possible_probes}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Component;
