/** @type {import('tailwindcss/types').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        '1/8': '12.5%',
      },
    },
  },
  plugins: [],
};
