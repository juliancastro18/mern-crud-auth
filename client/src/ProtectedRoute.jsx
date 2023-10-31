import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-10">
        {/* <SideMenu /> */}
        <Outlet />
      </main>
    </>
  );
}

export default ProtectedRoute;
