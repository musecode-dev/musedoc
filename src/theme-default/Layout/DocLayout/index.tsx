import { useLocation } from 'react-router-dom';
import { usePageData } from '@runtime';
import { Sidebar } from '../../components/Sidebar';

export function DocLayout() {
  const { siteData } = usePageData();
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
    </div>
  );
}
