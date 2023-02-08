import {IconDetails, IconInfoCircle, IconSettings} from "@tabler/icons-react";
import React from "react";
import {Tabs} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";

export const IndexTabs = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const currentLocation = pathname.startsWith('/settings')
        ? 'settings'
        : pathname.startsWith('/about')
            ? 'about'
            : 'index';

    function handleOnChange(ev: string) {
        navigate(ev === 'about'
            ? '/about'
            : ev === 'settings'
                ? '/settings'
                : '/');
    }

    // if
    return <Tabs defaultValue={currentLocation} onTabChange={handleOnChange}>
        <Tabs.List grow>
            <Tabs.Tab value="index" icon={<IconDetails/>}>Status</Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings/>}>Settings</Tabs.Tab>
            <Tabs.Tab value="about" icon={<IconInfoCircle/>}>About</Tabs.Tab>
        </Tabs.List>
    </Tabs>
}