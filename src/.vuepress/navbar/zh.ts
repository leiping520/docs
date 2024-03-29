import { navbar } from "vuepress-theme-hope";

let a:string
    ,b:number
    ,c:boolean

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
    text: "前端相关",
    icon: "front",
    prefix: "/frontend/",
    children: [
      {
        text: "JQuery",
        icon: "jQuery",
        link: "jquery/"
      },
      {
        text: "ES6",
        icon: "es6",
        link: "es6/"
      },
      {
        text: "TypeScript",
        icon: "typescript",
        link: "typescript/"
      }
    ]
  },
  {
    text: "MD 文档",
    icon: "markdown",
    link: "/markdown.md",
  }
]);
