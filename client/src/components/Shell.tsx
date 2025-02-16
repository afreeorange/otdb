import clsx from "clsx";

import { Footer } from "./Footer";
import Header from "./Header";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useSearchParams } from "../hooks";

const Shell = ({ padContent = true }: { padContent?: boolean }) => {
	const loc = useLocation();

	const uriParams = useParams();
	const [{ type, dataset }, setSearchParams] = useSearchParams();

	console.log("Shell", dataset, type);

	return (
		<>
			<Header paramCallback={setSearchParams} />
			<div
				className={clsx({
					"mx-auto mb-4 mt-8 max-w-4xl px-2": padContent,
				})}
			>
				<Outlet />
			</div>
			<Footer className="m-auto max-w-4xl my-16" />
		</>
	);
};

export default Shell;
