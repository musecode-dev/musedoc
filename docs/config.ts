import { defineConfig } from '../dist'

export default defineConfig({
  title: 'Hello MuseDoc',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/getting-started' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            {
              text: '快速开始',
              link: '/guide/getting-started',
            },
            {
              text: '配置站点',
              link: '/guide/configure-site'
            },
          ]
        },
        {
          text: '架构',
          items: [
            {
              text: 'MPA 和 SPA 对比',
              link: '/guide/spa-vs-mpa'
            },
          ]
        },
        {
          text: '基础功能',
          items: [
            {
              text: '约定式路由',
              link: '/guide/conventional-route'
            },
            {
              text: '使用 MDX',
              link: '/guide/use-mdx'
            },
            {
              text: '静态资源处理',
              link: '/guide/static-assets'
            },
          ]
        },
        {
          text: '默认主题功能',
          items: [
            {
              text: '导航栏模块',
              link: '/guide/navbar'
            },
            {
              text: '主页',
              link: '/guide/home-page'
            },
          ]
        },
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present MuseCode'
    }
  }
})