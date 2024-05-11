import { createBrowserRouter } from "react-router-dom";

import TimerApp from "../Pages/Timer/TimerApp";
import ErrorPage from "../Error";
import Layout from "../Layout";
import Posts from "../Pages/Social Posts/Posts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/timer",
    element: <TimerApp />,
  },
  {
    path: "/social-posts",
    element: <Posts />,
  },
]);

export default routes;
