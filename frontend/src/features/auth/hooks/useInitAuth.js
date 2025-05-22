import { useEffect, useRef, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch } from "react-redux";
import { setToken } from "../authSlice";
import toast from "react-hot-toast";

const useInitAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const hasRun = useRef(false);

  const { mutateAsync: refresh } = useRefreshToken();
  const dispatch = useDispatch();

  useEffect(() => {
    // to prevent double request
    if (hasRun.current) return;
    hasRun.current = true;

    const checkAuth = async () => {
      try {
        const res = await refresh();
        dispatch(setToken(res.data.accessToken));
        toast.success("Welcome!");
      } catch (error) {
        const message = error.response?.data?.message || "Unauthorised";
        toast.error(message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error };
};

export default useInitAuth;
