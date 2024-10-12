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
        activeMatch: "^/docker/install/$",
      },
      {
        text: "Docker入门",
        icon: "home",
        link: "README.md",
        activeMatch: "^/$",
      },
      {
        text: "Docker实战",
        icon: "alias",
        link: "cases/",
        activeMatch: "^/docker/cases/$",
      },
      {
        text: "CI/CD",
        icon: "ci",
        link: "cases/ci_cd/",
        activeMatch: "^/docker/cases/ci_cd/$",
      },
      {
        text: "Compose",
        icon: "any",
        link: "compose/",
        activeMatch: "^/docker/compose/$",
      },
      {
        text: "kubernetes",
        icon: "build",
        link: "kubernetes/",
        activeMatch: "^/docker/kubernetes/$",
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
    link: "/markdown.md",
  },
  {
    text: "面经",
    icon: "interview",
    prefix: "/interview/",
    children: [
      {
        text: "Mysql",
        icon: "mysql",
        link: "README.md",
        // 仅在 `/interview/mysql/` 激活
        activeMatch: "^/interview/mysql/$",
      },
      {
        text: "Redis",
        icon: "redis",
        link: "redis/",
        activeMatch: "^/interview/redis/$",
      },
      {
        text: "HTTP请求解析",
        icon: "http",
        link: "http/",
        activeMatch: "^/interview/http/$",
      },
    ]
  }
]);
