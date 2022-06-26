import { trpc } from '@/utils/trpc';
import React from 'react';

const CreateVote: React.FC = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const client = trpc.useContext();
	const { mutate, isLoading } = trpc.useMutation('questions.create', {
		onSuccess: () => {
			client.invalidateQueries('questions.getAllMyQuestions');
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

export default CreateVote;
