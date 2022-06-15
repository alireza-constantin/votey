import { prisma } from '@/db/client';
import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = (props: any) => {
	return (
		<div className="text-3xl text-red-600">
			<code>{props.questions}</code>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
	const pollQuestions = await prisma.question.findMany();

	return {
		props: {
			questions: JSON.stringify(pollQuestions),
		},
	};
};
