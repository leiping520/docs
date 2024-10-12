import { sidebar } from "vuepress-theme-hope";


const mySidebar = [
  {
    // 必要的，分组的标题文字
    text: "安装Docker",
    // 可选的, 分组标题对应的图标
    icon: "install",
    // 可选的, 分组标题对应的链接
    link: "/docker/install",
  },
  {
    // 必要的，分组的标题文字
    text: "Docker入门",
    // 可选的, 分组标题对应的图标
    icon: "home",
    // 可选的, 分组标题对应的链接
    link: "/docker/",
    // 可选的，会添加到每个 item 链接地址之前
    prefix: "/docker/",
    // 可选的, 设置分组是否可以折叠，默认值是 false,
    collapsible: true,
    // 可选的。设置分组是否默认展开，默认值是 false
    expanded: true,
    // 必要的，分组的子项目
    children: [
      {
        text: "Docker 简介",
        link: "README.md",
      },
      {
        text: "基本概念",
        link: "basic_concept.md",
      },
      {
        text: "使用镜像",
        link: "images/",
        prefix: "images/",
        collapsible: true,
        expanded: true,
        children: [
          {
            text: "使用Dockerfile定制镜像",
            link: "dockerfile.md",
          },
        ],
      },
      {
        text: "Dockfile 文件",
        link: "dockfile/",
        prefix: "dockfile/",
        collapsible: true,
        expanded: true,
        children: [
          {
            text: "Dockfile指令详解",
            icon: "home",
            link: "README.md",
          },
          {
            text: "COPY 复制文件",
            icon: "copy",
            link: "copy.md",
          },
          {
            text: "ADD 更高级的复制文件",
            icon: "add",
            link: "add.md",
          },
          {
            text: "CMD 容器启动命令",
            icon: "ability",
            link: "cmd.md",
          },
          {
            text: "ENTRYPOINT 入口点",
            icon: "actions",
            link: "entrypoint.md",
          },
          {
            text: "ENV 设置环境变量",
            icon: "advance",
            link: "env.md",
          },
          {
            text: "VOLUME 定义匿名卷",
            icon: "mesh",
            link: "volume.md",
          },
          {
            text: "EXPOSE 定义暴露的端口",
            icon: "network",
            link: "expose.md",
          },
          {
            text: "WORKDIR 指定工作目录",
            icon: "palette",
            link: "workdir.md",
          },
          {
            text: "USER 指定当前用户",
            icon: "profile",
            link: "user.md",
          },
          {
            text: "SHELL 指令",
            icon: "others",
            link: "shell.md",
          },
          {
            text: "多阶段构建",
            icon: "software",
            link: "multistage_build.md",
          },
          {
            text: "实战多阶段构建Laravel镜像",
            icon: "valine",
            link: "laravel.md",
          },
        ],
      },
      {
        text: "Dockerfile 最佳实践",
        icon: "book",
        link: "best_practices.md",
      },
    ],
  },
];

