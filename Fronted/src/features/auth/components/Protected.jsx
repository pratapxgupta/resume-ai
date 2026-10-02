import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { WorkspaceSkeleton } from "../../../components/PageSkeleton";

const Protected = ({ children }) => {
  const { loading, sessionInitialized, user } = useAuth();

  if (loading || !sessionInitialized) {
    return <WorkspaceSkeleton />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
