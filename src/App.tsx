import React, {useEffect, useState} from 'react';
import {ActionIcon, AppShell, Container, Group, Header, useMantineColorScheme, useMantineTheme,} from "@mantine/core";
import {IconMoonStars, IconSun} from "@tabler/icons-react";
import {Logo} from "./layout/Logo";
import LayoutRoutes from "./layout/LayoutRoutes";
import {apiGetCurrentProgram, IApiProgramDto, ProgramStateContext} from "./api/program";


function App() {

    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const [context, setContext] = useState<IApiProgramDto>({
        program: 'unknown'
    });

    const theme = useMantineTheme();

    useEffect(() => {
        let timeout: number = 0;
        const worker = async () => {
            let response = await apiGetCurrentProgram();
            if (response.success && response.result) {
                setContext(response.result);
            }
            timeout = window.setTimeout(worker, 1000)
        };
        worker().then();
        return () => clearTimeout(timeout);
    }, [setContext]);

    return (
        <ProgramStateContext.Provider value={context}>
            <AppShell
                padding={0}
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                header={<Header height={{base: 50, md: 70}} p="xs">
                    <Group sx={{height: '100%'}} px={20} position="apart">

                        <Logo/>

                        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                            {colorScheme === 'dark' ? <IconSun/> : <IconMoonStars/>}
                        </ActionIcon>
                    </Group>
                </Header>}
            >
                <Container my={'xs'} p={'md'} pb={0} mb={0}
                           style={{minHeight: '50vh'}}>
                    <LayoutRoutes/>
                </Container>
            </AppShell>
        </ProgramStateContext.Provider>
    );
}

export default App;
