import { createRoute } from "@tanstack/react-router";
import Login from "../../../pages/auth/Login";
import authRoute from "./index";

const loginRoute = createRoute({
  path: "login",
  component: Login,
  getParentRoute: () => authRoute,
});

export default loginRoute;
