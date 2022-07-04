import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import type { createQuestionType } from '@/utils/validator';
import Vote from '@/component/Vote';
import VotePercent from '@/component/VotePercent';

const QuestionContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = trpc.useQuery(['questions.getById', { id }]);

	let totalVotes = 0;
	// voting mutation
	const { mutate, data: voteResponse } = trpc.useMutation(['questions.vote'], {
		onSuccess: () => {
			window.location.reload();
		},
	});

	if (!isLoading && !data) {
		return <div>Question Not Found</div>;
	}

	const getTotalVotes = (votes: any) => {
		votes?.map((choice: { _count: number }) => {
			totalVotes += choice._count;
		});
	};

	const voteHandler = (questionId: string, idx: number) => {
		mutate({ questionId, option: idx });
	};

	if (data && data != undefined) getTotalVotes(data.votes);

	console.log(data);

	return (
		<div>
			<h2 className="text-center my-4 font-semibold text-2xl capitalize text-gray-300">{data?.question?.question}</h2>
			{(data?.question?.options as string[])?.map((option, idx) => {
				if (data?.isOwner || data?.vote) {
					return (
						<VotePercent
							totalVotes={totalVotes}
							key={idx}
							index={idx}
							choice={data.vote?.choice}
							text={(option as any).text}
							count={data?.votes?.[idx]?._count ?? 0}
						/>
					);
				}

				return (
					<div key={idx} className="flex justify-center items-center gap-3">
						<Vote onVote={voteHandler} idx={idx} questionId={data?.question?.id!} option={option as any} />
					</div>
				);
			})}
			{data?.isOwner && (
				<p className="mt-10 flex justify-center gap-2 font-bold text-gray-300 items-center rounded mx-auto p-3 text-center sm:w-1/4 bg-slate-50/10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
						/>
					</svg>
					You are owner
				</p>
			)}
		</div>
	);
};

const QuestionPage = () => {
	const { query, isReady } = useRouter();
	const { id } = query;

	if (!isReady) {
		return <div>Loading...</div>;
	}
	if (!id || typeof id !== 'string') return <div>No Id</div>;

	return (
		<div>
			<QuestionContent id={id} />
		</div>
	);
};

export default QuestionPage;
