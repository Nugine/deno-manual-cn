## 安装

Deno 能够在 macOS、Linux 和 Windows 上运行。Deno 是一个单独的可执行文件，它没有额外的依赖。

### 下载安装

[deno_install](https://github.com/denoland/deno_install) 提供了方便的脚本，用以下载安装 Deno.

使用 Shell (macOS 和 Linux):

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

使用 PowerShell (Windows):

```shell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

使用 [Scoop](https://scoop.sh/) (Windows):

```shell
scoop install deno
```

使用 [Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```shell
choco install deno
```

使用 [Homebrew](https://formulae.brew.sh/formula/deno) (macOS):

```shell
brew install deno
```

使用 [Cargo](https://crates.io/crates/deno) (Windows, macOS, Linux):

```shell
cargo install deno
```

Deno 也可以手动安装，只需从 [github.com/denoland/deno/releases](https://github.com/denoland/deno/releases) 下载一个 zip 文件。它仅包含一个单独的可执行文件。在 macOS 和 Linux 上，您需要为它设置执行权限。

### 测试安装

运行 `deno --version`，如果它打印出 Deno 版本，说明安装成功。

运行 `deno help` 以查看帮助文档。

运行 `deno help <subcommand>` 以查看子命令的选项。

### 升级

要升级已安装的版本，运行：

```shell
deno upgrade
```

这会从 [github.com/denoland/deno/releases](https://github.com/denoland/deno/releases) 获取最新的发布版本，然后解压并替换现有的版本。

您也可以用此来安装一个特定的版本：

```shell
deno upgrade --version 1.0.1
```


### 从源码构建

关于构建步骤的信息请查阅 [贡献](../contributing.md) 章节。
