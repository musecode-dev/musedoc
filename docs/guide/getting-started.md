# 快速开始

## 为什么选择 MuseDoc?

🏝️ MuseDoc 是一个基于 Vite、React 和 MDX 的静态站点生成器。它的特点是**简单**、**强大**且**高性能**，旨在帮助你以最少的配置专注于编写和部署静态站点。它主要具有以下功能：

- **开发体验好**: 基于 Vite 进行构建，启动和热更新速度极快。
- **语法灵活**: 内置 MDX 支持，也就是说你可以在 Markdown 中使用 React 组件。
- **高性能**: 基于[孤岛架构](https://jasonformat.com/islands-architecture/), 实现了 Partial Hydration，意味着更少的客户端 JavaScript 和更少的运行时开销。

## 1. 启动 Dev Server

通过如下命令启动本地开发服务:

```bash
musedoc dev docs
```

这样 MuseDoc 将在 <http://localhost:5173> 启动开发服务。

## 2. 生产环境构建

通过如下命令构建生产环境的产物:

```bash
musedoc build docs
```

默认情况下，MuseDoc 将会把产物打包到 `doc/dist` 目录。

## 3. 本地预览产物

通过如下命令启动本地预览服务:

```bash
musedoc preview docs
```

这样 MuseDoc 将在 http://localhost:5173 启动预览服务。
