import pluginReact from '@vitejs/plugin-react';
import { pluginIndexHtml } from './plugin-musedoc/indexHtml';
import { pluginConfig } from './plugin-musedoc/config';
import { pluginRoutes } from './plugin-routes';
import { createPluginMdx } from './plugin-mdx';
import { SiteConfig } from 'shared/types';

export function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    pluginReact(),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root
    }),
    createPluginMdx()
  ];
}
