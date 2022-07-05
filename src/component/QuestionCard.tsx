import React from 'react';
import Link from 'next/link';
import { Question } from '@prisma/client';
import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';

const QuestionCard: React.FC<{
	question: Question;
	i: number;
	copyToClipboard: (question: Question) => void;
}> = ({ question, i, copyToClipboard }) => {
	const spring = {
		type: 'spring',
		stiffness: 150,
		damping: 11,
		mass: 1,
	};

	return (
		<motion.div
			animate={{ x: 0, opacity: 1 }}
			layout
			initial={{ x: i * -800, opacity: 0 }}
			// transition={{ duration: 3, delay: i * 0.3 }}
			transition={spring}
		>
			<Link href={`/question/${question.id}`}>
				<div
					key={question.id}
					className="flex flex-col justify-between cursor-pointer rounded-md px-4 py-2 bg-indigo-900/20 shadow-xl hover:shadow-2xl  shadow-black/50"
				>
					<div>
						<h1 className="text-lg font-bold capitalize" key={question.id}>
							{question.question}
						</h1>
						<p className="text-xs flex gap-1 items-center mt-4 text-white/30">
							<span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
							Created on {question.createdAt.toDateString()}
						</p>

						<p className="text-xs flex gap-1 items-center mt-4 text-white/30">
							<span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
							End: {question.endsAt && formatDistance(question.endsAt, new Date(), { addSuffix: true })}
							{!question.endsAt && 'in infinite time'}
						</p>
					</div>
					<div
						className="cursor-pointer self-end mt-6  p-2 hover:opacity-60"
						onClick={(e) => {
							e.stopPropagation();
							copyToClipboard(question);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
							/>
						</svg>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default QuestionCard;
