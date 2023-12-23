import { defineConfig } from '../dist'

export default defineConfig({
  title: 'Hello MuseDoc',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide' }
    ]
  }
})