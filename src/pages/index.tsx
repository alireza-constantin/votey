import QuestionCard from '@/component/QuestionCard';
import { trpc } from '@/utils/trpc';
import { Question } from '@prisma/client';
import type { NextPage } from 'next';
import Loader from '@/component/Loader';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

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
		<div className="p-6 min-h-screen w-screen items-stretch relative">
			<Head>
				<title>Home | Votey</title>
			</Head>
			<header className="header flex w-full justify-between items-center">
				<h1 className="text-4xl font-bold text-shadow">Votey</h1>
				<Link href="/create">
					<a className="bg-indigo-900/20  hover:bg-indigo-600 font-bold rounded text-gray-200 text-2xl p-4">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</Link>
			</header>
			<div className="grid grid-cols-1 gap-y-5 md:grid-cols-4 md:gap-x-5 mt-10">
				{data?.map((question) => (
					<QuestionCard
						key={question.id}
						question={question}
						//   copyToClipboard={copyToClipboard}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
