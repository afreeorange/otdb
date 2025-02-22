import type { ReactNode } from "react";

import { Footer } from "./Footer";
import Header from "./Header";
import clsx from "clsx";

const Shell = ({
	children,
	noHeader = false,
	padContent = true,
}: {
	children: ReactNode;
	noHeader?: boolean;
	padContent?: boolean;
}) => (
	<>
		{!noHeader && <Header />}
		<div
			className={clsx({
				"mx-auto mb-4 mt-8 max-w-4xl px-4": padContent,
			})}
		>
			{children}
		</div>
		<div className="m-auto max-w-4xl my-16">
			<Footer />
		</div>
	</>
);

export default Shell;
