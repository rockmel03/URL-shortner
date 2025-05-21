import { useMutation } from "@tanstack/react-query";
import { refreshTokens } from "../../../api/auth.api";

const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshTokens,
  });
};

export default useRefreshToken;
