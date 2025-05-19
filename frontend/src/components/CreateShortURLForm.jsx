import { useEffect, useState } from "react";
import { createShortURL } from "../api/url.api";
import toast from "react-hot-toast";

function CreateShortURLForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [error, setError] = useState("");
  const handleCopyToClipboard = async () => {
    await window.navigator.clipboard.writeText(shortUrl);
    toast.success("URL copied to clipboard!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!longUrl) return setError("URL field is required");
    if (!/^https?:\/\//i.test(longUrl)) {
      return setError("Must start with http:// or https://");
    }

    createShortURL({ url: longUrl })
      .then((res) => {
        if (res.data?.shortUrl) {
          setShortUrl(res.data?.shortUrl);
          toast.success(res.message || "created success");
        }
      })
      .catch((err) => {
        toast.error(err.response.data?.message || "failed to create short URL");
      });
  };

  useEffect(() => {
    setError("");
    setShortUrl("");
  }, [longUrl]);
  return (
    <div className="rounded-lg shadow-lg w-sm p-10 bg-white text-black">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-2 font-medium" htmlFor="longUrl">
          Enter your long URL:
        </label>
        {error && (
          <p className="text-sm mb-2 font-semibold text-red-500">{error}</p>
        )}
        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="text"
          id="longUrl"
          name="longUrl"
          placeholder="https://example.com/"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <>
          <br />
          <div className="flex flex-col">
            <h3 className="mb-2 font-medium">Your short URL is:</h3>
            <div className="p-2 border border-gray-300 rounded flex justify-between">
              <a
                id="shortUrl"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopyToClipboard}
                className="border border-zinc-300 px-2 font-semibold text-sm text-zinc-600 rounded cursor-pointer active:scale-90"
              >
                Copy
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateShortURLForm;
