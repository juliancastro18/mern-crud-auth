import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return (
    <>
      <div>poronguiiis</div>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
