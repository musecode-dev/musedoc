import { jsx, jsxs, Fragment } from "react/jsx-runtime";
const frontmatter = void 0;
const toc = [{
  "id": "导入静态资源",
  "text": "导入静态资源",
  "depth": 2
}, {
  "id": "公共资源",
  "text": "公共资源",
  "depth": 2
}];
const title = "静态资源处理";
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
    ul: "ul",
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsxs(_components.h1, {
      id: "静态资源处理",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#静态资源处理",
        children: "#"
      }), "静态资源处理"]
    }), "\n", jsxs(_components.h2, {
      id: "导入静态资源",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#导入静态资源",
        children: "#"
      }), "导入静态资源"]
    }), "\n", jsxs(_components.p, {
      children: ["你可以在 ", jsx(_components.code, {
        children: "markdown"
      }), "（或 ", jsx(_components.code, {
        children: "mdx"
      }), "）文件中导入静态资源。相对路径和绝对路径都是支持的，例如，如果在 markdown 同级目录有一张图片，你可以像这样引用它："]
    }), "\n", jsxs(_components.div, {
      className: "language-mdx",
      children: [jsx(_components.span, {
        className: "lang",
        children: "mdx"
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
                color: "#A3BE8C"
              },
              children: "![](./musedoc.png)"
            })
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.p, {
      children: ["当然，在 ", jsx(_components.code, {
        children: "mdx"
      }), " 文件中你也可以直接使用 img 标签："]
    }), "\n", jsxs(_components.div, {
      className: "language-mdx",
      children: [jsx(_components.span, {
        className: "lang",
        children: "mdx"
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
                color: "#81A1C1"
              },
              children: "<img"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#8FBCBB"
              },
              children: "src"
            }), jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "="
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: '"'
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "./musedoc.png"
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: '"'
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "/>"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsx(_components.p, {
      children: "MuseDoc 将会根据 mdx 路径和图片路径，自动找到图片并响应给浏览器。"
    }), "\n", jsx(_components.p, {
      children: "另一方面，也可以使用绝对路径导入静态资源。这样，MuseDoc 将会先后在两个地方查找文件："
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsxs(_components.li, {
        children: ["项目根目录，比如启动命令为 ", jsx(_components.code, {
          children: "musedoc dev docs"
        }), "，那么根目录就是 ", jsx(_components.code, {
          children: "docs"
        })]
      }), "\n", jsxs(_components.li, {
        children: ["项目根目录 ", jsx(_components.code, {
          children: "public"
        }), " 文件夹"]
      }), "\n"]
    }), "\n", jsxs(_components.p, {
      children: ["例如，如果根目录是 ", jsx(_components.code, {
        children: "docs"
      }), " 并且你有一个文件 ", jsx(_components.code, {
        children: "docs/public/musedoc.png"
      }), "，你可以像这样引用它："]
    }), "\n", jsxs(_components.div, {
      className: "language-mdx",
      children: [jsx(_components.span, {
        className: "lang",
        children: "mdx"
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
                color: "#A3BE8C"
              },
              children: "![](/musedoc.png)"
            })
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.p, {
      children: ["同时，如果你有一个文件 ", jsx(_components.code, {
        children: "docs/assets/musedoc.png"
      }), "，你可以像这样引用它："]
    }), "\n", jsxs(_components.div, {
      className: "language-mdx",
      children: [jsx(_components.span, {
        className: "lang",
        children: "mdx"
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
                color: "#A3BE8C"
              },
              children: "![](/assets/musedoc.png)"
            })
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.h2, {
      id: "公共资源",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#公共资源",
        children: "#"
      }), "公共资源"]
    }), "\n", jsxs(_components.p, {
      children: ["上文提到过，你可以把你的静态资源放在 ", jsx(_components.code, {
        children: "public"
      }), " 目录中，MuseDoc 将自动在 ", jsx(_components.code, {
        children: "public"
      }), " 目录寻找资源。在生产环境中，\nMuseDoc 会将 ", jsx(_components.code, {
        children: "public"
      }), " 目录中的所有文件复制到产物目录（", jsx(_components.code, {
        children: "dist"
      }), "）。"]
    }), "\n", jsx(_components.p, {
      children: "比如:"
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
              children: "public"
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
              children: "musedoc.png"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
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
