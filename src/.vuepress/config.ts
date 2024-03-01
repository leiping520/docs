import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",

  lang: "zh-CN",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "悟空",
      description: "Docker 从入门到实践",
    },
    "/en/": {
      lang: "en-US",
      title: "Docker From Beginner to Practice",
      description: "Docker From Beginner to Practice",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
