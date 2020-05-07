## 代理（Proxies）

Deno 支持模块下载和 `fetch` API 的代理。

代理配置从环境变量中读取: `HTTP_PROXY` 和 `HTTPS_PROXY`。

在 Windows 的环境下，如果没有发现环境变量， Deno 会退回到从注册表读取代理。