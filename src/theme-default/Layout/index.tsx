// import { useState } from 'react';
// import { Content } from '@runtime';
import { usePageData } from '../../runtime';

export function Layout() {
  const pageData = usePageData();
  // 获取 pageType
  const { pageType } = pageData;
  // 根据 pageType 分发不同的页面内容
  const getContent = () => {
    if (pageType === 'home') {
      return <div>Home</div>;
    } else if (pageType === 'doc') {
      return <div>doc</div>;
    } else {
      return <div>404</div>;
    }
  };
  return <div>{getContent()}</div>;
}
