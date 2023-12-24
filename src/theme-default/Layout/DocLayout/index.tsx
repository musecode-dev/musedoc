import { useLocation } from 'react-router-dom';
import { usePageData, Content } from '@runtime';
import { Sidebar } from '../../components/Sidebar';
import { Aside } from '../../components/Aside';
import { DocFooter } from '../../components/DocFooter';
import styles from './index.module.scss';

export function DocLayout() {
  const { siteData, toc } = usePageData();
  const sidebarData = siteData?.themeConfig?.sidebar || {};
  const { pathname } = useLocation();

  const mathcedSidebarKey = Object.keys(sidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });
  const matchedSidebar = sidebarData[mathcedSidebarKey];

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
      <div className={styles.content} flex="~">
        <div className={styles.docContent}>
          <div className="musedoc-doc">
            <Content />
          </div>
          <DocFooter />
        </div>
        <div className={styles.asideContainer}>
          <Aside headers={toc} __musedoc />
        </div>
      </div>
    </div>
  );
}
