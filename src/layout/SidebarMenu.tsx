import {Divider, Navbar, NavLink} from "@mantine/core";
import {NavLink as RouterNavLink, useLocation} from "react-router-dom";
import React from "react";
import {
    IconDroplet,
    IconHome,
    IconInfoCircle, IconNumber1, IconNumber2,
    IconPower, IconSettings,
    IconThermometer,
    IconWifi,
    TablerIconsProps
} from "@tabler/icons-react";

function SidebarLink({path, label, icon: Icon}: {
    path: string, label?: React.ReactNode,
    icon?: (props: TablerIconsProps) => JSX.Element
}) {
    const {pathname} = useLocation();
    return <NavLink component={RouterNavLink}
                    to={path}
                    label={label}
                    icon={Icon && <Icon size={16} stroke={1.5}/>}
                    active={path === pathname}/>
}

export default function SidebarMenu() {
    return <>
        <Navbar.Section grow>
            <SidebarLink path={'/'} label={'Home'} icon={IconHome}/>
            <Divider/>
            <SidebarLink path={'/sys/temperature'} label={'Temperature sensors'} icon={IconThermometer}/>
            <SidebarLink path={'/sys/relays'} label={'Relays'} icon={IconPower}/>
        </Navbar.Section>
        <Navbar.Section>
            <NavLink label={'Settings'} icon={<IconSettings size={16} stroke={1.5}/>}>
                <SidebarLink path={'/settings/leak'} label={'Leakage'} icon={IconDroplet}/>
                <SidebarLink path={'/settings/pot-still'} label={'Pot Still'} icon={IconNumber1}/>
                <SidebarLink path={'/settings/reflux-still'} label={'Reflux Still'} icon={IconNumber2}/>
                <SidebarLink path={'/settings/wifi'} label={'WiFi'} icon={IconWifi}/>
            </NavLink>
            <SidebarLink path={'/about'} label={'About'} icon={IconInfoCircle}/>
        </Navbar.Section>
    </>
}
