import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",
  locales: {
    "/": {
      description: "Docker 从入门到实践",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
