import rootRoute from "./__root.route";
import authRoute from "./auth";
import protectedRoute from "./protected/layout.route";
import publicLayoutRoute from "./public/layout.route";

export const routeTree = rootRoute.addChildren([
  authRoute,
  publicLayoutRoute,
  protectedRoute,
]);

export default routeTree;
