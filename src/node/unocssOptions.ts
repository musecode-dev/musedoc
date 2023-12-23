import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind(), presetIcons()],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--musedoc-c-divider-light)'
      })
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '2px',
        'background-color': 'var(--musedoc-c-divider-light)',
        content: '""'
      }
    ]
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center'
  },
  theme: {
    colors: {
      brandLight: 'var(--musedoc-c-brand-light)',
      brandDark: 'var(--musedoc-c-brand-dark)',
      brand: 'var(--musedoc-c-brand)',
      text: {
        1: 'var(--musedoc-c-text-1)',
        2: 'var(--musedoc-c-text-2)',
        3: 'var(--musedoc-c-text-3)',
        4: 'var(--musedoc-c-text-4)'
      },
      divider: {
        default: 'var(--musedoc-c-divider)',
        light: 'var(--musedoc-c-divider-light)',
        dark: 'var(--musedoc-c-divider-dark)'
      },
      gray: {
        light: {
          1: 'var(--musedoc-c-gray-light-1)',
          2: 'var(--musedoc-c-gray-light-2)',
          3: 'var(--musedoc-c-gray-light-3)',
          4: 'var(--musedoc-c-gray-light-4)'
        }
      },
      bg: {
        default: 'var(--musedoc-c-bg)',
        soft: 'var(--musedoc-c-bg-soft)',
        mute: 'var(--musedoc-c-bg-mute)'
      }
    }
  }
};

export default options;
