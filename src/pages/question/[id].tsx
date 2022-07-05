import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import Vote from '@/component/Vote';
import VotePercent from '@/component/VotePercent';
import Loader from '@/component/Loader';
import { formatDistance } from 'date-fns';
import OwnerBadge from '@/component/OwnerBadge';
import { Prisma } from '@prisma/client';

const QuestionContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = trpc.useQuery(['questions.getById', { id }]);

	let totalVotes = 0;
	// voting mutation
	const {
		mutate,
		data: voteResponse,
		isLoading: mutateLoading,
	} = trpc.useMutation(['questions.vote'], {
		onSuccess: () => {
			window.location.reload();
		},
	});

	if (isLoading) return <Loader />;

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
		<div className="mt-16">
			<CardHeader
				question={data?.question?.question!}
				text={data?.isEnded ? 'Finished ' : 'Ends '}
				date={
					data?.question?.endsAt
						? formatDistance(data.question.endsAt, new Date(), { addSuffix: true })
						: 'in infinite time'
				}
			/>
			{(data?.question?.options as string[])?.map((option, idx) => {
				if (data?.isOwner || data?.vote || data?.isEnded) {
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
						<Vote
							btnDisable={mutateLoading}
							onVote={voteHandler}
							idx={idx}
							questionId={data?.question?.id!}
							option={option as any}
						/>
					</div>
				);
			})}
			{data?.isOwner && <OwnerBadge />}
		</div>
	);
};

const CardHeader = ({ question, text, date }: { question: string; text: string; date: string }) => {
	return (
		<div className="flex justify-between items-center md:w-2/3 mx-auto mb-6">
			<h2 className="text-center my-4 font-semibold text-2xl capitalize text-gray-300">{question}</h2>
			<div className="text-sm text-gray-400">
				<span>{text}</span>
				<span>{date}</span>
			</div>
		</div>
	);
};

const QuestionPage = () => {
	const { query, isReady } = useRouter();
	const { id } = query;

	if (!isReady) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
	if (!id || typeof id !== 'string') return <div>No Id</div>;

	return (
		<div>
			<QuestionContent id={id} />
		</div>
	);
};

export default QuestionPage;
