import { jsx, Fragment } from "react/jsx-runtime";
const frontmatter = {
  "pageType": "home",
  "hero": {
    "name": "MuseDoc",
    "text": "由 Vite 和 React 驱动的静态站点生成器",
    "tagline": "简单、强大、快速的现代化 SSG 框架",
    "image": {
      "src": "/musedoc.png",
      "alt": "MuseDOC"
    },
    "actions": [{
      "theme": "brand",
      "text": "快速开始",
      "link": "/guide/getting-started"
    }, {
      "theme": "alt",
      "text": "GitHub 地址",
      "link": "https://github.com/musecode-dev/musedoc"
    }]
  },
  "features": [{
    "title": "专注内容",
    "details": "只需 Markdown 即可轻松创建美观的文档站点。",
    "icon": "📝"
  }, {
    "title": "Vite: 极速的开发响应速度",
    "details": "基于 Vite 构建，开发时的响应速度极快，即时的热更新，带给你极致的开发体验。",
    "icon": "🚀"
  }, {
    "title": "MDX: Markdown & React 组件来写内容",
    "details": "MDX 是一种强大的方式来写内容。你可以在 Markdown 中使用 React 组件。",
    "icon": "📦"
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
    "details": "通过其扩展机制，可以轻松的扩展主题 UI 和构建能力。",
    "icon": "🎨"
  }]
};
const toc = [];
function _createMdxContent(props) {
  return jsx(Fragment, {});
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, {
    ...props,
    children: jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}
export {
  MDXContent as default,
  frontmatter,
  toc
};
