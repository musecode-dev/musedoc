import {
  __dirname,
  resolveConfig
} from "./chunk-F7KHFBVY.mjs";

// src/node/cli.ts
import { resolve } from "path";
import { cac } from "cac";

// src/node/dev.ts
import { createServer } from "vite";

// src/node/vitePlugins.ts
import pluginReact from "@vitejs/plugin-react";
import pluginUnocss from "unocss/vite";

// src/node/plugin-musedoc/indexHtml.ts
import path from "path";
import { readFile } from "fs/promises";

// src/node/constants/index.ts
import { join } from "path";
var PACKAGE_ROOT = join(__dirname, "..");
var DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");
var CLIENT_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);
var SERVER_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "ssr-entry.tsx"
);
var MD_REGEX = /\.mdx?$/;
var PUBLIC_DIR = "public";
var MASK_SPLITTER = "!!ISLAND!!";
var CLIENT_OUTPUT = "build";
var EXTERNALS = [
  "react",
  "react-dom",
  "react-dom/client",
  "react/jsx-runtime"
];

// src/node/plugin-musedoc/indexHtml.ts
function pluginIndexHtml() {
  return {
    name: "musedoc:index-html",
    apply: "serve",
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: path.join("/@fs", CLIENT_ENTRY_PATH)
            },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/plugin-musedoc/config.ts
import path2, { join as join2, relative } from "path";
import fs from "fs-extra";
import sirv from "sirv";
var SITE_DATA_ID = "musedoc:site-data";
function pluginConfig(config, restartServer) {
  return {
    name: "musedoc:config",
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return "\0" + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === "\0" + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id) => customWatchedFiles.some((file) => id.includes(file));
      if (include(ctx.file)) {
        console.log(
          `
${relative(config.root, ctx.file)} changed, restarting server...`
        );
        await restartServer();
      }
    },
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            "@runtime": join2(PACKAGE_ROOT, "src", "runtime", "index.ts")
          }
        },
        css: {
          modules: {
            localsConvention: "camelCaseOnly"
          }
        }
      };
    },
    configureServer(server) {
      const publicDir = path2.join(config.root, PUBLIC_DIR);
      if (fs.existsSync(publicDir)) {
        server.middlewares.use(sirv(publicDir));
      }
    }
  };
}

// src/node/plugin-routes/RouteService.ts
import path3 from "path";
import fastGlob from "fast-glob";
import { normalizePath } from "vite";
var RouteService = class {
  #scanDir;
  #routeData = [];
  constructor(scanDir) {
    this.#scanDir = scanDir;
  }
  async init() {
    const files = fastGlob.sync(["**/*.{js,jsx,ts,tsx,md,mdx}"], {
      cwd: this.#scanDir,
      absolute: true,
      ignore: ["**/node_modules/**", "**/build/**", "config.ts"]
    }).sort();
    files.forEach((file) => {
      const fileRelativePath = normalizePath(
        path3.relative(this.#scanDir, file)
      );
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }
  // 获取路由数据
  getRouteMeta() {
    return this.#routeData;
  }
  normalizeRoutePath(rawPath) {
    const routePath = rawPath.replace(/\.(.*)?$/, "").replace(/index$/, "");
    return routePath.startsWith("/") ? routePath : `/${routePath}`;
  }
  /**
   *
    import React from 'react';
    import loadable from '@loadable/component';
    const Route0 = loadable(() => import('TEST_DIR/a.mdx'));
    const Route1 = loadable(() => import('TEST_DIR/guide/b.mdx'));
    export const routes = [
      { path: '/a', element: React.createElement(Route0) },
      { path: '/guide/b', element: React.createElement(Route1) }
    ];
   */
  generateRoutesCode(ssr = false) {
    return `
      import React from 'react';
      ${!ssr && 'import loadable from "@loadable/component";'}

      ${this.#routeData.map((route, index) => {
      return ssr ? `import Route${index} from "${route.absolutePath}"` : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
    }).join("\n")}
      
      export const routes = [
        ${this.#routeData.map((route, index) => {
      return `{
              path: '${route.routePath}',
              element: React.createElement(Route${index}),
              preload: () => import('${route.absolutePath}')
          }`;
    }).join(",\n")}
      ]
    `;
  }
};

// src/node/plugin-routes/index.ts
var CONVENTIONAL_ROUTE_ID = "musedoc:routes";
function pluginRoutes(options2) {
  const routeService = new RouteService(options2.root);
  return {
    name: "musedoc:routes",
    async configResolved() {
      await routeService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return "\0" + id;
      }
    },
    load(id) {
      if (id === "\0" + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode(options2.isSSR || false);
      }
    }
  };
}

// src/node/plugin-mdx/pluginMdxRollup.ts
import pluginMdx from "@mdx-js/rollup";
import remarkPluginGFM from "remark-gfm";
import rehypePluginAutolinkHeadings from "rehype-autolink-headings";
import rehypePluginSlug from "rehype-slug";
import remarkPluginFrontmatter from "remark-frontmatter";
import remarkPluginMDXFrontMatter from "remark-mdx-frontmatter";
import shiki from "shiki";

// node_modules/.pnpm/unist-util-is@6.0.0/node_modules/unist-util-is/lib/index.js
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(test) {
    if (test === null || test === void 0) {
      return ok;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].apply(this, parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all);
  function all(node) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index === "number" ? index : void 0,
        parent || void 0
      )
    );
  }
}
function ok() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}

