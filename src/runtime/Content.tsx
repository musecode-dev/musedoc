import { useRoutes } from 'react-router-dom';
import { routes } from 'musedoc:routes';
// import Index from '../../docs/guide/index';
// import A from '../../docs/guide/a';
// import B from '../../docs/b';

// const routes: Route[] = [
//   {
//     path: '/guide',
//     element: <Index />
//   },
//   {
//     path: '/guide/a',
//     element: <A />
//   },
//   {
//     path: '/b',
//     element: <B />
//   }
// ];

// console.log(routes);

export const Content = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};
