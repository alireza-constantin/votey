import React from 'react';
import Link from 'next/link';
import { Question } from '@prisma/client';
import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import { clockIcon, endTimeIcon, shareIcon } from '@/assests/icons';

const QuestionCard: React.FC<{
	question: Question;
	copyToClipboard: (question: Question) => void;
}> = ({ question, copyToClipboard }) => {
	const isEnded = new Date() > question?.endsAt;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.7 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, ease: [0.77, 0.67, 0.43, 0.37] }}
			className="h-full"
		>
			<Link href={`/question/${question.id}`}>
				<div
					key={question.id}
					className="flex flex-col justify-between cursor-pointer rounded-md px-4 pb-2 pt-4 bg-indigo-900/20 shadow-xl hover:shadow-2xl  shadow-black/50 h-full"
				>
					<div>
						<h1 className="text-lg break-words font-bold capitalize" key={question.id}>
							{question.question}
						</h1>

						<p className="text-xs flex gap-1.5 items-center mt-4 text-white/30">
							<span>{clockIcon}</span>
							Created on {question.createdAt.toDateString()}
						</p>

						<p className="text-xs flex gap-1.5 items-center mt-4 text-white/30">
							<span>{isEnded ? endTimeIcon : clockIcon}</span>
							{isEnded ? 'Ended' : 'End'} {formatDistance(question.endsAt, new Date(), { addSuffix: true })}
						</p>
					</div>
					<div
						className="cursor-pointer self-end mt-6  p-2 hover:opacity-60"
						onClick={(e) => {
							e.stopPropagation();
							copyToClipboard(question);
						}}
					>
						{shareIcon}
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default QuestionCard;
