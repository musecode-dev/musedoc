import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import sideData from 'musedoc:site-data';
import { App } from './App';

console.log(sideData);

function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

renderInBrowser();
