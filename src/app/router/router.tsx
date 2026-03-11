import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from '@shared/Constants/paths';
import LoginPage from '@src/pages/LoginPage';
import ProfilePage from '@src/pages/ProfilePage';
import RegisterPage from '@src/pages/RegisterPage';
import { DashboardPage } from '@p/Dashboard';
import LandingPage from '@p/Landing';
import LibraryPage from '@p/Library';
import NotFound from '@p/NotFound';
import PracticePage from '@p/Practice';
import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  { path: PATHS.HOME, element: <LandingPage /> },
  {
    element: <GuestRoute />,
    children: [
      { path: PATHS.LOGIN, element: <LoginPage /> },
      { path: PATHS.REGISTER, element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: PATHS.DASHBOARD, element: <DashboardPage /> },
      { path: PATHS.LIBRARY, element: <LibraryPage /> },
      { path: PATHS.PRACTICE(), element: <PracticePage /> },
      { path: PATHS.PROFILE, element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
