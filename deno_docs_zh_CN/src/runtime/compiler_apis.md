## 编译器 API

> 这是一个不稳定的 Deno 特性。
> 更多信息请查阅 [稳定性](stability.md)

Deno 支持对内置 TypeScript 编译器的运行时访问。`Deno` 命名空间中有三种方法提供此访问。

### `Deno.compile()`

这类似于 `deno cache`，因为它可以获取代码、缓存代码、编译代码，但不运行代码。它最多接受三个参数，`rootName`、可选的 `sources` 和可选的 `options`。

`rootName` 是用于生成目标程序的根模块。这类似于在 `deno run --reload example.ts` 中在命令行上传递的模块名。

`sources` 是一个哈希表，其中键是完全限定的模块名称，值是模块的文本源。如果传递了 `sources`，Deno 将从该哈希表中解析所有模块，而不会尝试在 Deno 之外解析它们。如果没有提供 `sources`，Deno 将解析模块，就像根模块已经在命令行上传递了一样。Deno 还将缓存所有的这些资源。所有已解析的资源都会被当成动态导入对待，导入行为是否需要读取和网络权限取决于目标在本地还是远程。

`options` 参数是一组 `Deno.CompilerOptions` 类型的选项，它是包含 Deno 支持选项的 TypeScript 编译器选项的子集。

该方法返回元组。第一个参数包含与代码相关的任何诊断信息（语法或类型错误）。第二个参数是一个映射，其中键是输出文件名，值是内容。

提供 `sources` 的一个例子:

```ts
const [diagnostics, emitMap] = await Deno.compile("/foo.ts", {
  "/foo.ts": `import * as bar from "./bar.ts";\nconsole.log(bar);\n`,
  "/bar.ts": `export const bar = "bar";\n`,
});

assert(diagnostics == null); // 确保没有返回诊断信息
console.log(emitMap);
```

我们希望 map 包含 4 个 “文件（files）” ，分别命名为 `/foo.js.map`，`/foo.js`，`/bar.js.map`，和 `/bar.js`。

当不提供资源时，您可以使用本地或远程模块，就像在命令行上做的那样。所以您可以这样做:

```ts
const [diagnostics, emitMap] = await Deno.compile(
  "https://deno.land/std@$STD_VERSION/examples/welcome.ts",
);
```

在这种情况下，`emitMap` 将包含一个 `console.log()` 语句。

### `Deno.bundle()`

这与 `deno bundle` 在命令行上的工作非常相似。 它也与 `Deno.compile()` 类似，只是它不返回文件映射，而是只返回一个字符串，这是一个自包含的 JavaScript ES 模块，它将包含提供或解析的所有代码，以及提供的根模块的所有导出。它最多接受三个参数，`rootName`、可选的 `sources` 和可选的 `options`。

`rootName` 是用于生成目标程序的根模块。这类似于在 `deno bundle example.ts` 中在命令行上传递的模块名。

`sources` 是一个哈希表，其中键是完全限定的模块名称，值是模块的文本源。如果传递了 `sources`，Deno 将从该哈希表中解析所有模块，而不会尝试在 Deno 之外解析它们。如果没有提供 `sources`，Deno 将解析模块，就像根模块已经在命令行上传递了一样。Deno 还将缓存所有的这些资源。所有已解析的资源都会被当成动态导入对待，导入行为是否需要读取和网络权限取决于目标在本地还是远程。

`options` 参数是一组 `Deno.CompilerOptions` 类型的选项，它是包含 Deno 支持选项的 TypeScript 编译器选项的子集。

提供 `sources` 的一个例子:

```ts
const [diagnostics, emit] = await Deno.bundle("/foo.ts", {
  "/foo.ts": `import * as bar from "./bar.ts";\nconsole.log(bar);\n`,
  "/bar.ts": `export const bar = "bar";\n`,
});

assert(diagnostics == null); // 确保没有返回诊断信息
console.log(emit);
```

我们希望 `emit` 是一个 ES 模块的文本，它将包含两个模块的输出源。

当不提供资源时，您可以使用本地或远程模块，就像在命令行上做的那样。所以您可以这样做:

```ts
const [diagnostics, emit] = await Deno.bundle(
  "https://deno.land/std@$STD_VERSION/http/server.ts",
);
```

