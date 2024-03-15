> 本节适用于 PHP 开发者阅读。`Laravel` 基于 `8.x` 版本，各个版本的文件结构可能会有差异，请根据实际自行修改。

## 准备

新建一个`Laravel`项目或在已有的`laravel`项目根目录下新建`Dockerfile`，`.dockerignore`，`laravel.conf`文件。

在`.dockerignore`文件中写入一下内容：

```docker
.idea/
.git/

vendor/

node_modules/

public/js/
public/css/
public/mix-manifest.json

yarn-error.log

bootstrap/cache/*
storage/

# 自行添加其他需要排除的文件，例如 .env.* 文件

```

在`laravel.conf`文件中写入nginx配置：

```docker
server {
  listen 80 default_server;
  root /app/laravel/public;
  index index.php index.html;

  location / {
      try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ .*\.php(\/.*)*$ {
    fastcgi_pass   laravel:9000;
    include        fastcgi.conf;

    # fastcgi_connect_timeout 300;
    # fastcgi_send_timeout 300;
    # fastcgi_read_timeout 300;
  }
}

```

## 前端构建

第一价段进行前端构建

```docker
FROM node:alpine as frontend

COPY package.json /app/

RUN set -x ; cd /app \
      && npm install --registry=https://registry.npmmirror.com

COPY webpack.mix.js webpack.config.js tailwind.config.js /app/
COPY resources/ /app/resources/

RUN set -x ; cd /app \
      && touch artisan \
      && mkdir -p public \
      && npm run production

```

## 安装Composer依赖

第二价段安装Composer依赖

```docker
FROM composer as composer

COPY database/ /app/database/
COPY composer.json composer.lock /app/

RUN set -x ; cd /app \
      && composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ \
      && composer install \
           --ignore-platform-reqs \
           --no-interaction \
           --no-plugins \
           --no-scripts \
           --prefer-dist

```

## 整合以上阶段所生成的文件

第三阶段对以上阶段生成的文件进行整合

```docker
FROM php:7.4-fpm-alpine as laravel

ARG LARAVEL_PATH=/app/laravel

COPY --from=composer /app/vendor/ ${LARAVEL_PATH}/vendor/
COPY . ${LARAVEL_PATH}
COPY --from=frontend /app/public/js/ ${LARAVEL_PATH}/public/js/
COPY --from=frontend /app/public/css/ ${LARAVEL_PATH}/public/css/
COPY --from=frontend /app/public/mix-manifest.json ${LARAVEL_PATH}/public/mix-manifest.json

RUN set -x ; cd ${LARAVEL_PATH} \
      && mkdir -p storage \
      && mkdir -p storage/framework/cache \
      && mkdir -p storage/framework/sessions \
      && mkdir -p storage/framework/testing \
      && mkdir -p storage/framework/views \
      && mkdir -p storage/logs \
      && chmod -R 777 storage \
      && php artisan package:discover

```

## 最后一个阶段构建`nginx`镜像

```docker
FROM nginx:alpine as nginx

ARG LARAVEL_PATH=/app/laravel

COPY laravel.conf /etc/nginx/conf.d/
COPY --from=laravel ${LARAVEL_PATH}/public ${LARAVEL_PATH}/public

```

## 启动容器并测试

新建`docker`网络

```docker
docker network create laravel
```

启动laravel容器，`--name=laravel`参数设定的名字必须与`nginx`配置文件中的`fastcgi_pass laravel:9000;`一致

```docker
docker run -d -it --rm --name=laravel --network=laravel my/laravel
```

启动`nginx`容器

```docker
docker run -d -it --rm --network=laravel -p 8080:80 my/nginx
```

浏览器访问`127.0.0.1:8080`可以看淡laravel项目首页

## 生产环境优化

本小节内容为了方便测试，将配置文件直接放到了镜像中，实际在使用时 建议 将配置文件作为 `config` 或 `secret` 挂载到容器中，请读者自行学习 `Swarm mode` 或 `Kubernetes` 的相关内容。

