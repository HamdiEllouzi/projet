import { Navigate ,useLocation} from "react-router-dom";
export function RequireAuth({ user,children }) {
    let location = useLocation();
    if (!user) {
      return <Navigate to="/Sign-in" state={{ from: location }} />;
    }
    return children;
}
 export function NotAuth({ user,children }) {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  }