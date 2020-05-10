## 代码格式化

Deno 有着内置的格式化工具，能够格式化 TypeScript 和 JavaScript 代码。

```shell
# 格式化当前目录和子目录下的所有 JS/TS 文件
deno fmt
# 格式化特定的文件
deno fmt myfile1.ts myfile2.ts
# 检查当前目录和子目录下的所有 JS/TS 文件是否都已被格式化
deno fmt --check
# 将标准输入流格式化并写入标准输出流
cat file.ts | deno fmt -
```

通过加上一句 `// deno-fmt-ignore` 注释来忽略格式化。

<!-- prettier-ignore-start -->

```ts
// deno-fmt-ignore
export const identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
];
```

<!-- prettier-ignore-end -->

在文件头部加上一句 `// deno-fmt-ignore-file` 注释可以忽略整个文件。
