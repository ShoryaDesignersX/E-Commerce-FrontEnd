import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const userLogged = localStorage.getItem("jwttoken");

  if (userLogged) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
