import { j as jsxRuntimeExports } from "./client-entry-q9kgvNLk.js";
const frontmatter = {
  "pageType": "home",
  "hero": {
    "name": "MuseDOC",
    "text": "基于 Vite & MDX 语法的静态站点生成器",
    "tagline": "简单、强大、高性能的现代化 SSG 方案",
    "image": {
      "src": "/musedoc.png",
      "alt": "MuseDOC"
    },
    "actions": [{
      "theme": "brand",
      "text": "快速开始",
      "link": "/zh/guide/getting-started"
    }, {
      "theme": "alt",
      "text": "GitHub 地址",
      "link": "https://github.com/musecode-dev/musedoc"
    }]
  },
  "features": [{
    "title": "Vite: 极速的开发响应速度",
    "details": "基于 Vite 构建，开发时的响应速度极快，即时的热更新，带给你极致的开发体验。",
    "icon": "🚀"
  }, {
    "title": "MDX: Markdown & React 组件来写内容",
    "details": "MDX 是一种强大的方式来写内容。你可以在 Markdown 中使用 React 组件。",
    "icon": "📦"
  }, {
    "title": "孤岛架构: 更高的生产性能",
    "details": "采用 Islands 架构，意味着更少的 JavaScript 代码、局部 hydration， 从而带来更好的首屏性能。",
    "icon": "✨"
  }, {
    "title": "功能丰富: 一站式解决方案",
    "details": "对全文搜索、国际化等常见功能可以做到开箱即用。",
    "icon": "🛠️"
  }, {
    "title": "TypeScript: 优秀的类型支持",
    "details": "使用 TypeScript 编写，提供了优秀的类型支持，让你的开发更加顺畅。",
    "icon": "🔑"
  }, {
    "title": "扩展性强: 提供多种自定义能力",
    "details": "通过其扩展机制，你可以轻松的扩展 Island 的主题 UI 和构建能力。",
    "icon": "🎨"
  }]
};
const toc = [];
function _createMdxContent(props) {
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, {
    ...props,
    children: jsxRuntimeExports.jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}
export {
  MDXContent as default,
  frontmatter,
  toc
};
