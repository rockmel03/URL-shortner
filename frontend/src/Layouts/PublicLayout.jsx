import Header from "../components/Header";
import { Outlet } from "@tanstack/react-router";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
