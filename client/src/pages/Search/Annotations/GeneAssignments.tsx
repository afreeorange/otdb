import type { TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";
import MissingData from "../../../components/MissingData";

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } = trpc.annotations.gene.useQuery(transcriptId);

	if (isLoading || !data) {
		return <h1>Loading</h1>;
	}

	if (!data.length) {
		return <MissingData message="No gene assignments found" />;
	}

	return (
		<table className="table min-w-fit rounded-none bg-base-100">
			<thead>
				<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
					<th className="w-1/12">Accession</th>
					<th className="w-1/12">Symbol</th>
					<th>Title</th>
					<th className="w-1/12 text-right">CytoBand</th>
					<th className="w-1/12 text-right">Entrez ID</th>
				</tr>
			</thead>
			<tbody>
				{data.map((_) => (
					<tr
						key={`gene-${_.transcript_id}-${_.gene_accession}`}
						className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top"
					>
						<td>
							<Annotation uri="https://nikhil.io">
								{_.gene_accession}
							</Annotation>
						</td>
						<td>{_.gene_symbol}</td>
						<td>{_.gene_title}</td>
						<td className="text-right">{_.cytoband}</td>
						<td className="text-right">{_.entrez_gene_id}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Component;
