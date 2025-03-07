import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

declare const __dirname: string;

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@src': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
            '@views': resolve(__dirname, './src/views'),
            '@utils': resolve(__dirname, './src/utils'),
            '@types': resolve(__dirname, './src/types'),
            '@assets': resolve(__dirname, './src/assets'),
            '@context': resolve(__dirname, './src/context'),
            '@hooks': resolve(__dirname, './src/hooks'),
            '@router': resolve(__dirname, './src/router'),
            '@mocks': resolve(__dirname, './src/mocks'),
        },
    },
});
