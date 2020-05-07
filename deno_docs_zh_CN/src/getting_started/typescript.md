## 使用 TypeScript

<!-- TODO(lucacasonato): text on 'just import .ts' -->

### 使用外部类型定义

Deno 同时支持 JavaScript 和 TypeScript，它们是 Deno 的第一等语言。
这意味着它需要标准的模块名称，包括
扩展名（或提供正确媒体类型的服务器）。此外，Deno 还拥有“平凡”的模块解析算法。

开箱即用的 TypeScript 编译器依赖于两种无扩展名
模块和 Node.js 模块解析逻辑，以将类型应用于 JavaScript
模块。

为了弥合这种差距，Deno 支持三种引用类型定义文件的方法，而不必求助于“魔法”的模块解析。

#### 编译提示

如果您要导入 JavaScript 模块，并且知道该模块的类型定义在哪里，您可以在导入时指定类型定义。这采用编译器提示的形式。编译提示告诉 Deno `.d.ts` 文件的位置和与之相关的导入的 JavaScript 代码。编译提示指令是 `@deno-types`，当指定时，该值将在编译器中使用，而不是 JavaScript 模块。

例如，如果您有 `foo.js`，但您知道旁边的 `foo.d.ts` 是该模块的类型定义，代码将像这样：

```ts
// @deno-types="./foo.d.ts"
import * as foo from "./foo.js";
```

该值遵循与导入模块相同的解析逻辑，这意味着它需要具有扩展名，并且是相对于当前模块的。远程模块也可以使用该说明符。

此编译提示影响下一个 `import` 语句，或是 `export ... from` 语句，在编译时，该值将替换模块。像上面的示例一样，Deno 编译器将加载 `./foo.d.ts`，而不是 `./foo.js`。Deno 在运行时仍然会加载 `./foo.js`。

#### JavaScript 文件中的三斜线引用指令

如果您要发布由 Deno 使用的模块，并且想要告诉 Deno 类型定义的位置，您可以使用实际代码中的三斜杠指令。

例如，如果您有一个 JavaScript 模块，想为 Deno 提供类型定义的位置，您的 `foo.js` 可能看起来像这样：

```js
/// <reference types="./foo.d.ts" />
export const foo = "foo";
```

Deno会看到这一点，并且在检查类型时，编译器将使用 `foo.d.ts` 文件，尽管 `foo.js` 将在运行时加载。

该值遵循与导入模块相同的解析逻辑，这意味着它需要具有扩展名，并且是相对于当前模块的。远程模块也可以使用该说明符。

#### X-TypeScript-Types 自定义 Header

如果您要发布由 Deno 使用的模块，并且想要告诉 Deno 类型定义的位置，您可以使用自定义 HTTP 头 `X-TypeScript-Types`，来告诉 Deno 文件位置。

标头的工作方式与上述三斜杠参考相同，这只是意味着 JavaScript 文件本身的内容不需要修改后，并且类型定义的位置可以通过服务器本身确定。

**不是所有类型定义都受支持**

Deno 将使用编译提示来加载指示的 `.d.ts` 文件，但有些 `.d.ts` 文件包含不受支持的功能。具体来说，有些 `.d.ts` 文件期望能够从其他包中加载或引用类型定义，它们使用模块解析逻辑。

例如，一个包含 `node` 的类型引用指令，希望解析为像 `./node_modules/@types/node/index.d.ts` 的某些路径。由于这取决于非相对性的模块解析算法，Deno 无法处理这种情况。

**为什么不在 TypeScript 文件中使用三斜杠类型引用？**

TypeScript 编译器支持三斜杠指令，包括类型
参考指令。如果 Deno 使用此功能，则会干扰
TypeScript 编译器。Deno仅在 JavaScript （包括 JSX）文件中查找指令。

### 自定义 TypeScript 编译器选项

在Deno生态系统中，所有严格标志都被默认启用，以符合 TypeScript 的理想状态。然而，Deno 支持自定义配置文件 (例如 `tsconfig.json`)。

您需要通过显式设置 `-c` 选项，来明确告诉 Deno 在哪里寻找此配置。

```bash
deno run -c tsconfig.json mod.ts
```

以下是 Deno 当前允许的设置及其默认值：

```json
{
  "compilerOptions": {
    "allowJs": false,
    "allowUmdGlobalAccess": false,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "alwaysStrict": true,
    "assumeChangesOnlyAffectDirectDependencies": false,
    "checkJs": false,
    "disableSizeLimit": false,
    "generateCpuProfile": "profile.cpuprofile",
    "jsx": "react",
    "jsxFactory": "React.createElement",
    "lib": [],
    "noFallthroughCasesInSwitch": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitUseStrict": false,
    "noStrictGenericChecks": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveConstEnums": false,
    "removeComments": false,
    "resolveJsonModule": true,
    "strict": true,
    "strictBindCallApply": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "suppressExcessPropertyErrors": false,
    "suppressImplicitAnyIndexErrors": false,
    "useDefineForClassFields": false
  }
}
```

有关上述选项和用例的文档，请访问 [typescript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html).


**注意**：Deno 不支持以上未列出的或在 TypeScript 文档中列为已弃用/实验性的任何选项。
