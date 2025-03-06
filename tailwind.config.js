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
                    'primary': '#3e4b56',
                    'secondary': '#91b6ca',
                    'accent': '#d4e2e2',
                    'light': '#edf1ef',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
