import type { FC } from 'react';
import { fireIcon, tick } from '@/assests/icons';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface VotePercent {
	choice: number | undefined;
	text: string;
	index: number;
	totalVotes: number;
	voteCount: number | undefined;
	isWinner: boolean;
	isEnded: boolean;
}

const VotePercent: FC<VotePercent> = ({ choice, text, index, totalVotes, voteCount, isWinner, isEnded }) => {
	// calculatin the percentage of each option
	function calcPercent(totalVotes: number, count: number | undefined): number {
		if (totalVotes === 0 || count === 0 || !count) return 0;
		return (count / totalVotes) * 100;
	}

	return (
		<div className="mb-4 md:w-2/3 mx-auto">
			<div className="flex justify-between mb-2">
				<span className="text-base flex gap-1 items-center font-medium text-gray-400 capitalize">
					<span>{choice === index && tick}</span> {text}
				</span>
				<span className="text-sm font-medium text-gray-400">{calcPercent(totalVotes, voteCount).toFixed(2)}%</span>
			</div>
			<div className="w-full bg-slate-700 rounded-xl h-8">
				<motion.div
					transition={{ duration: '1' }}
					initial={{ width: 0 }}
					animate={{ width: `${calcPercent(totalVotes, voteCount)}%` }}
					className={clsx(
						'h-8 rounded-xl flex items-center',
						isEnded && isWinner ? 'bg-green-300/60' : 'bg-fuchsia-500/70'
					)}
				>
					{isEnded && isWinner && (
						<>
							<span>{fireIcon}</span>
							<span className="ml-2 text-slate-700 font-semibold">Winner</span>
						</>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default VotePercent;
