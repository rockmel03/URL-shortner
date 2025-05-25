import { createRoute } from "@tanstack/react-router";
import dashboardLayoutRoute from "./layout.route";
import Urls from "../../../../pages/dashboard/Urls";

const urlsRoute = createRoute({
  path: "urls",
  getParentRoute: () => dashboardLayoutRoute,
  component: Urls,
});
export default urlsRoute;
