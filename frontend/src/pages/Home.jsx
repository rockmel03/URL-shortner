import { useEffect, useState } from "react";

function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!longUrl) return setError("URL field is required");
    if (!/^https?:\/\//i.test(longUrl)) {
      return setError("Must start with http:// or https://");
    }

    console.log(longUrl);
    setShortUrl(longUrl); // todo: change it later after api call
  };

  useEffect(() => {
    setError("");
    setShortUrl("");
  }, [longUrl]);

  return (
    <main>
      <section className="w-full h-screen grid place-items-center bg-zinc-100">
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
                    onClick={async () => {
                      await window.navigator.clipboard.writeText(shortUrl);
                      alert("URL copied to clipboard!");
                    }}
                    className="border border-zinc-300 px-2 font-semibold text-sm text-zinc-600 rounded cursor-pointer active:scale-90"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
