import { useEffect, useState } from "react";
import useGetUrls from "../hooks/useGetUrls";
import toast from "react-hot-toast";
import { useNavigate, useSearch } from "@tanstack/react-router";

const UrlList = () => {
  const { isLoading, isError, data, error } = useGetUrls();
  const { action, id: urlId } = useSearch({});

  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUrl = (id) => {
    navigate({
      search: {
        action: "delete",
        id,
      },
    });
  };

  const handleCancleDelete = () => {
    setDeleteModal(false);
    navigate({ search: {} });
  };

  const handleConfirmDelete = () => {
    // todo: perform delete action
    toast.success("Deleted " + urlId);
    setDeleteModal(false);
    navigate({ search: {} });
  };

  useEffect(() => {
    console.log("action", action);
    if (action === "delete") {
      setDeleteModal(true);
    }
  }, [action, urlId]);

  useEffect(() => {
    isError && toast.error(error.message);
  }, [isError, error]);

  if (isLoading) return <div> Loading...</div>;

  if (!data) return <>no data found</>;

  return (
    <>
      {deleteModal && (
        <div
          id="deleteModal"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-screen bg-white/10 backdrop-blur grid place-items-center"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                id="close-delete-modal"
                onClick={handleCancleDelete}
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={handleCancleDelete}
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={handleConfirmDelete}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 flex flex-col gap-1">
        <div className="grid grid-cols-[1fr_1fr_0.5fr_0.5fr] px-4 py-2 bg-gray-200 rounded-lg">
          <p className="text-sm font-semibold text-zinc-600 self-center">
            Original URL
          </p>
          <p className="text-sm font-semibold text-zinc-600 self-center">
            Short URL
          </p>
          <p className="text-sm font-semibold text-zinc-600 self-center">
            Clicks
          </p>
          <p className="text-sm font-semibold text-zinc-600 self-center">
            Actions
          </p>
        </div>

        {data.data?.url?.length !== 0 ? (
          data.data?.urls.map((url) => {
            const originalUrl =
              url.originalUrl.length > 25
                ? url.originalUrl.split("").splice(0, 25).join("") + "..."
                : url.originalUrl;
            const handleCopy = async () => {
              await window.navigator.clipboard.writeText(url.shortUrl);
              toast.success("Copied!");
            };

            return (
              <div className="grid grid-cols-[1fr_1fr_0.5fr_0.5fr] px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                <p
                  className="text-sm font-semibold text-zinc-700 self-center  wrap-anywhere"
                  title={url.originalUrl}
                >
                  {originalUrl}
                </p>
                <p className="text-sm font-semibold text-zinc-700 self-center  wrap-anywhere">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline hover:text-blue-800"
                  >
                    {url.shortUrl}
                  </a>
                </p>
                <p className="text-sm font-semibold text-zinc-700 self-center">
                  {url.clickCount}
                </p>
                <p className="text-sm font-semibold text-zinc-700 self-center">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={handleCopy}
                      className="text-xs font-semibold px-3 py-1.5 rounded text-white bg-blue-500 hover:bg-blue-800 cursor-pointer"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleDeleteUrl(url._id)}
                      className="text-xs font-semibold px-3 py-1.5 rounded text-white bg-red-500 hover:bg-red-800 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </p>
              </div>
            );
          })
        ) : (
          <p>no data found</p>
        )}
      </div>
    </>
  );
};

export default UrlList;
