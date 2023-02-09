import {Alert, Button, Group, Modal, Paper, useMantineTheme} from "@mantine/core";
import React, {useContext} from "react";
import {apiStopCurrentProgram, ProgramStateContext} from "../api/program";
import GaugeChart from "react-gauge-chart";
import {IconAlertCircle} from "@tabler/icons-react";


const PotStillTemperatureGauge = React.memo(function PotStillTemperatureGauge({min = 0, max = 100, value, cool, off}: {
    min?: number,
    max?: number,
    value: number,
    cool: number,
    off: number
}) {
    const n_value = (value - min) / (max - min);
    const n_cool = (cool - min) / (max - min);
    const n_off = (off - min) / (max - min);
    const theme = useMantineTheme();
    const index = theme.colorScheme === "light" ? 2 : 9;
    const warmupColor = theme.colors.blue[index];
    const distilleryColor = theme.colors.green[index];
    const overHeatingColor = theme.colors.red[index];
    const textColor = n_value < n_cool
        ? theme.colors.blue
        : n_cool < n_off
            ? theme.colors.green
            : theme.colors.red;
    console.log("REDRAW");
    return <GaugeChart textColor={theme.colors.orange[8]}
                       fontSize={'40px'}
                       nrOfLevels={100}
                       colors={[warmupColor, distilleryColor, overHeatingColor]}
                       needleColor={textColor[7] + 'AA'}
                       needleBaseColor={textColor[8]}
                       arcsLength={[n_cool, n_off - n_cool, 1 - n_off]}
                       percent={n_value}
                       animate={false}
                       formatTextValue={() => value.toFixed(2) + '°'}
                       arcPadding={0.02}
    />
})

export function PotStillPage() {
    const context = useContext(ProgramStateContext);

    if (context.program !== 'pot-still') {
        return null;
    }
    // TODO relays
    // TODO leakage sensor
    async function handleCancel() {
        await apiStopCurrentProgram();
    }

    return <Paper>
        {(context.status !== 'running') && <Modal withCloseButton={false} opened={true} onClose={() => {
        }}>
            {context.status === 'success'
                ? <Alert icon={<IconAlertCircle size={16}/>} title="Well done!" color="green">
                    {context.statusmsg ?? "Program complete"}
                </Alert>
                : <Alert icon={<IconAlertCircle size={16}/>} title="Error" color="red">
                    {context.statusmsg ?? "Please check device for details"}
                </Alert>}
            <Group position="right" mt={'lg'}>
                <Button onClick={handleCancel}>Close</Button>
            </Group>
        </Modal>}
        <PotStillTemperatureGauge value={context.temp[0]}
                                  cool={context.config.cool_temp}
                                  off={context.config.off_temp}
                                  max={120}
        />
        <code>
            <pre>{JSON.stringify(context, null, 2)}</pre>
        </code>
        <Button onClick={handleCancel}>Cancel current program</Button>
    </Paper>

}