import React, {useEffect, useState} from "react";
import {PageTemplate} from "../layout/PageHeader";
import {ActionIcon, Group, Input, Stack, Switch} from "@mantine/core";
import {IconReload} from "@tabler/icons-react";
import {apiRelayList, apiRelaySet} from "../api/relays";

const RelayBlock = (props: {
    index: number,
    isEnabled: boolean,
    onToggle: (index: number, value: boolean) => void
}) => {
    return <Input.Wrapper
        label={<>Relay # {props.index + 1}</>}
    >
        <p></p>
        <Switch checked={props.isEnabled} onClick={() => props.onToggle(props.index, !props.isEnabled)}/>
    </Input.Wrapper>
}
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
    return <PageTemplate title={'Relays'}
                         loading={loading}
                         withPaper
                         actions={
                             <Group>
                                 <ActionIcon size={'lg'} onClick={reload}>
                                     <IconReload/>
                                 </ActionIcon>
                             </Group>
                         }
    >
        <Stack>
            {relays.map((enabled, i) => <RelayBlock key={i} isEnabled={enabled} index={i} onToggle={toggleRelay}/>)}
        </Stack>
    </PageTemplate>
}