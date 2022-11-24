import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Chat = lazy(() => import("../pages/Chat"));
const routes = [
  {
    path: "/",
    protect: false,
    component: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    protect: false,
    component: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    protect: false,
    component: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/chat",
    protect: true,
    component: (
      <Suspense fallback={<Loading />}>
        <Chat />
      </Suspense>
    ),
  },
  {
    path: "/chat/:user",
    protect: true,
    component: (
      <Suspense fallback={<Loading />}>
        <Chat />
      </Suspense>
    ),
  },
];
export default routes;
