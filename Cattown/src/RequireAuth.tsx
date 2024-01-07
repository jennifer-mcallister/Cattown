import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/Firebase";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <></>;
  } else if (user?.uid && !loading) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
