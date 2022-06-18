import { trpc } from '@/utils/trpc';
import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = (props: any) => {
	const { data, isLoading } = trpc.useQuery(['questions-get-all']);
	console.log(data);

	if (isLoading || !data) return <div>...Loading</div>;

	return (
		<div className="text-3xl text-red-600">
			<code>{data?.[0]?.question}</code>
		</div>
	);
};

export default Home;
