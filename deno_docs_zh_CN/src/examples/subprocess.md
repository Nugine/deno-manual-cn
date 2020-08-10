## 运行子进程

[API 参考手册](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.run)

示例：

```ts
// 创建子进程
const p = Deno.run({
  cmd: ["echo", "hello"],
});

// 等待完成
await p.status();
```

运行

```shell
$ deno run --allow-run ./subprocess_simple.ts
hello
```

`window.onload` 被赋值为一个函数，它将会在主脚本加载后被调用，和浏览器的 [onload](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload) 一样，可以用于主入口点。

默认情况下，当您调用 `Deno.run()` 时，子进程将继承父进程的标准流。如果您想要和子进程通信，可以使用 `"piped"` 选项。

```ts
const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "https://deno.land/std@$STD_VERSION/examples/cat.ts",
    ...fileNames,
  ],
  stdout: "piped",
  stderr: "piped",
});

const { code } = await p.status();

if (code === 0) {
  const rawOutput = await p.output();
  await Deno.stdout.write(rawOutput);
} else {
  const rawError = await p.stderrOutput();
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
```

运行

```shell
$ deno run --allow-run ./subprocess.ts <somefile>
[file content]

$ deno run --allow-run ./subprocess.ts non_existent_file.md

Uncaught NotFound: No such file or directory (os error 2)
    at DenoError (deno/js/errors.ts:22:5)
    at maybeError (deno/js/errors.ts:41:12)
    at handleAsyncMsgFromRust (deno/js/dispatch.ts:27:17)
```
