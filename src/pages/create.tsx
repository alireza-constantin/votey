import { trpc } from '@/utils/trpc';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuestionType, createQuestionValidator } from '@/utils/validator';
import { useRouter } from 'next/router';
import Spinner from '@/component/Spinner';

const CreateVote: React.FC = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<createQuestionType>({
		resolver: zodResolver(createQuestionValidator),
	});

	// const inputRef = React.useRef<HTMLInputElement>(null);
	const client = trpc.useContext();
	const { mutate, isLoading, data } = trpc.useMutation('questions.create', {
		onSuccess: (data) => {
			client.invalidateQueries('questions.getAllMyQuestions');
			reset();
			router.push(`question/${data.id}`);
		},
	});

	const onCreateVote = (data: createQuestionType) => {
		console.log(data);
		mutate({ question: data.question });
	};

	return (
		<div className="flex flex-col m-auto max-w-lg  justify-center mt-20">
			<h1 className="text-[2rem] text-gray-300  mb-10 font-bold capitalize text-center">Create Question</h1>
			<div className="w-full h-3 bg-indigo-600 rounded-sm rounded-b-none"></div>
			<form
				className="px-4 py-8 bg-indigo-900/20 shadow-xl shadow-black/50 rounded rounded-t-none"
				onSubmit={handleSubmit(onCreateVote)}
			>
				<div className="flex flex-col gap-2 text-gray-300">
					<label>Question</label>
					<input
						{...register('question')}
						className="max-w-xl outline-none ring-indigo-600 focus:ring-4 bg-slate-400  rounded-sm text-slate-900  w-full placeholder:text-slate-700  p-2"
						// disabled={isLoading}
						// ref={inputRef}
						placeholder="Chicken or egg? which was first?"
					/>
					<p className="text-red-400 mt-1 text-sm">{errors.question?.message}</p>
				</div>
				<button
					className="py-2 w-full px-6 mt-6 rounded  border-2 border-indigo-700 text-gray-200 hover:bg-indigo-600 font-semibold flex justify-center items-center"
					type="submit"
				>
					{isLoading || data ? <Spinner /> : 'Create'}
				</button>
			</form>
		</div>
	);
};

export default CreateVote;
