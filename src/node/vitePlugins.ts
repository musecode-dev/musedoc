import pluginReact from '@vitejs/plugin-react';
import pluginUnocss from 'unocss/vite';
import { pluginIndexHtml } from './plugin-musedoc/indexHtml';
import { pluginConfig } from './plugin-musedoc/config';
import { pluginRoutes } from './plugin-routes';
import { createPluginMdx } from './plugin-mdx';
import { SiteConfig } from 'shared/types';
import unocssOptions from './unocssOptions';

export async function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>,
  isSSR = false
) {
  return [
    pluginUnocss(unocssOptions),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    await createPluginMdx()
  ];
}
