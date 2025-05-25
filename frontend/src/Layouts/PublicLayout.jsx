import { Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <>
      <header className="w-full h-[10vh]">
        <Navbar />
      </header>
      <main className="w-full h-[calc(100vh-10vh)] overflow-y-auto">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
