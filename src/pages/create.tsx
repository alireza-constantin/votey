import { trpc } from '@/utils/trpc';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuestionType, createQuestionValidator } from '@/utils/validator';
import { useRouter } from 'next/router';
import Spinner from '@/component/Spinner';
import EndTime from '@/component/endTime';

const CreateVote: React.FC = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<createQuestionType>({
		resolver: zodResolver(createQuestionValidator),
		defaultValues: {
			options: [{ text: 'yes' }, { text: 'no' }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: 'options',
		control,
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
		// mutate({ question: data.question, options: data.options, endsAt: '' });
	};

	return (
		<div className="flex flex-col m-auto max-w-2xl  justify-center mt-16">
			<h1 className="text-[2rem] text-gray-300  mb-10 font-bold capitalize text-center">Create Question</h1>
			<form
				className="px-4 py-8 bg-slate-900/80 shadow-xl shadow-black/50 rounded rounded-t-none"
				onSubmit={handleSubmit(onCreateVote)}
			>
				<div className="flex flex-col font-semibold gap-3 mt-2 text-gray-400 ">
					<label>Your Question</label>
					<input
						{...register('question')}
						className="outline-none focus:ring-4 ring-slate-600/40 bg-slate-800/60 text-sm  font-normal rounded-md text-slate-300  w-full placeholder:text-gray-400  p-3"
						// disabled={isLoading}
						// ref={inputRef}
						placeholder="Chicken or egg? which was first?"
					/>
					<p className="text-red-400 mt-1 text-sm">{errors.question?.message}</p>
					{/* <div className="items-start"> */}
					<EndTime handler={register('endsAt')} />
					{/* </div> */}
					<label>Options</label>
					<div className="grid grid-cols-1 w-full gap-x-5 gap-y-3 md:grid-cols-2">
						{/* field array */}
						{fields.map((field, index) => {
							return (
								<div key={field.id} className="w-full flex gap-3">
									<input
										placeholder="name"
										{...register(`options.${index}.text` as const, {
											required: true,
										})}
										// className={errors?.options?.[index]?.text ? 'error' : ''}
										className="outline-none focus:ring-4 ring-slate-600/40 bg-slate-800/60 text-sm  font-normal rounded-md text-slate-300 placeholder:text-gray-400  p-3 flex-1 "
									/>
									<button className="hover:text-gray-500" type="button" onClick={() => remove(index)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							);
						})}
					</div>
				</div>
				<button
					type="button"
					className="mt-6 flex text-gray-400 justify-start gap-1 text-xs items-center hover:text-gray-500"
					onClick={() => {
						if (fields.length >= 10) return;
						append({
							text: '',
						});
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					OPTIONS
				</button>
				<button
					className="py-2 w-full px-6 mt-8 rounded border-2 border-slate-800 text-gray-200 hover:bg-slate-700/40 font-semibold flex justify-center items-center"
					type="submit"
				>
					{isLoading || data ? <Spinner /> : 'Create'}
				</button>
			</form>
		</div>
	);
};

export default CreateVote;
