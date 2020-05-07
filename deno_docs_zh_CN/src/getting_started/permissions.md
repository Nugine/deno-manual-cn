## 权限

<!-- TODO(lucacasonato): what are permissions -->

<!-- TODO(lucacasonato): description of all permissions -->

### 权限白名单

Deno 也提供了权限白名单。

这是一个用白名单限制文件系统访问权限的示例。

```shell
$ deno run --allow-read=/usr https://deno.land/std/examples/cat.ts /etc/passwd
error: Uncaught PermissionDenied: read access to "/etc/passwd", run again with the --allow-read flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

您可以授予 `/etc` 目录的读取权限。

```shell
$ deno run --allow-read=/etc https://deno.land/std/examples/cat.ts /etc/passwd
```

`--allow-write` 也一样，代表写入权限。

这是一个限制网络主机的示例。

```ts
const result = await fetch("https://deno.land/");
```

```shell
$ deno run --allow-net=deno.land https://deno.land/std/examples/curl.ts https://deno.land/
```
