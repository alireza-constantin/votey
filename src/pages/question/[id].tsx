import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import type { createQuestionType } from '@/utils/validator';

const QuestionContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = trpc.useQuery(['questions.getById', { id }]);

	if (!isLoading && !data) {
		return <div>Question Not Found</div>;
	}

	const { options }: Pick<createQuestionType, 'options'> = {
		options: data?.question?.options && JSON.parse(data?.question?.options),
	};

	return (
		<div>
			<h2>{data?.question?.question}</h2>
			{options?.map((option, idx) => (
				<div key={idx}>{option.text}</div>
			))}
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
