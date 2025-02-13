import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { trpc } from "./services";
import { UPSTREAM_API } from "../../definitions/constants";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			staleTime: Number.POSITIVE_INFINITY,
		},
	},
});

const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: !import.meta.env.CI ? UPSTREAM_API.local : UPSTREAM_API.production,
		}),
	],
});

export const ServiceProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<NiceModal.Provider>{children}</NiceModal.Provider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</trpc.Provider>
	);
};
