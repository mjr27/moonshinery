import {Route, Routes} from "react-router";
import {Menu} from "../_config";
import React from "react";

export default function LayoutRoutes() {
    return <Routes>
        {Menu.filter(r => r != null).map(item => item &&
            <Route path={item.path} key={item.path} element={<item.component/>}/>)}
    </Routes>
}