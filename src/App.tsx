import React, {useEffect, useState} from 'react';
import {
    ActionIcon,
    AppShell,
    Burger,
    Container,
    Group,
    Header,
    MediaQuery,
    Navbar,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import {IconMoonStars, IconSun} from "@tabler/icons-react";
import {Logo} from "./layout/Logo";
import LayoutRoutes from "./layout/LayoutRoutes";
import SidebarMenu from "./layout/SidebarMenu";
import {useLocation} from "react-router-dom";

function App() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setOpened(false);
    }, [location]);
    return (
        <AppShell
            padding={0}
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint={'sm'}
            asideOffsetBreakpoint={'sm'}
            navbar={<Navbar width={{xs: 200, lg: 300}} p="xs" hidden={!opened} style={{zIndex: 500}}
            hiddenBreakpoint={'sm'}
            >
                <Navbar.Section grow mt="xs">
                    <SidebarMenu/>
                </Navbar.Section>
            </Navbar>}

            header={<Header height={{base: 50, md: 70}} p="xs">
                <Group sx={{height: '100%'}} px={20} position="apart">
                    <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>
                    <Logo/>

                    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                        {colorScheme === 'dark' ? <IconSun/> : <IconMoonStars/>}
                    </ActionIcon>
                </Group>
            </Header>}
        >
            <Container mx={{base: 0, sm: 'md'}} my={'xs'} p={'md'} pb={0} mb={0}
                       style={{minHeight: '50vh', position: 'relative'}}>
                <LayoutRoutes/>
            </Container>

        </AppShell>
    );
}

export default App;
