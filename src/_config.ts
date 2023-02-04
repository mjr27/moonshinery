import {IconHome, IconPower, IconSettings, IconThermometer, IconWifi, TablerIconsProps} from "@tabler/icons-react";
import IndexPage from "./pages/IndexPage";
import WifiPage from "./pages/WifiPage";
import TemperatureSensorsPage from "./pages/TemperatureSensorsPage";
import RelayPage from "./pages/RelayPage";
import { WsTestPage } from "./pages/WsTestPage";

interface MenuItem {
    path: string;
    title: string;
    icon?: (props: TablerIconsProps) => JSX.Element;
    component: () => JSX.Element;
}

export const Menu: (MenuItem | null)[] = [
    {
        path: '/',
        title: 'Home',
        icon: IconHome,
        component: IndexPage
    },
    {
        path: '/ws-test',
        title: 'WebsocketTest',
        icon: IconSettings,
        component: WsTestPage
    },
    null,
    {
        path: '/sensors',
        title: 'Sensors',
        icon: IconThermometer,
        component: TemperatureSensorsPage
    },
    {
        path: '/relays',
        title: 'Relays',
        icon: IconPower,
        component: RelayPage
    },
    {
        path: '/wifi',
        title: 'Wifi',
        icon: IconWifi,
        component: WifiPage
    }

]