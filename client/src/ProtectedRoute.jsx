import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <h1>Loading...</h1>
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
