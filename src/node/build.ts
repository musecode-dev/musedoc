import { dirname, join } from 'path';
import fs from 'fs-extra';
import { build as viteBuild, InlineConfig } from 'vite';
// import pluginReact from '@vitejs/plugin-react';
import { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { SiteConfig } from '../shared/types';
// import { pluginConfig } from './plugin-musedoc/config';
import { createVitePlugins } from './vitePlugins';
import { Route } from 'node/plugin-routes';

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
        }
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
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

export async function renderPage(
  render: (pagePath: string) => string,
  routes: Route[],
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );

  console.log('Rendering page in server side...');

  await Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      const appHtml = await render(routePath);
      const html = `
        <!DOCTYPE html>
          <html lang="en">
    
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
    
          <body>
            <div id="root">${appHtml}</div>
            <script type="module" src="./${clientChunk?.fileName}"></script>
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
    await renderPage(render, routes, root, clientBundle);
  } catch (e) {
    console.log('Render page error.\n', e);
  }
}
