## 稳定性

从 Deno 1.0.0 开始，`Deno` 命名空间内的 API 是稳定的。这意味着我们将尽力使 1.0.0 下的代码在未来的 Deno 版本上继续运行。

但是在现阶段，并非所有的 Deno 功能都可以应用于生产环境。仍处于起草阶段的、还未准备完善的功能被锁定在 `--unstable` 命令行选项后。

```shell
deno run --unstable mod_which_uses_unstable_stuff.ts
```

传递这个选项可以有如下效果：

- 它将允许在运行时使用不稳定的 API。
- 它将 [`lib.deno.unstable.d.ts`](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/dts/lib.deno.unstable.d.ts) 文件添加到用于类型检查的类型脚本定义列表中。这包括 `deno types` 的输出。

请注意，不稳定的 API 可能**没有经过安全检查**，将来可能有**破坏性改动**，并且**还没有准备投入生产**。

### 标准模块

Deno 的 [标准模块](https://deno.land/std/) 尚不稳定。为了体现这点，我们用与 CLI 不同的版本号标记标准模块。和 `Deno` 命名空间不同，使用标准模块不需要 `--unstable` 选项（除非该模块使用了不稳定的 Deno 功能）。

