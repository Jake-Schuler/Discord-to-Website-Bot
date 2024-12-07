// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
    env: {
        schema: {
          API_URL: envField.string({ context: "server", access: "public", optional: true }),
        },
      },    
    integrations: [tailwind()],
  });