# Deno 手册

[toc]

原文地址: [deno.land/manual.html](https://deno.land/manual.html)

仓库地址: [denoland/deno/website/manual.md](https://github.com/denoland/deno/blob/master/website/manual.md)

译文地址: [nugine.github.io/deno-manual-cn/](https://nugine.github.io/deno-manual-cn/)

仓库地址: [Nugine/deno-manual-cn](https://github.com/Nugine/deno-manual-cn)

## 免责声明

注意: Deno 正在紧张开发中. 我们鼓励勇敢的早期用户, 但要做好碰到各种bug的准备. API随时可能更改而没有通知. 错误报告会帮助我们改进deno.

## 介绍

### 哲学

Deno旨在为现代程序员提供高效安全的脚本环境.

它将始终作为单个可执行文件分发, 并且该可执行文件将能运行任何deno程序. 给定一个deno程序的URL, 你应该能够用不超过50MB的deno可执行文件运行它.

Deno明确地承担了运行时和包管理器的角色. 它使用标准的浏览器兼容协议来加载模块: URL.

Deno为程序与系统的隔离提供安全保证, 默认情况下是最严格的安全沙箱.

Deno提供了一组经过审核的[标准模块](https://github.com/denoland/deno_std), 可以保证它们能在Deno上工作.

### 目标

+ 支持开箱即用的TypeScript环境

+ 像浏览器一样, 允许URL导入:

```typescript
import * as log from "https://deno.land/x/std/log/mod.ts";
```

+ 远程代码在首次执行时被提取和缓存, 并且在使用`--reload`标志运行代码之前永远不会更新. (所以它仍然能离线工作. 有关缓存的详细信息, 请参阅`~/.deno/src`)

+ 关于模块加载, 使用"ES Modules", 不支持`require()`.

+ 为了运行沙盒代码, 文件系统和网络的访问权限是可控的. V8(非特权)和Rust(特权)之间的访问只能通过[flatbuffer](https://github.com/denoland/deno/blob/master/src/msg.fbs)中定义的序列化消息完成. 这使得代码审计变得容易. 例如, 要启用写访问, 请使用标志`--allow-write`. 网络访问的标志是`--allow-net`.

+ 只分发一个独立的可执行文件.

+ 在未捕获的错误发生时, 程序总会直接终止.

+ 浏览器兼容: 完全用JavaScript编写且不使用全局Deno命名空间(或功能测试)的程序是Deno程序的子集, 应该能够直接在现代浏览器中运行而无需更改.

+ 支持[top-level `await`](https://github.com/denoland/deno/issues/471).

### "非"目标

+ 没有`package.json`.

+ 没有npm.

+ 和Node不完全兼容.

## 安装

### 二进制安装

Deno在OSX,Linux和Windows上工作. Deno是一个单独的二进制可执行文件, 它没有外部依赖.

[deno_install]([deno_install](https://github.com/denoland/deno_install)) 提供方便的脚本以下载和安装.

Shell:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell:

```powershell
iwr https://deno.land/x/install/install.ps1 | iex
```

Deno 也可以手动安装. 从[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases)下载安装包. 这些安装包只包含一个单独的可执行文件. 在Mac和Linux上, 你必须手动设置可执行位.

一旦安装完成并设置好你的`$PATH`, 试试吧:

    deno https://deno.land/welcome.ts

### 从源码构建

```bash
# Fetch deps.
git clone --recurse-submodules https://github.com/denoland/deno.git
cd deno
./tools/setup.py

# You may need to ensure that sccache is running.
# (TODO it's unclear if this is necessary or not.)
# prebuilt/mac/sccache --start-server

# Build.
./tools/build.py

# Run.
./target/debug/deno tests/002_hello.ts

# Test.
./tools/test.py

# Format code.
./tools/format.py
```

#### 先决条件

为了确保可重复的构建, deno在git子模块中具有大部分依赖. 但你需要单独安装:

1. [Rust](https://www.rust-lang.org/en-US/install.html) >= 1.31.1
2. [Node](https://nodejs.org/)
3. Python 2.
   [Not 3](https://github.com/denoland/deno/issues/464#issuecomment-411795578).

额外步骤:

Mac:

1. [XCode](https://developer.apple.com/xcode/)
2. Openssl 1.1: `brew install openssl@1.1` (TODO: shouldn't be necessary)

Windows:

1. 将 `python.exe` 添加到 `PATH` (例如: `set PATH=%PATH%;C:\Python27\python.exe`)
2. 获取[VS Community 2017](https://www.visualstudio.com/downloads/) 和
   `Desktop development with C++` 工具包, 确保你选择了如下工具之一.
   + Windows 10 SDK >= 10.0.17134
   + Visual C++ ATL for x86 and x64
   + Visual C++ MFC for x86 and x64
   + C++ profiling tools
3. 启用 `Debugging Tools for Windows`. 前往 `Control Panel` → `Programs` →
   `Programs and Features` → 选择
   `Windows Software Development Kit - Windows 10` → `Change` → `Change` → 检查
   `Debugging Tools For Windows` → `Change` -> `Finish`.

#### 其他有用的命令

```bash
# 手动调用 ninja
./third_party/depot_tools/ninja -C target/debug

# 构建 release
DENO_BUILD_MODE=release ./tools/build.py :deno

# 列出 executable targets.
./third_party/depot_tools/gn ls target/debug //:* --as=output --type=executable

# 列出构建配置
./third_party/depot_tools/gn args target/debug/ --list

# 编辑构建配置
./third_party/depot_tools/gn args target/debug/

# 描述一个 target.
./third_party/depot_tools/gn desc target/debug/ :deno
./third_party/depot_tools/gn help

# 更新第三方模块
git submodule update
```

环境变量: `DENO_BUILD_MODE`, `DENO_BUILD_PATH`, `DENO_BUILD_ARGS`,
`DENO_DIR`.

## API 参考

### deno --types

要获得deno运行时API的确切参考, 请在命令行中运行以下命令:

    deno --types

[输出示例](https://gist.github.com/ry/46da4724168cdefa763e13207d27ede5)

### 参考网站

[TypeScript Deno API](https://deno.land/typedoc/index.html).

如果要在Rust程序中嵌入deno, 请参阅[Rust Deno API](https://deno.land/rustdoc/deno/index.html).

## 示例

### 实现 unix "cat" 程序

在此程序中, 假定每个命令行参数都是文件名. 它将打开文件, 并打印到stdout.

```ts
(async () => {
  for (let i = 1; i < Deno.args.length; i++) {
    let filename = Deno.args[i];
    let file = await Deno.open(filename);
    await Deno.copy(Deno.stdout, file);
    file.close();
  }
})();
```

这里的`copy()`函数实际上只是必要的内核->用户空间->内核的复制. 也就是说, 从文件中读取数据的相同内存被写入stdout. 这说明了Deno中I/O流的一般设计目标.

尝试运行这个程序:

    > deno https://deno.land/x/examples/cat.ts /etc/passwd

### TCP回声服务器

这是一个简单服务器的示例, 它接受端口8080上的连接, 并将它发送的任何内容返回给客户端.

```ts
const { listen, copy } = Deno;

(async () => {
  const addr = "0.0.0.0:8080";
  const listener = listen("tcp", addr);
  console.log("listening on", addr);
  while (true) {
    const conn = await listener.accept();
    copy(conn, conn);
  }
})();
```

启动此程序时, 系统会提示用户获取在网络上监听的权限:

    > deno https://deno.land/x/examples/echo_server.ts
    ⚠️  Deno requests network access to "listen". Grant? [yN] y
    listening on 0.0.0.0:8080

出于安全原因, deno不允许程序在未经明确许可的情况下访问网络. 要避免控制台提示, 请使用命令行标志:

    > deno https://deno.land/x/examples/echo_server.ts --allow-net

要测试它, 请尝试使用curl向它发送HTTP请求. 请求将直接写回客户端.

    > curl http://localhost:8080/
    GET / HTTP/1.1
    Host: localhost:8080
    User-Agent: curl/7.54.0
    Accept: */*

值得注意的是, 就像`cat.ts`示例一样, 这里的`copy()`函数也不会产生不必要的内存副本. 它从内核接收数据包并发回, 没有进一步的复杂性.

### 文件服务器

这个HTTP服务返回本地目录.

    alias file_server="deno  --allow-net --allow-read \
    https://deno.land/x/http/file_server.ts"

运行:

    % file_server .
    Downloading https://deno.land/x/http/file_server.ts...
    [...]
    HTTP server listening on http://0.0.0.0:4500/

如果您想要升级到最新发布的版本:

    file_server --reload

### 运行子进程

[API 参考](https://deno.land/typedoc/index.html#run)

示例:

```ts
async function main() {
  // create subprocess
  const p = Deno.run({
    args: ["echo", "hello"]
  });

  // await its completion
  await p.status();
}

main();
```

运行:

    > deno --allow-run ./subprocess_simple.ts
    hello

默认情况下, 当你使用 `deno.run()` 时, 子进程继承父进程的`stdin`, `stdout` 和
`stderr`. 如果你想要和子进程交流, 你可以使用`"piped"`选项.

```ts
async function main() {
  const decoder = new TextDecoder();

  const fileNames = Deno.args.slice(1);

  const p = Deno.run({
    args: [
      "deno",
      "--allow-read",
      "https://deno.land/x/examples/cat.ts",
      ...fileNames
    ],
    stdout: "piped",
    stderr: "piped"
  });

  const { code } = await p.status();

  const rawOutput = await p.output();
  Deno.stdout.write(rawOutput);

  Deno.exit(code);
}

main();
```

运行:

    > deno ./subprocess.ts --allow-run <somefile>
    [file content]

    > deno ./subprocess.ts --allow-run non_existent_file.md

    Uncaught NotFound: No such file or directory (os error 2)
        at DenoError (deno/js/errors.ts:19:5)
        at maybeError (deno/js/errors.ts:38:12)
        at handleAsyncMsgFromRust (deno/js/dispatch.ts:27:17)

### 和第三方代码连接

在上面的例子中, 我们看到Deno可以从URL执行脚本. 与浏览器JavaScript一样, Deno可以直接从URL导入库. 此示例使用URL导入测试运行库：

```ts
import { test, assertEqual } from "https://deno.land/x/testing/mod.ts";

test(function t1() {
  assertEqual("hello", "hello");
});

test(function t2() {
  assertEqual("world", "world");
});
```

运行:

    > deno https://deno.land/x/examples/example_test.ts
    Compiling /Users/rld/src/deno_examples/example_test.ts
    Downloading https://deno.land/x/testing/mod.ts
    Compiling https://deno.land/x/testing/mod.ts
    running 2 tests
    test t1
    ... ok
    test t2
    ... ok

    test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

请注意, 我们不必为此程序提供`--allow-net`标志, 但它访问了网络. 运行时具有下载导入并将其缓存到磁盘的特殊访问权限.

Deno将远程导入缓存在`$DENO_DIR`环境变量指定的特殊目录中. 如果未指定`$DENO_DIR`, 则默认为系统的缓存目录. 下次运行程序时, 不会进行任何下载. 如果程序没有改变, 它也不会被重新编译. 默认目录是：

+ Linux/Redox: `$XDG_CACHE_HOME/deno` 或 `$HOME/.cache/deno`
+ Windows: `%LOCALAPPDATA%/deno` (`%LOCALAPPDATA%` = `FOLDERID_LocalAppData`)
+ MacOS: `$HOME/Library/Caches/deno`
+ 如果出现问题, 则会回滚到`$HOME/.deno`

但是, 如果`https://deno.land/`发生故障怎么办

+ 依靠外部服务器可以方便开发, 但生产中很脆弱. 生产软件应始终捆绑其依赖项. 在Deno中, 这是通过将`$DENO_DIR`检入源代码控制系统, 并在运行时将该路径指定为`$DENO_DIR`环境变量来完成的.

如何导入特定版本

+ 只需在URL中指定版本即可. 例如, 此URL完全指定正在运行的代码:`https://unpkg.com/liltest@0.0.5/dist/liltest.js`. 结合上述将生产中的`$DENO_DIR`设置为存储代码的技术, 可以完全指定正在运行的代码, 并在没有网络访问的情况下执行代码.

在任何地方导入URL似乎很笨拙. 如果其中一个URL链接到库的略有不同的版本会怎么样？ 在大型项目中是否容易在任何地方维护URL

+ 解决方案是在中央`package.ts`文件中导入和重新导出外部库（其作用与Node的`package.json`文件相同）. 例如, 假设您在大型项目中使用上述测试库. 您可以创建一个`package.ts`文件导出第三方代码, 而不是在任何地方导入`"https://deno.land/x/testing/mod.ts"`：

    ```ts
    export { test, assertEqual } from "https://deno.land/x/testing/mod.ts";
    ```

    在整个项目中, 可以从`package.ts`导入, 并避免对同一URL进行多次引用：

    ```ts
    import { test, assertEqual } from "./package.ts";
    ```

    这种设计避免了包管理软件, 集中式代码存储库和多余文件格式所产生的过多复杂性.

### 测试当前文件是否为主程序

通过使用`window.location`和`import.meta.url`, 可以测试当前脚本是否已作为程序的主要输入执行.

```ts
if (window.location.toString() == import.meta.url) {
  console.log("main");
}
```

## 命令行接口

### Flags

    > deno -h
    Usage: deno script.ts

    Options:
            --allow-read    Allow file system read access.
            --allow-write   Allow file system write access.
            --allow-net     Allow network access.
            --allow-env     Allow environment access.
            --allow-run     Allow running subprocesses.
        -A, --allow-all     Allow all permissions.
            --recompile     Force recompilation of TypeScript code.
        -h, --help          Print this message.
        -D, --log-debug     Log debug output.
        -v, --version       Print the version.
        -r, --reload        Reload cached remote resources.
            --v8-options    Print V8 command line options.
            --types         Print runtime TypeScript declarations.
            --prefetch      Prefetch the dependencies.
            --info          Show source file related info
            --fmt           Format code.

    Environment variables:
            DENO_DIR        Set deno's base directory.

### 环境变量

有几个env变量可以控制Deno的行为:

`DENO_DIR` 默认是`$HOME/.deno`, 但可以被设置为任何路径来控制生成和缓存的源代码的写入和读取位置.

如果设置`NO_COLOR`, Deno将关闭颜色输出. 请参阅[https://no-color.org/](https://no-color.org/). 用户代码可以通过使用布尔常量`deno.noColor`来测试是否设置了`NO_COLOR`而没有`--allow-env`.

### V8 flags

V8有许多内部命令行标志, 您可以使用`--v8-options`查看. 看起来像这样: [gist.github.com/ry](https://gist.github.com/ry/1c5b080dcbdc6367e5612392049c9ee7)

特别有用的：

    --async-stack-trace

## 内部细节

### Deno和Linux类比

|                       **Linux** | **Deno**                         |
| ------------------------------: | :------------------------------- |
|                       Processes | Web Workers                      |
|                        Syscalls | Ops                              |
|           File descriptors (fd) | [Resource ids (rid)](#resources) |
|                       Scheduler | Tokio                            |
| Userland: libc++ / glib / boost | deno_std                         |
|                 /proc/\$\$/stat | [deno.metrics()](#metrics)       |
|                       man pages | deno --types                     |

#### 资源

Rid是Deno的文件描述符版本. 它们是用于引用打开文件, 套接字和其他概念的整数值. 对于测试, 能够在系统中查询有多少开放资源是一件好事.

```ts
import { resources, close } from "deno";
console.log(resources());
// output like: { 0: "stdin", 1: "stdout", 2: "stderr", 3: "repl" }

// close resource by rid
close(3);
```

#### Metrics

Metrics 是deno用于各种数据的内部计数器.

```ts
import { metrics } from "deno";
console.log(metrics());
// output like: { opsDispatched: 1, opsCompleted: 1, bytesSentControl: 40, bytesSentData: 0, bytesReceived: 176 }
```

### 示意图

![Schematic diagram](schematic_v0.2.png)

### 性能分析

开始分析

```sh
# Make sure we're only building release.
export DENO_BUILD_MODE=release
# Build deno and V8's d8.
./tools/build.py d8 deno
# Start the program we want to benchmark with --prof
./target/release/deno tests/http_bench.ts --allow-net --prof &
# Exercise it.
third_party/wrk/linux/wrk http://localhost:4500/
kill `pgrep deno`
```

V8将在当前目录中写入一个如下所示的文件：`isolate-0x7fad98242400-v8.log`. 要检查此文件：

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log > prof.log
# on macOS, use ./third_party/v8/tools/mac-tick-processor instead
```

`prof.log`将包含有关不同调用的tick分布的信息.

要使用Web UI查看日志, 请生成日志的JSON文件：

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log --preprocess > prof.json
```

在浏览器打开`third_party/v8/tools/profview/index.html`, 选择
`prof.json`以查看分布图.

要了解有关`d8`和性能分析的更多信息, 请查看以下链接：

+ [https://v8.dev/docs/d8](https://v8.dev/docs/d8)
+ [https://v8.dev/docs/profile](https://v8.dev/docs/profile)

### 使用LLDB进行调试

 我们可以使用LLDB来调试deno.

```sh
lldb -- target/debug/deno tests/worker.js
> run
> bt
> up
> up
> l
```

要调试Rust代码, 我们可以使用rust-lldb. 它应该带有rustc并且是LLDB的包装器.

```sh
rust-lldb -- ./target/debug/deno tests/http_bench.ts --allow-net
# 在macOS上, 你可能遇到像这样的警告
# `ImportError: cannot import name _remove_dead_weakref`
# 在这种情况下, 设置PATH以使用系统python, 例如
# PATH=/System/Library/Frameworks/Python.framework/Versions/2.7/bin:$PATH
(lldb) command script import "/Users/kevinqian/.rustup/toolchains/1.30.0-x86_64-apple-darwin/lib/rustlib/etc/lldb_rust_formatters.py"
(lldb) type summary add --no-value --python-function lldb_rust_formatters.print_val -x ".*" --category Rust
(lldb) type category enable Rust
(lldb) target create "../deno/target/debug/deno"
Current executable set to '../deno/target/debug/deno' (x86_64).
(lldb) settings set -- target.run-args  "tests/http_bench.ts" "--allow-net"
(lldb) b op_start
(lldb) r
```

### libdeno

deno的特权方将主要在Rust中编程. 但同时也有一个小的C API包装V8

1. 定义低级消息传递语义
2. 提供低级别测试目标
3. 为Rust提供ANSI C API绑定接口.

V8加上这个C API被称为“libdeno”, API的重要部分在这里指定:

+ [deno.h](https://github.com/denoland/deno/blob/master/libdeno/deno.h)
+ [libdeno.ts](https://github.com/denoland/deno/blob/master/js/libdeno.ts)

### Flatbuffers

我们使用Flatbuffers来定义TypeScript和Rust之间的常见结构和枚举. 这些常见的数据结构在[msg.fbs](https://github.com/denoland/deno/blob/master/src/msg.fbs)中定义

### 更新预构建的二进制文件

```bash
./third_party/depot_tools/upload_to_google_storage.py -b denoland  \
  -e ~/.config/gcloud/legacy_credentials/ry@tinyclouds.org/.boto `which sccache`
mv `which sccache`.sha1 prebuilt/linux64/
gsutil acl ch -u AllUsers:R gs://denoland/608be47bf01004aa11d4ed06955414e93934516e
```

### 持续的基准测试

[https://deno.land/benchmarks.html](https://deno.land/benchmarks.html)

基准测试图表假设`//website/data.json`符合类型
`BenchmarkData[]`

```typescript
interface ExecTimeData {
  mean: number;
  stddev: number;
  user: number;
  system: number;
  min: number;
  max: number;
}

interface BenchmarkData {
  created_at: string;
  sha1: string;
  benchmark: {
    [key: string]: ExecTimeData;
  };
  binarySizeData: {
    [key: string]: number;
  };
  threadCountData: {
    [key: string]: number;
  };
  syscallCountData: {
    [key: string]: number;
  };
}
```

## 贡献

[Style Guide](https://deno.land/style_guide.html)

在[此处](https://github.com/denoland/deno/milestones)跟踪未来版本的进展.

请不要让[基准测试](https://deno.land/benchmarks.html)变得更糟.

在[社区聊天室](https://gitter.im/denolife/Lobby)寻求帮助.

如果您要处理某个问题, 请在开始处理该问题之前在issue评论中提及.

### 提交pull request

在提交之前, 请确认以下事项已经完成:

1. 存在相关issue, 并在PR文本中提及.
2. 有些测试涵盖了这些变化.
3. 确保`./tools/test.py`通过.
4. 使用`tools / format.py`格式化代码
5. 确保`./tools/lint.py`通过.

### deno_third_party

[deno_third_party](https://github.com/denoland/deno_third_party) 包含Deno所依赖的大部分外部代码, 以便我们确切知道在任何给定时间执行的内容. 它通过手工和私人脚本的混合精心维护. 您可能需要 @ry 或 @piscisaureus 的帮助才能进行更改.

### 添加 Ops (绑定)

我们非常担心在添加新API时会出错. 在向Deno添加Op时, 应该研究其他平台上的对应接口. 请列出如何在Go, Node, Rust和Python中完成此功能.

例如, 参考`deno.rename()`是如何在
[PR #671](https://github.com/denoland/deno/pull/671)中提出并添加的.

### API文档

公共API文档很重要, 我们希望它与代码内联. 这有助于确保代码和文档紧密结合在一起.

#### 利用JSDoc

所有通过`deno`模块以及global/`window`命名空间公开的API和类型都应该有JSDoc文档. 该文档经过解析并可供TypeScript编译器使用, 因此易于在下游提供. JSDoc块就在它们应用的语句之前, 并以`/ ** doc * /`表示. 例如：

```ts
/** A simple JSDoc comment */
export const FOO = "foo";
```
