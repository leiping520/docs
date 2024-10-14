## 1.什么是 Docker

- Docker 最初是 dotCloud 公司创始人 Solomon Hykes (opens new window)在法国期间发起的一个公司内部项目，它是基于 dotCloud 公司多年云服务技术的一次革新，并于 2013 年 3 月以 Apache 2.0 授权协议开源 (opens new window)，主要项目代码在 GitHub (opens new window)上进行维护。Docker 项目后来还加入了 Linux 基金会，并成立推动 开放容器联盟（OCI） (opens new window)。

- Docker 自开源后受到广泛的关注和讨论，至今其 GitHub 项目 (opens new window)已经超过 5 万 7 千个星标和一万多个 fork。甚至由于 Docker 项目的火爆，在 2013 年底，dotCloud 公司决定改名为 Docker (opens new window)。Docker 最初是在 Ubuntu 12.04 上开发实现的；Red Hat 则从 RHEL 6.5 开始对 Docker 进行支持；Google 也在其 PaaS 产品中广泛应用 Docker。

- Docker 使用 Google 公司推出的 Go 语言 (opens new window)进行开发实现，基于 Linux 内核的 cgroup (opens new window)，namespace (opens new window)，以及 OverlayFS (opens new window)类的 Union FS (opens new window)等技术，对进程进行封装隔离，属于 操作系统层面的虚拟化技术 (opens new window)。由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器。最初实现是基于 LXC (opens new window)，从 0.7 版本以后开始去除 LXC，转而使用自行开发的 libcontainer (opens new window)，从 1.11 版本开始，则进一步演进为使用 runC (opens new window)和 containerd (opens new window)。

## 2.为什么要使用 Docker？

### 更高效的利用系统资源

- 由于容器不需要进行硬件虚拟以及运行完整操作系统等额外开销，Docker 对系统资源的利用率更高。无论是应用执行速度、内存损耗或者文件存储速度，都要比传统虚拟机技术更高效。因此，相比虚拟机技术，一个相同配置的主机，往往可以运行更多数量的应用。qa w x 