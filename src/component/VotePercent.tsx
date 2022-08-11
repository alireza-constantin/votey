import type { FC } from 'react';
import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

const VotePercent: FC<{
	choice: number | undefined;
	count: number;
	text: string;
	index: number;
	totalVotes: number;
	optionId: any;
}> = ({ choice, count, text, index, totalVotes, optionId }) => {
	function calcPercent(totalVotes: number, count: number): number {
		if (totalVotes === 0 || count === 0) return 0;
		return (count / totalVotes) * 100;
	}

	const [percent, setPercent] = useState(0);

	useEffect(() => {
		for (let vote of optionId) {
			if (vote.choice === index) {
				setPercent(calcPercent(totalVotes, vote._count));
				// console.log(text, optionId[0]._count);
			}
		}
	}, [totalVotes, index, optionId]);

	return (
		<div className="mb-4 md:w-2/3 mx-auto">
			<div className="flex justify-between mb-2">
				<span className="text-base flex gap-1 items-center font-medium text-gray-400 capitalize">
					<span>
						{choice === index && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						)}
					</span>{' '}
					{text}
				</span>
				<span className="text-sm font-medium text-gray-400">{percent.toFixed(2)}%</span>
			</div>
			<div className="w-full bg-slate-700 rounded-lg h-5">
				<motion.div
					transition={{ duration: '1' }}
					initial={{ width: 0 }}
					animate={{ width: `${percent}%` }}
					className="bg-fuchsia-500/70 h-5 rounded-lg"
					// style={{ width: `${calcPercent(totalVotes, count)}%` }}
				></motion.div>
			</div>
		</div>
	);
};

export default VotePercent;
