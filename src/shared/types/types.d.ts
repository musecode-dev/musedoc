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
