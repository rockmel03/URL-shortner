import { useQuery } from "@tanstack/react-query";
import { getAllUrls } from "../../../api/url.api";

const useGetUrls = (query) =>
  useQuery({
    queryKey: ["allUrls"],
    queryFn: async () => await getAllUrls(query),
  });

export default useGetUrls;
