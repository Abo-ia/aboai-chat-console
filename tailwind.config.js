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
                    lightest: '#e1e3ac',
                    lighter: '#a6b985',
                    light: '#648a64',
                    base: '#89a09a',
                    dark: '#213435',
                    darkest: '#46685b', 
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