由于篇幅所限本小节只是简单列出，更多内容可以参考 [larval-demo](https://github.com/khs1994-docker/laravel-demo) 项目

## 附录

完整`Dockerfile`文件如下。

```docker
FROM node:alpine as frontend

COPY package.json /app/

RUN set -x ; cd /app \
      && npm install --registry=https://registry.npmmirror.com

COPY webpack.mix.js webpack.config.js tailwind.config.js /app/
COPY resources/ /app/resources/

RUN set -x ; cd /app \
      && touch artisan \
      && mkdir -p public \
      && npm run production

FROM composer as composer

COPY database/ /app/database/
COPY composer.json /app/

RUN set -x ; cd /app \
      && composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ \
      && composer install \
           --ignore-platform-reqs \
           --no-interaction \
           --no-plugins \
           --no-scripts \
           --prefer-dist

FROM php:7.4-fpm-alpine as laravel

ARG LARAVEL_PATH=/app/laravel

COPY --from=composer /app/vendor/ ${LARAVEL_PATH}/vendor/
COPY . ${LARAVEL_PATH}
COPY --from=frontend /app/public/js/ ${LARAVEL_PATH}/public/js/
COPY --from=frontend /app/public/css/ ${LARAVEL_PATH}/public/css/
COPY --from=frontend /app/public/mix-manifest.json ${LARAVEL_PATH}/public/mix-manifest.json

RUN set -x ; cd ${LARAVEL_PATH} \
      && mkdir -p storage \
      && mkdir -p storage/framework/cache \
      && mkdir -p storage/framework/sessions \
      && mkdir -p storage/framework/testing \
      && mkdir -p storage/framework/views \
      && mkdir -p storage/logs \
      && chmod -R 777 storage \
      && php artisan package:discover

FROM nginx:alpine as nginx

ARG LARAVEL_PATH=/app/laravel

COPY laravel.conf /etc/nginx/conf.d/
COPY --from=laravel ${LARAVEL_PATH}/public ${LARAVEL_PATH}/public

```

### 来自`CHATGPT`的解释

这 `Dockerfile` 文件定义了一个多阶段构建过程，用来设置和准备一个 `Laravel` 应用程序的容器环境。每个阶段都是基于不同的基础镜像，并为最终的 `Laravel` 应用程序构建过程执行特定的步骤。以下是每个阶段的解释：

### 第一阶段: frontend
* 使用 `Node.js` 的 `Alpine Linux` 版本作为基础镜像。
* 复制 `package.json` 文件到 `/app/` 目录。
* 进入 `/app/` 目录并使用指定的 `NPM` 镜像源地址安装 `npm 依赖`。
* 复制前端构建相关的配置文件 (`webpack.mix.js`, `webpack.config.js`, `tailwind.config.js`) 到 `/app/`。
* 复制资源目录。这通常包含了前端的 `assets` 如 `CSS`、`JavaScript` 和图片等。
* 创建一个空的 `artisan` 文件 (`Laravel CLI` 工具)，创建 `public` 目录，并执行前端构建脚本，比如编译 `CSS` 和 `JavaScript`。
### 第二阶段: composer
* 使用 `Composer` 官方提供的镜像作为基础镜像。
* 复制数据库迁移相关文件和 `composer.json` 到 `/app/database/` 和 `/app/` 目录里。
* 运行 `Composer` 命令，在全局范围内配置中国大陆的镜像仓库以加速下载，然后安装 `PHP` 依赖（而不考虑平台要求，无交互，不执行插件和脚本）。
### 第三阶段: laravel
* 基于 `PHP 7.4` 的 `Alpine Linux` 版本作为基础镜像。
* 从 `composer` 阶段复制安装好的 `vendor` 目录（即依赖库）。
* 复制整个项目代码到 `Laravel` 目录 (`${LARAVEL_PATH}`)。
* 从 `frontend` 阶段复制生产环境的 `JS` 和 `CSS` 文件以及 `mix-manifest.json` 文件到 `Laravel` 的 `public` 目录。
* 创建 `Laravel` 所需的存储目录结构，并设置权限为 `777`（这并不是一个好的做法，因为它会引发安全隐患，但在开发环境中可以临时使用）。
* 执行 `php artisan package:discover` 命令，让 `Laravel` 发现并注册服务提供者。
### 第四阶段: nginx
* 使用 `nginx` 的 `Alpine Linux` 版本作为基础镜像。
* 复制 `Nginx` 配置文件 `laravel.conf` 到 `/etc/nginx/conf.d/` 目录。
* 从 `laravel` 阶段复制公共可访问的 `public` 目录内容到 `Nginx` 能够服务的位置。

总结来说，这个 `Dockerfile` 是为了将一个 `Laravel` 应用程序分成不同的构建阶段：`前端构建`、`Composer依赖安装`、`应用程序设置`和`配置Nginx服务器`。通过这种方式可以优化构建过程，并保持最终生成的镜像尽可能小巧。
