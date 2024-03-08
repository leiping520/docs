import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "Docker",
    icon: "docker",
    prefix: "/docker/",
    children: [
      {
        text: "安装Docker",
        icon: "install",
        link: "install/",
      },
      {
        text: "Docker入门",
        icon: "ability",
        link: "",
      },
      {
        text: "Docker实战",
        icon: "alias",
        link: "cases/",
      },
      {
        text: "CI/CD",
        icon: "ci",
        link: "cases/ci_cd/",
      },
      {
        text: "Compose",
        icon: "any",
        link: "compose/",
      },
      {
        text: "kubernetes",
        icon: "build",
        link: "kubernetes/",
      }
    ],
  },
  {
    text: "MD 文档",
    link: "/markdown.md"
  }
]);
