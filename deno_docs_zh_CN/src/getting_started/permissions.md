## 权限

<!-- TODO(lucacasonato): what are permissions -->

<!-- TODO(lucacasonato): description of all permissions -->

### 权限白名单

Deno 还允许您使用白名单控制权限的粒度。

这是一个用白名单限制文件系统访问权限的示例，仅允许访问 `/usr` 目录。

```shell
$ deno run --allow-read=/usr https://deno.land/std/examples/cat.ts /etc/passwd
error: Uncaught PermissionDenied: read access to "/etc/passwd", run again with the --allow-read flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

改为 `/etc` 目录，赋予正确的权限，再试一次：

```shell
$ deno run --allow-read=/etc https://deno.land/std/examples/cat.ts /etc/passwd
```

`--allow-write` 也一样，代表写入权限。

### 网络访问

_fetch.ts_:

```ts
const result = await fetch("https://deno.land/");
```

这是一个设置 host 或 url 白名单的示例：

```shell
$ deno run --allow-net=github.com,deno.land fetch.ts
```

允许访问任意地址：

```shell
$ deno run --allow-net fetch.ts
```
