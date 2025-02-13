import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
	CartesianGrid,
	Label,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import {
	TISSUE_NAMES,
	type ProbesetExpressionData,
	type Tissue,
	type TranscriptID,
} from "../../../definitions";

import styles from "./Graphs.module.scss";

export const GraphModal = NiceModal.create(
	({
		probesetData,
		transcriptId,
		tissue,
	}: {
		probesetData: ProbesetExpressionData[];
		transcriptId: TranscriptID;
		tissue: Tissue;
	}) => {
		const modal = useModal();

		return (
			// biome-ignore lint/a11y/useKeyWithClickEvents: Not now.
			<dialog
				className="modal"
				open={modal.visible}
				onClick={() => modal.hide()}
			>
				<div className="modal-box w-15/16 max-w-7xl h-4/6">
					<h1 className="text-4xl">
						Alternate Splicing in <strong>{TISSUE_NAMES[tissue]}</strong> for{" "}
						<strong>Transcript #{transcriptId}</strong>
					</h1>
					<div className="modal-action">
						<form method="dialog">
							{/* NOTE: If there is a button in form, it will close the modal */}
							<button
								type="button"
								className="btn btn-outline btn-lg absolute top-4 right-4 z-10 p-4 rounded-full"
								onClick={() => modal.hide()}
							>
								✕
							</button>
						</form>
					</div>
					<FullGraph data={probesetData} className="w-full h-92/100" />
				</div>
			</dialog>
		);
	},
);

export const Sparkline: React.FC<
	{
		data: ProbesetExpressionData[];
	} & React.ComponentProps<"div">
> = ({ data, ...props }) => (
	<div className={styles.sparkline} {...props}>
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={data}>
				<Line
					dataKey="rma"
					dot={false}
					isAnimationActive={false}
					stroke="#cc0000"
					strokeWidth={1}
					type="step"
				/>
				<Line
					dataKey="rma_glaucoma"
					dot={false}
					isAnimationActive={false}
					stroke="#336699"
					strokeWidth={1}
					type="step"
				/>
			</LineChart>
		</ResponsiveContainer>
	</div>
);

export const FullGraph: React.FC<
	{
		data: ProbesetExpressionData[];
	} & React.ComponentProps<"div">
> = ({ data, ...props }) => (
	<div {...props}>
		<ResponsiveContainer width="100%" height="50%">
			<LineChart data={data} margin={{ right: 50, top: 10, bottom: 30 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="probeset_id">
					<Label value="Probeset ID" position="bottom" offset={10} />
				</XAxis>
				<YAxis>
					<Label
						value="Expression Level"
						position="insideEnd"
						angle={-90}
						offset={5}
					/>
				</YAxis>
				<Tooltip />
				<Legend verticalAlign="top" height={36} />
				<Line
					dataKey="rma"
					name="RMA"
					stroke="#cc0000"
					strokeWidth={1.5}
					type="monotoneX"
				/>
				<Line
					dataKey="rma_glaucoma"
					name="RMA Glaucoma"
					stroke="#336699"
					strokeWidth={1.5}
					type="monotoneX"
				/>
			</LineChart>
		</ResponsiveContainer>
		<ResponsiveContainer width="100%" height="50%">
			<LineChart data={data} margin={{ right: 50, top: 10, bottom: 30 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="probeset_id">
					<Label value="Probeset ID" position="bottom" offset={10} />
				</XAxis>
				<YAxis>
					<Label
						value="Expression Level"
						position="insideEnd"
						angle={-90}
						offset={5}
					/>
				</YAxis>
				<Tooltip />
				<Legend verticalAlign="top" height={36} />
				<Line
					dataKey="plier"
					name="DABG"
					stroke="green"
					strokeWidth={1.5}
					type="monotoneX"
				/>
				<Line
					dataKey="plier_glaucoma"
					name="DABG/Glaucoma"
					stroke="teal"
					strokeWidth={1.5}
					type="monotoneX"
				/>
			</LineChart>
		</ResponsiveContainer>
	</div>
);
