import type { ComponentProps } from "react";

export const Footer: React.FC & ComponentProps<"div"> = ({ ...props }) => (
	<footer className="flex gap-4 text-xs" {...props}>
		<div>
			<img src="/iowa.gif" alt="The University of Iowa" className="w-7" />
		</div>
		<div>
			<p className="mt-4.5">
				by{" "}
				<a
					href="https://genome.uiowa.edu/"
					title="Link to the CBCB's Homepage"
					className="underline underline-offset-2"
				>
					The Center for Bioinformatics & Computational Biology
				</a>{" "}
				at{" "}
				<a
					href="https://uiowa.edu/"
					title="Link to The University of Iowa's homepage"
					className="underline underline-offset-2"
				>
					The University of Iowa
				</a>
				.{" "}
			</p>
			<p>
				Please{" "}
				<a
					href="mailto:nikhil-anand@uiowa.edu"
					title="Email this site's author"
					className="underline underline-offset-2"
				>
					email Nikhil Anand
				</a>{" "}
				with any issues or suggestions.
			</p>
		</div>
	</footer>
);
