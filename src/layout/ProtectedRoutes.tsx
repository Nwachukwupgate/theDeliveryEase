import { Navigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import Layout from './Layout';

const ProtectedRoute = () => {
  const localToken = localStorage.getItem('token');
  
  // If there's no token, redirect to login
  if (!localToken) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  // If token exists, render the Layout which includes Outlet for child routes
  return <Layout />;
};

export default ProtectedRoute;
