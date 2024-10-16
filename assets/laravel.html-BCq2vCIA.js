import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as l,c,a as s,b as n,d,e}from"./app-GzDqOkWS.js";const p={},r=e(`<blockquote><p>本节适用于 PHP 开发者阅读。<code>Laravel</code> 基于 <code>8.x</code> 版本，各个版本的文件结构可能会有差异，请根据实际自行修改。</p></blockquote><h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备"><span>准备</span></a></h2><p>新建一个<code>Laravel</code>项目或在已有的<code>laravel</code>项目根目录下新建<code>Dockerfile</code>，<code>.dockerignore</code>，<code>laravel.conf</code>文件。</p><p>在<code>.dockerignore</code>文件中写入一下内容：</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>.idea/
.git/

vendor/

node_modules/

public/js/
public/css/
public/mix-manifest.json

yarn-error.log

bootstrap/cache/*
storage/

<span class="token comment"># 自行添加其他需要排除的文件，例如 .env.* 文件</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>laravel.conf</code>文件中写入nginx配置：</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>server {
  listen 80 default_server;
  root /app/laravel/public;
  index index.php index.html;

  location / {
      try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ .*\\.php(\\/.*)*$ {
    fastcgi_pass   laravel:9000;
    include        fastcgi.conf;

    <span class="token comment"># fastcgi_connect_timeout 300;</span>
    <span class="token comment"># fastcgi_send_timeout 300;</span>
    <span class="token comment"># fastcgi_read_timeout 300;</span>
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="前端构建" tabindex="-1"><a class="header-anchor" href="#前端构建"><span>前端构建</span></a></h2><p>第一价段进行前端构建</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> node:alpine <span class="token keyword">as</span> frontend</span>

<span class="token instruction"><span class="token keyword">COPY</span> package.json /app/</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd /app <span class="token operator">\\</span>
      &amp;&amp; npm install --registry=https://registry.npmmirror.com</span>

<span class="token instruction"><span class="token keyword">COPY</span> webpack.mix.js webpack.config.js tailwind.config.js /app/</span>
<span class="token instruction"><span class="token keyword">COPY</span> resources/ /app/resources/</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd /app <span class="token operator">\\</span>
      &amp;&amp; touch artisan <span class="token operator">\\</span>
      &amp;&amp; mkdir -p public <span class="token operator">\\</span>
      &amp;&amp; npm run production</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装composer依赖" tabindex="-1"><a class="header-anchor" href="#安装composer依赖"><span>安装Composer依赖</span></a></h2><p>第二价段安装Composer依赖</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> composer <span class="token keyword">as</span> composer</span>

<span class="token instruction"><span class="token keyword">COPY</span> database/ /app/database/</span>
<span class="token instruction"><span class="token keyword">COPY</span> composer.json composer.lock /app/</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd /app <span class="token operator">\\</span>
      &amp;&amp; composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ <span class="token operator">\\</span>
      &amp;&amp; composer install <span class="token operator">\\</span>
           --ignore-platform-reqs <span class="token operator">\\</span>
           --no-interaction <span class="token operator">\\</span>
           --no-plugins <span class="token operator">\\</span>
           --no-scripts <span class="token operator">\\</span>
           --prefer-dist</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="整合以上阶段所生成的文件" tabindex="-1"><a class="header-anchor" href="#整合以上阶段所生成的文件"><span>整合以上阶段所生成的文件</span></a></h2><p>第三阶段对以上阶段生成的文件进行整合</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> php:7.4-fpm-alpine <span class="token keyword">as</span> laravel</span>

<span class="token instruction"><span class="token keyword">ARG</span> LARAVEL_PATH=/app/laravel</span>

<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">composer</span></span> /app/vendor/ <span class="token variable">\${LARAVEL_PATH}</span>/vendor/</span>
<span class="token instruction"><span class="token keyword">COPY</span> . <span class="token variable">\${LARAVEL_PATH}</span></span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">frontend</span></span> /app/public/js/ <span class="token variable">\${LARAVEL_PATH}</span>/public/js/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">frontend</span></span> /app/public/css/ <span class="token variable">\${LARAVEL_PATH}</span>/public/css/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">frontend</span></span> /app/public/mix-manifest.json <span class="token variable">\${LARAVEL_PATH}</span>/public/mix-manifest.json</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd <span class="token variable">\${LARAVEL_PATH}</span> <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/cache <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/sessions <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/testing <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/views <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/logs <span class="token operator">\\</span>
      &amp;&amp; chmod -R 777 storage <span class="token operator">\\</span>
      &amp;&amp; php artisan package:discover</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最后一个阶段构建nginx镜像" tabindex="-1"><a class="header-anchor" href="#最后一个阶段构建nginx镜像"><span>最后一个阶段构建<code>nginx</code>镜像</span></a></h2><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> nginx:alpine <span class="token keyword">as</span> nginx</span>

<span class="token instruction"><span class="token keyword">ARG</span> LARAVEL_PATH=/app/laravel</span>

<span class="token instruction"><span class="token keyword">COPY</span> laravel.conf /etc/nginx/conf.d/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">laravel</span></span> <span class="token variable">\${LARAVEL_PATH}</span>/public <span class="token variable">\${LARAVEL_PATH}</span>/public</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动容器并测试" tabindex="-1"><a class="header-anchor" href="#启动容器并测试"><span>启动容器并测试</span></a></h2><p>新建<code>docker</code>网络</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>docker network create laravel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动laravel容器，<code>--name=laravel</code>参数设定的名字必须与<code>nginx</code>配置文件中的<code>fastcgi_pass laravel:9000;</code>一致</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>docker run -d -it --rm --name=laravel --network=laravel my/laravel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动<code>nginx</code>容器</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>docker run -d -it --rm --network=laravel -p 8080:80 my/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>浏览器访问<code>127.0.0.1:8080</code>可以看淡laravel项目首页</p><h2 id="生产环境优化" tabindex="-1"><a class="header-anchor" href="#生产环境优化"><span>生产环境优化</span></a></h2><p>本小节内容为了方便测试，将配置文件直接放到了镜像中，实际在使用时 建议 将配置文件作为 <code>config</code> 或 <code>secret</code> 挂载到容器中，请读者自行学习 <code>Swarm mode</code> 或 <code>Kubernetes</code> 的相关内容。</p>`,28),t={href:"https://github.com/khs1994-docker/laravel-demo",target:"_blank",rel:"noopener noreferrer"},v=e(`<h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录"><span>附录</span></a></h2><p>完整<code>Dockerfile</code>文件如下。</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> node:alpine <span class="token keyword">as</span> frontend</span>

<span class="token instruction"><span class="token keyword">COPY</span> package.json /app/</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd /app <span class="token operator">\\</span>
      &amp;&amp; npm install --registry=https://registry.npmmirror.com</span>

<span class="token instruction"><span class="token keyword">COPY</span> webpack.mix.js webpack.config.js tailwind.config.js /app/</span>
<span class="token instruction"><span class="token keyword">COPY</span> resources/ /app/resources/</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd /app <span class="token operator">\\</span>
      &amp;&amp; touch artisan <span class="token operator">\\</span>
      &amp;&amp; mkdir -p public <span class="token operator">\\</span>
      &amp;&amp; npm run production</span>

<span class="token instruction"><span class="token keyword">FROM</span> composer <span class="token keyword">as</span> composer</span>

<span class="token instruction"><span class="token keyword">COPY</span> database/ /app/database/</span>
<span class="token instruction"><span class="token keyword">COPY</span> composer.json /app/</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd /app <span class="token operator">\\</span>
      &amp;&amp; composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ <span class="token operator">\\</span>
      &amp;&amp; composer install <span class="token operator">\\</span>
           --ignore-platform-reqs <span class="token operator">\\</span>
           --no-interaction <span class="token operator">\\</span>
           --no-plugins <span class="token operator">\\</span>
           --no-scripts <span class="token operator">\\</span>
           --prefer-dist</span>

<span class="token instruction"><span class="token keyword">FROM</span> php:7.4-fpm-alpine <span class="token keyword">as</span> laravel</span>

<span class="token instruction"><span class="token keyword">ARG</span> LARAVEL_PATH=/app/laravel</span>

<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">composer</span></span> /app/vendor/ <span class="token variable">\${LARAVEL_PATH}</span>/vendor/</span>
<span class="token instruction"><span class="token keyword">COPY</span> . <span class="token variable">\${LARAVEL_PATH}</span></span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">frontend</span></span> /app/public/js/ <span class="token variable">\${LARAVEL_PATH}</span>/public/js/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">frontend</span></span> /app/public/css/ <span class="token variable">\${LARAVEL_PATH}</span>/public/css/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">frontend</span></span> /app/public/mix-manifest.json <span class="token variable">\${LARAVEL_PATH}</span>/public/mix-manifest.json</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x ; cd <span class="token variable">\${LARAVEL_PATH}</span> <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/cache <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/sessions <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/testing <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/framework/views <span class="token operator">\\</span>
      &amp;&amp; mkdir -p storage/logs <span class="token operator">\\</span>
      &amp;&amp; chmod -R 777 storage <span class="token operator">\\</span>
      &amp;&amp; php artisan package:discover</span>

<span class="token instruction"><span class="token keyword">FROM</span> nginx:alpine <span class="token keyword">as</span> nginx</span>

<span class="token instruction"><span class="token keyword">ARG</span> LARAVEL_PATH=/app/laravel</span>

<span class="token instruction"><span class="token keyword">COPY</span> laravel.conf /etc/nginx/conf.d/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">laravel</span></span> <span class="token variable">\${LARAVEL_PATH}</span>/public <span class="token variable">\${LARAVEL_PATH}</span>/public</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="来自chatgpt的解释" tabindex="-1"><a class="header-anchor" href="#来自chatgpt的解释"><span>来自<code>CHATGPT</code>的解释</span></a></h3><p>这 <code>Dockerfile</code> 文件定义了一个多阶段构建过程，用来设置和准备一个 <code>Laravel</code> 应用程序的容器环境。每个阶段都是基于不同的基础镜像，并为最终的 <code>Laravel</code> 应用程序构建过程执行特定的步骤。以下是每个阶段的解释：</p><h3 id="第一阶段-frontend" tabindex="-1"><a class="header-anchor" href="#第一阶段-frontend"><span>第一阶段: frontend</span></a></h3><ul><li>使用 <code>Node.js</code> 的 <code>Alpine Linux</code> 版本作为基础镜像。</li><li>复制 <code>package.json</code> 文件到 <code>/app/</code> 目录。</li><li>进入 <code>/app/</code> 目录并使用指定的 <code>NPM</code> 镜像源地址安装 <code>npm 依赖</code>。</li><li>复制前端构建相关的配置文件 (<code>webpack.mix.js</code>, <code>webpack.config.js</code>, <code>tailwind.config.js</code>) 到 <code>/app/</code>。</li><li>复制资源目录。这通常包含了前端的 <code>assets</code> 如 <code>CSS</code>、<code>JavaScript</code> 和图片等。</li><li>创建一个空的 <code>artisan</code> 文件 (<code>Laravel CLI</code> 工具)，创建 <code>public</code> 目录，并执行前端构建脚本，比如编译 <code>CSS</code> 和 <code>JavaScript</code>。</li></ul><h3 id="第二阶段-composer" tabindex="-1"><a class="header-anchor" href="#第二阶段-composer"><span>第二阶段: composer</span></a></h3><ul><li>使用 <code>Composer</code> 官方提供的镜像作为基础镜像。</li><li>复制数据库迁移相关文件和 <code>composer.json</code> 到 <code>/app/database/</code> 和 <code>/app/</code> 目录里。</li><li>运行 <code>Composer</code> 命令，在全局范围内配置中国大陆的镜像仓库以加速下载，然后安装 <code>PHP</code> 依赖（而不考虑平台要求，无交互，不执行插件和脚本）。</li></ul><h3 id="第三阶段-laravel" tabindex="-1"><a class="header-anchor" href="#第三阶段-laravel"><span>第三阶段: laravel</span></a></h3><ul><li>基于 <code>PHP 7.4</code> 的 <code>Alpine Linux</code> 版本作为基础镜像。</li><li>从 <code>composer</code> 阶段复制安装好的 <code>vendor</code> 目录（即依赖库）。</li><li>复制整个项目代码到 <code>Laravel</code> 目录 (<code>\${LARAVEL_PATH}</code>)。</li><li>从 <code>frontend</code> 阶段复制生产环境的 <code>JS</code> 和 <code>CSS</code> 文件以及 <code>mix-manifest.json</code> 文件到 <code>Laravel</code> 的 <code>public</code> 目录。</li><li>创建 <code>Laravel</code> 所需的存储目录结构，并设置权限为 <code>777</code>（这并不是一个好的做法，因为它会引发安全隐患，但在开发环境中可以临时使用）。</li><li>执行 <code>php artisan package:discover</code> 命令，让 <code>Laravel</code> 发现并注册服务提供者。</li></ul><h3 id="第四阶段-nginx" tabindex="-1"><a class="header-anchor" href="#第四阶段-nginx"><span>第四阶段: nginx</span></a></h3><ul><li>使用 <code>nginx</code> 的 <code>Alpine Linux</code> 版本作为基础镜像。</li><li>复制 <code>Nginx</code> 配置文件 <code>laravel.conf</code> 到 <code>/etc/nginx/conf.d/</code> 目录。</li><li>从 <code>laravel</code> 阶段复制公共可访问的 <code>public</code> 目录内容到 <code>Nginx</code> 能够服务的位置。</li></ul><p>总结来说，这个 <code>Dockerfile</code> 是为了将一个 <code>Laravel</code> 应用程序分成不同的构建阶段：<code>前端构建</code>、<code>Composer依赖安装</code>、<code>应用程序设置</code>和<code>配置Nginx服务器</code>。通过这种方式可以优化构建过程，并保持最终生成的镜像尽可能小巧。</p>`,14);function m(k,u){const a=o("ExternalLinkIcon");return l(),c("div",null,[r,s("p",null,[n("由于篇幅所限本小节只是简单列出，更多内容可以参考 "),s("a",t,[n("larval-demo"),d(a)]),n(" 项目")]),v])}const h=i(p,[["render",m],["__file","laravel.html.vue"]]),f=JSON.parse('{"path":"/docker/dockfile/laravel.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"准备","slug":"准备","link":"#准备","children":[]},{"level":2,"title":"前端构建","slug":"前端构建","link":"#前端构建","children":[]},{"level":2,"title":"安装Composer依赖","slug":"安装composer依赖","link":"#安装composer依赖","children":[]},{"level":2,"title":"整合以上阶段所生成的文件","slug":"整合以上阶段所生成的文件","link":"#整合以上阶段所生成的文件","children":[]},{"level":2,"title":"最后一个阶段构建nginx镜像","slug":"最后一个阶段构建nginx镜像","link":"#最后一个阶段构建nginx镜像","children":[]},{"level":2,"title":"启动容器并测试","slug":"启动容器并测试","link":"#启动容器并测试","children":[]},{"level":2,"title":"生产环境优化","slug":"生产环境优化","link":"#生产环境优化","children":[]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"来自CHATGPT的解释","slug":"来自chatgpt的解释","link":"#来自chatgpt的解释","children":[]},{"level":3,"title":"第一阶段: frontend","slug":"第一阶段-frontend","link":"#第一阶段-frontend","children":[]},{"level":3,"title":"第二阶段: composer","slug":"第二阶段-composer","link":"#第二阶段-composer","children":[]},{"level":3,"title":"第三阶段: laravel","slug":"第三阶段-laravel","link":"#第三阶段-laravel","children":[]},{"level":3,"title":"第四阶段: nginx","slug":"第四阶段-nginx","link":"#第四阶段-nginx","children":[]}]}],"git":{"createdTime":1709890332000,"updatedTime":1710495124000,"contributors":[{"name":"George","email":"leiping@yunxianginvest.com","commits":2}]},"readingTime":{"minutes":4.48,"words":1343},"filePathRelative":"docker/dockfile/laravel.md","localizedDate":"March 8, 2024","excerpt":"<blockquote>\\n<p>本节适用于 PHP 开发者阅读。<code>Laravel</code> 基于 <code>8.x</code> 版本，各个版本的文件结构可能会有差异，请根据实际自行修改。</p>\\n</blockquote>\\n<h2>准备</h2>\\n<p>新建一个<code>Laravel</code>项目或在已有的<code>laravel</code>项目根目录下新建<code>Dockerfile</code>，<code>.dockerignore</code>，<code>laravel.conf</code>文件。</p>\\n<p>在<code>.dockerignore</code>文件中写入一下内容：</p>"}');export{h as comp,f as data};
