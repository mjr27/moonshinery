import React, {useEffect} from "react";
import {apiWifiCreateApi, apiWifiGetApDetails, apiWifiSetApiDetails} from "../api/wifi";
import {ActionIcon, Button, Group, Input, Title, Tooltip} from "@mantine/core";
import {IWifiSubPage} from "../settings/WifiConfiguration";
import {useInputState} from "@mantine/hooks";
import {IconWifi} from "@tabler/icons-react";

export function WifiAccessPoint({setLoading}: IWifiSubPage) {
    const [ssid, setSsid] = useInputState('');
    const [password, setPassword] = useInputState('');
    const reload = async () => {
        setLoading(true);
        const ap = await apiWifiGetApDetails();
        if (ap.success && ap.result) {
            setSsid(ap.result.ssid);
            setPassword(ap.result.password);
            setLoading(false);
        }
    };
    useEffect(() => {
        reload().then();
    }, [])


    function handleSave() {
        setLoading(true);
        apiWifiSetApiDetails(ssid, password)
            .then(reload);
    }

    function handleConnect() {
        setLoading(true)
        apiWifiCreateApi()
            .then(reload)
            .catch(reload);
    }

    const isValid = ssid.length >= 10 && password.length >= 8;


    return <form onSubmit={handleSave}>
        <Group position={'apart'}>
            <Title order={4} m={'md'}>List of saved networks</Title>

            <Tooltip label={'Create Access Point'}>
                <ActionIcon>
                    <IconWifi onClick={handleConnect}/>
                </ActionIcon>
            </Tooltip>
        </Group>
        <Input.Wrapper
            label={'SSID'}

        >
            <Input
                minLength={10}
                maxLength={32}
                value={ssid} onChange={setSsid}/>
        </Input.Wrapper>
        <Input.Wrapper
            label={'Password'}
        >
            <Input
                minLength={8}
                maxLength={60}
                value={password} onChange={setPassword}/>
        </Input.Wrapper>
        <Group position={"right"} mt={'md'}>
            <Button disabled={!isValid} onClick={handleSave}>Save</Button>
        </Group>
    </form>
}