// node_modules/.pnpm/unist-util-visit-parents@6.0.1/node_modules/unist-util-visit-parents/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/.pnpm/unist-util-visit-parents@6.0.1/node_modules/unist-util-visit-parents/lib/index.js
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node, index, parents) {
    const value = (
      /** @type {Record<string, unknown>} */
      node && typeof node === "object" ? node : {}
    );
    if (typeof value.type === "string") {
      const name = (
        // `hast`
        typeof value.tagName === "string" ? value.tagName : (
          // `xast`
          typeof value.name === "string" ? value.name : void 0
        )
      );
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node, index, parents[parents.length - 1] || void 0)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if ("children" in node && node.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node
        );
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === void 0 ? empty : [value];
}

// node_modules/.pnpm/unist-util-visit@5.0.0/node_modules/unist-util-visit/lib/index.js
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = void 0;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    const index = parent ? parent.children.indexOf(node) : void 0;
    return visitor(node, index, parent);
  }
}

// src/node/plugin-mdx/rehypePlugins/preWrapper.ts
var rehypePluginPreWrapper = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && node.children[0]?.type === "element" && node.children[0]?.tagName === "code") {
        const codeNode = node.children[0];
        const codeClassName = codeNode.properties?.className?.toString() || "";
        const lang = codeClassName.split("-")[1];
        const clonedNode = {
          type: "element",
          tagName: "pre",
          children: node.children,
          properties: {}
        };
        node.tagName = "div";
        node.properties = node.properties || {};
        node.properties.className = codeClassName;
        node.children = [
          {
            type: "element",
            tagName: "span",
            properties: {
              className: "lang"
            },
            children: [
              {
                type: "text",
                value: lang
              }
            ]
          },
          clonedNode
        ];
      }
      return SKIP;
    });
  };
};

// src/node/plugin-mdx/rehypePlugins/shiki.ts
import { fromHtml } from "hast-util-from-html";
var rehypePluginShiki = ({ highlighter }) => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre" && node.children[0]?.type === "element" && node.children[0]?.tagName === "code") {
        const codeNode = node.children[0];
        const codeContent = codeNode.children[0].value;
        const codeClassName = codeNode.properties?.className?.toString() || "";
        const lang = codeClassName.split("-")[1];
        if (!lang) {
          return;
        }
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};

