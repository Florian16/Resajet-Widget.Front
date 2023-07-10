import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import fontMagician from "postcss-font-magician";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        fontMagician({
          variants: {
            Poppins: {
              300: [],
              400: [],
              700: [],
            },
          },
        }),
      ],
    },
  },
});
