import React, {useContext, useEffect, useState} from "react";
import {apiConfigGetLeak, apiConfigSetLeak, ILeakageConfiguration} from "../api/config";
import {ProgramStateContext} from "../api/program";
import {Button, Group, NumberInput} from "@mantine/core";
import {PageTemplate} from "../layout/PageHeader";

export const LeakageSettingForm: () => JSX.Element = () => {
    const [currentValue, setCurrentValue] = useState<ILeakageConfiguration>({
        threshold: 0,
        window: 0
    });
    const [loading, setLoading] = useState(true);
    const context = useContext(ProgramStateContext);
    const fetchData = async () => {
        setLoading(true);
        const response = await apiConfigGetLeak();
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
        await apiConfigSetLeak(currentValue);
        await fetchData();
    }
    const handleReset = async () => await fetchData()

    const handleChangeThreshold = (value: number | undefined) => {
        value && setCurrentValue({...currentValue, threshold: value})
    }
    const handleChangeWindow = (value: number | undefined) => {
        value && setCurrentValue({...currentValue, window: value})
    }
    useEffect(() => {
        fetchData().then();
    }, [setLoading, setCurrentValue])
    return <PageTemplate title={'Leak sensor configuration'} loading={loading} withPaper>
        <Group mb={'sm'} position={'apart'}>
            <NumberInput
                min={0}
                max={1000}
                label={'Threshold'}
                description={'Sensor value threshold (0-1000)'}
                value={currentValue.threshold}
                onChange={handleChangeThreshold}
            />
            <NumberInput
                readOnly
                disabled
                label={'Value'}
                description={<>&nbsp;</>}
                style={{
                    width: '4em'
                }}
                value={context.program === 'menu' ? context.leak[0] : -1}

            />
        </Group>


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