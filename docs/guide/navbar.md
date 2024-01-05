# 导航栏模块

导航栏对一个网站来说非常重要，它可以让用户快速的在网站的不同页面之间进行跳转，也可以让用户快速的找到网站的一些重要信息。

## 自定义导航菜单

你可以在 `themeConfig.nav` 中添加自定义的导航菜单，配置为一个数组，如下：

```js
import { defineConfig } from 'musedoc';

export default defineConfig({
  themeConfig: {
    nav: []
  }
});
```

导航栏配置为一个数组，数组中的每一项都是一个 `NavItem` 对象，它具有以下类型：

```ts
export type NavItem = NavItemWithLink | NavItemWithChildren;
```

也就是说，每个导航栏元素( `NavItem` )可以是一个链接( `NavItemWithLink` )，也可以是一个包含子元素的导航栏组( `NavItemWithChildren` )。

### NavItemWithLink

```ts
export interface NavItemWithLink {
  text: string;
  link: string;
  activeMatch?: string;
}
```

其中各项属性的含义如下:

- `text` - 导航栏文本
- `link` - 导航栏链接

### NavItemWithChildren

```ts
export interface NavItemWithChildren {
  text: string;
  items: NavItem[];
}
```

其中各项属性的含义如下:

- `text` - 导航栏文本
- `items` - 子导航栏元素

### 示例

```js
import { defineConfig } from 'musedoc';

export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: '更多链接',
        items: [
          {
            text: 'Github',
            link: 'https://github.com/musecode-dev/musedoc',
          },
        ]
      }
    ]
  }
});
```