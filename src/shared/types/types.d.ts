declare module 'musedoc:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'musedoc:routes' {
  import { RouteObject } from 'react-router-dom';
  const routes: RouteObject[];
  export { routes };
}
