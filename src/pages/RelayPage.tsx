import React, {useEffect, useState} from "react";
import PageHeader from "../layout/PageHeader";
import {ActionIcon, Box, Group, Switch} from "@mantine/core";
import {IconReload} from "@tabler/icons-react";
import {apiRelayList, apiRelaySet} from "../api/relays";

export default function RelayPage() {
    const [loading, setLoading] = useState(true);
    const [relays, setRelays] = useState<boolean[]>([]);
    const reload = async () => {
        const relayList = await apiRelayList();
        if (relayList.success && relayList.result) {
            setRelays(relayList.result.status.map(r => !!r));
        }
        setLoading(false);
    }
    const toggleRelay = async (relay: number) => {
        const relayList = await apiRelaySet(relay, !relays[relay]);
        if (relayList.success && relayList.result) {
            setRelays(relayList.result.status.map(r => !!r))
        }
    }
    useEffect(() => {
        let finished = false;
        const worker = async function () {
            await reload()
            if (!finished) {
                setTimeout(worker, 5000);
            }
        }
        worker();
        return () => {
            finished = true;
        }
    }, [])
    return <>
        {loading && <PageHeader
            actions={<Group>
                <ActionIcon size={'lg'} onClick={reload}>
                    <IconReload/>
                </ActionIcon>
            </Group>}
        >Temperature sensors</PageHeader>}
        <Group>
            {relays.map((enabled, i) => <Box key={i}>
                <Switch checked={enabled} onClick={() => toggleRelay(i)}/>
            </Box>)}
        </Group>
    </>
}