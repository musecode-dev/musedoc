import { NavItemWithLink } from 'shared/types';
import { usePageData } from '@runtime';
import styles from './index.module.scss';

export function MenuItem(item: NavItemWithLink) {
  return (
    <div className="text-sm font-medium mx-3">
      <a className={styles.link} href={item.link}>
        {item.text}
      </a>
    </div>
  );
}

export function Nav() {
  const { siteData } = usePageData();
  const nav = siteData?.themeConfig?.nav || [];

  return (
    <header fixed="~" position="t-0 l-0" w="full">
      <div
        flex="~"
        items="center"
        justify="between"
        className="px-8 h-14 divider-bottom"
      >
        <div>
          <a
            href="/"
            hover="opacity-60"
            className="w-full h-full text-1rem font-semibold flex items-center"
          >
            MudeDoc
          </a>
        </div>
        <div flex="~">
          {/* 普通菜单 */}
          {nav.map((item) => (
            <MenuItem key={item.text} {...item} />
          ))}
          {/* 白天/夜间模式切换 */}
          {/* 相关链接 */}
          <div className={styles.socialLinkIcon} ml="2">
            <a href="/">
              <div className="i-carbon-logo-github w-5 h-5 full-current"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
