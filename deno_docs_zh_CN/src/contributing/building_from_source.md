## 从源码构建

以下是从源码构建 Deno 的操作步骤。如果您只是想使用 Deno，您可以下载一个预构建的可执行文件，参考 `入门` 章节。

### 克隆 Deno 仓库

Linux 或 Mac 系统：

Clone on Linux or Mac:

```shell
git clone --recurse-submodules https://github.com/denoland/deno.git
```

在 Windows 系统上有一些额外步骤：

1. 打开“[开发者模式](https://www.google.com/search?q=windows+enable+developer+mode)”，否则符号链接将需要管理员权限。

2. 确认您正在使用 git 2.19.2.windows.1 或更高版本。

3. 在检出 (checkout) 前，设置 `core.symlinks=true`。
   ```shell
   git config --global core.symlinks true
   git clone --recurse-submodules https://github.com/denoland/deno.git
   ```

### 前置条件

最简单的方式是使用预编译的 V8 ：

```
cargo build -vv
```

如果您想要从源码构建 Deno 和 V8 ：

```
V8_FROM_SOURCE=1 cargo build -vv
```

从源码构建 V8 时会有更多依赖：

[Python 2](https://www.python.org/downloads). 确认您的 `PATH` 环境变量中有一个无后缀 (suffix-less) 的 `python`/`python.exe`，并且它指向 Python 2，而不是 Python3 ([issue 464](https://github.com/denoland/deno/issues/464#issuecomment-411795578))。

对于 Linux 用户，必须已经安装 glib-2.0 开发文件。（在 Ubuntu 上，运行 `apt install libglib2.0-dev`）

对于 Mac 用户，必须已经安装 [XCode](https://developer.apple.com/xcode/) 。

对于 Windows 用户：

1. 安装 [VS Community 2019](https://www.visualstudio.com/downloads/)，安装 "Desktop development with C++" 工具包，确认以下工具都已被选中和安装。

   - Visual C++ tools for CMake
   - Windows 10 SDK (10.0.17763.0)
   - Testing tools core features - Build Tools
   - Visual C++ ATL for x86 and x64
   - Visual C++ MFC for x86 and x64
   - C++/CLI support
   - VC++ 2015.3 v14.00 (v140) toolset for desktop

2) 启用 "Debugging Tools for Windows"：
   "Control Panel"
   → "Programs"
   → "Programs and Features"
   → 选择 "Windows Software Development Kit - Windows 10"
   → "Change"
   → "Change"
   → 检查 "Debugging Tools For Windows"
   → "Change"
   → "Finish"
   或者使用 [Debugging Tools for Windows](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/)，它会下载文件，您应该手动安装 `X64 Debuggers And Tools-x64_en-us.msi`。

有关构建 V8 的更多细节请查阅 [rusty_v8's README](https://github.com/denoland/rusty_v8)

### 构建

使用 Cargo：

```shell
# 构建：
cargo build -vv

# 构建失败？确保您位于最新的 master 分支，然后再试一次。如果还不行，尝试清除上一次的结果：
cargo clean && cargo build -vv

# 运行：
./target/debug/deno run cli/tests/002_hello.ts
```
