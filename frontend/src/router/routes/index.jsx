import rootRoute from "./__root.route";
import authRoute from "./auth";
import publicLayoutRoute from "./public/layout.route";

export const routeTree = rootRoute.addChildren([authRoute, publicLayoutRoute]);

export default routeTree;
