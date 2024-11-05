import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default PrivateRoute;
