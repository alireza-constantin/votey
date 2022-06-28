import QuestionCard from '@/component/QuestionCard';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Loader from '@/component/Loader';
import Head from 'next/head';

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions']);

	// const copyToClipboard = (question: Question) => {
	// 	navigator.clipboard.writeText(`${url}/question/${question.id}`);
	// 	setShowToast(true);
	// 	setTimeout(() => setShowToast(false), 1500);
	//   };

	if (isLoading || !data)
		return (
			<div>
				<Loader />
			</div>
		);

	return (
		<>
			<Head>
				<title>Home | Votey</title>
			</Head>

			<div className="grid grid-cols-1 gap-y-5 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 mt-10">
				{data?.map((question, idx) => (
					<QuestionCard
						key={question.id}
						question={question}
						i={idx + 1}
						//   copyToClipboard={copyToClipboard}
					/>
				))}
			</div>
		</>
	);
};

export default Home;
