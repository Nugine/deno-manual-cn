## 内部细节

### Deno 和 Linux 类比

|                       **Linux** | **Deno**                         |
| ------------------------------: | :------------------------------- |
|                进程 (Processes) | Web Workers                      |
|             系统调用 (Syscalls) | Ops                              |
|                 文件描述符 (fd) | [Resource ids (rid)](#resources) |
|              调度器 (Scheduler) | Tokio                            |
| 用户空间: libc++ / glib / boost | https://deno.land/std/           |
|                 /proc/\$\$/stat | [Deno.metrics()](#metrics)       |
|              手册页 (man pages) | deno types                       |

#### 资源 (Resources)

资源（Resources)，又称 `rid`，是 Deno 版本的文件描述符。它们是一些整数数值，用来指代打开的文件、套接字 (sockets) 和其他概念。基于 `rid`，Deno 能够查询系统中有多少个打开的资源，这在测试时很有用。

```ts
const { resources, close } = Deno;
console.log(resources());
// { 0: "stdin", 1: "stdout", 2: "stderr" }
close(0);
console.log(resources());
// { 1: "stdout", 2: "stderr" }
```

#### 指标 (Metrics)

指标 (Metrics) 是 Deno 用于各种统计数据的内部计数器。

```shell
> console.table(Deno.metrics())
┌──────────────────┬────────┐
│     (index)      │ Values │
├──────────────────┼────────┤
│  opsDispatched   │   9    │
│   opsCompleted   │   9    │
│ bytesSentControl │  504   │
│  bytesSentData   │   0    │
│  bytesReceived   │  856   │
└──────────────────┴────────┘
```

### 架构示意图

![架构示意图](schematic_v0.2.png)
