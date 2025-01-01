module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'Arial', 'sans-serif'],
			},
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				background: 'var(--background)',
				text: 'var(--text)',
				secondaryText: 'var(--secondary-text)',
			},
		},
	},
	plugins: [],
}
