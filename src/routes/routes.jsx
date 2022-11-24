import { Navigate } from "react-router-dom";
const routes = [
  {
    path: "/",
    component: <Navigate to="/login" replace />,
  },
];
export default routes;
