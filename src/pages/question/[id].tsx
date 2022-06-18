import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';

const QuestionContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = trpc.useQuery(['questions.getById', { id }]);

	if (!isLoading && !data) {
		return <div>Question Not Found</div>;
	}

	return <div>{data?.question}</div>;
};

const QuestionPage = () => {
	const { query } = useRouter();
	const { id } = query;

	if (!id || typeof id !== 'string') return <div>No Id</div>;

	return (
		<div>
			<QuestionContent id={id} />
		</div>
	);
};

export default QuestionPage;
