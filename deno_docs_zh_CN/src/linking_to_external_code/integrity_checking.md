## 完整性检查与锁定文件

Deno 可以使用一个较小的 JSON 文件存储和检查模块的子资源完整性。

使用 `--lock=lock.json` 启用和指定锁文件检查。

要更新或创建锁，可以使用 `--lock=lock.json --lock-write`。

一个典型的工作流看起来像这样：

```ts
// 向 "src/deps.ts" 添加一个新的依赖，在别处使用。
export { xyz } from "https://unpkg.com/xyz-lib@v0.9.0/lib.ts";
```

```shell
# 创建或更新锁文件 "lock.json"
deno cache --lock=lock.json --lock-write src/deps.ts

# 在提交时包含这一变化
git add -u lock.json
git commit -m "feat: Add support for xyz using xyz-lib"
git push
```

另一台机器上的合作者刚刚把项目克隆下来：

```shell
# 下载、缓存并检查项目的依赖
deno cache -r --lock=lock.json src/deps.ts

# 在这完成之后，您可以安心开发了
deno test --allow-read src
```
