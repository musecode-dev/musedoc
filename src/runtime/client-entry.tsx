import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App, initPageData } from './app';
import { DataContext } from './hooks';
import { ComponentType } from 'react';
import { HelmetProvider } from 'react-helmet-async';

declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<unknown>>;
    ISLAND_PROPS: unknown[];
  }
}

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  if (import.meta.env.DEV) {
    // 初始化 PageData
    const pageData = await initPageData(location.pathname);
    createRoot(containerEl).render(
      <HelmetProvider>
        <DataContext.Provider value={pageData}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataContext.Provider>
      </HelmetProvider>
    );
  } else {
    // 生产环境下的 Partial Hydration
    const islands = document.querySelectorAll('[__island]');
    if (islands.length === 0) {
      return;
    }
    for (const island of islands) {
      const [id, index] = island.getAttribute('__island').split(':');
      const Element = window.ISLANDS[id];
      hydrateRoot(island, <Element {...window.ISLAND_PROPS[index]} />);
    }
  }
}

renderInBrowser();
