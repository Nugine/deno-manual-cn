## Linter

Deno 附带了 JavaScript 和 TypeScript 的内置 linter。

**注意：linter 是一个新功能，仍然不稳定，因此需要 `--unstable` 选项**

```shell
# 检查当前目录树内所有 JS/TS 文件
deno lint --unstable
# 检查特定文件
deno lint --unstable myfile1.ts myfile2.ts
```

### 可用规则

- `ban-ts-comment`
- `ban-untagged-ignore`
- `constructor-super`
- `for-direction`
- `getter-return`
- `no-array-constructor`
- `no-async-promise-executor`
- `no-case-declarations`
- `no-class-assign`
- `no-compare-neg-zero`
- `no-cond-assign`
- `no-debugger`
- `no-delete-var`
- `no-dupe-args`
- `no-dupe-keys`
- `no-duplicate-case`
- `no-empty-character-class`
- `no-empty-interface`
- `no-empty-pattern`
- `no-empty`
- `no-ex-assign`
- `no-explicit-any`
- `no-func-assign`
- `no-misused-new`
- `no-namespace`
- `no-new-symbol`
- `no-obj-call`
- `no-octal`
- `no-prototype-builtins`
- `no-regex-spaces`
- `no-setter-return`
- `no-this-alias`
- `no-this-before-super`
- `no-unsafe-finally`
- `no-unsafe-negation`
- `no-with`
- `prefer-as-const`
- `prefer-namespace-keyword`
- `require-yield`
- `triple-slash-reference`
- `use-isnan`
- `valid-typeof`

### 忽略指令

#### 文件

要忽略整个文件，`// deno-lint-ignore-file` 指令应该置于文件顶部。

```ts
// deno-lint-ignore-file

function foo(): any {
  // ...
}
```

必须在第一个语句或声明之前放置忽略指令：

```ts
// Copyright 2020 the Deno authors. All rights reserved. MIT license.

/**
 * Some JS doc
 **/

// deno-lint-ignore-file

import { bar } from "./bar.js";

function foo(): any {
  // ...
}
```

#### 诊断 (Diagnostics)

要忽略某些诊断，`// deno-lint-ignore <codes ...>` 指令应该置于违规行之前。必须指定要忽略的规则名称。

```ts
// deno-lint-ignore no-explicit-any
function foo(): any {
  // ...
}

// deno-lint-ignore no-explicit-any explicit-function-return-type
function bar(a: any) {
  // ...
}
```

为了与 ESLint 兼容，`deno lint` 也支持 `// eslint-ignore-next-line` 指令。像 `// deno-lint-ignore` 一样，这也需要指定忽略的规则名称。

```ts
// eslint-ignore-next-line no-empty
while (true) {}

// eslint-ignore-next-line @typescript-eslint/no-explicit-any
function bar(a: any) {
  // ...
}
```
