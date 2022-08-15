import QuestionCard from '@/component/QuestionCard';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Loader from '@/component/Loader';
import Head from 'next/head';
import { useState } from 'react';
import { Question } from '@prisma/client';

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions']);
	const [showToast, setShowToast] = useState(false);

	const url = process.env.NEXT_PUBLIC_VERCEL_URL
		? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
		: `http://localhost:${process.env.PORT ?? 3000}`;

	const copyToClipboard = (question: Question) => {
		navigator.clipboard.writeText(`${url}/question/${question.id}`);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 1500);
	};

	if (isLoading)
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
			{/* grid-cols-1  md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 */}
			<div className="grid gap-y-5 grid-cols-1  md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 mt-10">
				{data?.map((question) => (
					<QuestionCard key={question.id} question={question} copyToClipboard={copyToClipboard} />
				))}
			</div>
			{showToast && (
				<div className="absolute bottom-5 right-10 flex items-center justify-center bg-slate-50/10 p-3 rounded-md w-2/5 md:w-1/5">
					<span className="text-xs font-semibold">Link Copied to Clipboard!</span>
				</div>
			)}
		</>
	);
};

export default Home;
