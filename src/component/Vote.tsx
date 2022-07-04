import React from 'react';

interface VoteProps {
	onVote: (qustionId: string, idx: number) => void;
	option: { text: string };
	questionId: string;
	idx: number;
	btnDisable: boolean;
}

const Vote: React.FC<VoteProps> = ({ onVote, option, questionId, idx, btnDisable }) => {
	console.log(btnDisable);

	return (
		<button
			className="border-2 w-10/12 md:w-2/5 mt-4 p-3 border-slate-600/30 hover:bg-slate-600/30"
			onClick={() => onVote(questionId, idx)}
			disabled={btnDisable}
		>
			{' '}
			{(option as any).text}{' '}
		</button>
	);
};

export default Vote;
