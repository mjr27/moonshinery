import PageHeader from "../layout/PageHeader";
import React, {useEffect, useState} from "react";
import {ActionIcon, Code, Group, LoadingOverlay, RingProgress, Text} from "@mantine/core";
import {IconLoader, IconPlayerTrackNext, IconReload} from "@tabler/icons-react";
import {apiSensorsList, apiTemperatureSensorsRescan, apiTemperatureSensorsRotate, ISensorInfo} from "../api/sensors";

export default function TemperatureSensorsPage() {
    const [loading, setLoading] = useState(true);
    const [sensors, setSensors] = useState<ISensorInfo>({temperature: [], leakage: []});
    const reload = async () => {
        const response = await apiSensorsList();
        if (response.success && response.result) {
            setSensors(response.result);
        }
        setLoading(false);
    }
    const rotate = async () => {
        const response = await apiTemperatureSensorsRotate();
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
    return <>
        <PageHeader
            actions={<Group>
                <ActionIcon size={'lg'} onClick={rotate}>
                    <IconPlayerTrackNext/>
                </ActionIcon>
                <ActionIcon size={'lg'} onClick={scan}>
                    <IconLoader/>
                </ActionIcon>
                <ActionIcon size={'lg'} onClick={reload}>
                    <IconReload/>
                </ActionIcon>
            </Group>}
        >Temperature sensors</PageHeader>
        <div style={{position: 'relative'}}>
            <LoadingOverlay visible={loading}/>
            <Group position={'apart'}>
                {sensors.temperature.map((value, i) => <RingProgress
                    key={i}
                    size={170}
                    thickness={16}
                    label={<Text size="xs" align="center" px="xs" sx={{pointerEvents: 'none'}}>{value}</Text>}
                    sections={[
                        {value: value, color: 'cyan', tooltip: 'Temperature'},
                    ]}/>)}
            </Group>
            <Group position={'apart'}>
                {sensors.leakage.map((value, i) => <Code key={i}>{value}</Code>)}
            </Group>
        </div>
    </>
}