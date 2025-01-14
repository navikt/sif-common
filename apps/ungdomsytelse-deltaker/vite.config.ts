/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
    ],
    server: {
        port: 8080,
    },
    resolve: {
        alias: {
            '@api': '/src/api',
            '@components': '/src/components',
            '@context': '/src/context',
            '@hooks': '/src/hooks',
            '@i18n': '/src/i18n',
            '@types': '/src/types',
            '@utils': '/src/utils',
        },
    },
    build: {
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
