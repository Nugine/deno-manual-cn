## 脚本安装器

Deno 提供 `deno install` 来安装和分发可执行代码。

`deno install [OPTIONS...] [URL] [SCRIPT_ARGS...]` 将把位于 `URL` 的脚本安装到名称 `EXE_NAME` 下。

这个命令将会创建一个轻薄的 shell 脚本来调用 `deno`，其中写入了特定的命令行参数。它位于 `deno` 安装目录的 `bin` 子目录下。

示例：

```shell
$ deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts
[1/1] Compiling https://deno.land/std/http/file_server.ts

✅ Successfully installed file_server.
/Users/deno/.deno/bin/file_server
```

要改变命令名称，使用 `-n`/`--name` 参数：

```shell
deno install --allow-net --allow-read -n serve https://deno.land/std/http/file_server.ts
```

默认情况下，Deno 会自动推导命令名称。

- 尝试获取文件名称 (file stem)，以上示例将推导为 "file_server"

- 如果文件名称是通用的，比如 "main"、"mod"、"index" 或 "cli"，并且它的路径没有父级，那么取父级路径的文件名，否则设置为原通用名称。

要改变安装路径，使用 `--root` 选项：

```shell
$ deno install --allow-net --allow-read --root /usr/local https://deno.land/std/http/file_server.ts
```

按照优先顺序确定安装根目录：

- `--root` 选项
- `DENO_INSTALL_ROOT` 环境变量
- `$HOME/.deno`

如果需要，它们必须被添加进 `PATH` 环境变量。

```shell
$ echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
```

在安装时，您必须指定脚本会用到的权限。

```shell
$ deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts 8080
```

以上命令会创建一个名叫 `file_server` 的命令，运行时需要读取权限和网络权限，绑定到 8080 端口。

我们建议使用 [import.meta.main](../examples/testing_if_main.md) 来指定作为可执行脚本时的入口点。

示例：

```ts
// https://example.com/awesome/cli.ts
async function myAwesomeCli(): Promise<void> {
  -- snip --
}

if (import.meta.main) {
  myAwesomeCli();
}
```

当您创建一个可执行脚本时，最好在仓库中告诉用户如何安装，让用户看到一个示例安装命令。

```shell
# 使用 deno install 安装

$ deno install -n awesome_cli https://example.com/awesome/cli.ts
```
