## 设置您的环境

要高效地使用 Deno，您需要设置环境，比如命令行自动补全、环境变量、编辑器或 IDE。

### 环境变量

这是一些控制 Deno 行为的环境变量：

`DENO_DIR` 默认为 `$HOME/.deno`，但可以设置为任何路径。这是 Deno 存放生成的代码和缓存的源码的路径。

如果 `NO_COLOR` 被设置，Deno 将会关闭彩色输出 (<https://no-color.org/>)。用户代码可以通过布尔常量 `Deno.noColor` 测试 `NO_COLOR` 是否被设置，这不需要环境权限 (`--allow-env`)。

### 命令行自动补全

通过 `deno completions <shell>` 命令可以生成补全脚本。它会输出到 stdout，您应该将它重定向到适当的文件。

Deno 支持的 shell 如下：

- zsh
- bash
- fish
- powershell
- elvish

示例：

```shell
deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
source /usr/local/etc/bash_completion.d/deno.bash
```

### 编辑器和 IDE

Deno 需要用文件后缀名来支持模块导入和 HTTP 导入。目前，大多数编辑器和语言服务器没有原生支持这点，一些编辑器可能会抛出“无法找到文件”的错误，或是“不必要的文件后缀名”错误。

社区已经开发了一些插件用来解决这些问题。

- [VS Code](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno)
  by [@axetroy](https://github.com/axetroy).

JetBrains 的 IDE 还没有支持 Deno，但您可以通过订阅和投票这些 issue 来得知最新的进展。

- <https://youtrack.jetbrains.com/issue/WEB-41607>
- <https://youtrack.jetbrains.com/issue/WEB-42983>
- <https://youtrack.jetbrains.com/issue/WEB-31667>

如果您没有在列表中看到您最喜欢的 IDE，或许可以开发一个插件，我们的社区能够帮助您起步：[Discord](https://discord.gg/TGMHGv6)
