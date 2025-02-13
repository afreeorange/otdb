import type { TranscriptID } from "definitions";
import Annotation from "../../../components/Annotation";
import { trpc } from "../../../services";

const Component = ({ transcriptId }: { transcriptId: TranscriptID }) => {
	const { isLoading, data } = trpc.annotations.unigene.useQuery(transcriptId);

	if (isLoading || !data) {
		return <h1>Loading</h1>;
	}

	return (
		<table className="table rounded-none bg-base-100">
			<thead>
				<tr className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
					<th className="w-1/12">Unigene ID</th>
					<th>Accessions</th>
					<th>Expression</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(data).map((_) => (
					<tr
						key={`unigene-${transcriptId}-${_}`}
						className="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top"
					>
						<td>{_}</td>
						<td className="space-y-1 w-3/12">
							{data[_].accessions.map((__) => (
								<Annotation
									key={`unigene-${transcriptId}-${_}-${__}`}
									uri="https://nikhil.io"
									className="mr-1"
								>
									{__}
								</Annotation>
							))}
						</td>
						<td className="space-y-1">
							{data[_].tissues.map((__) => (
								<span
									key={`unigene-${transcriptId}-${_}-${__}`}
									className="badge badge-ghost badge-sm mr-1 inline-block"
								>
									{__}
								</span>
							))}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Component;
