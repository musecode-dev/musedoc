import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App, initPageData } from './app';
import { DataContext } from './hooks';

// For ssr component render
// 增加路由传参
export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath);

  return renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
}

// 导出路由数据
export { routes } from 'musedoc:routes';
