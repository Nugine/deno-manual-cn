## 重新加载特定的模块

默认情况下，缓存中的模块将被重用，而无需获取或重新编译它。有时这不是期望的行为，您可以强制 deno 重新下载模块并重新编译到缓存中。您可以使用 `deno cache` 子命令的`--reload` 选项来使本地 `DENO_DIR` 缓存无效。

其用法描述如下：

### 重新加载所有内容

```ts
deno cache --reload my_module.ts
```

### 重新加载指定模块

有时我们只想升级某些模块，可以通过将参数传递给 `--reload` 选项来控制它。

重新加载所有 v0.55.0 的标准模块：

```ts
deno cache --reload=https://deno.land/std@v0.55.0 my_module.ts
```

为了重新加载特定的模块（在这个例子中是 colors 和 file system copy），需要使用逗号来分隔 URL：

```ts
deno cache --reload=https://deno.land/std/fs/copy.ts,https://deno.land/std/fmt/colors.ts my_module.ts
```

<!-- Should this be part of examples? -->
