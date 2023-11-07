import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BsFillPersonFill } from "react-icons/bs";

import Logo from "../assets/logo 2.png";

export default function Header() {
  const { logout, getProfile } = useContext(AuthContext);
  const [openDropDown, setOpenDropDown] = useState(false);

  const user = getProfile();
  return (
    <header className=" bg-gray-200 py-4 px-4 md:px-0">
      <nav className="max-w-7xl mx-auto flex justify-between ">
        <ul className="flex items-center gap-4 font-semibold">
          <div className="flex items-center gap-1 mr-4">
            <img className="h-10" src={Logo} alt="logo" />
          </div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-blue-700" : "text-"} hover:text-blue-700`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${isActive ? "text-blue-700" : "text-"} hover:text-blue-700`
              }
            >
              Tasks
            </NavLink>
          </li>
        </ul>
        <div className="relative">
          <button
            onClick={() => setOpenDropDown((curr) => !curr)}
            className="h-8 w-8 inline-flex justify-center items-center bg-blue-200 rounded-full "
          >
            <BsFillPersonFill className="text-blue-600" />
          </button>
          {openDropDown ? (
            <div
              onMouseLeave={() => setOpenDropDown(false)}
              className="w-48  absolute top-10 right-0 overflow-hidden bg-white shadow-lg flex flex-col rounded-md"
            >
              <h2 className="py-2 bg-gray-100 px-1 text-center">{user.name}</h2>
              <button
                onClick={logout}
                className="text-rose-500 py-2 hover:bg-rose-100"
              >
                Logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
}
