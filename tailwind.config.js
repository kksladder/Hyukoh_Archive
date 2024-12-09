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
                'spin-slow': 'spin 4s linear infinite',
                'wiggle-slow': 'wiggle 1s ease-in-out infinite',
                shake: 'shake 0.5s ease-in-out infinite',
                excited: 'excited 1s ease-in-out infinite',
                powerup: 'powerup 1s ease-in-out infinite',
                cleaning: 'cleaning 1s ease-in-out infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-30deg)' },
                    '50%': { transform: 'rotate(30deg)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
                },
                cleaning: {
                    '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
                    '25%': { transform: 'translateX(10px) rotate(5deg)' },
                    '50%': { transform: 'translateX(-5px) rotate(-5deg)' },
                    '75%': { transform: 'translateX(5px) rotate(5deg)' },
                },

                excited: {
                    '0%, 100%': {
                        transform: 'translateY(0) rotate(0deg)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'translateY(-25%) rotate(5deg)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
                powerup: {
                    '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                    '10%': { transform: 'scale(0.9) rotate(-3deg)' },
                    '40%': { transform: 'scale(1.1) rotate(3deg)' },
                    '60%': { transform: 'scale(1.1) rotate(-3deg)' },
                    '80%': { transform: 'scale(1) rotate(3deg)' },
                },
            },
            backgroundColor: {
                default: '#ffffff',
            },
        },
    },
    plugins: [],
};
