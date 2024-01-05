import { jsx, jsxs, Fragment } from "react/jsx-runtime";
const frontmatter = void 0;
const toc = [{
  "id": "markdown",
  "text": "Markdown",
  "depth": 2
}, {
  "id": "使用组件",
  "text": "使用组件",
  "depth": 2
}, {
  "id": "front-matter",
  "text": "Front Matter",
  "depth": 2
}];
const title = "使用 MDX";
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
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsxs(_components.h1, {
      id: "使用-mdx",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#使用-mdx",
        children: "#"
      }), "使用 MDX"]
    }), "\n", jsxs(_components.p, {
      children: ["MuseDoc 支持 ", jsx(_components.a, {
        href: "https://mdxjs.com/",
        children: "Mdx"
      }), "，这是一种功能强大的内容开发方式，你可以在 Markdown 文件中导入和使用 React 组件。"]
    }), "\n", jsxs(_components.h2, {
      id: "markdown",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#markdown",
        children: "#"
      }), "Markdown"]
    }), "\n", jsx(_components.p, {
      children: "MDX 是 Markdown 的超集，这意味着可以像往常一样编写 Markdown 文件。例如："
    }), "\n", jsxs(_components.div, {
      className: "language-md",
      children: [jsx(_components.span, {
        className: "lang",
        children: "md"
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
              children: "#"
            }), jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: " Hello World"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.h2, {
      id: "使用组件",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#使用组件",
        children: "#"
      }), "使用组件"]
    }), "\n", jsxs(_components.p, {
      children: ["当你想在 Markdown 文件中使用 React 组件时，你应该使用 ", jsx(_components.code, {
        children: ".mdx"
      }), " 扩展名来命名你的文件。例如："]
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
                color: "#D8DEE9FF"
              },
              children: "// docs/index.mdx"
            })
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "import"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "{"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "CustomComponent"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "}"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "from"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "'"
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "./custom"
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "'"
            }), jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: ";"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: "# "
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "Hello"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "World"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "<"
            }), jsx(_components.span, {
              style: {
                color: "#8FBCBB"
              },
              children: "CustomComponent"
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
    }), "\n", jsxs(_components.h2, {
      id: "front-matter",
      children: [jsx(_components.a, {
        className: "header-anchor",
        href: "#front-matter",
        children: "#"
      }), "Front Matter"]
    }), "\n", jsx(_components.p, {
      children: "你可以在 Markdown 文件的开头添加 Front Matter，它是一个 YAML 格式的对象，用于定义一些元数据。例如："
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
              children: "---"
            })
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "title"
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: ":"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "Hello World"
            })]
          }), "\n", jsx(_components.span, {
            className: "line",
            children: jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "---"
            })
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.blockquote, {
      children: ["\n", jsx(_components.p, {
        children: "注意：默认情况下，MuseDoc 使用 h1 标题作为 html 的标题。"
      }), "\n"]
    }), "\n", jsx(_components.p, {
      children: "你还可以在正文中访问 Front Mattter 中定义的属性，例如："
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
              children: "---"
            })
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "title"
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: ":"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "Hello World"
            })]
          }), "\n", jsx(_components.span, {
            className: "line",
            children: jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "---"
            })
          }), "\n", jsx(_components.span, {
            className: "line"
          }), "\n", jsxs(_components.span, {
            className: "line",
            children: [jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "#"
            }), jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: " "
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "{"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "frontmatter"
            }), jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "."
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "title"
            }), jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "}"
            })]
          }), "\n", jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", jsxs(_components.p, {
      children: ["前面定义的属性将作为 ", jsx(_components.code, {
        children: "meta"
      }), " 属性传递给组件。所以最终输出将是："]
    }), "\n", jsxs(_components.div, {
      className: "language-html",
      children: [jsx(_components.span, {
        className: "lang",
        children: "html"
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
              children: "<h1>"
            }), jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: "Hello World"
            }), jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "</h1>"
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
