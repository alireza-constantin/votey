import { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

const EndTime: FC<{ handler: UseFormRegisterReturn<'endsAt'> }> = ({ handler }) => {
	const options = [
		{ label: '1 Hour', value: '1h' },
		{ label: '3 Hour', value: '3h' },
		{ label: '5 Hour', value: '5h' },
		{ label: '12 Hour', value: '12h' },
		{ label: '24 Hour', value: '24h' },
		{ label: '3 days', value: '3d' },
		{ label: '5 days', value: '5d' },
		{ label: '10 days', value: '10d' },
		{ label: '15 days', value: '15d' },
		{ label: '1 month', value: '15m' },
	];

	return (
		<div className="relative w-full flex flex-col">
			<label className="mb-3">Ends At</label>
			<select
				{...handler}
				className="peer appearance-none p-2 cursor-pointer bg-slate-800/60 text-sm  font-normal rounded-md text-slate-300 outline-none focus:ring-4 ring-slate-600/40"
			>
				{options.map((option) => (
					<option className="outline-none bg-slate-800 mb-1" key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<div className="absolute top-11 cursor-pointer  peer-focus-within:rotate-180 transition-all duration-300 right-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</div>
	);
};

export default EndTime;
