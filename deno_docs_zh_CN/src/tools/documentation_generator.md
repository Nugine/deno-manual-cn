## 文档生成器

`deno doc` 将处理一个或一组源文件，为每个模块的**导出**成员打印出 JSDoc 文档。

目前只支持两种导出声明：

+ `export <declaration>`
+ `export ... from ...`

例如，对于这样的一个文件 `add.ts`：

```ts
/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */
export function add(x: number, y: number): number {
  return x + y;
}
```

运行 Deno `doc` 命令，把该函数的 JSDoc 注释打印到 `stdout`：

```shell
deno doc add.ts
function add(x: number, y: number): number
  Adds x and y. @param {number} x @param {number} y @returns {number} Sum of x and y
```

使用 `--json` 选项，用 JSON 格式输出文档。该格式在 [deno doc website](https://github.com/denoland/doc_website) 使用，用以生成模块文档。
