import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute() {
  const status = useSelector((s: any) => s.auth.status);
  const location = useLocation();

  if (status !== 'authenticated') {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
}