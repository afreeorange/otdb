import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbDna, TbBulb } from "react-icons/tb";
import type { Dataset, SearchType } from "../../../definitions";
import clsx from "clsx";

export type NavigationElement = {
	icon: JSX.Element;
	uri: string;
	text: string;
	textSmall?: string;
};

/**
 * TODO: Dedupe. One Source of Truth for all routes. I'm beginning to see
 *       the Light here...
 */
export const NAVIGATION: NavigationElement[] = [
	{
		icon: <TbDna />,
		uri: "/expression",
		text: "Gene Expression",
		textSmall: "Genes",
	},
	{
		icon: <HiOutlineDocumentText />,
		uri: "/paper",
		text: "Paper",
	},
	{
		icon: <TbBulb />,
		uri: "/about",
		text: "About",
	},
];

const TheOTDB = () => (
	<h1 className="place-self-center">
		<a href="/" className="hover:-focus">
			The <span className="font-bold">OTDB</span>
		</a>
	</h1>
);

const Nav = () => (
	<div className="place-self-center">
		<ul className="flex space-x-8">
			{NAVIGATION.map((_) => (
				<li key={`navkey-${_.uri}`}>
					<NavLink to={_.uri} className="flex [.active]:font-bold">
						<span className="mr-1 mt-0.5 h-5">{_.icon}</span>
						<span>{_.text}</span>
					</NavLink>
				</li>
			))}
		</ul>
	</div>
);

const Header = () => {
	const navigate = useNavigate();
	const [term, setTerm] = useState("");
	const [type, setType] = useState<SearchType>("gene");
	const [dataset, setDataset] = useState<Dataset>("CORE");
	const [searchIsOpen, setSearchIsOpen] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		setFormIsValid(!(!term || term.length < 3));
	}, [term]);

	return (
		<div className="border-b px-2 py-1">
			<div className="flex">
				<TheOTDB />

				{/* Search Options */}

				<div
					className={clsx({
						"absolute left-12 top-10 z-10 w-xs rounded-lg border bg-base-100 p-2 shadow-2xl": true,
						hidden: !searchIsOpen,
					})}
				>
					<button
						type="button"
						className="absolute top-3 right-2 underline underline-offset-2 cursor-pointer"
						onClick={() => setSearchIsOpen(false)}
					>
						Close
					</button>
					<div>
						<p className="mt-1 mb-1 ml-1">search by</p>
						<div className="join join-vertical w-full">
							<button
								type="button"
								onClick={() => {
									setType("gene");
								}}
								className={clsx({
									"btn btn-outline join-item": true,
									"font-normal": type !== "gene",
								})}
							>
								Gene Symbol or Description
							</button>
							<button
								type="button"
								onClick={() => {
									setType("mrna");
								}}
								className={clsx({
									"btn btn-outline join-item": true,
									"font-normal": type !== "mrna",
								})}
							>
								mRNA Accession or Description
							</button>
							<button
								type="button"
								onClick={() => {
									setType("transcript_id");
								}}
								className={clsx({
									"btn btn-outline join-item": true,
									"font-normal": type !== "transcript_id",
								})}
							>
								Transcript ID
							</button>
						</div>
					</div>

					{/* FROM THE */}
					<p className="mb-1 ml-1 mt-4">from the</p>
					<div className="join join-vertical w-full">
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

				{/* Search Box */}
				<form
					className=" flex-1"
					onSubmit={() => {
						navigate(`/search/${term}?type=${type}&dataset=${dataset}`, {
							relative: "path",
						});
						setSearchIsOpen(false);
					}}
				>
					<div className="join place-self-center">
						<input
							type="text"
							placeholder="search..."
							value={term}
							className="input join-item input-bordered input-sm ml-2 w-56"
							onChange={(e) => setTerm(e.target.value)}
							onFocus={() => setSearchIsOpen(true)}
						/>
						<button
							type="submit"
							className="btn btn-outline join-item btn-sm"
							disabled={!formIsValid}
							onClick={() => {
								navigate(`/search/${term}?type=${type}&dataset=${dataset}`, {
									relative: "path",
								});
								setSearchIsOpen(false);
							}}
						>
							Go <FiArrowRight />
						</button>
					</div>
				</form>

				<Nav />
			</div>
		</div>
	);
};

export default Header;
