import React, {useEffect, useState} from "react";
import {apiWifiForgetConnection, apiWifiKnownList, ISsidPassword} from "../api/wifi";
import {ActionIcon, Button, CopyButton, Group, Popover, Text, Title} from "@mantine/core";
import {IconCopy, IconTrash} from "@tabler/icons-react";
import {IWifiSubPage} from "../settings/WifiConfiguration";

export function WifiKnownList({setLoading}: IWifiSubPage) {
    const [known, setKnown] = useState<ISsidPassword[]>([]);

    const reload = async () => {
        setLoading(true);
        const nets = await apiWifiKnownList();
        if (nets.success && nets.result) {
            setKnown(nets.result)
            setLoading(false);
        }
    };
    useEffect(() => {
        reload().then();
    }, [])

    async function handleDelete(ssid: string) {
        setLoading(true);
        await apiWifiForgetConnection(ssid);
        await reload();
    }

    return <>
        <Title order={4} m={'md'}>List of saved networks</Title>
        {known.map(row => <Group position={'apart'} key={row.ssid} m={'md'}>
            <Text>{row.ssid}</Text>
            <Group position={'right'} spacing={0}>
                <CopyButton value={row.password}>
                    {({copied, copy}) => (
                        <ActionIcon color={copied ? 'teal' : 'blue'} disabled={copied} onClick={copy}>
                            <IconCopy/>
                        </ActionIcon>
                    )}
                </CopyButton>
                <Popover closeOnClickOutside={true}>
                    <Popover.Target>
                        <ActionIcon color={'red'}>
                            <IconTrash/>
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text mb={'md'}>Do you really want to forget this SSID?</Text>
                        <Button onClick={() => handleDelete(row.ssid)} color={'red'}>Yes, delete</Button>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Group>)}
    </>
}