在这种情况下，`emit` 将是一个自包含的 JavaScript ES 模块，并解析了所有依赖项，导出与源模块相同的导出。

### `Deno.transpileOnly()`

这是基于 TypeScript 函数 `transpileModule()` 的。所有这些操作都会“擦除”模块中的任何类型并释放 JavaScript。没有类型检查和依赖关系的解析。它最多接受两个参数，第一个参数是哈希表，其中键是模块名称，值是内容。模块名称的唯一用途是在将信息放入源映射时，显示源文件名称是什么。第二个参数包含 `Deno.CompilerOptions` 类型的可选 `options`。函数通过映射解析，其中键是提供的源模块名称，值是具有 `source` 属性和可选 `map` 属性的对象。第一个是模块的输出内容。 `map` 属性是源映射。源映射是默认提供的，但可以通过 `options` 参数关闭。

举个例子：

```ts
const result = await Deno.transpileOnly({
  "/foo.ts": `enum Foo { Foo, Bar, Baz };\n`,
});

console.log(result["/foo.ts"].source);
console.log(result["/foo.ts"].map);
```

我们期望 `enum` 被重写成一个构造可枚举的 IIFE，并且映射被定义。

### 引用 TypeScript 库文件

当您使用 `deno run` 或其他 TypeScript 类型的 Deno 命令时，该代码将根据描述 Deno 支持的环境的自定义库进行评估。默认情况下，TypeScript 类型的编译器运行时 API 也使用这些库（`Deno.compile()` 和 `Deno.bundle()`）。

但是，如果您希望为其他运行时编译或捆绑 TypeScript，则您可能希望重载默认库。为此，运行时 API 支持编译器选项中的 `lib` 属性。例如，如果你的 TypeScript 代码是为浏览器准备的，您可以使用 TypeScript 的 `"dom"` 库:

```ts
const [errors, emitted] = await Deno.compile(
  "main.ts",
  {
    "main.ts": `document.getElementById("foo");\n`,
  },
  {
    lib: ["dom", "esnext"],
  },
);
```

有关 TypeScript 支持的所有库的列表，请参见 [`lib` 编译器选项](https://www.typescriptlang.org/docs/handbook/compiler-options.html)。
**不要忘记包含 JavaScript 库**

就像 `tsc` 一样，当您提供一个 `lib` 编译器选项时，它会覆盖默认的选项，这意味着基本的 JavaScript 库不会被包含，而您应该包含最能代表您的目标运行时的选项（例如 `es5`，`es2015`，`es2016`，`es2017`，`es2018`，`es2019`，`es2020` 或 `esnext`）。

#### 包含 Deno 命名空间

除了 TypeScript 提供的库之外，还有四个内置在 Deno 中的库可以引用:

- `deno.ns` - 提供 `Deno` 命名空间
- `deno.shared_globals` - 提供 Deno 运行时支持的全局接口和变量，然后由最终运行时库公开
- `deno.window` - 公开全局变量和 Deno 主工作进程中可用的 Deno 命名空间，是运行时编译器的默认 API
- `deno.worker` - 公开在 Deno 下的工作进程中可用的全局变量。

因此，要将 Deno 命名空间添加到编译中，需要在数组中包含 `deno.ns` 库，例如：

```ts
const [errors, emitted] = await Deno.compile(
  "main.ts",
  {
    "main.ts": `document.getElementById("foo");\n`,
  },
  {
    lib: ["dom", "esnext", "deno.ns"],
  },
);
```

**注意**，Deno 命名空间需要一个 ES2018 或更新的运行时环境。这意味着，如果您使用的库“低于” ES2018，那么您将得到编译过程中输出的错误。

#### 使用三斜杠引用（triple-slash reference）

您不必在编译器选项中指定 `lib`。Deno 支持[对库的三斜杠引用](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-lib-)，并可以嵌入到文件的内容中。举个例子，如果你有一个 `main.ts`：

```ts
/// <reference lib="dom" />

document.getElementById("foo");
```

它可以编译，且不会出现下面这样的错误：

```ts
const [errors, emitted] = await Deno.compile("./main.ts", undefined, {
  lib: ["esnext"],
});
```

**注意**，`dom` 库与 Deno 的默认类型库中定义的一些默认全局变量有冲突。为了避免这种情况，需要在编译器选项中为运行时编译器 API 指定一个 `lib` 选项。
