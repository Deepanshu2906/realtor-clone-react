import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [pagestate, setPageState] = useState("Sign-in");
  const location = useLocation();
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  });
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="border-b shadow-md bg-white stickey top-0 z-50">
      <header className=" flex justify-between items-center px-3 md:max-w-6xl md:mx-auto">
        <div>
          <img
            className="h-5 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home{" "}
            </li>

            <li
              className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>

            <li
              className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("Profile")) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {" "}
              {pagestate}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
