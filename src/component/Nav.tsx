import Link from 'next/link';
import type { FunctionComponent, ReactNode } from 'react';

const Nav: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<header className="header flex justify-between items-center">
				<Link href="/">
					<h1 className="text-4xl cursor-pointer font-bold text-shadow hover:opacity-60 transition-all duration-400">
						Votey
					</h1>
				</Link>
				<Link href="/create">
					<a className="bg-indigo-900/20  hover:bg-indigo-600 font-bold rounded text-gray-200 text-2xl p-3">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</Link>
			</header>
			{children}
		</>
	);
};

export default Nav;
