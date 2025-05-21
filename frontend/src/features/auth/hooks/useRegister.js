import { useMutation } from "@tanstack/react-query";
import { register } from "../../../api/auth.api";

const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export default useRegister;
