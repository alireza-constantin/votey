import { trpc } from '@/utils/trpc';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuestionType, createQuestionValidator } from '@/utils/validator';

const CreateVote: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<createQuestionType>({
		resolver: zodResolver(createQuestionValidator),
	});

	// const inputRef = React.useRef<HTMLInputElement>(null);
	const client = trpc.useContext();
	const { mutate, isLoading } = trpc.useMutation('questions.create', {
		onSuccess: () => {
			client.invalidateQueries('questions.getAllMyQuestions');
		},
	});

	const onCreateVote = (data: createQuestionType) => {
		console.log(data);
		// mutate({ question: value });
	};

	return (
		<div className="flex flex-col m-auto max-w-md  justify-center mt-28">
			<h1 className="text-4xl text-shadow text-gray-300  mb-4 font-bold capitalize text-center">Create Question</h1>
			<div className="w-full h-2 bg-indigo-500/80 rounded-sm rounded-b-none"></div>
			<form className="px-4 py-8 border border-gray-500 rounded rounded-t-none" onSubmit={handleSubmit(onCreateVote)}>
				<div className="flex flex-col gap-2 text-gray-300">
					<label>Question</label>
					<input
						{...register('question')}
						className="max-w-xl outline-none ring-indigo-600 focus:ring-4 bg-slate-300 rounded-sm text-gray-700  w-full  p-1"
						// disabled={isLoading}
						// ref={inputRef}
						placeholder="Chicken or egg? which was first?"
					/>
					<p className="text-red-400 mt-1 text-sm">{errors.question?.message}</p>
				</div>
				<button
					className="py-2 px-6 mt-6 rounded  border-2 border-indigo-700 text-gray-200 hover:bg-indigo-600 font-semibold"
					type="submit"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateVote;
