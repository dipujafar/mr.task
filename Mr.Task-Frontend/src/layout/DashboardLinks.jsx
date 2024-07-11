import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaChevronDown } from "react-icons/fa6";
import { useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { GoTasklist } from "react-icons/go";
import { TiClipboard } from "react-icons/ti";
import { toast } from "react-toastify";

const DashboardLinks = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  //logout function
  const handleLogout = () => {
    logOut().then(() => {
      toast("Successfully Logout");
      navigate("/");
    });
  };

  return (
    <>
      <li>
        <div className="relative">
          <img
            src={user?.photoURL}
            alt="logo-image"
            onClick={() => setOpen(!open)}
            ref={imgRef}
            className="w-10 h-10 rounded-full"
          />

          {open && (
            <div
              ref={menuRef}
              className="absolute top-14 right-0 z-10 bg-gray-300 rounded   w-72 p-4 space-y-2"
            >
              <img
                src={user?.photoURL}
                alt="ProfileImg"
                className="w-24 h-24 mx-auto rounded-full"
              />
              <p className="text-center text-xl">{user?.displayName}</p>
              <hr />
              <Link to="/">
                <p className=" mt-1 flex items-center gap-1 hover:text-sky-500">
                  <FaHome /> Home
                </p>
              </Link>

              <hr />
              <button
                onClick={handleLogout}
                className="mt-1 flex items-center gap-1 hover:text-sky-500"
              >
                <CgLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </li>

      <li className="text-lg">
        <NavLink
          to="/dashboard/tasks"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <GoTasklist /> Tasks
        </NavLink>
      </li>
      <li className="text-lg">
        <NavLink
          to="/dashboard/board"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <TiClipboard /> Board
        </NavLink>
      </li>
    </>
  );
};

export default DashboardLinks;
