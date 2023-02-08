import {Route, Routes} from "react-router";
import React, {useContext} from "react";
import {ProgramStateContext} from "../api/program";
import {PotStillPage} from "../pages/PotStillPage";
import {LoadingPage} from "../pages/LoadingPage";
import IndexPage from "../pages/IndexPage";
import {SettingsPage} from "../pages/SettingsPage";
import {AboutPage} from "../pages/AboutPage";
import {IndexTabs} from "./IndexTabs";
import {ProgramsPage} from "../pages/ProgramsPage";

export default function LayoutRoutes() {
    const context = useContext(ProgramStateContext);
    switch (context.program) {
        case 'pot-still':
            return <Routes><Route path={'/'} element={<PotStillPage/>}/></Routes>;
        case 'menu':
            return <>
                <IndexTabs/>
                <Routes>
                    <Route path={'/'} element={<IndexPage/>}/>
                    <Route path={'/settings/*'} element={<SettingsPage/>}/>
                    <Route path={'/programs/*'} element={<ProgramsPage/>}/>
                    <Route path={'/about'} element={<AboutPage/>}/>
                </Routes>
            </>;
        case "unknown":
        default:
            return <Routes><Route path={'*'} element={<LoadingPage/>}/></Routes>;

    }
}
//
// return <Routes>
//     {Menu.filter(r => r != null).map(item => item &&
//         <Route path={item.path} key={item.path} element={<item.component/>}/>)}
// </Routes>
// }