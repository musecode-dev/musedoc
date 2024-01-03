// import { useState } from 'react';
// import { Content } from '@runtime';
import { Nav } from '../components/Nav';
import { usePageData } from '../../runtime';
import '../styles/base.css';
import '../styles/var.css';
import '../styles/doc.css';
import 'uno.css';
import { HomeLayout } from './HomeLayout';
import { DocLayout } from './DocLayout';
import { NotFoundLayout } from './NotFoundLayout';
import { Helmet } from 'react-helmet-async';

export function Layout() {
  const pageData = usePageData();
  // 获取 pageType
  const { pageType, title } = pageData;
  // 根据 pageType 分发不同的页面内容
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else {
      return <NotFoundLayout />;
    }
  };
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--musedoc-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  );
}
