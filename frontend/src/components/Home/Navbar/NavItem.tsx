import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";

type SubLink = {
  id: string;
  title: string;
};

type NavItemProps = {
  navItem: {
    title: string;
    submenu?: SubLink[];
    id: string;
  };
};

const NavItem = ({ navItem }: NavItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const isActive =
    location.pathname === navItem.id ||
    (navItem.submenu &&
      navItem.submenu.some((subItem) => location.pathname === subItem.id));

  return (
    <div className="relative">
      <span
        className={`hover:text-gray-700 flex items-center space-x-1 gap-1 cursor-pointer ${
          isActive ? "text-green-500 font-medium" : ""
        }`}
        onClick={toggleDropdown}
      >
        <Link to={navItem.id} className={isActive ? "text-green-500" : ""}>
          {navItem.title}
        </Link>
        {navItem.submenu && (
          <RiArrowDownSLine
            size={20}
            className={isActive ? "text-green-500" : ""}
          />
        )}
      </span>

      {isDropdownOpen && navItem.submenu && (
        <div className="absolute p-1.5 mt-2 bg-white shadow-md w-52 z-50 rounded-md">
          {navItem.submenu.map((subLink) => (
            <Link
              key={subLink.id}
              to={subLink.id}
              className={`block px-4 py-2 hover:bg-green-400 hover:text-white transition-colors duration-200 ${
                location.pathname === subLink.id
                  ? "bg-green-400 text-white"
                  : ""
              }`}
            >
              {subLink.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
