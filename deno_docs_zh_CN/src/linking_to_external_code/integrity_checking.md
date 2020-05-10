## 完整性检查与锁定文件

Deno 可以使用较小的 JSON 文件存储和检查模块的子资源完整性。

使用 `--lock=lock.json` 启用和指定锁文件检查。

要更新或创建锁，可以使用 `--lock=lock.json --lock-write`。
