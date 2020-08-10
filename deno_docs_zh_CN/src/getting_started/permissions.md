## 权限

默认情况下，Deno是安全的。因此 Deno 模块没有文件、网络或环境的访问权限，除非您为它授权。在命令行参数中为 deno 进程授权后才能访问安全敏感的功能。

在以下示例中，`mod.ts` 只被授予文件系统的只读权限。它无法对其进行写入，或执行任何其他对安全性敏感的操作。

```shell
deno run --allow-read mod.ts
```

### 权限列表

以下权限是可用的：

- **-A, --allow-all** 允许所有权限，这将禁用所有安全限制。
- **--allow-env** 允许环境访问，例如读取和设置环境变量。
- **--allow-hrtime** 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用。
- **--allow-net=\<allow-net\>** 允许网络访问。您可以指定一系列用逗号分隔的域名，来提供域名白名单。
- **--allow-plugin** 允许加载插件。请注意：这是一个不稳定功能。
- **--allow-read=\<allow-read\>** 允许读取文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。
- **--allow-run** 允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用。
- **--allow-write=\<allow-write\>** 允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。

### 权限白名单

Deno 还允许您使用白名单控制权限的粒度。

这是一个用白名单限制文件系统访问权限的示例，仅允许访问 `/usr` 目录，但它会在尝试访问 `/etc` 目录时失败。

```shell
$ deno run --allow-read=/usr https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/passwd
error: Uncaught PermissionDenied: read access to "/etc/passwd", run again with the --allow-read flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

改为 `/etc` 目录，赋予正确的权限，再试一次：

```shell
deno run --allow-read=/etc https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/passwd
```

`--allow-write` 也一样，代表写入权限。

### 网络访问

_fetch.ts_:

```ts
const result = await fetch("https://deno.land/");
```

这是一个设置 host 或 url 白名单的示例：

```shell
deno run --allow-net=github.com,deno.land fetch.ts
```

如果 `fetch.ts` 尝试与其他域名建立网络连接，那么这个进程将会失败。

允许访问任意地址：

```shell
deno run --allow-net fetch.ts
```
