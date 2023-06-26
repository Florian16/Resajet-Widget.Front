import postcss from "rollup-plugin-postcss";
import fontMagician from "postcss-font-magician";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    postcss({
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
    }),
  ],
};
