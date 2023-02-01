import React, {useEffect} from "react";
import {fetchWifi} from "../api/wifi";


export default function WifiPage() {
    useEffect(() => {
        console.log("FETCHING")
        fetchWifi();
    }, []);
    // const [loaded, setLoaded] = useState(false);

    return <>
        {/*<LoadingOverlay visible={!loaded} overlayBlur={2}/>*/}
        <b>Wifi</b>
        <p>[{process.env.REACT_APP_ESP32_HOSTNAME}]</p>
    </>
}