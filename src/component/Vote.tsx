import React from 'react';
import { motion } from 'framer-motion';

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
		<motion.button
			initial={{ opacity: 0, scale: 0.7 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, ease: [0.77, 0.67, 0.43, 0.37] }}
			className="border-2 w-10/12 md:w-2/5 mt-4 p-3 border-slate-600/30 hover:bg-slate-600/30 transition-all duration-500"
			onClick={() => onVote(questionId, idx)}
			disabled={btnDisable}
		>
			{' '}
			{(option as any).text}{' '}
		</motion.button>
	);
};

export default Vote;
