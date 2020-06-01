## Unix cat

在这个程序中，每个命令行参数都是一个文件名，参数对应的文件将被依次打开，打印到标准输出流。

```ts
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

除了内核到用户空间再到内核的必要拷贝，这里的 `copy()` 函数不会产生额外的昂贵操作，从文件中读到的数据会原样写入标准输出流。这反映了 Deno I/O 流的通用设计目标。

尝试一下：

```shell
deno run --allow-read https://deno.land/std/examples/cat.ts /etc/passwd
```
