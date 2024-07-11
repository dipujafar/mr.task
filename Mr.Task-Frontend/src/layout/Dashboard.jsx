import { HiMenu } from "react-icons/hi";
import DashboardLinks from "./DashboardLinks";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Mr.Task | Dashboard</title>
      </Helmet>
      <div className="drawer lg:drawer-open bg-white">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center  w-full">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="drawer-button absolute top-2 left-1 lg:hidden cursor-pointer "
          >
            <HiMenu className="text-xl" />
          </label>
          <div className="w-full p-5 md:p-10 lg:p-16 ">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content space-y-2">
            {/* Sidebar content here */}
            <DashboardLinks></DashboardLinks>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
