# 标准库

Deno 提供一组标准模块，它们经过核心团队审计，保证能在 Deno 上工作。

标准库地址：<https://deno.land/std@$STD_VERSION/>

## 版本和稳定性

标准库尚不稳定，因此采用与 Deno 不同的版本号。每次 Deno 发布时，标准库也会一起发布。

最新的发布请查阅 <https://deno.land/std@$STD_VERSION/> 或 <https://deno.land/std@$STD_VERSION/version.ts>。

我们强烈建议：始终使用确定版本的标准库，以避免意外的改动。

例如，连接到随时可能更改的主分支时可能会导致编译错误或意外行为：

```typescript
// 从 master 导入，这应当避免
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";
```

更好的选择是使用不可变且不会更改的 std 库版本：

```typescript
// 从不可变的 std v0.50.0 导入
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";
```

## 排错 (Troubleshooting)

标准库中的一些模块使用了不稳定的 Deno API。

不用 `--unstable` 命令行选项运行这些模块会产生一些 TypeScript 错误，表示 `Deno` 命名空间中不存在一些 API：

```typescript
// main.ts
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";

copy("log.txt", "log-old.txt");
```

```shell
$ deno run --allow-read --allow-write main.ts
Compile file:///dev/deno/main.ts
Download https://deno.land/std@$STD_VERSION/fs/copy.ts
Download https://deno.land/std@$STD_VERSION/fs/ensure_dir.ts
Download https://deno.land/std@$STD_VERSION/fs/_util.ts
error: TS2339 [ERROR]: Property 'utime' does not exist on type 'typeof Deno'.
    await Deno.utime(dest, statInfo.atime, statInfo.mtime);
               ~~~~~
    at https://deno.land/std@$STD_VERSION/fs/copy.ts:90:16

TS2339 [ERROR]: Property 'utimeSync' does not exist on type 'typeof Deno'.
    Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
         ~~~~~~~~~
    at https://deno.land/std@$STD_VERSION/fs/copy.ts:101:10
```

解决方法是加上 `--unstable` 选项：

```shell
deno run --allow-read --allow-write --unstable main.ts
```

要确定哪些 API 是不稳定的，请查阅类型声明 [lib.deno.unstable.d.ts](https://github.com/denoland/deno/blob/master/cli/dts/lib.deno.unstable.d.ts)

这个问题会在不远的将来解决。如果您依赖的特定模块在没有该选项的情况下成功编译，则可以忽略该选项。
