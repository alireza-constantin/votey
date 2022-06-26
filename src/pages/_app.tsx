import '../styles/globals.css';

import superjson from 'superjson';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from '@/backend';

const MyApp: AppType = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		const url = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}/api/trpc`
			: 'http://localhost:3000/api/trpc';

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
