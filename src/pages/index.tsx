import { trpc } from '@/utils/trpc';
import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = (props: any) => {
	const { data, isLoading } = trpc.useQuery(['hello', { text: 'alireza' }]);

	return (
		<div className="text-3xl text-red-600">
			<code>{data?.greeting}</code>
		</div>
	);
};

export default Home;
