import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { add } from 'date-fns';

const EndTime: FC<{ handler: UseFormRegisterReturn<'endsAt'> }> = ({ handler }) => {
	const options = [
		{ label: '1 Hour', value: add(new Date(), { hours: 1 }).toString() },
		{ label: '3 Hour', value: add(new Date(), { hours: 3 }).toString() },
		{ label: '5 Hour', value: add(new Date(), { hours: 5 }).toString() },
		{ label: '12 Hour', value: add(new Date(), { hours: 5 }).toString() },
		{ label: '24 Hour', value: add(new Date(), { hours: 24 }).toString() },
		{ label: '3 days', value: add(new Date(), { days: 3 }).toString() },
		{ label: '5 days', value: add(new Date(), { days: 5 }).toString() },
		{ label: '10 days', value: add(new Date(), { days: 10 }).toString() },
		{ label: '15 days', value: add(new Date(), { days: 15 }).toString() },
		{ label: '1 month', value: add(new Date(), { months: 1 }).toString() },
		{ label: 'Infinite', value: '' },
	];

	return (
		<div className="relative w-full flex flex-col">
			<label className="mb-3">Ends At</label>
			<select
				{...handler}
				className="peer appearance-none p-2 cursor-pointer bg-slate-800/60 text-sm  font-normal rounded-md text-slate-300 outline-none focus:ring-4 ring-slate-600/40"
			>
				{options.map((option, idx) => (
					<option className="outline-none bg-slate-800 mb-1" key={idx} value={option.value}>
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
