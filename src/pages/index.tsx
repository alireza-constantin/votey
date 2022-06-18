import { trpc } from '@/utils/trpc';
import type { NextPage, GetServerSideProps } from 'next';
import React from 'react';

const CreateVote: React.FC = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const client = trpc.useContext();
	const { mutate, isLoading } = trpc.useMutation('questions.create', {
		onSuccess: () => {
			client.invalidateQueries('questions.getAll');
			if (!inputRef.current) return;
			inputRef.current.value = '';
		},
	});

	const onCreateVote = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = inputRef.current?.value;
		if (!value) return;
		mutate({ question: value });
	};

	return (
		<form onSubmit={(e) => onCreateVote(e)}>
			<input disabled={isLoading} ref={inputRef}></input>
		</form>
	);
};

const Home: NextPage = (props: any) => {
	const { data, isLoading } = trpc.useQuery(['questions.getAll']);
	console.log(data);

	if (isLoading || !data) return <div>...Loading</div>;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="font-bold text-3xl">Questions</h1>
				<div>
					{data.map((question) => (
						<div key={question.id}>
							<p>{question.question}</p>
						</div>
					))}
				</div>
			</div>
			<CreateVote />
		</div>
	);
};

export default Home;
