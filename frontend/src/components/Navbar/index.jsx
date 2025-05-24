import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../../features/auth/components/LogoutButton";

const navLinks = {
  home: "/home",
  about: "/about",
  pricing: "/pricing",
  services: "/service",
};

const userDropDownLinks = {
  profile: "/profile",
  dashboard: "/dashboard",
};

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [userDropdown, setUserDropdown] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);

  return (
    <nav className="bg-blue-950 text-white px-2 py-4">
      <div className="max-w-screen-xl mx-auto flex gap-1 items-center justify-between flex-wrap">
        <h2 className="text-xl">
          <span className="font-semibold">URL</span> <span>shortner</span>
        </h2>

        <div className="md:order-2 flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setUserDropdown((prev) => !prev)}
                className="w-8 aspect-square rounded-full overflow-hidden focus:ring-4"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt=""
                />
              </button>

              {/* <!---dropdown---> */}

              <div
                className={`absolute -translate-x-10/12 translate-y-8/12 z-50 my-4  rounded-lg shadow-sm bg-gray-700 ${
                  userDropdown ? "" : "hidden"
                }`}
                id="user-dropdown"
              >
                <div class="px-4 py-3">
                  <span class="block capitalize text-sm text-gray-900 dark:text-white">
                    {user?.name}
                  </span>
                  <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  {Object.entries(userDropDownLinks).map(([key, value]) => {
                    return (
                      <li key={key}>
                        <Link
                          to={value}
                          class="block px-4 py-2 text-sm hover:bg-gray-600"
                        >
                          <span className="capitalize">{key}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <LogoutButton className="w-full text-start">
                      <div class="block px-4 py-2 text-sm hover:bg-gray-600">
                        <span>Sign out</span>
                      </div>
                    </LogoutButton>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link
              to={"/auth/login"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <span>Sign in</span>
            </Link>
          )}

          <button
            onClick={() => setNavDropdown((prev) => !prev)}
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div className="w-full md:order-1 md:w-auto">
          <ul
            className={`w-full ${
              navDropdown ? "flex" : "hidden"
            } flex-col gap-1 md:flex md:flex-row md:gap-10`}
          >
            {Object.entries(navLinks).map(([key, value]) => {
              return (
                <li key={key}>
                  <Link
                    to={value}
                    className="block text-base px-4 py-2 font-semibold bg-white/10 hover:bg-blue-100 hover:text-blue-500 rounded  md:p-0 md:bg-transparent md:hover:bg-transparent"
                  >
                    <span className="capitalize">{key}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
