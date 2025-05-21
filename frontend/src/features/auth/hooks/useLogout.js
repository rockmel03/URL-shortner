import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../api/auth.api";

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export default useLogout;
