
> [!note]
> 本章是 `TypeScript` 类型系统的总体介绍
> `TypeScript` 继承了 `JavaScript` 的类型，在这个基础上，定义了一套自己的类型系统。

- 1.[基本类型](#basic)
   - 1.1 [概述](#union)
   - 1.2 [boolean 类型](#boolean)
   - 1.3 [string 类型](#string)
   - 1.4 [number 类型](#number)
   - 1.5 [bigint 类型](#bigint)
   - 1.6 [symbol 类型](#symbol)
   - 1.7 [object 类型](#object)
   - 1.8 [undefined 类型，null 类型](#not-defined)
- 2.[包装对象 类型](#wrap)
   - 2.1 [包装对象的概念](#wrap-1)
   - 2.2 [包装对象类型与字面量类型](#warp-2)
- 3.[Object 类型与 object 类型](#obj)
   - 3.1 [Object 类型](#obj-1)
   - 3.2 [object 类型](#obj-2)      
- 4.[undefined 和 null 的特殊性](#special)
- 5.[值类型](#tuple)
- 6.[联合类型](#union)
- 7.[交叉类型](#guard)
- 8.[type 命令](#type)
- 9.[typeof 运算符](#typeof)
- 10.[块级类型声明](#block)
- 11.[类型的兼容](#compatibility)

### 基本类型<a id="basic"></a>

#### 概述<a id="union"></a>

`JavaScript` 语言（注意，不是 `TypeScript`）将值分成8种类型。

- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null

`TypeScript` 继承了 `JavaScript` 的类型设计，以上8种类型可以看作 `TypeScript` 的基本类型。

> [!warning]
> 上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等在 `JavaScript` 语言中都是内置对象，而不是类型名称。<br/>
> 另外，`undefined` 和 `null` 既可以作为值，也可以作为类型，取决于在哪里使用它们。

这8种基本类型是 `TypeScript` 类型系统的基础，复杂类型由它们组合而成。

以下是它们的简单介绍。

#### boolean 类型<a id="boolean"></a>

`boolean` 类型只包含 `true` 或 `false` 两个布尔值。

```typescript
const x:boolean = true;
const y:boolean = false;
```
#### string 类型<a id="string"></a>

`string` 类型包含所有 `JavaScript` 字符串。

```typescript
const x:string = 'hello';
const y:string = `${x} world`;
```

上面示例中，普通字符串和模板字符串都属于 `string` 类型。

#### number 类型<a id="number"></a>

`number` 类型包含整数和浮点数。

```typescript
const x:number = 1;
const y:number = 1.1435926;
const z:number = 0xffff;
```

上面示例中，整数、浮点数和非十进制数都属于 `number` 类型。

#### bigint 类型<a id="bigint"></a>

`bigint` 类型包含所有的大整数。

```typescript
const x:bigint = 123n;
const y:bigint = 0x12345678901234567890n;
```

上面示例中，都属于 `bigint` 类型。

> [!warning]
> `bigint` 类型是 `TypeScript` 4.0 版本新增的类型，目前 `TypeScript` 4.0 是 `TypeScript` 最新的稳定版本。<br/>
> `bigint` 与 `number` 类型不兼容。<br/>
> `bigint` 类型是 `ES2020` 标准引入的。如果使用这个类型，`TypyScript` 编译的目标 `JavaScript` 版本不能低于 `ES2020` (既编译参数 `target` 不低于 `es2020`)

```typescript
const x:bigint = 123; // 报错
const y:bigint = 123.123; // 报错
```

上面示例中，`bigint` 类型赋值为整数和小数，都会报错。

#### symbol 类型<a id="symbol"></a>

`symbol` 类型包含所有 `Symbol` 值。

```typescript
const x:symbol = Symbol();
```

上面示例中，`Symbol()` 函数的返回值就是 `symbol` 类型。

#### object 类型<a id="object"></a>

根据 `JavaScript` 的设计，`object` 类型包含了所有对象、数组和函数。

```typescript
const x:object = { foo: 123 };
const y:object = [1, 2, 3];
const z:object = (n:number) => n + 1;
```

上面示例中，对象、数组、函数都属于 `object` 类型。

#### undefined 类型，null类型<a id="undefined"></a>

`undefined` 类型只包含一个值 `undefined`，表示未定义（既还未给出定义，以后可能会有定义）。

```typescript
let x:undefined = undefined;
```

上面示例中，变量 `x` 就属于 `undefined` 类型。两个 `undefined` 里面，第一个是类型，第二个是值。

`null` 类型只包含一个值 `null`，表示空值（既此处没有值）。

```typescript
const x:null = null;
```

上面示例中，变量 `x` 就属于 `null` 类型。

> [!warning]
> 如果没有声明类型的变量，被赋值为 `undefied` 或 `null`，在关闭编译设置 `noImplicitAny` 和 `strictNullChecks` 时，它们的类型会被推断为 `any`。

```typescript
// 关闭编译设置 noImplicitAny 和 strictNullChecks

let a = undefined; // any
const b = null; // any

let c = null; // any 
const d = undefined; // any
```

如果希望避免这种情况，则需要打开编译选项 `strictNullChecks`。

```typescript
// 打开编译设置 strictNullChecks

let a = undefined; // undefined
const b = undefined; // undefined

let c = null; // null
const d = null // null
```

上面示例中，代开编译设置 `strictNullChecks` 后，未声明类型的变量，被赋值为 `undefied` 或 `null`，它们的类型会推断为 `undefined` 或 `null`。

### 包装对象类型<a id="wrap"></a>

#### 包装对象的概念<a id="wrap-1"></a>


### Object 类型与 object 类型<a id="obj"></a>

`TypeScript` 的对象类型也有大写 `Object` 和 小写 `object` 两种。

大写的 `Object` 类型代表 `javascript` 语言里面的广义对象。所有可以转成对象的值，都是 `Object` 类型，这囊括了几乎所有的值。

```typescript
let obj:Object;

obj = true;
obj = 'hi';
obj = 123;
obj = { foo: 23 };
obj = [1, 2, 3];
obj = (n:number) => n + 1;
```

上面示例中，原始类型值、对象、数组、函数都是合发的 `Object` 类型。

事实上，除了 `undefined` 和 `null` 这两个值不能转为对象，其他任何值都可以赋值给 `Object` 类型。





