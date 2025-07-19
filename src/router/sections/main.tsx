import { Outlet, RouteObject } from 'react-router';
import MainLayout from '@/layouts/main';
import { Suspense } from 'react';
import Page403 from '@/pages/common/Page403';
import Page404 from '@/pages/common/Page404';
import Page500 from '@/pages/common/Page500';
import HomePage from '@/pages/home';

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: '', element: <HomePage /> },
      { path: '403', element: <Page403 /> },
      { path: '404', element: <Page404 /> },
      { path: '500', element: <Page500 /> },
      { path: 'test', element: <div>Test Page</div> }, // Example route
    ],
  },
];
