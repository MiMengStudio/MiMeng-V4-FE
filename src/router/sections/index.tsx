import { Navigate, RouteObject } from 'react-router';
import { authRoutes } from './auth';
import { mainRoutes } from './main';

export const routesSection: RouteObject[] = [
  ...mainRoutes,
  ...authRoutes,
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];
