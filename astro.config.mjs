import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://prodecor33.ru',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    speedInsights: { enabled: false },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});