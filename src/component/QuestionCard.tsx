import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Question } from '@prisma/client';
import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import { clockIcon, endTimeIcon, shareIcon, trashIcon } from '@/assests/icons';

const QuestionCard: React.FC<{
	question: Question;
	copyToClipboard: (question: Question) => void;
}> = ({ question, copyToClipboard }) => {
	const [showModal, setShowModal] = useState(false);

	const isEnded = new Date() > question?.endsAt;

	function closeModal() {
		setShowModal(false);
	}

	return (
		<>
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
							<div className="flex items-center justify-between">
								<h1 className="text-lg break-words font-bold capitalize">{question.question}</h1>
								<div
									className="hover:opacity-60 p-2"
									onClick={(e) => {
										e.stopPropagation();
										setShowModal(true);
									}}
								>
									{trashIcon}
								</div>
							</div>
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
			{showModal && <Modal closeModal={closeModal} />}
		</>
	);
};

const Modal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
	return (
		<div
			onClick={(e) => {
				const target = e.target as Element;
				if (target.id === 'overlay') closeModal();
			}}
			id="overlay"
			className="overflow-y-hidden overflow-x-hidden fixed inset-0 z-50 md:inset-0 p-4 md:h-full bg-slate-600/60 flex justify-center items-center"
		>
			{/* <div className="relative p-4 flex  w-full max-w-md h-full md:h-auto"> */}
			<div className="relative md:w-1/2 lg:w-1/3 rounded-lg shadow bg-gray-800">
				<button
					type="button"
					onClick={closeModal}
					className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
				<div className="p-6 text-center">
					<svg
						aria-hidden="true"
						className="mx-auto mb-4 w-14 h-14 text-gray-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<h3 className="mb-5 text-lg font-normal text-gray-400">Are you sure you want to delete this Poll?</h3>
					<button
						data-modal-toggle="popup-modal"
						type="button"
						className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
					>
						Yes, I am sure
					</button>
					<button
						onClick={closeModal}
						type="button"
						className=" focus:ring-4 focus:outline-none  rounded-lg border  text-sm font-medium px-5 py-2.5  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
					>
						No, cancel
					</button>
				</div>
			</div>
		</div>
		// </div>
	);
};

export default QuestionCard;
