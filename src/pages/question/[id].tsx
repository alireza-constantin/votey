import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import type { createQuestionType } from '@/utils/validator';
import Vote from '@/component/Vote';

const QuestionContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = trpc.useQuery(['questions.getById', { id }]);

	// voting mutation
	const { mutate, data: voteResponse } = trpc.useMutation(['questions.vote'], {
		onSuccess: () => window.location.reload(),
	});

	if (!isLoading && !data) {
		return <div>Question Not Found</div>;
	}

	const voteHandler = (questionId: string, idx: number) => {
		mutate({ questionId, option: idx });
	};

	console.log(data);

	return (
		<div>
			{data?.isOwner && <p>You are owner</p>}
			<h2 className="text-center my-4 font-semibold text-2xl capitalize text-gray-300">{data?.question?.question}</h2>
			{(data?.question?.options as string[])?.map((option, idx) => {
				if (data?.isOwner || data?.vote) {
					return (
						<div key={idx} className={data.vote?.choice === idx ? 'underline' : ''}>
							{data?.votes?.[idx]?._count ?? 0} - {(option as any).text}
						</div>
					);
				}

				return (
					<div key={idx} className="flex justify-center items-center gap-3">
						<Vote onVote={voteHandler} idx={idx} questionId={data?.question?.id!} option={option as any} />
					</div>
				);
			})}
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
