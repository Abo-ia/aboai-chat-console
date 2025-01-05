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
                    "font-main": "#e7edf2",
                    "bg-main": "#0b131b",
                    "bg-secondary": "#141d23",




                    "border": "707681",

                    foreground: "#161b22", // Fondo secundario
                    border: "#30363d", // Color de bordes
                    text: "#c9d1d9", // Texto principal
                    muted: "#8b949e", // Texto o elementos secundarios
                    accent: "#58a6ff", // Color de acento principal
                    success: "#2ea043", // Color para éxito
                    warning: "#d29922", // Color para advertencias
                    danger: "#f85149", // Color para errores
                    highlight: "#3fb950", // Resaltados o selecciones
                    shadow: "#010409", // Sombra o profundidad
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
