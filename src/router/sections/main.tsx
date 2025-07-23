import { Outlet, RouteObject } from 'react-router';
import MainLayout from '@/layouts/main';
import { Suspense, lazy } from 'react';
import Page403 from '@/pages/common/Page403';
import Page404 from '@/pages/common/Page404';
import Page500 from '@/pages/common/Page500';

const HomePage = lazy(() => import('@/pages/home'));
const AboutPage = lazy(() => import('@/pages/about'));
const TestPage = lazy(() => import('@/pages/test'));
const DebugPage = lazy(() => import('@/pages/debug'));

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
      { path: 'home', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'debug', element: <DebugPage /> },
      { path: '403', element: <Page403 /> },
      { path: '404', element: <Page404 /> },
      { path: '500', element: <Page500 /> },
    ],
  },
];
