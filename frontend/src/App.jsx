import { Toaster } from "react-hot-toast";
import { Outlet } from "@tanstack/react-router";
import useInitAuth from "./features/auth/hooks/useInitAuth";

function App() {
  const { isLoading } = useInitAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
