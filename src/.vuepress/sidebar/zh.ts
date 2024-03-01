import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/docker/install/": [],
  "/docker/": [
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
  "/docker/cases/": [
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
  ],
  "/docker/cases/ci_cd/": [
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
  ],
  "/docker/compose/": [
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
  ],
  "/docker/kubernetes/": [
    {
      text: "项目简介",
      icon: "laptop-code",
      link: "",
    },
    {
      text: "基本概念",
      icon: "laptop-code",
      link: "",
    },
    {
      text: "基本架构",
      icon: "laptop-code",
      link: "",
    },
    {
      text: "部署Kubernetes",
      icon: "laptop-code",
      link: "",
      children: [
        {
          text: "部署Kubernetes",
          icon: "laptop-code",
          link: "",
        },
        {
          text: "使用kubeadm部署kubernetes(CRI使用containerd)",
          icon: "laptop-code",
          link: "",
        },
        {
          text: "Docker Desktop 启用Kubernetes",
          icon: "laptop-code",
          link: "",
        },
        {
          text: "一步步部署Kubernetes集群",
          icon: "laptop-code",
          link: "",
        },
        {
          text: "Kubernetes Dashboard",
          icon: "laptop-code",
          link: "",
        },
      ],
    },
    {
      text: "Kubernetes 命令行kubectl",
      icon: "laptop-code",
      link: "",
      children: [
        {
          text: "kubectl使用",
          icon: "laptop-code",
          link: "",
        },
      ]
    }
  ]
});
