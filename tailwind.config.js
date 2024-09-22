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
                    lighter: '#c1c0ae',
                    light: '##89a09a',
                    base: '#89a09a',
                    dark: '#070705',
                    darkest: '#3e4b51', 
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
