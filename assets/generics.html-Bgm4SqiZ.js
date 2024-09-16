import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as t,c as o,a as n,b as p,d as i,e as l}from"./app--W1IOfvN.js";const r={},c={href:"https://kotlinlang.org/docs/generics.html",target:"_blank",rel:"noopener noreferrer"},E=l(`<ul><li>1.<a href="#%E7%AE%80%E4%BB%8B">简介</a></li><li>2.<a href="#%E6%B3%9B%E5%9E%8B%E7%9A%84%E5%86%99%E6%B3%95">泛型的写法</a><ul><li>2.1 <a href="#%E5%87%BD%E6%95%B0%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95">函数的泛型写法</a></li><li>2.2 <a href="#%E6%8E%A5%E5%8F%A3%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95">接口的泛型写法</a></li><li>2.3 <a href="#%E7%B1%BB%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95">类的泛型写法</a></li><li>2.4 <a href="#%E7%B1%BB%E5%9E%8B%E5%88%AB%E5%90%8D%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95">类型别名的泛型写法</a></li></ul></li><li>3.<a href="#%E7%B1%BB%E5%9E%8B%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC">类型参数的默认值</a></li><li>4.<a href="#%E6%95%B0%E7%BB%84%E7%9A%84%E6%B3%9B%E5%9E%8B%E8%A1%A8%E7%A4%BA">数组的泛型表示</a></li><li>5.<a href="#%E7%B1%BB%E5%9E%8B%E5%8F%82%E6%95%B0%E7%9A%84%E7%BA%A6%E6%9D%9F%E6%9D%A1%E4%BB%B6">类型参数的约束条件</a></li><li>6.<a href="#%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E7%82%B9">使用注意点</a></li></ul><h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介<a id="简介"></a></span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>泛型是一种类型参数化，参数化类型，参数化类型就是把类型参数化，也就是把类型变量化，这样就可以定义出适用于任意类型参数的类型。</p></div><h3 id="泛型的写法" tabindex="-1"><a class="header-anchor" href="#泛型的写法"><span>泛型的写法<a id="泛型的写法"></a></span></a></h3><p>泛型主要用在四个场合：<strong>函数</strong>，<strong>接口</strong>，<strong>类</strong>和<strong>别名</strong>。</p><h4 id="函数的泛型写法" tabindex="-1"><a class="header-anchor" href="#函数的泛型写法"><span>函数的泛型写法<a id="函数的泛型写法"></a></span></a></h4><p>上一节提到，<code>function</code> 关键字定义的泛型函数，类型参数放在 <code>&lt;&gt;</code> 中，写在函数名后面。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">add</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>n<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么对于变量形式定义的函数，泛型有下面两种写法。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">// 写法一</span>

<span class="token keyword">let</span> add<span class="token operator">:</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>n<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span> <span class="token operator">=</span> id<span class="token punctuation">;</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">let</span> add<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>n<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">}</span> <span class="token operator">=</span> id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function B(d,u){const a=s("ExternalLinkIcon");return t(),o("div",null,[n("blockquote",null,[n("p",null,[n("a",c,[p("Generics"),i(a)])])]),E])}const m=e(r,[["render",B],["__file","generics.html.vue"]]),g=JSON.parse('{"path":"/frontend/typescript/generics.html","title":"","lang":"en-US","frontmatter":{"description":"Generics 1.简介 2.泛型的写法 2.1 函数的泛型写法 2.2 接口的泛型写法 2.3 类的泛型写法 2.4 类型别名的泛型写法 3.类型参数的默认值 4.数组的泛型表示 5.类型参数的约束条件 6.使用注意点 简介 Tips 泛型是一种类型参数化，参数化类型，参数化类型就是把类型参数化，也就是把类型变量化，这样就可以定义出适用于任意类型参...","head":[["meta",{"property":"og:url","content":"https://leiping520.github.io/docs/frontend/typescript/generics.html"}],["meta",{"property":"og:description","content":"Generics 1.简介 2.泛型的写法 2.1 函数的泛型写法 2.2 接口的泛型写法 2.3 类的泛型写法 2.4 类型别名的泛型写法 3.类型参数的默认值 4.数组的泛型表示 5.类型参数的约束条件 6.使用注意点 简介 Tips 泛型是一种类型参数化，参数化类型，参数化类型就是把类型参数化，也就是把类型变量化，这样就可以定义出适用于任意类型参..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-15T09:32:04.000Z"}],["meta",{"property":"article:author","content":"George"}],["meta",{"property":"article:modified_time","content":"2024-03-15T09:32:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-15T09:32:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"George\\",\\"url\\":\\"https://leiping520.github.io/docs/\\"}]}"]]},"headers":[{"level":3,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":3,"title":"泛型的写法","slug":"泛型的写法","link":"#泛型的写法","children":[]}],"git":{"createdTime":1710495124000,"updatedTime":1710495124000,"contributors":[{"name":"George","email":"leiping@yunxianginvest.com","commits":1}]},"readingTime":{"minutes":1.13,"words":340},"filePathRelative":"frontend/typescript/generics.md","localizedDate":"March 15, 2024","excerpt":"<blockquote>\\n<p><a href=\\"https://kotlinlang.org/docs/generics.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Generics</a></p>\\n</blockquote>\\n<ul>\\n<li>1.<a href=\\"#%E7%AE%80%E4%BB%8B\\">简介</a></li>\\n<li>2.<a href=\\"#%E6%B3%9B%E5%9E%8B%E7%9A%84%E5%86%99%E6%B3%95\\">泛型的写法</a>\\n<ul>\\n<li>2.1 <a href=\\"#%E5%87%BD%E6%95%B0%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95\\">函数的泛型写法</a></li>\\n<li>2.2 <a href=\\"#%E6%8E%A5%E5%8F%A3%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95\\">接口的泛型写法</a></li>\\n<li>2.3 <a href=\\"#%E7%B1%BB%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95\\">类的泛型写法</a></li>\\n<li>2.4 <a href=\\"#%E7%B1%BB%E5%9E%8B%E5%88%AB%E5%90%8D%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%86%99%E6%B3%95\\">类型别名的泛型写法</a></li>\\n</ul>\\n</li>\\n<li>3.<a href=\\"#%E7%B1%BB%E5%9E%8B%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC\\">类型参数的默认值</a></li>\\n<li>4.<a href=\\"#%E6%95%B0%E7%BB%84%E7%9A%84%E6%B3%9B%E5%9E%8B%E8%A1%A8%E7%A4%BA\\">数组的泛型表示</a></li>\\n<li>5.<a href=\\"#%E7%B1%BB%E5%9E%8B%E5%8F%82%E6%95%B0%E7%9A%84%E7%BA%A6%E6%9D%9F%E6%9D%A1%E4%BB%B6\\">类型参数的约束条件</a></li>\\n<li>6.<a href=\\"#%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E7%82%B9\\">使用注意点</a></li>\\n</ul>","autoDesc":true}');export{m as comp,g as data};
