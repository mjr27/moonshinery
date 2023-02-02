import React, {useEffect, useState} from "react";
import {fetchWifi, IWifi} from "../api/wifi";
import {ActionIcon, Badge, Box, Button, Divider, Group, LoadingOverlay, Paper, Skeleton, Text} from "@mantine/core";
import {IconAntenna, IconAntennaOff, IconReload, IconTrash} from "@tabler/icons-react";
import {range} from "@mantine/hooks";
import PageHeader from "../layout/PageHeader";


const WifiList: React.FC<{
    networks: IWifi[]
}> = ({networks}) => {
    if (networks.length === 0) {
        return null;
    }
    return <Paper p={'xs'}>
        {networks.map(network => <Group key={network.ssid} position={'apart'} mb={'sm'}>
                <Text>{network.ssid}</Text>
                <Group style={{textAlign: "right"}}>
                    {!isNaN(network.rssi) ? <Badge size={'xs'} radius={'sm'}>{network.rssi} dBm</Badge> : null}
                    <Button.Group>
                        {network.ssid == "mjr@matv"
                            ? <ActionIcon>
                                <IconAntennaOff size={18}/>
                            </ActionIcon>
                            : <ActionIcon>
                                <IconAntenna size={18}/>
                            </ActionIcon>
                        }

                        <ActionIcon color={'red'} disabled={!network.pass}>
                            <IconTrash size={18}/>
                        </ActionIcon>
                    </Button.Group>
                </Group>
            </Group>
        )}
    </Paper>;
}
export default function WifiPage() {
    const [wifiList, setWifiList] = useState<IWifi[]>([]);
    const [loading, setLoading] = useState(true);

    async function reload() {
        setLoading(true);
        setWifiList(await fetchWifi());
        setLoading(false);
    }

    useEffect(() => {
        reload();
    }, [setWifiList]);

    return <div>
        <PageHeader actions={
            <ActionIcon>
                <IconReload onClick={reload}/>
            </ActionIcon>
        }>
            Wifi
        </PageHeader>
        <Group position={'apart'}>
            <Text size={'xl'} weight={600}></Text>

        </Group>
        <Divider my={'sm'}/>
        <div style={{position: 'relative'}}>
            <LoadingOverlay visible={loading}/>
            {wifiList.length > 0
                ? <WifiList networks={wifiList}/>
                : <Box p={'sm'}>
                    {range(0, 5).map(i => <Skeleton key={i} height={32} mb={'lg'} radius="xl"/>)}
                </Box>
            }

        </div>
    </div>
}