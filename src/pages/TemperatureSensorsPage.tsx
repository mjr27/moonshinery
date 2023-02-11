import {PageTemplate} from "../layout/PageHeader";
import React, {useEffect, useState} from "react";
import {ActionIcon, Code, Group, LoadingOverlay, Stack, Text} from "@mantine/core";
import {IconArrowDown, IconArrowUp, IconLoader, IconReload} from "@tabler/icons-react";
import {apiSensorsList, apiTemperatureSensorMoveUp, apiTemperatureSensorsRescan, ISensorInfo} from "../api/sensors";
import {TemperatureGauge} from "../components/TemperatureGauge";

export default function TemperatureSensorsPage() {
    const [loading, setLoading] = useState(true);
    const [sensors, setSensors] = useState<ISensorInfo>({temp: [], leak: []});
    const reload = async () => {
        const response = await apiSensorsList();
        if (response.success && response.result) {
            setSensors(response.result);
        }
        setLoading(false);
    }

    async function handleMoveUp(number: number) {
        const response = await apiTemperatureSensorMoveUp(number);
        if (response.success && response.result) {
            setSensors(response.result)
        }
    }

    const scan = async () => {
        const response = await apiTemperatureSensorsRescan();
        if (response.success && response.result) {
            setSensors(response.result);
        }
    }
    useEffect(() => {
        let finished = false;
        const worker = async function () {
            await reload()
            if (!finished) {
                setTimeout(worker, 1000);
            }
        }
        worker();
        return () => {
            finished = true;
        }
    }, [])


    return <PageTemplate title={'Temperature sensors'} actions={
        <Group spacing={'xs'}>
            <ActionIcon size={'sm'} onClick={scan}>
                <IconLoader/>
            </ActionIcon>
            <ActionIcon size={'sm'} onClick={reload}>
                <IconReload/>
            </ActionIcon>
        </Group>
    }>
        <div style={{position: 'relative'}}>
            <LoadingOverlay visible={loading}/>
            <Group position={'center'}>
                {sensors.temp.map((sensor, i) => <Stack align={'center'} mb={'lg'}>
                        <TemperatureGauge
                            width={200}
                            height={200}
                            value={sensor.value}
                            key={sensor.id}/>
                        <Group spacing={0}>
                            <ActionIcon disabled={i == 0} onClick={() => handleMoveUp(i)}>
                                <IconArrowUp/>
                            </ActionIcon>
                            <Text size={'sm'} weight={500}><code>{sensor.id}</code></Text>
                            <ActionIcon disabled={i == sensors.temp.length - 1} onClick={() => handleMoveUp(i + 1)}>
                                <IconArrowDown/>
                            </ActionIcon>
                        </Group>
                    </Stack>
                )}
            </Group>
            <Group position={'apart'}>
                {sensors.leak.map((value, i) => <Code key={i}>{value}</Code>)}
            </Group>
        </div>
    </PageTemplate>
}