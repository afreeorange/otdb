import numeral from "numeral";
import type { ProbesetExpressionData } from "definitions";

const Component = ({ data }: { data: ProbesetExpressionData[] }) => (
	<table className="text-xs bg-base-100 w-full">
		<thead>
			<tr className="[&>*:not(:last-child)]:border-r [&>*]:px-0.5 [&>*]:border-t">
				<th className="text-center w-1/12">Probeset #</th>
				<th className="text-center w-2/12" colSpan={2}>
					DABG <span>Normal/Glaucoma</span>
				</th>
				<th className="text-center w-2/12" colSpan={2}>
					PLIER <span>Normal/Glaucoma</span>
				</th>
				<th className="text-center">Sequence</th>
				<th className="w-1/12">
					<div
						className="tooltip underline cursor-pointer"
						data-tip={"Total, # Independent, # Non-Overlapping"}
					>
						Probe Counts
					</div>
				</th>
				<th className="w-1/12">Exon</th>
				<th className="w-1/12">PSR</th>

				{/* <th>Accessions</th> */}
			</tr>
		</thead>
		<tbody>
			{data.map((_) => (
				<tr
					className="[&>*:not(:last-child)]:border-r [&>*]:p-0.5 [&>*]:align-top"
					key={`probeset-gene-annotation-${_.probeset_id}`}
				>
					<td className="border-t text-center">{_.probeset_id}</td>
					<td className="border-t text-right">
						{numeral(_.dabg).format("0,0.0000")}
					</td>
					<td className="border-t text-right">
						{numeral(_.dabg_glaucoma).format("0,0.0000")}
					</td>
					<td className="border-t text-right">
						{numeral(_.plier).format("0,0.0000")}
					</td>
					<td className="border-t text-right">
						{numeral(_.plier_glaucoma).format("0,0.0000")}
					</td>
					<td className="border-t text-center">
						{_.seqname}({_.strand}) {_.start}&ndash;{_.stop}
					</td>
					<td className="border-t text-center">
						{_.probe_count}, {_.number_independent_probes},{" "}
						{_.number_nonoverlapping_probes}
					</td>
					<td className="border-t text-center">{_.exon_id}</td>
					<td className="border-t text-center">{_.psr_id}</td>

					{/* <td className="border-t">
            {_.gene_accessions.map((__) => (
              <a
                className="inline-block mx-1"
                key={`probeset-gene-annotation-${_.probeset_id}-${__}`}
                href={`https://lol/${__}`}
              >
                {__}
              </a>
            ))}
          </td> */}
				</tr>
			))}
		</tbody>
	</table>
);

export default Component;
