import { TbBrandReact } from "react-icons/tb";
import {
	SiCircleci,
	SiDaisyui,
	SiPnpm,
	SiSqlite,
	SiTailwindcss,
	SiTrpc,
	SiVite,
} from "react-icons/si";
import { AiOutlineFire } from "react-icons/ai";
import { Helmet } from "react-helmet";
import type React from "react";

import { SITE_NAME } from "../constants";
import Shell from "../components/Shell";

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<section className="[&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>p]:my-2 ">
		{children}
	</section>
);

type Tech = {
	text: string;
	uri: string;
	icon: JSX.Element;
};

const stack: Tech[] = [
	{
		icon: <TbBrandReact />,
		text: "React",
		uri: "https://react.dev/",
	},
	{
		icon: <SiVite />,
		text: "Vite",
		uri: "https://vitejs.dev/",
	},
	{
		icon: <SiTailwindcss />,
		text: "Tailwind",
		uri: "https://tailwindcss.com/",
	},
	{
		icon: <SiDaisyui />,
		text: "daisyUI",
		uri: "https://daisyui.com/",
	},
	{
		icon: <SiTrpc />,
		text: "tRPC",
		uri: "https://trpc.io/",
	},
	// {
	// 	icon: <AiOutlineFire />,
	// 	text: "Hono",
	// 	uri: "https://hono.dev/",
	// },
	{
		icon: <SiSqlite />,
		text: "SQLite",
		uri: "https://www.postgresql.org/",
	},
	{
		icon: <SiCircleci />,
		text: "CircleCI",
		uri: "https://circleci.com/",
	},
	{
		icon: <SiPnpm />,
		text: "Github",
		uri: "https://github.com/",
	},
	{
		icon: <SiPnpm />,
		text: "pnpm",
		uri: "https://pnpm.io/",
	},
];

const TechTile: React.FC<Tech> = ({ icon, text, uri }) => (
	<a
		href={`${uri}`}
		className="group card min-w-[8em] cursor-pointer border p-3 pb-2 transition-all"
	>
		<div className="mb-2 [&>*]:h-8 [&>*]:w-8">{icon}</div>
		<span>{text}</span>
	</a>
);

const About = () => (
	<>
		<Helmet>About &ndash; {SITE_NAME}</Helmet>

		<Shell>
			<h1 className="text-3xl font-bold">About the OTDB</h1>

			<Section>
				<p>
					This is a modern port of an old 2013 application that was developed at
					The University of Iowa and exists both as an historical artifact and a
					means for its author to tinker with technologies that animate the
					modern web. Its utility has been superceded by resources such as{" "}
					<a
						href="https://www.eye-transcriptome.com/"
						title="Link to the Human Eye Transcriptome Atlas"
						className="underline underline-offset-4"
					>
						the <em>Human Eye Transcriptome Atlas</em>
					</a>
					, which may be interrogated as a refined superset of the data
					presented here.
				</p>

				<blockquote
					cite="https://link.springer.com/article/10.1007/s00347-022-01721-4"
					className="my-6 border-l pl-4"
				>
					<p>
						The microarray profiles of a variety of healthy ocular tissues are
						included in the <em>Ocular Tissue Database</em>. The{" "}
						<em>Human Eye Transcriptome Atlas</em> provides the largest
						collection of different ocular tissue types, contains the highest
						number of ocular diseases and is characterized by a high level of
						quality achieved by methodological consistency.
					</p>
					<footer className="mt-2 text-sm">
						Julian Wolf <em>et al</em>, &#8220;
						<a
							href="https://link.springer.com/article/10.1007/s00347-022-01721-4"
							title="Link to a paper on the Human Eye Transcriptome Atlas"
							className="underline underline-offset-4"
						>
							Web-based gene expression analysis &ndash; paving the way to
							decode healthy and diseased ocular tissue
						</a>
						&#8221;,
						<br />
						<em>Die Ophthalmologie</em> (2022)
					</footer>
				</blockquote>

				<p>
					Annotations for transcript clusters and probesets are based on the
					Human Exon 1.0 ST array from{" "}
					<a
						href="https://www.thermofisher.com/us/en/home/life-science/microarray-analysis.html"
						className="underline underline-offset-4"
					>
						Affymetrix
					</a>{" "}
					(HuEx-1_0-st-v2, v32, released 2009-Nov-16).
				</p>
			</Section>

			<Section>
				<h2>Code + Stack</h2>
				<p>
					All code necessary to run this site is available in a monorepo{" "}
					<a
						href="https://github.com/afreeorange/otdb"
						title="Source code to this website"
						className="underline underline-offset-4"
					>
						on Github
					</a>{" "}
					under an MIT License. The SQLite backend is hosted by{" "}
					<a
						href="https://turso.tech/"
						title="Turso Tech: The folks who host the SQLite backend for this web application"
						className="underline underline-offset-4"
					>
						Turso
					</a>{" "}
					under their very generous free-tier.
				</p>

				<div className="my-4 flex flex-wrap gap-4">
					{stack.map((_) => (
						<TechTile key={`tech-tile-${_.uri}`} {..._} />
					))}
				</div>
			</Section>

			<Section>
				<h2>Colophon</h2>
				<p>
					This website is typeset in{" "}
					<a
						href="https://en.wikipedia.org/wiki/FF_DIN"
						title="Wikipedia article on the typeface used on this site"
						className="underline underline-offset-4"
					>
						FF DIN
					</a>
					. Background patterns were generated using{" "}
					<a
						href="https://www.magicpattern.design/tools/css-backgrounds"
						title="MagicPattern's CSS background pattern generator"
						className="underline underline-offset-4"
					>
						<em>MagicPattern</em>
					</a>{" "}
					and{" "}
					<a
						href="https://css-pattern.com/"
						title="Temanu Afif's CSS background pattern generator"
						className="underline underline-offset-4"
					>
						Temani Afif&#8217;s lovely <em>CSS Pattern</em>
					</a>
					. All iconography is from the{" "}
					<a
						href="https://react-icons.github.io/react-icons/"
						title="Iconography source"
						className="underline underline-offset-4"
					>
						Solid Icons
					</a>{" "}
					package. The logo in the footer is &copy;{" "}
					<a
						href="https://brand.uiowa.edu/"
						title="University of Iowa Brand Center"
						className="underline underline-offset-4"
					>
						The University of Iowa
					</a>
					.
				</p>
			</Section>
		</Shell>
	</>
);

export default About;
