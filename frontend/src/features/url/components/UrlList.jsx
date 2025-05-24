import { useEffect } from "react";
import useGetUrls from "../hooks/useGetUrls";
import toast from "react-hot-toast";

const UrlList = () => {
  const { isLoading, isError, data, error } = useGetUrls();

  useEffect(() => {
    isError && toast.error(error.message);
  }, [isError, error]);

  if (isLoading) return <div> Loading...</div>;

  return (
    <div className="p-4 ">
      <table className="relative mx-auto bg-white rounded p-4">
        <thead className="sticky top-0 bg-white/50 backdrop-blur-2xl rounded-t">
          <tr>
            <th className="px-4 py-2">Original URL</th>
            <th className="px-4 py-2">Short URL</th>
            <th className="px-4 py-2">Clicks</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data?.urls?.map((url) => {
            const originalUrl =
              url.originalUrl.length > 20
                ? url.originalUrl.split("").splice(0, 20).join("") + "..."
                : url.originalUrl;
            const handleCopy = async () => {
              await window.navigator.clipboard.writeText(url.shortUrl);
              alert("copied");
            };

            return (
              <tr key={url._id} className="">
                <td title={url.originalUrl} className="px-4 py-2">
                  {originalUrl}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline hover:text-blue-800"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="text-center">{url.clickCount}</td>
                <td className="text-center">
                  <button
                    onClick={handleCopy}
                    className="text-sm font-semibold px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-800 cursor-pointer"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;
