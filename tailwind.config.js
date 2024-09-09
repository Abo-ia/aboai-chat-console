/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                custom: {
                    lightest: '#006DA4',
                    lighter: '#',
                    light: '#004D74',
                    base: '#c9d1d9',
                    dark: '#161b22',
                    darkest: '#0d1117', 
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
