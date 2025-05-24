import { useDispatch } from "react-redux";
import useLogout from "../hooks/useLogout";
import toast from "react-hot-toast";
import { logout } from "../authSlice";

const LogoutButton = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        dispatch(logout());
        localStorage.removeItem("isLoggedIn");
        toast.success("Logout successfully!");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Logout Failed!");
      },
    });
  };
  return (
    <button {...props} onClick={handleLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;
