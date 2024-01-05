import { jsx, jsxs, Fragment } from "react/jsx-runtime";
const frontmatter = void 0;
const toc = [{
  "id": "为什么选择-musedoc",
  "text": "为什么选择 MuseDoc?",
  "depth": 2
}, {
  "id": "1-启动-dev-server",
  "text": "1. 启动 Dev Server",
  "depth": 2
}, {
  "id": "2-生产环境构建",
  "text": "2. 生产环境构建",
  "depth": 2
}, {
  "id": "3-本地预览产物",
  "text": "3. 本地预览产物",
  "depth": 2
}];
const title = "快速开始";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    div: "div",
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsxs(_components.h1, {
      id: "快速开始",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#快速开始",
        children: "#"
      }), "快速开始"]
    }), "\n", jsxs(_components.h2, {
      id: "为什么选择-musedoc",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#为什么选择-musedoc",
        children: "#"
      }), "为什么选择 MuseDoc?"]
    }), "\n", jsxs(_components.p, {
      children: ["🏝️ MuseDoc 是一个基于 Vite、React 和 MDX 的静态站点生成器。它的特点是", jsx(_components.strong, {
        children: "简单"
      }), "、", jsx(_components.strong, {
        children: "强大"
      }), "且", jsx(_components.strong, {
        children: "高性能"
      }), "，旨在帮助你以最少的配置专注于编写和部署静态站点。它主要具有以下功能："]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsxs(_components.li, {
        children: [jsx(_components.strong, {
          children: "开发体验好"
        }), ": 基于 Vite 进行构建，启动和热更新速度极快。"]
      }), "\n", jsxs(_components.li, {
        children: [jsx(_components.strong, {
          children: "语法灵活"
        }), ": 内置 MDX 支持，也就是说你可以在 Markdown 中使用 React 组件。"]
      }), "\n", jsxs(_components.li, {
        children: [jsx(_components.strong, {
          children: "高性能"
        }), ": 基于", jsx(_components.a, {
          href: "https://jasonformat.com/islands-architecture/",
          children: "孤岛架构"
        }), ", 实现了 Partial Hydration，意味着更少的客户端 JavaScript 和更少的运行时开销。"]
      }), "\n"]
    }), "\n", jsxs(_components.h2, {
      id: "1-启动-dev-server",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#1-启动-dev-server",
        children: "#"
      }), "1. 启动 Dev Server"]
    }), "\n", jsx(_components.p, {
      children: "通过如下命令启动本地开发服务:"
    }), "\n", jsxs(_components.div, {
      className: "language-bash",
      children: [jsx(_components.span, {
        className: "lang",
        children: "bash"
      }), jsx(_components.pre, {
        className: "shiki nord",
        style: {
          backgroundColor: "#2e3440ff"
        },
        tabIndex: "0",
        children: jsxs(_components.code, {
          children: [jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "musedoc"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "dev"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "docs"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.p, {
      children: ["这样 MuseDoc 将在 ", jsx(_components.a, {
        href: "http://localhost:5173",
        children: "http://localhost:5173"
      }), " 启动开发服务。"]
    }), "\n", jsxs(_components.h2, {
      id: "2-生产环境构建",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#2-生产环境构建",
        children: "#"
      }), "2. 生产环境构建"]
    }), "\n", jsx(_components.p, {
      children: "通过如下命令构建生产环境的产物:"
    }), "\n", jsxs(_components.div, {
      className: "language-bash",
      children: [jsx(_components.span, {
        className: "lang",
        children: "bash"
      }), jsx(_components.pre, {
        className: "shiki nord",
        style: {
          backgroundColor: "#2e3440ff"
        },
        tabIndex: "0",
        children: jsxs(_components.code, {
          children: [jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "musedoc"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "build"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "docs"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.p, {
      children: ["默认情况下，MuseDoc 将会把产物打包到 ", jsx(_components.code, {
        children: "doc/dist"
      }), " 目录。"]
    }), "\n", jsxs(_components.h2, {
      id: "3-本地预览产物",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#3-本地预览产物",
        children: "#"
      }), "3. 本地预览产物"]
    }), "\n", jsx(_components.p, {
      children: "通过如下命令启动本地预览服务:"
    }), "\n", jsxs(_components.div, {
      className: "language-bash",
      children: [jsx(_components.span, {
        className: "lang",
        children: "bash"
      }), jsx(_components.pre, {
        className: "shiki nord",
        style: {
          backgroundColor: "#2e3440ff"
        },
        tabIndex: "0",
        children: jsxs(_components.code, {
          children: [jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "musedoc"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "preview"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "docs"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.p, {
      children: ["这样 MuseDoc 将在 ", jsx(_components.a, {
        href: "http://localhost:5173",
        children: "http://localhost:5173"
      }), " 启动预览服务。"]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, {
    ...props,
    children: jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default,
  frontmatter,
  title,
  toc
};
