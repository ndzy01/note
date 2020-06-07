import { RouteProps } from 'react-router';
import { lazy } from 'react';

let routes: IRouteItem[] = [
  {
    path: '/home', // 主页
    view: 'Home',
  },
  {
    path: '/edit', // 编辑页
    view: 'Edit',
  },
  {
    path: '/add', // 添加页
    view: 'Add',
  },
 
];
interface IRouteItem extends RouteProps {
  view?: string;
}

for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(('../views/' + item.view) as string));
  }
}

export default routes;
