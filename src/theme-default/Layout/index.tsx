// import { useState } from 'react';
// import { Content } from '@runtime';
import { Nav } from '../components/Nav';
import { usePageData } from '../../runtime';
import '../style/base.css';
import '../style/var.css';
import 'uno.css';
import { HomeLayout } from './HomeLayout';

export function Layout() {
  const pageData = usePageData();
  // 获取 pageType
  const { pageType } = pageData;
  // 根据 pageType 分发不同的页面内容
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <div>doc</div>;
    } else {
      return <div>404</div>;
    }
  };
  return (
    <div>
      {<Nav />}
      {getContent()}
    </div>
  );
}
