import numeral from "numeral";
import type { Dataset, Tissue, TissueExpression } from "definitions";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Loading = () => (
	<div className="flex h-full justify-center align-middle">
		<div className="loading loading-infinity loading-lg " />
	</div>
);

const getTissueData = async ({
	tissue,
	dataset,
}: {
	tissue: Tissue;
	dataset: Dataset;
}): Promise<TissueExpression[]> => {
	const { default: expressionData } = await import(
		`./data/top-100.${dataset.toLowerCase()}.${tissue}.json`
	);

	return expressionData;
};

const Table: React.FC<{ data: TissueExpression[] }> = ({ data }) => (
	<table className="table table-zebra">
		<thead>
			<tr>
				<th>Gene</th>
				<th className="text-right">PLIER</th>
				<th className="text-right">PLIER Glaucoma</th>
				<th className="text-right">Transcript</th>
			</tr>
		</thead>
		<tbody>
			{data.map((_) => (
				<tr key={`tissue-${_.transcriptId}-${_.gene}`}>
					<td className="w-6/12 pb-0 pt-1.5 align-top">
						{_.gene}
						<span className="block text-xs">{_.geneDescription}</span>
					</td>
					<td className="w-2/12 pb-0 pt-1.5 text-right align-top">
						{numeral(_.plier).format("0,00.000")}
					</td>
					<td className="w-2/12 pb-0 pt-1.5 text-right align-top">
						{numeral(_.plierGlaucoma).format("0,00.000")}
					</td>
					<td className="w-2/12 pb-0 pt-1.5 text-right align-top">
						{_.transcriptId}
					</td>
				</tr>
			))}
		</tbody>
	</table>
);

const TissueData: React.FC<{
	tissue: Tissue;
}> = ({ tissue }): JSX.Element => {
	const [dataset, setDataset] = useState<Dataset>("CORE");
	const [data, setData] = useState<TissueExpression[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		(async () => {
			const _ = await getTissueData({ tissue, dataset });
			setData(_);
		})();

		setLoading(false);
	}, [tissue, dataset]);

	return (
		<div className="w-full">
			<div role="tablist" className="tabs tabs-lift mb-1.5 ml-2">
				<button
					type="button"
					role="tab"
					className={clsx({
						"tab tab-lifted ": true,
						"tab-active": dataset === "CORE",
					})}
					onClick={() => setDataset("CORE")}
				>
					Core Dataset
				</button>
				<button
					type="button"
					role="tab"
					className={clsx({
						"tab tab-lifted ": true,
						"tab-active": dataset === "EXTENDED",
					})}
					onClick={() => setDataset("EXTENDED")}
				>
					Extended Dataset
				</button>
			</div>

			{loading && <Loading />}
			{data && <Table data={data as TissueExpression[]} />}
		</div>
	);
};

export default TissueData;
