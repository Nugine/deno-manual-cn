## 设置您的环境

要高效地使用 Deno，您需要设置环境，比如命令行自动补全、环境变量、编辑器或 IDE。

### 环境变量

这是一些控制 Deno 行为的环境变量：

`DENO_DIR` 默认为 `$HOME/.cache/deno`，但可以设置为任何路径。这是 Deno 存放生成的代码和缓存的源码的路径。

如果 `NO_COLOR` 被设置，Deno 将会关闭彩色输出 (<https://no-color.org/>)。用户代码可以通过布尔常量 `Deno.noColor` 测试 `NO_COLOR` 是否被设置，这不需要环境权限 (`--allow-env`)。

### 命令行自动补全

通过 `deno completions <shell>` 命令可以生成补全脚本。它会输出到 stdout，您应该将它重定向到适当的文件。

Deno 支持的 shell 如下：

- zsh
- bash
- fish
- powershell
- elvish

示例 (bash)：

```shell
deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
source /usr/local/etc/bash_completion.d/deno.bash
```

示例 (zsh without framework)：

```shell
mkdir ~/.zsh # 新建一个文件夹来保存您的补全，它可以在任意地方。
deno completions zsh > .zsh/_deno
```

然后把以下内容加入您的 `.zshrc`

```shell
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -u
```

重启您的终端。如果补全仍未加载，您可能需要运行 `rm ~/.zcompdump/` 来移除之前生成的补全，然后运行 `compinit` 来再次生成它们。

示例 (zsh + oh-my-zsh) \[推荐\]：

```shell
mkdir ~/.oh-my-zsh/custom/plugins/deno
deno completions zsh > ~/.oh-my-zsh/custom/plugins/deno/_deno
```

在此之后，在 `~/.zshrc` 文件中的 plugins 标签下增加 `deno` 插件。对于 `antigen` 之类的工具，路径将会是 `~/.antigen/bundles/robbyrussell/oh-my-zsh/plugins`，命令将是 `antigen bundle deno`。

### 编辑器和 IDE

Deno 需要用文件后缀名来支持模块导入和 HTTP 导入。目前，大多数编辑器和语言服务器没有原生支持这点，一些编辑器可能会抛出“无法找到文件”的错误，或是“不必要的文件后缀名”错误。

社区已经开发了一些插件用来解决这些问题。

#### VS Code

目前内测版的 [vscode_deno](https://github.com/denoland/vscode_deno) 扩展已经发布到了 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)。如果遇到 bug 欢迎提 issues。

#### JetBrains IDE

JetBrains IDE 通过插件来提供 Deno 支持：[Deno 插件](https://plugins.jetbrains.com/plugin/14382-deno)

要了解有关设置步骤的更多信息，请在 YouTrack 上阅读 [这个评论](https://youtrack.jetbrains.com/issue/WEB-41607#focus=streamItem-27-4160152.0-0)。

### Vim 和 NeoVim

如果您安装 [CoC](https://github.com/neoclide/coc.nvim)（intellisense engine and language server protocol），Vim 对于 Deno/TypeScript 来说非常友好。

当安装完 CoC 后，可以在 Vim 内部运行 `:CocInstall coc-deno`。你会发现，诸如 `gd`（转到定义）和 `gr`（转到/查找引用）之类的东西可以正常工作了。

#### Emacs

对于目标为 Deno 的 TypeScript 项目，Emacs 工作得很好，只需使用两个插件：

+ [tide](https://github.com/ananthakumaran/tide)：这是在 Emacs 中使用 TypeScript 的典范方法。

+ [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin)：它被 [Deno 官方 VSCode 插件](https://github.com/denoland/vscode_deno) 使用。

首先确保您已经安装了 `tide`，下一步，按照 [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin) 页面的指示，在项目中运行 `npm install --save-dev typescript-deno-plugin typescript` (`npm init -y` 是必要的)，并在 `tsconfig.json` 中添加以下设置，然后准备开发吧！

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-deno-plugin",
        "enable": true, // default is `true`
        "importmap": "import_map.json"
      }
    ]
  }
}
```

如果您没有在列表中看到您最喜欢的 IDE，或许可以开发一个插件，我们的社区能够帮助您起步：[Discord](https://discord.gg/deno)
