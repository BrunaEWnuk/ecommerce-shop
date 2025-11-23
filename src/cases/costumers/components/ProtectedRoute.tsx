import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Autenticando...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}