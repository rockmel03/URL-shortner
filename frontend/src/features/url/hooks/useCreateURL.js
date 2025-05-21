import { useMutation } from "@tanstack/react-query";
import { createShortURL } from "../../../api/url.api";

export const useCreateUrl = () => {
  return useMutation({
    mutationFn: createShortURL,
  });
};