export const zhSidebar = sidebar(mySidebar);
// {
//   "/docker/install/": [],
//   "/docker/": [
//     {
//       text: "Docker 简介",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "基本概念",
//       icon: "book",
//       prefix: "posts/",
//       children: "structure",
//     },
//     {
//       text: "使用镜像",
//       icon: "book",
//       prefix: "images/",
//       children: [
//         {
//           text: "使用Dockerfile定制镜像",
//           icon: "book",
//           link: "dockerfile.md",
//         },
//       ],
//     },
//     {
//       text: "Dockfile 文件",
//       icon: "book",
//       prefix: "dockfile/",
//       // 可选的, 设置分组是否可以折叠，默认值是 false,
//       collapsible: true,
//       children: [
//         {
//           text: "Dockfile指令详解",
//           icon: "mitten",
//           link: "",
//         },
//         {
//           text: "COPY 复制文件",
//           icon: "copy",
//           link: "copy.md",
//         },
//         {
//           text: "ADD 更高级的复制文件",
//           icon: "add",
//           link: "add.md",
//         },
//         {
//           text: "CMD 容器启动命令",
//           icon: "ability",
//           link: "cmd.md",
//         },
//         {
//           text: "ENTRYPOINT 入口点",
//           icon: "actions",
//           link: "entrypoint.md",
//         },
//         {
//           text: "ENV 设置环境变量",
//           icon: "advance",
//           link: "env.md",
//         },
//         {
//           text: "VOLUME 定义匿名卷",
//           icon: "mesh",
//           link: "volume.md",
//         },
//         {
//           text: "EXPOSE 定义暴露的端口",
//           icon: "network",
//           link: "expose.md",
//         },
//         {
//           text: "WORKDIR 指定工作目录",
//           icon: "palette",
//           link: "workdir.md",
//         },
//         {
//           text: "USER 指定当前用户",
//           icon: "profile",
//           link: "user.md",
//         },
//         {
//           text: "SHELL 指令",
//           icon: "others",
//           link: "shell.md",
//         },
//         {
//           text: "多阶段构建",
//           icon: "software",
//           link: "multistage_build.md",
//         },
//         {
//           text: "实战多阶段构建Laravel镜像",
//           icon: "valine",
//           link: "laravel.md",
//         },
//       ],
//     },
//     {
//       text: "Dockerfile 最佳实践",
//       icon: "book",
//       link: "best_practices.md",
//     },
//   ],
//   "/docker/cases/": [
//     {
//       text: "Docker 基础",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "Docker 容器",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "Docker 网络",
//       icon: "laptop-code",
//       link: "",
//     },
//   ],
//   "/docker/cases/ci_cd/": [
//     {
//       text: "Docker 基础",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "Docker 容器",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "Docker 网络",
//       icon: "laptop-code",
//       link: "",
//     },
//   ],
//   "/docker/compose/": [
//     {
//       text: "Docker 基础",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "Docker 容器",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "Docker 网络",
//       icon: "laptop-code",
//       link: "",
//     },
//   ],
//   "/docker/kubernetes/": [
//     {
//       text: "项目简介",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "基本概念",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "基本架构",
//       icon: "laptop-code",
//       link: "",
//     },
//     {
//       text: "部署Kubernetes",
//       icon: "laptop-code",
//       link: "",
//       children: [
//         {
//           text: "部署Kubernetes",
//           icon: "laptop-code",
//           link: "",
//         },
//         {
//           text: "使用kubeadm部署kubernetes(CRI使用containerd)",
//           icon: "laptop-code",
//           link: "",
//         },
//         {
//           text: "Docker Desktop 启用Kubernetes",
//           icon: "laptop-code",
//           link: "",
//         },
//         {
//           text: "一步步部署Kubernetes集群",
//           icon: "laptop-code",
//           link: "",
//         },
//         {
//           text: "Kubernetes Dashboard",
//           icon: "laptop-code",
//           link: "",
//         },
//       ],
//     },
//     {
//       text: "Kubernetes 命令行kubectl",
//       icon: "laptop-code",
//       link: "",
//       children: [
//         {
//           text: "kubectl使用",
//           icon: "laptop-code",
//           link: "",
//         },
//       ]
//     }
//   ],

//   "/frontend/es6/": [
//     {
//       text: "24.Module的语法",
//       icon: "module",
//       link: "module",
//     },
//   ],


//   "/frontend/typescript/": [
//     {
//       text: "1.简介",
//       icon: "laptop-code",
//       link: "intro.md",
//     },
//     {
//       text: "2.基本用法",
//       icon: "laptop-code",
//       link: "intro.md",
//     },
//     {
//       text: "3.any 类型",
//       icon: "laptop-code",
//       link: "any.md",
//     },
//     {
//       text: "4.类型系统",
//       icon: "laptop-code",
//       link: "types.md",
//     },
//     {
//       text: "12.泛型",
//       icon: "",
//       link: "generics.md"
//     },
//     {
//       text: "23.tsc命令",
//       icon: "laptop-code",
//       link: "tsc.md",
//     }
//   ],
// }