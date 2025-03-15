import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStrore";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  console.log(isAuthenticated, "prtotected-route");
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoutes;
