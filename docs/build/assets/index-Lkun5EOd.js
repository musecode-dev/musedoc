import { j as jsxRuntimeExports } from "./client-entry-_D9QmcCh.js";
const frontmatter = {
  "title": "musedoc"
};
const toc = [{
  "id": "autolink",
  "text": "Autolink",
  "depth": 2
}, {
  "id": "三级标题",
  "text": "三级标题",
  "depth": 3
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    div: "div",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    p: "p",
    pre: "pre",
    span: "span",
    ...props.components
  };
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [jsxRuntimeExports.jsxs(_components.h1, {
      id: "gfm",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#gfm",
        children: "#"
      }), "GFM"]
    }), "\n", jsxRuntimeExports.jsxs(_components.h2, {
      id: "autolink",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#autolink",
        children: "#"
      }), "Autolink"]
    }), "\n", jsxRuntimeExports.jsxs(_components.h3, {
      id: "三级标题",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#三级标题",
        children: "#"
      }), "三级标题"]
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: ["literals ", jsxRuntimeExports.jsx(_components.a, {
        href: "http://www.example.com",
        children: "www.example.com"
      }), ", ", jsxRuntimeExports.jsx(_components.a, {
        href: "https://example.com",
        children: "https://example.com"
      }), ", and ", jsxRuntimeExports.jsx(_components.a, {
        href: "mailto:contact@example.com",
        children: "contact@example.com"
      }), "."]
    }), "\n", jsxRuntimeExports.jsxs(_components.div, {
      className: "language-shell",
      children: [jsxRuntimeExports.jsx(_components.span, {
        className: "lang",
        children: "shell"
      }), jsxRuntimeExports.jsx(_components.pre, {
        className: "shiki nord",
        style: {
          backgroundColor: "#2e3440ff"
        },
        tabIndex: "0",
        children: jsxRuntimeExports.jsxs(_components.code, {
          children: [jsxRuntimeExports.jsxs(_components.span, {
            className: "line",
            children: [jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "console.log(124"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: ")"
            })]
          }), "\n", jsxRuntimeExports.jsxs(_components.span, {
            className: "line",
            children: [jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "console.log(123"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: ")"
            })]
          }), "\n", jsxRuntimeExports.jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, {
    ...props,
    children: jsxRuntimeExports.jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default,
  frontmatter,
  toc
};
