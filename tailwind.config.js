/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				tilt: 'tilt 700ms linear infinite',
			},
			keyframes: {
				tilt: {
					'0%, 100%': { transform: 'rotate(-15deg)' },
					'50%': { transform: 'rotate(15deg)' },
				},
			},
		},
	},
	plugins: [],
};
