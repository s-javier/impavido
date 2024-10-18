import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "./src"
        ),
      },
    },
    // plugins: [suidPlugin()],
  },
});
