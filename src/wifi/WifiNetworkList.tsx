import React, {useEffect, useState} from "react";
import {apiWifiConnectToNetwork, apiWifiScanNetworks, IWifiNetwork} from "../api/wifi";
import {ActionIcon, Button, Group, Input, Modal, Popover, Text, Title, Tooltip} from "@mantine/core";
import {IconPlugConnected, IconSquarePlus, IconWifi, IconWifi0, IconWifi1, IconWifi2} from "@tabler/icons-react";
import {useInputState} from "@mantine/hooks";
import {IWifiSubPage} from "../settings/WifiConfiguration";

function AddNetworkConnectButton({network}: { network: IWifiNetwork }) {
    const [opened, setOpened] = useState(false);
    const [password, setPassword] = useInputState("");

    function handleConnect() {
        if (network.known) {
            apiWifiConnectToNetwork(network.ssid).then(
                handleClose
            ).catch(handleClose)
            return;
        }
        setPassword("");
        setOpened(true)
    }

    function handleClose() {
        setPassword("");
        setOpened(false)
    }

    function handleConnectWithPassword() {
        apiWifiConnectToNetwork(network.ssid, password).then(
            handleClose
        ).catch(handleClose)
    }

    return network.known
        ? <ActionIcon variant={'subtle'} color={'primary'} onClick={handleConnect}>
            <IconPlugConnected/>
        </ActionIcon>
        : <Popover closeOnClickOutside={true}>
            <Popover.Target>
                <ActionIcon variant={'subtle'} color={'primary'}>
                    <Modal
                        opened={opened}
                        onClose={handleClose}
                        title="Connect to WiFi"
                    >
                        <Input.Wrapper label={"SSID"}>
                            <Input value={network.ssid} readOnly/>
                        </Input.Wrapper>
                        <Input.Wrapper label={"Password"}>
                            <Input value={password} onChange={setPassword}/>
                        </Input.Wrapper>
                        <Group position={'right'} mt={'lg'}>
                            <Button onClick={handleConnectWithPassword}>Connect</Button>
                        </Group>
                        {/* Modal content */}
                    </Modal>
                    <IconSquarePlus onClick={handleConnect}/>
                </ActionIcon>
            </Popover.Target>
        </Popover>
}

export function WifiNetworksList({setLoading}: IWifiSubPage) {
    const [networks, setNetworks] = useState<IWifiNetwork[]>([]);

    const reload = async () => {
        setLoading(true);
        const nets = await apiWifiScanNetworks();
        if (nets.success && nets.result) {
            setNetworks(nets.result)
            setLoading(false);
        }
    };
    useEffect(() => {
        reload().then();
    }, [])


    return <>
        <Title order={4} m={'md'}>List of connected networks</Title>
        {networks.map(network => <Group position={'apart'} key={network.ssid} m={'md'}>
            <Text>{network.ssid}</Text>

            <Group position={'right'} spacing={0}>
                <AddNetworkConnectButton network={network}/>
                <Tooltip label={network.rssi}>
                    {network.rssi > -55
                        ? <IconWifi/>
                        : network.rssi > -75
                            ? <IconWifi2/>
                            : network.rssi > -85
                                ? <IconWifi1/>
                                : <IconWifi0/>
                    }</Tooltip>
            </Group>
        </Group>)}
    </>
}
