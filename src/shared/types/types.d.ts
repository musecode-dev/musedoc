declare module 'musedoc:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'musedoc:routes' {
  import { Route } from 'node/plugin-routes';
  const routes: Route[];
  export { routes };
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// declare namespace React {
//   // interface HTMLAttributes<T> extends HTMLAttributes<T> {
//   //   [key: string]: string;
//   // }
//   // interface RefAttributes<T> extends RefAttributes<T> {
//   //   [key: string]: string;
//   // }
// }