// src/node/plugin-mdx/remarkPlugins/toc.ts
import { slug } from "github-slugger";
import { parse } from "acorn";
var remarkPluginToc = () => {
  return (tree) => {
    const toc = [];
    let title = "";
    visit(tree, "heading", (node) => {
      if (!node.depth || !node.children) {
        return;
      }
      if (node.depth === 1) {
        title = node.children[0].value;
      }
      if (node.depth > 1 && node.depth < 5) {
        const originText = node.children.map((child) => {
          switch (child.type) {
            case "link":
              return child.children?.map((c) => c.value).join("");
            default:
              return child.value;
          }
        }).join("");
        const id = slug(originText);
        toc.push({
          id,
          text: originText,
          depth: node.depth
        });
      }
    });
    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)}`;
    tree.children.push({
      type: "mdxjsEsm",
      value: insertCode,
      data: {
        estree: parse(insertCode, {
          ecmaVersion: 2020,
          sourceType: "module"
        })
      }
    });
    if (title) {
      const insertedTitle = `export const title = '${title}'`;
      tree.children.push({
        type: "mdxjsEsm",
        value: insertedTitle,
        data: {
          estree: parse(insertedTitle, {
            ecmaVersion: 2020,
            sourceType: "module"
          })
        }
      });
    }
  };
};

// src/node/plugin-mdx/pluginMdxRollup.ts
async function pluginMdxRollup() {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontmatter,
      remarkPluginMDXFrontMatter,
      remarkPluginToc
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: "header-anchor"
          },
          content: {
            type: "text",
            value: "#"
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: "nord" })
        }
      ]
      // [rehypeHighlight, { aliases: { javascript: 'custom-script' } }]
    ]
  });
}

// src/node/plugin-mdx/pluginMdxHmr.ts
import assert from "assert";
function pluginMdxHMR() {
  let viteReactPlugin;
  return {
    name: "vite-plugin-mdx-hmr",
    apply: "serve",
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === "vite:react-babel"
      );
    },
    async transform(code, id, opts) {
      if (MD_REGEX.test(id) && !!viteReactPlugin) {
        assert(typeof viteReactPlugin.transform === "function");
        const result = await viteReactPlugin.transform?.call(
          this,
          code,
          id + ".jsx",
          opts
        );
        const selfAcceptCode = "import.meta.hot.accept();";
        if (typeof result === "object" && !result.code?.includes(selfAcceptCode)) {
          result.code += selfAcceptCode;
        }
        return result;
      }
    },
    handleHotUpdate(ctx) {
      if (/\.mdx?/.test(ctx.file)) {
        ctx.server.ws.send({
          type: "custom",
          event: "mdx-changed",
          data: {
            filePath: ctx.file
          }
        });
      }
    }
  };
}

// src/node/plugin-mdx/index.ts
async function createPluginMdx() {
  return [await pluginMdxRollup(), pluginMdxHMR()];
}

// src/node/unocssOptions.ts
import { presetAttributify, presetWind, presetIcons } from "unocss";
var options = {
  presets: [presetAttributify(), presetWind(), presetIcons()],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: "1px solid var(--musedoc-c-divider-light)"
      })
    ],
    [
      "menu-item-before",
      {
        "margin-right": "12px",
        "margin-left": "12px",
        width: "1px",
        height: "2px",
        "background-color": "var(--musedoc-c-divider-light)",
        content: '""'
      }
    ]
  ],
  shortcuts: {
    "flex-center": "flex justify-center items-center"
  },
  theme: {
    colors: {
      brandLight: "var(--musedoc-c-brand-light)",
      brandDark: "var(--musedoc-c-brand-dark)",
      brand: "var(--musedoc-c-brand)",
      text: {
        1: "var(--musedoc-c-text-1)",
        2: "var(--musedoc-c-text-2)",
        3: "var(--musedoc-c-text-3)",
        4: "var(--musedoc-c-text-4)"
      },
      divider: {
        default: "var(--musedoc-c-divider)",
        light: "var(--musedoc-c-divider-light)",
        dark: "var(--musedoc-c-divider-dark)"
      },
      gray: {
        light: {
          1: "var(--musedoc-c-gray-light-1)",
          2: "var(--musedoc-c-gray-light-2)",
          3: "var(--musedoc-c-gray-light-3)",
          4: "var(--musedoc-c-gray-light-4)"
        }
      },
      bg: {
        default: "var(--musedoc-c-bg)",
        soft: "var(--musedoc-c-bg-soft)",
        mute: "var(--musedoc-c-bg-mute)"
      }
    }
  }
};
var unocssOptions_default = options;

// src/node/babel-plugin-island.ts
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import { normalizePath as normalizePath2 } from "vite";
var babel_plugin_island_default = declare((api) => {
  api.assertVersion(7);
  const visitor = {
    // 访问 JSX 开始标签
    JSXOpeningElement(path6, state) {
      const name = path6.node.name;
      let bindingName = "";
      if (name.type === "JSXIdentifier") {
        bindingName = name.name;
      } else if (name.type === "JSXMemberExpression") {
        let object = name.object;
        while (t.isJSXMemberExpression(object)) {
          object = object.object;
        }
        bindingName = object.name;
      } else {
        return;
      }
      const binding = path6.scope.getBinding(bindingName);
      if (binding?.path.parent.type === "ImportDeclaration") {
        const source = binding.path.parent.source;
        const attributes = path6.container.openingElement.attributes;
        for (let i = 0; i < attributes.length; i++) {
          const name2 = attributes[i].name;
          if (name2?.name === "__island") {
            attributes[i].value = t.stringLiteral(
              `${source.value}${MASK_SPLITTER}${normalizePath2(
                state.filename || ""
              )}`
            );
          }
        }
      }
    }
  };
  return {
    name: "transform-jsx-island",
    visitor
  };
});

// src/node/vitePlugins.ts
import path4 from "path";
async function createVitePlugins(config, restartServer, isSSR = false) {
  return [
    pluginUnocss(unocssOptions_default),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: "automatic",
      jsxImportSource: isSSR ? path4.join(PACKAGE_ROOT, "src", "runtime") : "react",
      babel: {
        plugins: [babel_plugin_island_default]
      }
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    await createPluginMdx()
  ];
}

// src/node/dev.ts
async function createDevServer(root, restartServer) {
  const config = await resolveConfig(root, "serve", "development");
  return createServer({
    // root,
    // plugins: [
    //   pluginIndexHtml(),
    //   pluginReact({
    //     // jsxRuntime: 'automatic'
    //   }),
    //   pluginConfig(config, restartServer),
    //   pluginRoutes({
    //     root: config.root
    //   })
    // ]
    plugins: await createVitePlugins(config, restartServer)
    // server: {
    //   fs: {
    //     allow: [PACKAGE_ROOT]
    //   }
    // }
  });
}

// src/node/build.ts
import { dirname, join as join3 } from "path";
import fs2 from "fs-extra";
import { build as viteBuild } from "vite";
async function bundle(root, config) {
  const resolveViteConfig = async (isServer) => ({
    mode: "production",
    root,
    // plugins: [
    //   // pluginReact(),
    //   pluginConfig(config)
    // ],
    plugins: await createVitePlugins(config, void 0, isServer),
    ssr: {
      // 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ["react-router-dom", "lodash-es"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? join3(root, ".temp") : join3(root, "build"),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        },
        external: EXTERNALS
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(await resolveViteConfig(false)),
      // server build
      viteBuild(await resolveViteConfig(true))
    ]);
    const publicDir = join3(root, "public");
    if (fs2.pathExistsSync(publicDir)) {
      await fs2.copy(publicDir, join3(root, CLIENT_OUTPUT));
    }
    const vendorsDir = join3(PACKAGE_ROOT, "vendors");
    if (fs2.pathExistsSync(vendorsDir)) {
      await fs2.copy(vendorsDir, join3(root, CLIENT_OUTPUT));
    }
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
async function buildIslands(root, islandPathToMap) {
  const islandsInjectCode = `
    ${Object.entries(islandPathToMap).map(
    ([islandName, islandPath]) => `
      import { ${islandName} } from '${islandPath};'
    `
  ).join("")}

    window.ISLANDS = { ${Object.keys(islandPathToMap).join(",")} };
    window.ISLAND_PROPS = JSON.parse(
      document.getElementById('island-props').textContent
    );
  `;
  const injectId = "island:inject";
  return viteBuild({
    mode: "production",
    esbuild: {
      jsx: "automatic"
    },
    build: {
      // 输出目录
      outDir: join3(root, ".temp"),
      rollupOptions: {
        input: injectId,
        external: EXTERNALS
      }
    },
    plugins: [
      // 加载拼接的 Islands 注册模块的代码
      {
        name: "island:inject",
        enforce: "post",
        resolveId(id) {
          if (id.includes(MASK_SPLITTER)) {
            const [originId, importer] = id.split(MASK_SPLITTER);
            return this.resolve(originId, importer, { skipSelf: true });
          }
          if (id === injectId) {
            return id;
          }
        },
        load(id) {
          if (id === injectId) {
            return islandsInjectCode;
          }
        },
        // 对于 Islands Bundle，只需要 JS 即可，其它资源文件可以删除
        generateBundle(_, bundle2) {
          for (const name in bundle2) {
            if (bundle2[name].type === "asset") {
              delete bundle2[name];
            }
          }
        }
      }
    ]
  });
}
async function renderPages(render, routes, root, clientBundle) {
  console.log("Rendering page in server side...");
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  await Promise.all(
    [
      ...routes,
      {
        path: "/404"
      }
    ].map(async (route) => {
      const routePath = route.path;
      const helmetContext = {
        context: {}
      };
      const {
        appHtml,
        islanToPathMap,
        islandProps = []
      } = await render(routePath, helmetContext);
      const styleAssets = clientBundle.output.filter(
        (chunk) => chunk.type === "asset" && chunk.fileName.endsWith("css")
      );
      const islandBundle = await buildIslands(root, islanToPathMap);
      const islandsCode = islandBundle.output[0].code;
      const normalizeVendorFilename = (fileName2) => fileName2.replace(/\//g, "_") + ".js";
      const { helmet } = helmetContext.context;
      const html = `
        <!DOCTYPE html>
          <html lang="en">
    
          <head>
            <meta charset="UTF-8">
            <title>MuseDoc - \u7B80\u5355\u3001\u5F3A\u5927\u3001\u5FEB\u901F\u7684\u73B0\u4EE3\u5316 SSG \u6846\u67B6</title>
            <link rel="icon" href="https://doc.musecode.dev/favicon.ico">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${helmet?.title?.toString() || ""}
            ${helmet?.meta?.toString() || ""}
            ${helmet?.link?.toString() || ""}
            ${helmet?.style?.toString() || ""}
            <meta name="description" content="xxx">
              ${styleAssets.map(
        (item) => `
                <link rel="stylesheet" href="/${item.fileName}">
              `
      ).join("\n")}
            </meta>
            <script type="importmap">
                {
                  "imports": {
                    ${EXTERNALS.map(
        (name) => `"${name}": "/${normalizeVendorFilename(name)}"`
      ).join(",")}
                  }
                }
            </script>
          </head>
    
          <body>
            <div id="root">${appHtml}</div>
            <script type="module">${islandsCode}</script>
            <script type="module" src="./${clientChunk?.fileName}"></script>
            <script id="island-props">${JSON.stringify(islandProps)}</script>
          </body>
    
        </html>
      `.trim();
      const fileName = routePath.endsWith("/") ? `${routePath}index.html` : `${routePath}.html`;
      await fs2.ensureDir(join3(root, "build", dirname(fileName)));
      await fs2.writeFile(join3(root, "build", fileName), html);
    })
  );
  await fs2.remove(join3(root, ".temp"));
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = join3(root, ".temp", "ssr-entry.js");
  const { render, routes } = await import(serverEntryPath);
  try {
    await renderPages(render, routes, root, clientBundle);
  } catch (e) {
    console.log("Render page error.\n", e);
  }
}

// src/node/preview.ts
import compression from "compression";
import polka from "polka";
import path5 from "path";
import fs3 from "fs-extra";
import sirv2 from "sirv";
var DEFAULT_PORT = 4173;
async function preview(root, { port }) {
  const listenPort = port ?? DEFAULT_PORT;
  const outputDir = path5.resolve(root, "build");
  const notFoundPage = fs3.readFileSync(
    path5.resolve(outputDir, "404.html"),
    "utf-8"
  );
  const compress = compression();
  const serve = sirv2(outputDir, {
    etag: true,
    maxAge: 31536e3,
    immutable: true,
    setHeaders(res, pathname) {
      if (pathname.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    }
  });
  const onNoMatch = (req, res) => {
    res.statusCode = 404;
    res.end(notFoundPage);
  };
  polka({ onNoMatch }).use(compress, serve).listen(listenPort, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      `> Preview server is running at http://localhost:${listenPort}`
    );
  });
}

// src/node/cli.ts
var cli = cac("musedoc").version("0.0.1").help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const createServer2 = async () => {
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer2();
    });
    await server.listen();
    server.printUrls();
  };
  await createServer2();
});
cli.command("build [root]", "build for production").action(async (root) => {
  try {
    root = resolve(root);
    const config = await resolveConfig(root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.command("preview [root]", "preview production build").option("--port <port>", "port to use for preview server").action(async (root, { port }) => {
  try {
    root = resolve(root);
    await preview(root, { port });
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
