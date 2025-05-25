import { Link, Outlet } from "@tanstack/react-router";

const DashboardLayout = () => {
  const dashboardNavLinks = {
    urls: "/dashboard/urls",
    profile: "/dashboard/profile",
  };

  return (
    <div className="flex">
      <aside
        id="dashboard-side-nav"
        className="max-h-screen overflow-auto min-w-3xs bg-white"
      >
        <div className="px-4 pt-4">
          <h2 className="text-2xl font-semibold text-zinc-500">Dashboard</h2>
        </div>
        <hr className="my-4 border-1 w-11/12 mx-auto border-zinc-400 r ounded" />
        <ul className="flex flex-col gap-1">
          {Object.entries(dashboardNavLinks).map(([key, value]) => {
            const random1 = Math.floor(Math.random() * 255 + 1);
            const random2 = Math.floor(Math.random() * 255 + 1);
            const random3 = Math.floor(Math.random() * 255 + 1);

            const colorCode = `rgba(${random1},${random2},${random3},0.51)`;

            return (
              <li key={key} className="ml-6 hover:ml-4 group/link transition ">
                <Link
                  to={value}
                  className="bg-zinc-200 w-full block px-4 py-2 text-base font-semibold capitalize rounded-l group-hover/link:bg-zinc-300 transition"
                >
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        backgroundColor: colorCode,
                      }}
                      className="p-1 w-fit rounded-full bg-green-500"
                    ></div>
                    <span>{key}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
