## 完整性检查与锁定文件

### 介绍

假设您的模块依赖于远程模块 `https://some.url/a.ts`。当第一次编译您的模块时，`a.ts` 被下载、编译、缓存。它将保持这样，直到您在一个新的机器上运行您的模块（生产环境？）或是重新加载缓存（例如通过 `deno cache --reload`）。但当 `https://some.url/a.ts` 的内容变化时会发生什么？这将导致您的生产模块使用了和本地模块不同的依赖。Deno 的解决方法是使用完整性检查与锁定文件。

### 缓存与锁定文件

Deno 可以使用一个较小的 JSON 文件存储和检查模块的子资源完整性。

使用 `--lock=lock.json` 启用和指定锁文件检查。

要更新或创建锁，可以使用 `--lock=lock.json --lock-write`。`--lock=lock.json` 告诉 Deno 要使用哪个锁文件，`--lock-write` 用来向锁文件输出依赖的哈希值。 （`--lock-write` 必须和 `--lock` 一起使用）

一个锁文件可能看起来像这样，针对依赖项存储文件的哈希值：

```json
{
  "https://deno.land/std@v0.50.0/textproto/mod.ts": "3118d7a42c03c242c5a49c2ad91c8396110e14acca1324e7aaefd31a999b71a4",
  "https://deno.land/std@v0.50.0/io/util.ts": "ae133d310a0fdcf298cea7bc09a599c49acb616d34e148e263bcb02976f80dee",
  "https://deno.land/std@v0.50.0/async/delay.ts": "35957d585a6e3dd87706858fb1d6b551cb278271b03f52c5a2cb70e65e00c26a",
   ...
}
```

一个典型的工作流看起来像这样：

```ts
// 向 "src/deps.ts" 添加一个新的依赖，在别处使用。
export { xyz } from "https://unpkg.com/xyz-lib@v0.9.0/lib.ts";
```

```shell
# 创建或更新锁文件 "lock.json"
deno cache --lock=lock.json --lock-write src/deps.ts

# 在提交时包含这一变化
git add -u lock.json
git commit -m "feat: Add support for xyz using xyz-lib"
git push
```

另一台机器上的合作者刚刚把项目克隆下来：

```shell
# 下载、缓存并检查项目的依赖
deno cache -r --lock=lock.json src/deps.ts

# 在这完成之后，您可以安心开发了
deno test --allow-read src
```

### 运行时验证

像上面的缓存一样，您也可以在使用 `deno run` 子命令时配合`--lock=lock.json` 选项，从而在运行期间验证所有被锁定的模块的完整性。请记住，这只会针对先前添加到 `lock.json` 文件中的依赖项进行验证。新的依赖项将被缓存，但不会被检验。

您也可以通过使用 `--cached-only` 选项来要求远程依赖都已经被缓存。

```shell
deno run --lock=lock.json --cached-only mod.ts
```

如果依赖树中有尚未缓存的 mod.ts 依赖项，此操作将失败。

<!-- TODO - Add detail on dynamic imports -->
