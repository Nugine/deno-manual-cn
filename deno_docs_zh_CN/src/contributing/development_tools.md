## 测试和工具

### 测试

测试 `deno`:

```shell
# 运行所有测试套件：
cargo test

# 只测试 cli/js/：
cargo test js_unit_tests
```

测试 `std/`:

```shell
cargo test std_tests
```

### 代码检查与格式化

检查

```shell
./tools/lint.py
```

格式化

```shell
./tools/format.py
```

### 性能分析

```sh
# 确认我们正在构建发布版 (release)。
# 构建 deno 和 V8 的 d8。
ninja -C target/release d8

# 使用 --prof 选项运行想要分析的程序。
./target/release/deno run tests/http_bench.ts --allow-net --v8-flags=--prof &

# 施加压力。
third_party/wrk/linux/wrk http://localhost:4500/
kill `pgrep deno`
```

V8 将在当前目录写入一个文件，像这样 `isolate-0x7fad98242400-v8.log`。查看这个文件：

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log > prof.log
# 在 macOS 上, 使用 ./third_party/v8/tools/mac-tick-processor
```

`prof.log` 将包含不用调用的 tick 分布。

用 Web UI 查看这个日志，先生成 JSON 文件：

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log --preprocess > prof.json
```

在您的浏览器中打开 `third_party/v8/tools/profview/index.html`，选择 `prof.json` 以查看分布图。

在性能分析时有用的 V8 选项：

- --prof
- --log-internal-timer-events
- --log-timer-events
- --track-gc
- --log-source-code
- --track-gc-object-stats

有关 `d8` 和性能分析的更多信息，请查阅以下链接：

- [https://v8.dev/docs/d8](https://v8.dev/docs/d8)
- [https://v8.dev/docs/profile](https://v8.dev/docs/profile)

### 使用 LLDB 调试

### Debugging with LLDB

```shell
$ lldb -- target/debug/deno run tests/worker.js
> run
> bt
> up
> up
> l
```

调试 Rust 代码，可以用 `rust-lldb`。

```shell
$ rust-lldb -- ./target/debug/deno run --allow-net tests/http_bench.ts
# 在 macOS 上，您可能看到像这样的警告：
# `ImportError: cannot import name _remove_dead_weakref`
# 在这种情况下，设置 PATH 以使用系统 python，例如
# PATH=/System/Library/Frameworks/Python.framework/Versions/2.7/bin:$PATH
(lldb) command script import "/Users/kevinqian/.rustup/toolchains/1.36.0-x86_64-apple-darwin/lib/rustlib/etc/lldb_rust_formatters.py"
(lldb) type summary add --no-value --python-function lldb_rust_formatters.print_val -x ".*" --category Rust
(lldb) type category enable Rust
(lldb) target create "../deno/target/debug/deno"
Current executable set to '../deno/target/debug/deno' (x86_64).
(lldb) settings set -- target.run-args  "tests/http_bench.ts" "--allow-net"
(lldb) b op_start
(lldb) r
```

### V8 选项

V8 有很多内部的命令行选项。

```shell
# 列出可用的 V8 选项
$ deno --v8-flags=--help

# 使用多个选项的示例
$ deno --v8-flags=--expose-gc,--use-strict
```

特别有用的：

```
--async-stack-trace
```

### 持续的性能测试

参考我们的测试 [https://deno.land/benchmarks](https://deno.land/benchmarks)

测试图表假设 <https://github.com/denoland/benchmark_data/blob/gh-pages/data.json> 有着 `BenchmarkData[]` 类型。以下是 `BenchmarkData` 的定义：

```ts
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
