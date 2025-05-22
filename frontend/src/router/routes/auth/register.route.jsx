import { createRoute } from "@tanstack/react-router";
import Register from "../../../pages/auth/Register";
import authRoute from "./index";

const registerRoute = createRoute({
  path: "register",
  component: Register,
  getParentRoute: () => authRoute,
});

export default registerRoute;
