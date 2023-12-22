import { matchRoutes } from 'react-router-dom';
import { routes } from 'musedoc:routes';
import siteData from 'musedoc:site-data';
import { Layout } from '../theme-default';
import { PageData } from '../shared/types';

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath);
  if (matched) {
    // Preload route component
    const moduleInfo = await matched[0].route.preload();
    return {
      pageType: 'doc',
      siteData,
      frontMatter: moduleInfo.frontMatter,
      pagePath: routePath
    };
  }

  return {
    pageType: '404',
    siteData,
    frontMatter: {},
    pagePath: routePath
  };
}

export function App() {
  return <Layout />;
}
