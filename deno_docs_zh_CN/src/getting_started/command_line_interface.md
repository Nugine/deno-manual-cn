## 命令行界面

Deno 是一个命令行程序。到目前为止，看过这些示例后，您应该熟悉了一些简单的命令，并且已经了解了 shell 的基本用法。

这是查看主要帮助文档的几种方法：

```shell
# 使用子命令
deno help

# 使用短选项 —— 输出和上面一样
deno -h

# 使用长选项 —— 输出更加详细
deno --help
```

Deno 的 CLI 是基于子命令的。上面的帮助命令应该显示了一个子命令列表，例如 `deno bundle`。

要查看特定于子命令的帮助，您可以参考以下示例：

```shell
deno help bundle
deno bundle -h
deno bundle --help
```

各个子命令的详细指南在 [这里](../tools.md)。

### 脚本来源

Deno 可以从多个来源获取脚本，一个文件名，一个 URL，或者是 "-"，表示从标准输入读取。后者在与其他应用集成时很有用。

```shell
deno run main.ts
deno run https://mydomain.com/main.ts
cat main.ts | deno run -
```

### 脚本参数

通过在脚本名称后指定参数，您可以将用户空间参数传递给要运行的脚本，这些参数与 Deno 运行时选项区分开。

```shell
deno run main.ts a b -c --quiet
```

```ts
// main.ts
console.log(Deno.args); // [ "a", "b", "-c", "--quiet" ]
```

**请注意，在脚本名称之后传递的所有内容都将作为脚本参数传递，而不会用作 Deno 运行时选项。**

这将导致以下陷阱：

```shell
# 正常情况：我们给 net_client.ts 授予网络权限。
deno run --allow-net net_client.ts

# 错误情况：--allow-net 传递为 Deno.args，引发网络权限错误。
deno run net_client.ts --allow-net
```

有人认为这打破了常规：

> 一个非位置选项的解析方式会根据位置变化。

然而：

1. 这是区分运行时选项和脚本参数的最合乎逻辑的方法。
2. 这是区分运行时选项和脚本参数的最符合人体工程学的方法。
3. 实际上，这和其他流行的运行时具有相同的行为。
    - 试试 `node -c index.js` 和 `node index.js -c`，第一个只会根据 `-c` 选项对 `index.js` 做语法检查，而第二个会 _执行_ `index.js`，将 `-c` 传递为 `require("process").argv`。

---

下面是在相关的子命令之间共享的逻辑选项组。

### 完整性选项

影响可以将资源下载到缓存的命令：`deno cache`，`deno run` 和 `deno test`.

```
--lock <FILE>    检查指定的锁文件
--lock-write     写入锁文件，和 --lock 一起使用
```

更多信息在 [这里](../linking_to_external_code/integrity_checking.md)。

### 缓存和编译选项

影响可以增加缓存的命令：`deno cache`，`deno run` 和 `deno test`. 

以及影响模块解析、编译配置等的选项。

```
--config <FILE>               加载 tsconfig.json 配置文件
--importmap <FILE>            不稳定的: 加载导入映射文件
--no-remote                   不要解析远程模块
--reload=<CACHE_BLOCKLIST>    重新加载源代码缓存（重新编译 TypeScript）
--unstable                    启用不稳定 API
```

### 运行时选项

影响可以运行用户代码的命令：`deno run` 和 `deno test`.

#### 权限选项

[这里](./permissions.md#权限列表) 列出了所有权限选项。

#### 其他运行时选项

影响运行时环境的更多选项：

```
--cached-only                要求远程依赖已经被缓存
--inspect=<HOST:PORT>        在 host:port 启动检查器
--inspect-brk=<HOST:PORT>    在 host:port 启动检查器并且暂停执行
--seed <NUMBER>              指定 Math.random() 的随机种子
--v8-flags=<v8-flags>        设置 V8 命令行选项
```
