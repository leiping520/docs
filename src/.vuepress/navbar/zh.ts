import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "Docker",
    icon: "docker",
    prefix: "/zh/docker/",
    children: [
      {
        text: "安装Docker",
        icon: "install",
        link: "install/",
      },
      {
        text: "Docker入门",
        icon: "apple",
        link: "",
      },
      {
        text: "Docker实战",
        icon: "Cases",
        link: "cases/",
      },
      {
        text: "CI/CD",
        icon: "ci",
        link: "cases/ci_cd/",
      },
      {
        text: "Compose",
        icon: "docker",
        link: "compose/",
      },
      {
        text: "kubernetes",
        icon: "kubernetes",
        link: "kubernetes/",
      }
    ],
  },
]);
