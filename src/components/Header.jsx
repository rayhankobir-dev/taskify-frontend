import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BsFillPersonFill } from "react-icons/bs";
import Logo from "../assets/clock.png";

export default function Header() {
  const { logout, getProfile } = useContext(AuthContext);
  const [openDropDown, setOpenDropDown] = useState(false);

  const user = getProfile();
  return (
    <header className=" bg-gray-200 py-4 px-4 md:px-0">
      <nav className="max-w-7xl mx-auto flex justify-between ">
        <ul className="flex items-center gap-4 font-semibold">
          <div className="flex items-center gap-1 mr-4">
            <img className="h-8 rounded-full" src={Logo} alt="logo" />
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
              className="w-48 border  absolute top-10 right-0 z-[100] overflow-hidden bg-white shadow-lg flex flex-col rounded-md"
            >
              <div className="flex flex-col px-3 py-1 bg-gray-50">
                <h2 className="font-semibold">{user.name}</h2>
                <p className="font-light">{user.email}</p>
              </div>
              <div className="flex flex-col divide-y border-t">
                <Link to={"/profile"} className="py-1.5 px-3 hover:bg-gray-50">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="py-1.5 px-3 text-left text-rose-500 hover:text-rose-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
}
