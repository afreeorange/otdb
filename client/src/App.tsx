import { BrowserRouter, Route, Routes } from "react-router";
import loadable from "@loadable/component";
import type React from "react";

import { ServiceProvider } from "./Providers";
import Header from "./components/Header";
import Shell from "./components/Shell";

const About = loadable(() => import("./pages/About"));
const Home = loadable(() => import("./pages/Home"));
const NotFound = loadable(() => import("./pages/404"));
const Paper = loadable(() => import("./pages/Paper"));
const Search = loadable(() => import("./pages/Search"));
const Tissues = loadable(() => import("./pages/Tissues"));

const App: React.FC = () => (
	<ServiceProvider>
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/" element={<Shell />}>
					<Route path="search/:term" element={<Search />} />
					<Route path="tissues" element={<Tissues />} />
					<Route path="about" element={<About />} />
					<Route path="paper" element={<Paper />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</ServiceProvider>
);

export default App;
