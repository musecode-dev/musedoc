import { NavItemWithLink } from 'shared/types';
import { usePageData } from '@runtime';
// import { SwitchAppearance } from '../SwitchAppearance';
import styles from './index.module.scss';

export function MenuItem({ item }: { item: NavItemWithLink }) {
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
    <header fixed="~" pos="t-0 l-0" w="full" z="10">
      <div
        flex="~"
        items="center"
        justify="between"
        className={`h-14 divider-bottom ${styles.nav}`}
      >
        <div flex="~">
          <img w='10' h='10' m='2'
            src='../musedoc.png'
          />
          <div>
            <a
              href="/"
              hover="opacity-60"
              className="w-full h-full text-1rem font-semibold flex items-center"
            >
              MudeDoc
            </a>
          </div>
        </div>
        <div flex="~">
          <div flex="~">
            {/* 普通菜单 */}
            {nav.map((item) => (
              <MenuItem key={item.text} item={item} />
            ))}
          </div>
          {/* 白天/夜间模式切换 */}
          {/* <div before="menu-item-before" flex="~">
            <SwitchAppearance />
          </div> */}
          {/* 相关链接 */}
          <div className={styles.socialLinkIcon} before="menu-item-before">
            <a href="https://github.com/musecode-dev/musedoc" target="_blank">
              <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
