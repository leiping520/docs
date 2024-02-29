import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "悟空",
      description: "Docker 从入门到实践",
    },
    "/": {
      lang: "en-US",
      title: "Docker From Beginner to Practice",
      description: "Docker From Beginner to Practice",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
