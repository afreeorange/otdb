import type { TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";
import MissingData from "../../../components/MissingData";

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } =
		trpc.annotations.proteinDomains.useQuery(transcriptId);

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	if (!data || data?.length === 0) {
		return <MissingData message="No protein domains found" />;
	}

	return (
		<table className="table min-w-fit rounded-none bg-base-100">
			<thead>
				<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
					<th className="w-1/6">Accession</th>
					<th className="w-1/6">Pfam Accession</th>
					<th className="w-1/6">Source</th>
					<th>Domain Description</th>
				</tr>
			</thead>
			<tbody>
				{data.map((_) => (
					<tr
						key={`domains-${transcriptId}-${_.accession}`}
						className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top"
					>
						<td>
							<Annotation
								uri={`https://www.genome.ucsc.edu/cgi-bin/hgGene?hgg_gene=${_.accession}`}
							>
								{_.accession}
							</Annotation>
						</td>
						<td>
							<Annotation
								uri={`http://www.ebi.ac.uk/interpro/IEntry?ac=${_.accession}`}
							>
								{_.accession}
							</Annotation>
						</td>
						<td>{_.accession}</td>
						<td>{_.domain_description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Component;
