import rootRoute from "./__root.route";
import authRoute from "./auth";
import homeRoute from "./home.route";

export const routeTree = rootRoute.addChildren([homeRoute, authRoute]);

export default routeTree;
