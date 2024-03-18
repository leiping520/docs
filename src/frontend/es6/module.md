- 1.[概述](#概述)
- 2.[严格模式](#严格模式)
- 3.[export 命令](#export)
- 4.[import 命令](#import)
- 5.[模块的整体加载](#模块的整体加载)
- 6.[export default 命令](#export-default)
- 7.[export 与 import 的复合写法](#export-import)
- 8.[模块的继承](#模块的继承)
- 9.[跨模块常量](#跨模块常量)
- 10.[import()](#import-1)
    - 10.1 [简介](#简介)
    - 10.2 [适合场合](#适合场合)
    - 10.3 [注意点](#注意点)
- 11.[import.meta](#import-meta)

### 概述<a id="概述"></a>

### 严格模式<a id="严格模式"></a>

### 模块的整体加载<a id="模块的整体加载"></a>

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

下面是一个 `circle.js` 文件，它输出两个方法 `area` 和 `circumference`。

```js
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

现在，加载这个模块。

```js
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面写法是逐一指定要加载的方法，整体加载的写法如下。

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意，模块整体加载所在的那个对象（上例是 `circle`），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

```js
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

### export default 命令<a id="export-default"></a>

从前面的例子可以看出，使用 `import` 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 `export default` 命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

上面代码是一个模块文件 `export-default.js`，它的默认输出是一个函数。

其他模块加载该模块时，`import` 命令可以为该匿名函数指定任意名字。

```js
// import-default.js

import customName from './export-default';
customName(); // 'foo'
```

上面代码的 `import` 命令，可以用任意名称指向 `export-default.js` 输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时 `import` 命令后面，不使用大括号。

`export default` 命令用在非匿名函数前，也是可以的。

```js
// export-default.js

export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

上面代码中，`foo` 函数的函数名 `foo`，在模块外部是无效的。加载的时候，视同匿名函数加载。

下面比较一下默认输出和正常输出。

```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```






