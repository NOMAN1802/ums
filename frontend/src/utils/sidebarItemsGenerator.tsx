import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";
import { getIcon } from "./dashboardIcon";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sideBarItems = items?.reduce((acc: TSidebarItem[], item) => {
    if (item?.path && item?.element) {
      acc.push({
        key: item?.name,
        label: <NavLink to={`/${role}/${item?.path}`}>{item?.name}</NavLink>,
        icon: getIcon(item?.name),
      });
    }
    if (item?.children && item?.name) {
      acc.push({
        key: item?.name,
        label: item?.name,
        icon: getIcon(item?.name),
        children: item?.children.map((child) => {
          if (child?.name) {
            return {
              key: child?.name,
              label: (
                <NavLink to={`/${role}/${child?.path}`}>{child?.name}</NavLink>
              ),
              icon: getIcon(child?.name),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
  return sideBarItems;
};
