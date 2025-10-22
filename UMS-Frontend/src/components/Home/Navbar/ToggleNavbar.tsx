import { useState } from "react";
import { navLinks } from "../../../utils/navItems";
import { Link } from "react-router-dom";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface DrawerCompProps {
  isOpen: boolean;
  onClose: () => void;
  pathName: string;
}

const ToggleNavbar = ({ isOpen, onClose, pathName }: DrawerCompProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div
      className={`fixed top-20 left-0 right-0 bottom-0 bg-white w-full h-[calc(100vh-5rem)] z-[105] transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out overflow-y-auto pt-4`}
      onClick={onClose}
    >
      <div
        className="container mx-auto px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {navLinks.map((item) => (
          <div key={item.id} className="mb-2">
            {item.submenu ? (
              <div className="w-full">
                <div
                  className={`flex justify-between items-center p-3 font-bold ${
                    pathName === item.id ? "text-green-500" : "text-gray-500"
                  } border-b border-gray-200`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(item.id);
                  }}
                >
                  <Link to={item.id} className="flex-1">
                    {item.title}
                  </Link>
                  {openDropdownId === item.id ? (
                    <RiArrowUpSLine size={20} />
                  ) : (
                    <RiArrowDownSLine size={20} />
                  )}
                </div>

                {openDropdownId === item.id && (
                  <div className="pl-4 bg-gray-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.id}
                        className={`block p-3 font-medium ${
                          pathName === subItem.id
                            ? "text-green-500"
                            : "text-gray-500"
                        } border-b border-gray-100`}
                        onClick={onClose}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.id}
                className={`block p-3 font-bold ${
                  pathName === item.id ? "text-green-500" : "text-gray-500"
                } border-b border-gray-200`}
                onClick={onClose}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleNavbar;
