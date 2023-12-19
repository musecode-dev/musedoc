import { createServer } from 'vite';
// import pluginReact from '@vitejs/plugin-react';
// import { pluginIndexHtml } from './plugin-musedoc/indexHtml';
import { resolveConfig } from './config';
// import { pluginConfig } from './plugin-musedoc/config';
// import { pluginRoutes } from './plugin-routes';
// import { PACKAGE_ROOT } from './constants';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');

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
