## 文件服务器

## File server

这个示例将会启动一个本地目录的 HTTP 服务器。

安装

```bash
deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts
```

运行

```shell
$ file_server .
Downloading https://deno.land/std/http/file_server.ts...
[...]
HTTP server listening on http://0.0.0.0:4500/
```

如果想要升级到最新版本：

```shell
$ file_server --reload
```
