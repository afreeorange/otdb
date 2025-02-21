import type React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Helmet } from "react-helmet";
import clsx from "clsx";

import { Footer } from "../components/Footer";
import { SITE_NAME } from "../constants";
import { FiArrowRight } from "react-icons/fi";
import { NAVIGATION, type NavigationElement } from "../components/Header";
import type { SearchType } from "definitions";

const Card: React.FC<NavigationElement> = ({ text, textSmall, uri, icon }) => (
	<a
		href={`${uri}`}
		className="card w-full cursor-pointer border p-3 pb-2 transition-all"
	>
		<div className="mb-2 [&>*]:h-8 [&>*]:w-8">{icon}</div>
		{textSmall ? (
			<>
				<span className="hidden md:inline-block">{text}</span>
				<span className="md:hidden">{textSmall}</span>
			</>
		) : (
			<span>{text}</span>
		)}
	</a>
);

const Home = () => {
	const navigate = useNavigate();

	const [term, setTerm] = useState("MAK");
	const [type, setType] = useState<SearchType>("gene");
	const [dataset, setDataset] = useState("CORE");

	return (
		<div className="bg-home flex min-h-screen">
			<Helmet>
				<title>{SITE_NAME}</title>
			</Helmet>

			<div className="hero self-center bg-base-100">
				<div className="hero-content p-8">
					<div>
						<h1 className="mb-5  ">
							<span className="text-3xl">The</span>{" "}
							<span className="block text-5xl font-bold uppercase">
								Ocular Tissue Database
							</span>
						</h1>

						<div className="join mb-4 pb-4 w-full">
							<input
								className="input input-xl w-full input-bordered join-item"
								placeholder='e.g. "MAK"   "2941632"   "synthase"'
								onChange={(e) => setTerm(e.target.value)}
								value={term}
							/>

							<button
								type="submit"
								disabled={!term}
								onClick={() =>
									navigate(`/search/${term}?type=${type}&dataset=${dataset}`)
								}
								className="btn btn-xl join-item"
							>
								Search <FiArrowRight className="inline" />
							</button>
						</div>

						<div className="mt-2 flex md:place-items-center gap-3">
							<div className="w-24">search by</div>
							<div className="join join-vertical md:join-horizontal text-left w-full md:w-auto">
								<button
									type="button"
									onClick={() => setType("gene")}
									className={clsx({
										"btn btn-outline join-item": true,
										"font-normal": type !== "gene",
									})}
								>
									Gene Symbol or Description
								</button>
								<button
									type="button"
									onClick={() => setType("mrna")}
									className={clsx({
										"btn btn-outline join-item": true,
										"font-normal": type !== "mrna",
									})}
								>
									mRNA Accession or Description
								</button>
								<button
									type="button"
									onClick={() => setType("transcript_id")}
									className={clsx({
										"btn btn-outline join-item": true,
										"font-normal": type !== "transcript_id",
									})}
								>
									Transcript ID
								</button>
							</div>
						</div>

						<div className="mt-2 flex md:place-items-center gap-3">
							<div className="w-24">from the</div>
							<div className="join join-vertical md:join-horizontal text-left w-full md:w-auto">
								<button
									type="button"
									onClick={() => setDataset("CORE")}
									className={clsx({
										"btn btn-outline join-item": true,
										"font-normal": dataset !== "CORE",
									})}
								>
									Core Dataset
								</button>
								<button
									type="button"
									onClick={() => setDataset("EXTENDED")}
									className={clsx({
										"btn btn-outline join-item": true,
										"font-normal": dataset !== "EXTENDED",
									})}
								>
									Extended Dataset
								</button>
							</div>
						</div>

						<div
							className={`border-t my-6 grid grid-rows-1 grid-cols-${NAVIGATION.length} gap-4 border-dotted py-6`}
						>
							{NAVIGATION.map((_) => (
								<Card {..._} key={_.uri} />
							))}
						</div>

						<div className="m-auto text-xs">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
