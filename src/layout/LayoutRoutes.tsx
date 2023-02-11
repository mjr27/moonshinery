import {Route, Routes} from "react-router";
import React, {useContext} from "react";
import {ProgramStateContext} from "../api/program";
import {PotStillPage} from "../pages/PotStillPage";
import {LoadingPage} from "../pages/LoadingPage";
import IndexPage from "../pages/IndexPage";
import {AboutPage} from "../pages/AboutPage";
import {MultiPageLayout} from "./Layouts";
import {RefluxStillSettingForm} from "../settings/RefluxStillSettingForm";
import {PotStillSettingForm} from "../settings/PotStillSettingForm";
import {LeakageSettingForm} from "../settings/LeakageSettingForm";
import {WifiConfiguration} from "../settings/WifiConfiguration";
import TemperatureSensorsPage from "../pages/TemperatureSensorsPage";
import RelayPage from "../pages/RelayPage";

export default function LayoutRoutes() {
    const context = useContext(ProgramStateContext);
    switch (context.program) {
        case 'pot-still':
            return <Routes><Route path={'*'} element={<PotStillPage/>}/></Routes>;
        case 'menu':
            return <MultiPageLayout>
                <Routes>
                    <Route path={'/'} element={<IndexPage/>}/>
                    <Route path={'/sys/temperature'} element={<TemperatureSensorsPage/>}/>
                    <Route path={'/sys/relays'} element={<RelayPage/>}/>
                    <Route path={'/settings/leak'} element={<LeakageSettingForm/>}/>
                    <Route path={'/settings/pot-still'} element={<PotStillSettingForm/>}/>
                    <Route path={'/settings/reflux-still'} element={<RefluxStillSettingForm/>}/>
                    <Route path={'/settings/wifi/*'} element={<WifiConfiguration/>}/>
                    <Route path={'/about'} element={<AboutPage/>}/>
                </Routes>
            </MultiPageLayout>;
        case "unknown":
        default:
            return <Routes><Route path={'*'} element={<LoadingPage/>}/></Routes>;

    }
}
