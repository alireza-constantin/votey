import React from 'react';
import Link from 'next/link';
import { Question } from '@prisma/client';

const QuestionCard: React.FC<{
	question: Question;
	//   copyToClipboard: (question: Question) => void;
}> = ({ question }) => {
	return (
		<Link href={`/question/${question.id}`}>
			<div
				key={question.id}
				className="card cursor-pointer rounded-md px-4 py-2 bg-indigo-900/20 shadow-xl hover:shadow-2xl  shadow-black/50"
			>
				<div>
					<h1 className="text-lg font-bold capitalize" key={question.id}>
						{question.question}
					</h1>
					<p className="text-xs mt-2 text-white/30">Created on {question.createdAt.toDateString()}</p>

					<div
						className="cursor-pointer  inline-block mt-4 py-2 hover:scale-125"
						onClick={(e) => {
							console.log('hello');
							e.stopPropagation();
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
			</div>
		</Link>
	);
};

export default QuestionCard;
