import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as s,e as i}from"./app-DF2Yrj6q.js";const a={},d=i(`<h2 id="全部放入一个dockerfile" tabindex="-1"><a class="header-anchor" href="#全部放入一个dockerfile"><span>全部放入一个Dockerfile</span></a></h2><p>一种方式是将所有的构建过程包含在一个<code>Dockerfile</code>中，包括项目及其依赖库的编译、测试、打包等流程，这里可能会带来的一些问题：</p><ul><li>镜像层次多，镜像体积较大，部署时间长</li><li>源代码存在泄漏的风险</li></ul><p>例如，编写<code>app.go</code>文件，改程序输出<code>hello world!</code></p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>package main

import &quot;fmt&quot;

func main(){
    fmt.Printf(&quot;Hello World!&quot;);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写<code>Dockerfile.one</code>文件</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:alpine</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add git ca-certificates</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/github.com/go/helloworld/</span>

<span class="token instruction"><span class="token keyword">COPY</span> app.go .</span>

<span class="token instruction"><span class="token keyword">RUN</span> go get -d -v github.com/go-sql-driver/mysql <span class="token operator">\\</span>
  &amp;&amp; CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app . <span class="token operator">\\</span>
  &amp;&amp; cp /go/src/github.com/go/helloworld/app /root</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;./app&quot;</span>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ docker build -t go/helloworld:1 -f Dockerfile.one .

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分散到多个dockerfile" tabindex="-1"><a class="header-anchor" href="#分散到多个dockerfile"><span>分散到多个Dockerfile</span></a></h2><p>另一种方式，就是我们事先在一个 <code>Dockerfile</code> 将项目及其依赖库编译测试打包好后，再将其拷贝到运行环境中，这种方式需要我们编写两个 <code>Dockerfile</code> 和一些编译脚本才能将其两个阶段自动整合起来，这种方式虽然可以很好地规避第一种方式存在的风险，但明显部署过程较复杂。</p><p>例如，编写 <code>Dockerfile.build</code> 文件</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:alpine</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add git</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/github.com/go/helloworld</span>

<span class="token instruction"><span class="token keyword">COPY</span> app.go .</span>

<span class="token instruction"><span class="token keyword">RUN</span> go get -d -v github.com/go-sql-driver/mysql <span class="token operator">\\</span>
  &amp;&amp; CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写 <code>Dockerfile.copy</code> 文件</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add ca-certificates</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span>

<span class="token instruction"><span class="token keyword">COPY</span> app .</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;./app&quot;</span>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建<code>bulid.sh</code></p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token comment">#!/bin/sh</span>
echo Building go/helloworld:build

docker build -t go/helloworld:build . -f Dockerfile.build

docker create --name extract go/helloworld:build
docker cp extract:/go/src/github.com/go/helloworld/app ./app
docker rm -f extract

echo Building go/helloworld:2

docker build --no-cache -t go/helloworld:2 . -f Dockerfile.copy
rm ./app

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在运行脚本即可构建镜像</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ chmod +x build.sh

$ ./build.sh

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比两种方式生成的镜像大小</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ docker image ls

REPOSITORY      TAG    IMAGE ID        CREATED         SIZE
go/helloworld   2      f7cf3465432c    22 seconds ago  6.47MB
go/helloworld   1      f55d3e16affc    2 minutes ago   295MB

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用多阶段构建" tabindex="-1"><a class="header-anchor" href="#使用多阶段构建"><span>使用多阶段构建</span></a></h2><p>为解决以上问题，<code>Docker v17.05</code> 开始支持多阶段构建 <code>(multistage builds)</code>。使用多阶段构建我们就可以很容易解决前面提到的问题，并且只需要编写一个 <code>Dockerfile</code>：</p><p>例如，编写 <code>Dockerfile</code> 文件</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:alpine <span class="token keyword">as</span> builder</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add git</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/github.com/go/helloworld/</span>

<span class="token instruction"><span class="token keyword">RUN</span> go get -d -v github.com/go-sql-driver/mysql</span>

<span class="token instruction"><span class="token keyword">COPY</span> app.go .</span>

<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .</span>

<span class="token instruction"><span class="token keyword">FROM</span> alpine:latest <span class="token keyword">as</span> prod</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add ca-certificates</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span>

<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">0</span></span> /go/src/github.com/go/helloworld/app .</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;./app&quot;</span>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ docker build -t go/helloworld:3 .

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对比三个镜像大小</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ docker image ls

REPOSITORY        TAG   IMAGE ID         CREATED            SIZE
go/helloworld     3     d6911ed9c846     7 seconds ago      6.47MB
go/helloworld     2     f7cf3465432c     22 seconds ago     6.47MB
go/helloworld     1     f55d3e16affc     2 minutes ago      295MB

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显使用多阶段构建的镜像体积小，同时也完美解决了上边提到的问题。</p><h2 id="只构建某一阶段的镜像" tabindex="-1"><a class="header-anchor" href="#只构建某一阶段的镜像"><span>只构建某一阶段的镜像</span></a></h2><p>我们可以使用<code>as</code>来为某一阶段命名，例如</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:alpine <span class="token keyword">as</span> builder</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如当我们只想构建 <code>builder</code> 阶段的镜像时，增加 <code>--target=builder</code> 参数即可</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ docker build --target builder -t username/imagename:tag .

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建时从其他镜像复制文件" tabindex="-1"><a class="header-anchor" href="#构建时从其他镜像复制文件"><span>构建时从其他镜像复制文件</span></a></h2><p>上面例子中我们使用<code>COPY --from=0 /go/src/github.com/go/helloworld/app .</code> 从上一阶段的镜像中复制文件，我们也可以复制任意镜像中的文件，例如：</p><div class="language-docker line-numbers-mode" data-ext="docker" data-title="docker"><pre class="language-docker"><code>$ COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,38),l=[d];function c(o,r){return n(),s("div",null,l)}const u=e(a,[["render",c],["__file","multistage_build.html.vue"]]),v=JSON.parse('{"path":"/docker/dockfile/multistage_build.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"全部放入一个Dockerfile","slug":"全部放入一个dockerfile","link":"#全部放入一个dockerfile","children":[]},{"level":2,"title":"分散到多个Dockerfile","slug":"分散到多个dockerfile","link":"#分散到多个dockerfile","children":[]},{"level":2,"title":"使用多阶段构建","slug":"使用多阶段构建","link":"#使用多阶段构建","children":[]},{"level":2,"title":"只构建某一阶段的镜像","slug":"只构建某一阶段的镜像","link":"#只构建某一阶段的镜像","children":[]},{"level":2,"title":"构建时从其他镜像复制文件","slug":"构建时从其他镜像复制文件","link":"#构建时从其他镜像复制文件","children":[]}],"git":{"createdTime":1709890332000,"updatedTime":1709890332000,"contributors":[{"name":"George","email":"leiping@yunxianginvest.com","commits":1}]},"readingTime":{"minutes":2.63,"words":789},"filePathRelative":"docker/dockfile/multistage_build.md","localizedDate":"March 8, 2024","excerpt":"<h2>全部放入一个Dockerfile</h2>\\n<p>一种方式是将所有的构建过程包含在一个<code>Dockerfile</code>中，包括项目及其依赖库的编译、测试、打包等流程，这里可能会带来的一些问题：</p>\\n<ul>\\n<li>镜像层次多，镜像体积较大，部署时间长</li>\\n<li>源代码存在泄漏的风险</li>\\n</ul>\\n<p>例如，编写<code>app.go</code>文件，改程序输出<code>hello world!</code></p>\\n<div class=\\"language-docker\\" data-ext=\\"docker\\" data-title=\\"docker\\"><pre class=\\"language-docker\\"><code>package main\\n\\nimport \\"fmt\\"\\n\\nfunc main(){\\n    fmt.Printf(\\"Hello World!\\");\\n}\\n\\n</code></pre></div>"}');export{u as comp,v as data};
