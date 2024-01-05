# 静态资源处理

## 导入静态资源

你可以在 `markdown`（或 `mdx`）文件中导入静态资源。相对路径和绝对路径都是支持的，例如，如果在 markdown 同级目录有一张图片，你可以像这样引用它：

```mdx
![](./musedoc.png)
```

当然，在 `mdx` 文件中你也可以直接使用 img 标签：

```mdx
<img src="./musedoc.png" />
```

MuseDoc 将会根据 mdx 路径和图片路径，自动找到图片并响应给浏览器。

另一方面，也可以使用绝对路径导入静态资源。这样，MuseDoc 将会先后在两个地方查找文件：

- 项目根目录，比如启动命令为 `musedoc dev docs`，那么根目录就是 `docs`
- 项目根目录 `public` 文件夹

例如，如果根目录是 `docs` 并且你有一个文件 `docs/public/musedoc.png`，你可以像这样引用它：

```mdx
![](/musedoc.png)
```

同时，如果你有一个文件 `docs/assets/musedoc.png`，你可以像这样引用它：

```mdx
![](/assets/musedoc.png)
```

## 公共资源

上文提到过，你可以把你的静态资源放在 `public` 目录中，MuseDoc 将自动在 `public` 目录寻找资源。在生产环境中，
MuseDoc 会将 `public` 目录中的所有文件复制到产物目录（`dist`）。

比如:

```bash
docs
├── public
│   └── musedoc.png
```