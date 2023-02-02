import {Menu} from "../_config";
import {Divider, NavLink} from "@mantine/core";
import {NavLink as RouterNavLink, useLocation} from "react-router-dom";
import React from "react";

export default function SidebarMenu() {
    const location = useLocation();
    return <>
        {Menu.map((item, i) => {
            return item ? <NavLink component={RouterNavLink}
                                   key={item.path}
                                   to={item.path} label={item.title}
                                   active={location.pathname === item.path}
                                   icon={item.icon && <item.icon size={16} stroke={1.5}/>}/>
                : <Divider key={i}/>
        })}
    </>
}
