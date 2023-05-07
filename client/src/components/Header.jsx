import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex items-center justify-between w-full p-5 bg-gray-100 ">
      <span className="font-mono text-2xl font-semibold ">User Registry</span>

      <ul className="flex items-center justify-end gap-1">
        <li>
          <Link
            to={""}
            className="px-2 py-1 mx-4 text-lg text-center duration-200 rounded text-slate-500 ring ring-gray-500 hover:ring-gray-700 hover:text-slate-700"
          >
            ADD
          </Link>
        </li>
        <li>
          <Link
            to={"/show"}
            className="px-2 py-1 mx-4 text-lg text-center duration-200 rounded text-slate-500 ring ring-gray-500 hover:ring-gray-700 hover:text-slate-700"
          >
            SHOW
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
