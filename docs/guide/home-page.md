# 主页

MuseDoc 默认主题内置了主页，你可以通过书写 markdown 的 Front Matter 来配置它。举个简单的例子：

```md
---
pageType: home

hero:
  name: MuseDoc
  text: 由 Vite 和 React 驱动的静态站点生成器
---
```

首先你需要将 `pageType` 设为 `home`，这样 MuseDoc 会自动为你生成主页。除了 `pageType`，你还可以配置 `hero` 和 `features` 两个部分。

## 开屏

开屏部分是主页的 Logo、简介及跳转按钮部分，它的配置是一个对象，有以下类型：

```ts
export interface Hero {
  // Logo 名字
  name?: string;
  // Logo 简介文本
  text?: string;
  // 标语文本 (显示在 Logo 下方可选)
  tagline?: string;
  // Logo 图片
  image?: HeroImage;
  // 跳转按钮
  actions?: HeroAction[];
}

export interface HeroImage {
  // 图片地址
  src: string;
  // 图片 alt 文本
  alt?: string;
}

export interface HeroAction {
  // 按钮，可选为主题(brand)色或者灰色
  theme?: 'brand' | 'alt';
  text: string;
  link: string;
}
```

举个例子:

```md
---
pageType: home

hero:
  name: MuseDoc
  text: 由 Vite 和 React 驱动的静态站点生成器
  tagline: 简单、强大、快速的现代化 SSG 方案
  image:
    src: /musedoc.png
    alt: MuseDOC
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/
    - theme: alt
      text: GitHub 地址
      link: https://github.com/musecode-dev/musedoc
---
```

## 特性

特性部分是主页的特性介绍部分，它的配置是一个数组，每个元素有以下类型：

```ts
export interface Feature {
  // Feature 标题
  title: string;
  // Feature 详细介绍
  details: string;
  // Feature 图标，一般为 emoji
  icon: FeatureIcon;
}

export type FeatureIcon =
    | string
    | { src: string; alt?: string; width?: string; height: string };
```

举个例子:

```md
features:
  - title: '专注内容'
    details: 只需 Markdown 即可轻松创建美观的文档站点。
    icon: 📝
  - title: 'Vite: 极速的开发响应速度'
    details: 基于 Vite 构建，开发时的响应速度极快，即时的热更新，带给你极致的开发体验。
    icon: 🚀
  - title: 'MDX: Markdown & React 组件来写内容'
    details: MDX 是一种强大的方式来写内容。你可以在 Markdown 中使用 React 组件。
    icon: 📦
  - title: '功能丰富: 一站式解决方案'
    details: 对全文搜索、国际化等常见功能可以做到开箱即用。
    icon: 🛠️
  - title: 'TypeScript: 优秀的类型支持'
    details: 使用 TypeScript 编写，提供了优秀的类型支持，让你的开发更加顺畅。
    icon: 🔑
  - title: '扩展性强: 提供多种自定义能力'
    details: 通过其扩展机制，可以轻松的扩展主题 UI 和构建能力。
    icon: 🎨
```

## 页脚

你可以通过 `themeConfig.footer` 来自定义主页的页脚。它的配置是一个对象，有以下类型：

```ts
export interface Footer {
  // 版权信息(显示在最底部)
  copyright?: string;
  // 页脚文本
  message?: string;
}
```

举个例子:

```js
import { defineConfig } from 'musedoc';

export default defineConfig({
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present MuseCode'
    }
  }
});
```
