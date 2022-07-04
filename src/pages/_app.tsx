import '../styles/globals.css';

import superjson from 'superjson';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from '@/backend';
import Nav from '@/component/Nav';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<div className="p-4">
			<Nav>
				<Component {...pageProps} />
			</Nav>
		</div>
	);
};

export function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return '';
	}
	if (process.browser) return ''; // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			headers() {
				return {
					cookie: ctx?.req?.headers.cookie,
				};
			},
			url,
			transformer: superjson,
		};
	},
	ssr: true,
})(MyApp);
