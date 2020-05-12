## 重新加载特定的模块

您可以使用 `--reload` 选项使本地 `DENO_DIR` 缓存失效。其用途如下：

重新加载所有内容：`--reload`

有时我们只想升级某些模块，可以通过将参数传递给 `--reload` 选项来控制它。

重新加载所有标准模块：`--reload=https://deno.land/std`

为了重新加载特定的模块（在这个例子中是 colors 和 file system copy），需要使用逗号来分隔 URL：

`--reload=https://deno.land/std/fs/copy.ts,https://deno.land/std/fmt/colors.ts`
