import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStrore";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoutes;
