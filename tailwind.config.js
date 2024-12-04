/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 15s linear infinite',
            },
            backgroundColor: {
                default: '#ffffff', // 기본 배경색 흰색으로 명시
            },
        },
    },
    plugins: [], // 필요하다면 플러그인 추가 가능
};
