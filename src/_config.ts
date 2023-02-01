import {IconHome, IconWifi, TablerIconsProps} from "@tabler/icons-react";
import IndexPage from "./pages/IndexPage";
import WifiPage from "./pages/WifiPage";

interface MenuItem {
    path: string;
    title: string;
    icon?: (props: TablerIconsProps) => JSX.Element;
    component: () => JSX.Element;
}

export const Menu: MenuItem[] = [
    {
        path: '/',
        title: 'Home',
        icon: IconHome,
        component: IndexPage
    },
    {
        path: '/wifi',
        title: 'Wifi',
        icon: IconWifi,
        component: WifiPage
    }

]