import { createBrowserRouter, Outlet } from 'react-router';
import App from '../App';
import ErrorBoundary from './components/error-boundary';
import { routesSection } from './sections';

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);
export default router;
