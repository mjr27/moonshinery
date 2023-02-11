import {PageTemplate} from "../layout/PageHeader";
import React, {useState} from "react";
import {Tabs} from "@mantine/core";
import {IconAccessPoint, IconList, IconWifi} from "@tabler/icons-react";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {WifiNetworksList} from "../wifi/WifiNetworkList";
import {WifiKnownList} from "../wifi/WifiKnownList";

export interface IWifiSubPage {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const WifiConfiguration = () => {
    const [loading, setLoading] = useState(true);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    return <PageTemplate title='WiFi' loading={loading} withPaper>
        <Tabs defaultValue={pathname} keepMounted={false} onTabChange={value => value && navigate(value)}>
            <Tabs.List>
                <Tabs.Tab value={'/settings/wifi'} icon={<IconWifi/>}>Connect</Tabs.Tab>
                <Tabs.Tab value={'/settings/wifi/saved'} icon={<IconList/>}>Saved</Tabs.Tab>
                <Tabs.Tab value={'/settings/wifi/ap'} icon={<IconAccessPoint/>}>Access point</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={'/settings/wifi'}>
                <WifiNetworksList loading={loading} setLoading={setLoading}/>
            </Tabs.Panel>
            <Tabs.Panel value={'/settings/wifi/saved'}>
                <WifiKnownList loading={loading} setLoading={setLoading}/>
            </Tabs.Panel>
            <Tabs.Panel value={'/settings/wifi/ap'}>
                {pathname}
                <p>TODO: TO BE IMPLEMENTED</p>
            </Tabs.Panel>
        </Tabs>

    </PageTemplate>
}