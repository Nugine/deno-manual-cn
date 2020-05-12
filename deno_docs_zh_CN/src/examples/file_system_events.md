### 文件系统事件

轮询文件系统事件：

```ts
const watcher = Deno.watchFs("/");
for await (const event of watcher) {
  console.log(">>>> event", event);
  // { kind: "create", paths: [ "/foo.txt" ] }
}
```

请注意，事件的确切顺序可能因操作系统而异。

此功能根据平台使用不同的系统调用：

- Linux: inotify
- macOS: FSEvents
- Windows: ReadDirectoryChangesW
