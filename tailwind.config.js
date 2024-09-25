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



                    base: '#006465',
                    dark: '#19191a',
                    darkest: '#020202', 
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}