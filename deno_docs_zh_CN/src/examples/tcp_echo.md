## TCP echo

这个示例是一个 TCP echo 服务，接收 8080 端口的连接，把接收到的任何数据返回给客户端。

```ts
const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  Deno.copy(conn, conn);
}
```

当这个程序启动时，它会抛出一个没有网络权限的错误。

```shell
$ deno run https://deno.land/std@$STD_VERSION/examples/echo_server.ts
error: Uncaught PermissionDenied: network access to "0.0.0.0:8080", run again with the --allow-net flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

为了安全，Deno 不允许程序访问网络，除非显式赋予权限。使用一个命令行选项来允许程序访问网络：

```shell
deno run --allow-net https://deno.land/std@$STD_VERSION/examples/echo_server.ts
```

尝试用 netcat 向它发送数据。

```shell
$ nc localhost 8080
hello world
hello world
```

像示例 `cat.ts` 一样，`copy()` 函数不会产生不必要的内存拷贝。它从内核接收数据包，然后发送回去，就这么简单。
