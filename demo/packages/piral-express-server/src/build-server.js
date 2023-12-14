const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const path = require("path");

esbuild.build({
  entryPoints: [path.resolve(__dirname, "server/app.ts")],
  minify: true,
  bundle: true,
  platform: "node",
  outfile: path.resolve(__dirname, "../dist/server.js"),
  plugins: [
    sassPlugin({
      type: "css-text",
    }),
  ],
});
