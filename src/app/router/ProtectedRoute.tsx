import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@s/auth.store';

export const ProtectedRoute: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const isAuthInit = useAuthStore((s) => s.isAuthInit);

  if (!isAuthInit) {
    return <div className="page-wrapper">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
