import { dirname, join } from 'path';
import fs from 'fs-extra';
import { build as viteBuild, InlineConfig } from 'vite';
// import pluginReact from '@vitejs/plugin-react';
import { RollupOutput } from 'rollup';
import {
  CLIENT_ENTRY_PATH,
  MASK_SPLITTER,
  SERVER_ENTRY_PATH,
  CLIENT_OUTPUT,
  EXTERNALS,
  PACKAGE_ROOT
} from './constants';
import { SiteConfig } from '../shared/types';
// import { pluginConfig } from './plugin-musedoc/config';
import { createVitePlugins } from './vitePlugins';
import { Route } from 'node/plugin-routes';
import { RenderResult } from '../runtime/ssr-entry';
import { HelmetData } from 'react-helmet-async';

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => ({
    mode: 'production',
    root,
    // plugins: [
    //   // pluginReact(),
    //   pluginConfig(config)
    // ],
    plugins: await createVitePlugins(config, undefined, isServer),
    ssr: {
      // 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ['react-router-dom', 'lodash-es']
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : join(root, 'build'),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
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

    const publicDir = join(root, 'public');
    if (fs.pathExistsSync(publicDir)) {
      await fs.copy(publicDir, join(root, CLIENT_OUTPUT));
    }

    const vendorsDir = join(PACKAGE_ROOT, 'vendors');
    if (fs.pathExistsSync(vendorsDir)) {
      await fs.copy(vendorsDir, join(root, CLIENT_OUTPUT));
    }

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

async function buildIslands(
  root: string,
  islandPathToMap: Record<string, string>
) {
  // 根据 islandPathToMap 拼接模块代码内容
  const islandsInjectCode = `
    ${Object.entries(islandPathToMap)
      .map(
        ([islandName, islandPath]) => `
      import { ${islandName} } from '${islandPath};'
    `
      )
      .join('')}

    window.ISLANDS = { ${Object.keys(islandPathToMap).join(',')} };
    window.ISLAND_PROPS = JSON.parse(
      document.getElementById('island-props').textContent
    );
  `;

  const injectId = 'island:inject';

  return viteBuild({
    mode: 'production',
    esbuild: {
      jsx: 'automatic'
    },
    build: {
      // 输出目录
      outDir: join(root, '.temp'),
      rollupOptions: {
        input: injectId,
        external: EXTERNALS
      }
    },
    plugins: [
      // 加载拼接的 Islands 注册模块的代码
      {
        name: 'island:inject',
        enforce: 'post',
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
        generateBundle(_, bundle) {
          for (const name in bundle) {
            if (bundle[name].type === 'asset') {
              delete bundle[name];
            }
          }
        }
      }
    ]
  });
}

export async function renderPages(
  render: (pagePath: string, helmetContext: object) => RenderResult,
  routes: Route[],
  root: string,
  clientBundle: RollupOutput
) {
  console.log('Rendering page in server side...');

  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );

  await Promise.all(
    [
      ...routes,
      {
        path: '/404'
      }
    ].map(async (route) => {
      const routePath = route.path;

      const helmetContext = {
        context: {}
      } as HelmetData;

      const {
        appHtml,
        islanToPathMap,
        islandProps = []
      } = await render(routePath, helmetContext);

      const styleAssets = clientBundle.output.filter(
        (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('css')
      );

      const islandBundle = await buildIslands(root, islanToPathMap);
      const islandsCode = (islandBundle as RollupOutput).output[0].code;
      const normalizeVendorFilename = (fileName: string) =>
        fileName.replace(/\//g, '_') + '.js';

      const { helmet } = helmetContext.context;

      const html = `
        <!DOCTYPE html>
          <html lang="en">
    
          <head>
            <meta charset="UTF-8">
            <title>Document</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${helmet?.title?.toString() || ''}
            ${helmet?.meta?.toString() || ''}
            ${helmet?.link?.toString() || ''}
            ${helmet?.style?.toString() || ''}
            <meta name="description" content="xxx">
              ${styleAssets
                .map(
                  (item) => `
                <link rel="stylesheet" href="/${item.fileName}">
              `
                )
                .join('\n')}
            </meta>
            <script type="importmap">
                {
                  "imports": {
                    ${EXTERNALS.map(
                      (name) => `"${name}": "/${normalizeVendorFilename(name)}"`
                    ).join(',')}
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

      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
    })
  );

  await fs.remove(join(root, '.temp'));
}

export async function build(root = process.cwd(), config: SiteConfig) {
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  // 2. 引入 ssr-entry 模块
  // const { render } = require(serverEntryPath)
  const { render, routes } = await import(serverEntryPath);
  // 3. 服务端渲染，产出 HTML
  try {
    await renderPages(render, routes, root, clientBundle);
  } catch (e) {
    console.log('Render page error.\n', e);
  }
}
