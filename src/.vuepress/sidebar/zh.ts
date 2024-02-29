import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/docker/": [
    {
      text: "Docker 简介",
      icon: "laptop-code",
      link: "",
    },
    {
      text: "基本概念",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
  ],
  "/zh/docker/cases/": [
    {
      text: "Docker 基础",
      icon: "laptop-code",
      link: "",
    },
    {
      text: "Docker 容器",
      icon: "laptop-code",
      link: "",
    },
    {
      text: "Docker 网络",
      icon: "laptop-code",
      link: "",
    },
  ]
});
