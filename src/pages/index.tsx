import QuestionCard from '@/component/QuestionCard';
import { trpc } from '@/utils/trpc';
import { Question } from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = (props: any) => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions']);

	// const copyToClipboard = (question: Question) => {
	// 	navigator.clipboard.writeText(`${url}/question/${question.id}`);
	// 	setShowToast(true);
	// 	setTimeout(() => setShowToast(false), 1500);
	//   };

	if (isLoading || !data) return <div>...Loading</div>;

	return (
		<div className="p-6 min-h-screen w-screen items-stretch relative">
			<Head>
				<title>Home | OnAVote</title>
			</Head>
			<header className="header flex w-full justify-between items-center">
				<h1 className="text-4xl font-bold">OnAVote</h1>
				<Link href="/create">
					<a className="bg-gray-300 rounded text-gray-800 p-4">Create New Question</a>
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
