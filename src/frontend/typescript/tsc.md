
- 1.[简介](#简介)
- 2.[命令行参数](#命令行参数)
   
### 简介<a id="简介"></a>

`tsc` 是 `TypeScript` 官方的命令行编译器，用来检查代码，并将其编译成 `JavaScript` 代码。

`tsc` 默认使用当前目录下的配置文件 `tsconfig.json`，但也可以接受独立的命令行参数。命令行参数会覆盖 `tsconfig.json`，比如命令行指定了所要编译的文件，那么 `tsc` 就会忽略 `tsconfig.json` 的 `files` 属性。

`tsc` 的基本用法如下。

```bash
# 使用 tsconfig.json 的配置
$ tsc

# 只编译 index.ts
$ tsc index.ts

# 编译 src 目录的所有 .ts 文件
$ tsc src/*.ts

# 指定编译配置文件
$ tsc --project tsconfig.production.json

# 只生成类型声明文件，不编译出 js 文件
$ tsc indx.js --declaration --emitDeclarationOnly

# 多个 ts 文件编译成单个 js 文件
$ tsc app.ts util.ts --target esnext --outfile app.js
```

### 命令行参数<a id="命令行参数"></a>

`tsc` 的命令行参数，大部分与 `tsconfig.json` 的属性一一对应。

下面只是按照首字母排序，简单罗列出主要的一些参数，详细解释可以参考《tsconfig.json 配置文件》一章。
