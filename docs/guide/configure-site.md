# 配置站点

## 创建配置文件

模板目录结构:  

```bash
.
├── docs
│   ├── article
│   │   ├── astro.md
│   │   └── fresh.md
│   ├── public
│   │   └── logo.png
│   ├── config.ts
│   └── index.md
├── package.json
├── pnpm-lock.yaml
└── README.md
```

模板中已经包含了配置文件了，即 `docs/config.ts`。

你可以尝试在 `config.ts` 中添加以下配置代码:

```ts
import { defineConfig } from 'musedoc';

export default defineConfig({
  title: 'my-site'
});
```

另外，关于配置文件有以下两个注意事项:

- 1. MuseDoc 支持 `.js`、`.ts`、`.mjs`、`.cjs` 文件作为配置文件。但是推荐使用 TypeScript 配置，因为可以使用`defineConfig` 获取类型提示。

- 2. 配置文件应该有一个默认导出，即默认导出一个 `SiteConfig` 对象。

在上面的例子中，我们将站点的 `title` 设置为 `my-site`，然后你可以通过 `musedoc dev docs` 运行启动开发服务器。你会看到站点的标题已更改为 `my-site`。这意味着你已经唤醒了你的第一个站点配置。

在下一节中，我们将介绍导航和侧边栏配置，这对于文档站点是相当重要的。

## 导航栏配置

`nav` 字段用来配置导航栏, 举个 🌰:

```ts
import { defineConfig } from 'musedoc';

export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
      }
    ]
  }
});
```

## 侧边栏配置

`sidebar` 字段可以用来配置侧边栏，举个 🌰:

```ts
import { defineConfig } from 'musedoc';

export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            {
              text: '快速开始',
              link: '/guide/getting-started'
            }
          ]
        }
      ]
    }
  }
});
```