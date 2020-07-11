# 贡献

- 阅读 [风格指南](./style-guide.zh-CN.md).

- 请不要让 [性能测试](https://deno.land/benchmarks.html) 变糟。

- 在 [社区聊天室](https://discord.gg/deno) 获取帮助。

- 如果您将要在某个 issue 下做些工作，在那之前请先在 issue 中提示一下。

- 请在论坛上保持专业。我们遵循 Rust 的[行为准则](https://www.rust-lang.org/policies/code-of-conduct) (Code of conduct)。有问题请向 ry 发邮件(ry@tinyclouds.org)。

## 开发

从源码构建的步骤在 [这里](./contributing/building_from_source.md)

## 发起一个 Pull Request

在提交之前，请确认以下步骤：

1. 存在一个相关 issue，并且 PR 文本中引用了它。
2. 有覆盖这些变化的测试。
3. 确保 `cargo test` 通过。
4. 使用 `./tools/format.py` 格式化代码。
5. 确保 `./tools/lint.py` 通过。

## `third_party` 的改动

[`deno_third_party`](https://github.com/denoland/deno_third_party) 包含了大部分 Deno 依赖的外部代码，所以我们在任何时候都知道我们在运行什么。我们用一些手动操作和私有脚本来维护它，要做出改动，您可能需要联系 @ry 或 @piscisaureus。

## 增加 Ops

Ops 又称“绑定” (bindings)。

我们非常担心在添加新 API 时会出错。在向 Deno 添加 Op 时，应该研究其他平台上的对应接口。请列出如何在 Go、Node、Rust 和 Python 中完成此功能。

例如，参考 `deno.rename()` 是如何在
[PR #671](https://github.com/denoland/deno/pull/671) 中提出并添加的。

## 发布

以往发布的所做更改的总结在 [这里](https://github.com/denoland/deno/releases)。

## API 文档

公开 API 的文档很重要，我们希望它与代码内联。这有助于确保代码和文档紧密结合在一起。

### 利用 JSDoc

所有通过 `deno` 模块以及 global/`window` 命名空间公开的 API 和类型都应该有 JSDoc 文档。该文档经过解析并可供 TypeScript 编译器使用，因此易于在下游提供。JSDoc 块就在它们应用的语句之前，并以 `/** doc */` 表示。例如：

```ts
/** A simple JSDoc comment */
export const FOO = "foo";
```

更多信息位于 <https://jsdoc.app/>
