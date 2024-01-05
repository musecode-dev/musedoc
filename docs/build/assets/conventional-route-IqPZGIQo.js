import { jsx, jsxs, Fragment } from "react/jsx-runtime";
const frontmatter = void 0;
const toc = [{
  "id": "什么是约定式路由",
  "text": "什么是约定式路由",
  "depth": 2
}, {
  "id": "映射规则",
  "text": "映射规则",
  "depth": 2
}];
const title = "约定式路由";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    blockquote: "blockquote",
    code: "code",
    div: "div",
    h1: "h1",
    h2: "h2",
    p: "p",
    pre: "pre",
    span: "span",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsxs(_components.h1, {
      id: "约定式路由",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#约定式路由",
        children: "#"
      }), "约定式路由"]
    }), "\n", jsxs(_components.h2, {
      id: "什么是约定式路由",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#什么是约定式路由",
        children: "#"
      }), "什么是约定式路由"]
    }), "\n", jsx(_components.p, {
      children: "MuseDoc 使用的是文件系统路由，页面的文件路径会简单的映射为路由路径，这样会让整个项目的路由非常直观。"
    }), "\n", jsxs(_components.p, {
      children: ["例如，如果在 ", jsx(_components.code, {
        children: "docs"
      }), " 目录中有一个名为 ", jsx(_components.code, {
        children: "foo.md"
      }), " 的文件，则该文件的路由路径将是 ", jsx(_components.code, {
        children: "/foo"
      }), "。"]
    }), "\n", jsxs(_components.h2, {
      id: "映射规则",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#映射规则",
        children: "#"
      }), "映射规则"]
    }), "\n", jsx(_components.p, {
      children: "MuseDoc 会自动扫描根目录和所有子目录，并将文件路径映射到路由路径。例如，如果你有以下的文件结构："
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
          children: [jsx(_components.span, {
            className: "line",
            children: jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "docs"
            })
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "├──"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "foo"
            })]
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "│"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: "   "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "└──"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "bar.md"
            })]
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "└──"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "foo.md"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.blockquote, {
      children: ["\n", jsxs(_components.p, {
        children: ["动脚本是 ", jsx(_components.code, {
          children: "musedoc dev docs"
        }), "，所以根目录是 ", jsx(_components.code, {
          children: "docs"
        }), "。"]
      }), "\n"]
    }), "\n", jsxs(_components.p, {
      children: ["那么 ", jsx(_components.code, {
        children: "bar.md"
      }), " 的路由路径会是 ", jsx(_components.code, {
        children: "/foo/bar"
      }), "，", jsx(_components.code, {
        children: "foo.md"
      }), " 的路由路径会是 ", jsx(_components.code, {
        children: "/foo"
      }), "。"]
    }), "\n", jsx(_components.p, {
      children: "具体映射规则如下："
    }), "\n", jsxs(_components.table, {
      children: [jsx(_components.thead, {
        children: jsxs(_components.tr, {
          children: [jsx(_components.th, {
            children: "文件路径"
          }), jsx(_components.th, {
            children: "路由路径"
          })]
        })
      }), jsxs(_components.tbody, {
        children: [jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: jsx(_components.code, {
              children: "index.md"
            })
          }), jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/"
            })
          })]
        }), jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/foo.md"
            })
          }), jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/foo"
            })
          })]
        }), jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/foo/bar.md"
            })
          }), jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/foo/bar"
            })
          })]
        }), jsxs(_components.tr, {
          children: [jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/zoo/index.md"
            })
          }), jsx(_components.td, {
            children: jsx(_components.code, {
              children: "/zoo"
            })
          })]
        })]
      })]
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
