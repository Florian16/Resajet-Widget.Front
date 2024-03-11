import path from "path";
import Dotenv from "dotenv-webpack";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/main.tsx",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  performance: { hints: false },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    typescript: {
      ignoreBuildErrors: true,
    },
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, "src/assets/img"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env.production",
    }),
  ],
};
