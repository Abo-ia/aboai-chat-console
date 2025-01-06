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
                    "font-main": "#dce3e9",
                    "font-user": "#e9eff5",

                    "bg-hover": "#262c36",
                    "bg-header": "#0b131b",
                    "bg-main": "#01040a",
                    "bg-sidebar": "#141d23",

                    
                    "chat-bg": "#0d1118",
                    "chat-message": "#141d23",
        

                    border: "#30363d",
                },
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(to right,rgb(34, 34, 197),rgb(20, 61, 184))',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
