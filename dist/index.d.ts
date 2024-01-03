import { UserConfig as UserConfig$1 } from 'vite';

type NavItemWithLink = {
    text: string;
    link: string;
};
type SidebarItem = {
    text: string;
    link: string;
} | {
    text: string;
    link?: string;
    items: SidebarItem[];
};
interface SidebarGroup {
    text?: string;
    items: SidebarItem[];
}
interface Sidebar {
    [path: string]: SidebarGroup[];
}
interface Footer {
    message?: string;
    copyright?: string;
}
interface ThemeConfig {
    nav?: NavItemWithLink[];
    sidebar?: Sidebar;
    footer?: Footer;
}
interface UserConfig {
    title?: string;
    description?: string;
    themeConfig?: ThemeConfig;
    vite?: UserConfig$1;
}

declare function defineConfig(config: UserConfig): UserConfig;

export { defineConfig };
