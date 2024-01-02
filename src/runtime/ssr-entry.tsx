import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App, initPageData } from './app';
import { DataContext } from './hooks';

export interface RenderResult {
  appHtml: string;
  propsData: unknown[];
  islanToPathMap: Record<string, string>;
}

// For ssr component render
// 增加路由传参
export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath);
  const { clearIslandData, data } = await import('./jsx-runtime');
  // islands 组件相关数据
  const { islandProps, islanToPathMap } = data;
  clearIslandData();

  const appHtml = renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );

  return {
    appHtml,
    islandProps,
    islanToPathMap
  };
}

// 导出路由数据
export { routes } from 'musedoc:routes';
