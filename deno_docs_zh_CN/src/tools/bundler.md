## 打包

`deno bundle [URL]` 将输出一个单独的 JavaScript 文件，其中包含了它的所有依赖。

示例：

```
> deno bundle https://deno.land/std@$STD_VERSION/examples/colors.ts colors.bundle.js
Bundling "colors.bundle.js"
Emitting bundle to "colors.bundle.js"
9.2 kB emitted.
```

如果您忽略了输出文件参数，打包文件将输出到 stdout。

这个打包文件能够像其他任何模块一样在 Deno 中运行。

```
deno run colors.bundle.js
```

打包文件是一个自包含 (self contained) 的 ES 模块，其中的任何导出仍然可用。

举个例子，如果主模块是这样的：

```ts
export { foo } from "./foo.js";

export const bar = "bar";
```

它可以像这样被导入：

```ts
import { foo, bar } from "./lib.bundle.js";
```

打包文件也可以在浏览器中被加载，它是一个自包含的 ES 模块，因此 `type` 属性 (attribute) 必须设置为 `"module"`。

示例：

```html
<script type="module" src="website.bundle.js"></script>
```

除了直接加载，它也可以从其他模块导入。

```html
<script type="module">
  import * as website from "website.bundle.js";
</script>
```
