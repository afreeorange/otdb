import type { GoTermsAnnotation, TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";
import MissingData from "../../../components/MissingData";

const Nope = () => (
	<div className="w-full text-center text-sm">No Annotations</div>
);

const DataTable = ({
	data,
}: {
	data: GoTermsAnnotation[keyof GoTermsAnnotation];
}) => (
	<table className="table w-full">
		<thead>
			<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1">
				<th className="w-2/12">ID</th>
				<th className="w-4/12">Term</th>
				<th className="w-6/12">Evidence</th>
			</tr>
		</thead>
		<tbody>
			{data.map((_) => (
				<tr
					key={`goterm-${_.id}`}
					className="[&>*:not(:last-child)]:border-r [&>*]:p-1"
				>
					<td>
						<Annotation
							uri={`https://www.ebi.ac.uk/QuickGO/GTerm?id=${_.id}`}
							className="mr-1"
						>
							{_.id}
						</Annotation>
					</td>
					<td>{_.term}</td>
					<td>{_.evidence}</td>
				</tr>
			))}
		</tbody>
	</table>
);

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } = trpc.annotations.go.useQuery(transcriptId);

	if (isLoading || !data) {
		return <h1>Loading</h1>;
	}

	if (
		data.BIOLOGICAL_PROCESS.length === 0 &&
		data.CELLULAR_COMPONENT.length === 0 &&
		data.MOLECULAR_FUNCTION.length === 0
	) {
		return <MissingData message="No GO Term annotations for this Transcript" />;
	}

	return (
		<div className="[&>*]:bg-base-100">
			<div className="flex border-b">
				<div className="w-1/5 self-center px-2 text-sm">
					Biological Processes
				</div>
				<div className="w-4/5 border-l">
					{data.BIOLOGICAL_PROCESS.length === 0 ? (
						<Nope />
					) : (
						<DataTable data={data.BIOLOGICAL_PROCESS} />
					)}
				</div>
			</div>
			<div className="flex border-b">
				<div className="w-1/5 self-center px-2 text-sm">
					Cellular Components
				</div>
				<div className="w-4/5 border-l">
					{data.CELLULAR_COMPONENT.length === 0 ? (
						<Nope />
					) : (
						<DataTable data={data.CELLULAR_COMPONENT} />
					)}
				</div>
			</div>
			<div className="flex">
				<div className="w-1/5 self-center px-2 text-sm">
					Molecular Functions
				</div>
				<div className="w-4/5 border-l">
					{data.MOLECULAR_FUNCTION.length === 0 ? (
						<Nope />
					) : (
						<DataTable data={data.MOLECULAR_FUNCTION} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Component;
