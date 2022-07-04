import QuestionCard from '@/component/QuestionCard';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Loader from '@/component/Loader';
import Head from 'next/head';
import { useState } from 'react';
import { Question } from '@prisma/client';
import { getBaseUrl } from './_app';

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions']);
	const [showToast, setShowToast] = useState(false);

	const url = getBaseUrl();

	const copyToClipboard = (question: Question) => {
		navigator.clipboard.writeText(`${url}/question/${question.id}`);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 1500);
	};

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
					<QuestionCard key={question.id} question={question} i={idx + 1} copyToClipboard={copyToClipboard} />
				))}
			</div>
			{showToast && (
				<div className="absolute bottom-5 right-10 flex items-center justify-center bg-slate-50/10 p-3 rounded-md w-1/5">
					<span className="text-xs font-semibold">Link Copied to Clipboard!</span>
				</div>
			)}
		</>
	);
};

export default Home;
