import React, {useEffect, useState} from "react";
import PageHeader from "../layout/PageHeader";
import {ActionIcon, Box, Group, Switch} from "@mantine/core";
import {IconReload} from "@tabler/icons-react";
import {readRelaysStatus, setRelayStatus} from "../api/relays";

export default function RelayPage() {
    const [_, setLoading] = useState(true);
    const [relays, setRelays] = useState<boolean[]>([]);
    const reload = async () => {
        setRelays(await readRelaysStatus())
        setLoading(false);
    }
    const toggleRelay = async (relay: number) => {
        setRelays(await setRelayStatus(relay, !relays[relay]));
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
        <PageHeader
            actions={<Group>
                <ActionIcon size={'lg'} onClick={reload}>
                    <IconReload/>
                </ActionIcon>
            </Group>}
        >Temperature sensors</PageHeader>
        <Group>
            {relays.map((enabled, i) => <Box key={i}>
                <Switch checked={enabled} onClick={() => toggleRelay(i)}/>
            </Box>)}
        </Group>
    </>
}