import { createRoute } from "@tanstack/react-router";
import registerRoute from "./register.route";
import loginRoute from "./login.route";
import rootRoute from "../__root.route";
import AuthLayout from "../../../Layouts/AuthLayout";

const authRoute = createRoute({
  path: "auth",
  getParentRoute: () => rootRoute,
  component: AuthLayout,
});

authRoute.addChildren([registerRoute, loginRoute]);

export default authRoute;
