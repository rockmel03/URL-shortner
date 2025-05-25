import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
