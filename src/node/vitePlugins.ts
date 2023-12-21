import pluginReact from '@vitejs/plugin-react';
import { pluginIndexHtml } from './plugin-musedoc/indexHtml';
import { pluginConfig } from './plugin-musedoc/config';
import { pluginRoutes } from './plugin-routes';
import { createPluginMdx } from './plugin-mdx';
import { SiteConfig } from 'shared/types';

export async function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>,
  isSSR = false
) {
  return [
    pluginIndexHtml(),
    pluginReact(),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    await createPluginMdx()
  ];
}
