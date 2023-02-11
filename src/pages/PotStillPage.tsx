import {Alert, Button, createStyles, Divider, Group, Paper, Popover, Stack, Switch, Text} from "@mantine/core";
import React, {useContext} from "react";
import {apiStopCurrentProgram, ProgramStateContext} from "../api/program";
import {IconAlertCircle} from "@tabler/icons-react";
import {SinglePageLayout} from "../layout/Layouts";
import {TemperatureGauge} from "../components/TemperatureGauge";

const defaultPadding = {sm: 'xl', xs: 'xs'};
const PotStillModal = ({
                           status,
                           statusMsg,
                           handleCancel
                       }: {
    status: string,
    statusMsg: string,
    handleCancel: () => void
}) => {
    const alert = status === 'success'
        ? <Alert icon={<IconAlertCircle size={16}/>} title="Well done!" color="green">
            {statusMsg ?? "Program complete"}
        </Alert>
        : <Alert icon={<IconAlertCircle size={16}/>} title="Error" color="red">
            {statusMsg ?? "Please check device for details"}
        </Alert>;

    return <Paper mt={'xl'} p={defaultPadding}>
        {alert}
        <Group position="right" mt={'lg'}>
            <Button onClick={handleCancel}>Close</Button>
        </Group>
    </Paper>
}

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        justifyItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            // Type safe child reference in nested selectors via ref
            flexDirection: "column",
            [`& .${getRef('sensors')}`]: {
                margin: `${theme.spacing.md}px auto`,
            }

        },
    },

    chart: {

        display: 'block',
        margin: '0px auto',
        minWidth: '300px',
        flexGrow: 1
    },
    sensors: {
        ref: getRef('sensors'),
    },

}));
// const a: FlexDirection;

export const PotStillPage = React.memo(function PotStillPage() {
    const context = useContext(ProgramStateContext);
    const {classes} = useStyles();

    if (context.program !== 'pot-still') {
        return null;
    }
    // TODO relays
    // TODO leakage sensor
    async function handleCancel() {
        await apiStopCurrentProgram();
    }

    if (context.status !== 'running') {
        return <PotStillModal status={context.status} statusMsg={context.status} handleCancel={handleCancel}/>
    }
    return <SinglePageLayout>
        <Paper px={defaultPadding}>
            <Text size={'lg'} weight={500} align={'center'} mb={'md'}>Pot Still</Text>
            <div className={classes.container}>
                <div className={classes.chart}>
                    <TemperatureGauge
                        style={{
                            margin: "0 auto"
                        }}
                        value={context.temp[0]}
                        greenFrom={context.config.cool_temp}
                        greenTo={context.config.off_temp}
                        yellowFrom={context.config.off_temp}
                        yellowTo={100}
                        height={300}
                    />
                </div>
                <div className={classes.sensors}>
                    <Stack>
                        <Text size={'lg'} weight={500}>Relays</Text>
                        <Divider/>
                        <Switch checked={!!context.relay[0]} label={'Power'} readOnly/>
                        <Switch checked={!!context.relay[1]} label={'Cooling'} readOnly/>
                    </Stack>
                    <Divider my={'xs'}/>
                    <Stack>
                        <Switch checked={context.leak[0] > context.config.leak_level} label={<>
                            Leak sensor level: {context.leak[0]} of {context.config.leak_level}
                        </>} readOnly/>
                    </Stack>
                </div>
            </div>

            <Group position={'center'} mt={'xl'}>
                <Popover position="top" withArrow shadow="md">
                    <Popover.Target>
                        <Button color={'red'}>Cancel current program</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text mb={'md'}>Do you really want to cancel pot still?</Text>
                        <Button onClick={handleCancel} color={'red'} fullWidth>Cancel current program</Button>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Paper>
    </SinglePageLayout>
})