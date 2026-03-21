import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from '@shared/Constants/paths';
import { MainLayout } from '@shared/Layout/MainLayout';
import { LoginPage } from '@src/pages/LoginPage';
import { ProfilePage } from '@src/pages/ProfilePage';
import { RegisterPage } from '@src/pages/RegisterPage';
import { DashboardPage } from '@p/DashboardPage';
import { LandingPage } from '@p/LandingPage';
import { LibraryPage } from '@p/LibraryPage';
import { NotFoundPage } from '@p/NotFoundPage';
import { PracticePage } from '@p/PracticePage';
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
      {
        element: <MainLayout />,
        children: [
          { path: PATHS.DASHBOARD, element: <DashboardPage /> },
          { path: PATHS.LIBRARY, element: <LibraryPage /> },
          { path: PATHS.PRACTICE(), element: <PracticePage /> },
          { path: PATHS.PROFILE, element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
