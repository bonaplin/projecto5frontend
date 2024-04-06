import { Navigate, useLocation } from "react-router-dom";
import { userStore } from "./stores/UserStore";

function PrivateRoute({ children }) {
  const isLoggedIn = Boolean(userStore.getState().token);
  const isConfirmed = Boolean(userStore.getState().confirmed);
  const location = useLocation();

  return isLoggedIn ? (
    isConfirmed ? (
      children
    ) : (
      <Navigate to="/forbidden" replace state={{ from: location }} />
    )
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
