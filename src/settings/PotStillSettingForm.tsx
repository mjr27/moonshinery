import React, {useEffect, useState} from "react";
import {apiConfigGetPotStill, apiConfigSetPotStill, IPotStillConfiguration} from "../api/config";
import {Button, Group, NumberInput} from "@mantine/core";
import {TemperatureInput} from "../components/TemperatureInput";
import {PageTemplate} from "../layout/PageHeader";

export const PotStillSettingForm: () => JSX.Element = () => {
    const [currentValue, setCurrentValue] = useState<IPotStillConfiguration>({
        window: 0,
        off_threshold: 0,
        cool_threshold: 0
    });
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        const response = await apiConfigGetPotStill();
        if (!response.success) {
            // TODO
            return;
        } else if (response.result) {
            setCurrentValue(response.result);
        }
        setLoading(false);
    }
    const handleSave = async () => {
        setLoading(true);
        await apiConfigSetPotStill(currentValue);
        await fetchData();
    }
    const handleReset = async () => await fetchData()

    const handleChangeCoolThreshold = (value: number | undefined) => {
        value && setCurrentValue({...currentValue, cool_threshold: value})
    }
    const handleChangeOffThreshold = (value: number | undefined) => {
        value && setCurrentValue({...currentValue, off_threshold: value})
    }
    const handleChangeWindow = (value: number | undefined) => {
        value && setCurrentValue({...currentValue, window: value})
    }
    useEffect(() => {
        fetchData().then();
    }, [setLoading, setCurrentValue])
    return <PageTemplate title={'Pot Still configuration'} loading={loading} withPaper>
        <TemperatureInput
            min={0}
            max={100}
            label={<>Cooling temperature, &#8451;</>}
            description={'Temperature when to turn cooling on'}
            value={currentValue.cool_threshold}
            onChange={handleChangeCoolThreshold}
            mb={'sm'}
        />
        <TemperatureInput
            min={0}
            max={100}
            label={<>Stop temperature, &#8451;</>}
            description={'Temperature when distillery be stopped'}
            value={currentValue.off_threshold}
            onChange={handleChangeOffThreshold}
            mb={'sm'}
        />
        <NumberInput
            min={1}
            max={60}
            label={'Measurement period'}
            description={'Trigger event when sensor reports error for the last N measures'}
            value={currentValue.window}
            onChange={handleChangeWindow}
        />
        <Group position={'apart'} mt={'md'}>
            <Button onClick={handleSave} variant="light">Save</Button>
            <Button onClick={handleReset} color={'red'} variant="light">Reset</Button>
        </Group>
    </PageTemplate>
}